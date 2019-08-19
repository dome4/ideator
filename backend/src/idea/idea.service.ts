import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { IdeaEntity } from './idea.entity';
import { UserEntity } from '../user/user.entity';
import { FollowsEntity } from '../profile/follows.entity';
import { CreateIdeaDto } from './dto';

import { IdeaRO, IdeasRO } from './idea.interface';
// const slug = require('slug');

// ToDo: add throw new HttpException('Forbidden', HttpStatus.FORBIDDEN); if something wents wrong

@Injectable()
export class IdeaService {
    constructor(
        @InjectRepository(IdeaEntity)
        private readonly ideaRepository: Repository<IdeaEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        // @InjectRepository(FollowsEntity)
        // private readonly followsRepository: Repository<FollowsEntity>
    ) { }

    async findAll(query): Promise<IdeasRO> {

        // ToDo: returns whole user with password

        const qb = await getRepository(IdeaEntity)
            .createQueryBuilder('idea')
            .leftJoinAndSelect('idea.user', 'user');

        qb.where("1 = 1"); // ToDo: what happens here?

        // only respond with ideas of matching user
        if ('user' in query) {
            const user = await this.userRepository.findOne({ username: query.user });
            qb.andWhere("idea.userId = :id", { id: user.id });
        }

        qb.orderBy('idea.created', 'DESC');

        const ideasCount = await qb.getCount();

        if ('limit' in query) {
            qb.limit(query.limit);
        }

        if ('offset' in query) {
            qb.offset(query.offset);
        }

        const ideas = await qb.getMany();

        return { ideas, ideasCount };
    }

    async findOne(where): Promise<IdeaRO> {
        const idea = await this.ideaRepository.findOne(where);
        return { idea };
    }

    // async addComment(slug: string, commentData): Promise<ArticleRO> {
    //     let article = await this.articleRepository.findOne({ slug });

    //     const comment = new Comment();
    //     comment.body = commentData.body;

    //     article.comments.push(comment);

    //     await this.commentRepository.save(comment);
    //     article = await this.articleRepository.save(article);
    //     return { article }
    // }

    // async deleteComment(slug: string, id: string): Promise<ArticleRO> {
    //     let article = await this.articleRepository.findOne({ slug });

    //     const comment = await this.commentRepository.findOne(id);
    //     const deleteIndex = article.comments.findIndex(_comment => _comment.id === comment.id);

    //     if (deleteIndex >= 0) {
    //         const deleteComments = article.comments.splice(deleteIndex, 1);
    //         await this.commentRepository.delete(deleteComments[0].id);
    //         article = await this.articleRepository.save(article);
    //         return { article };
    //     } else {
    //         return { article };
    //     }

    // }

    // async favorite(id: number, slug: string): Promise<ArticleRO> {
    //     let article = await this.articleRepository.findOne({ slug });
    //     const user = await this.userRepository.findOne(id);

    //     const isNewFavorite = user.favorites.findIndex(_article => _article.id === article.id) < 0;
    //     if (isNewFavorite) {
    //         user.favorites.push(article);
    //         article.favoriteCount++;

    //         await this.userRepository.save(user);
    //         article = await this.articleRepository.save(article);
    //     }

    //     return { article };
    // }

    // async unFavorite(id: number, slug: string): Promise<ArticleRO> {
    //     let article = await this.articleRepository.findOne({ slug });
    //     const user = await this.userRepository.findOne(id);

    //     const deleteIndex = user.favorites.findIndex(_article => _article.id === article.id);

    //     if (deleteIndex >= 0) {

    //         user.favorites.splice(deleteIndex, 1);
    //         article.favoriteCount--;

    //         await this.userRepository.save(user);
    //         article = await this.articleRepository.save(article);
    //     }

    //     return { article };
    // }

    // async findComments(slug: string): Promise<CommentsRO> {
    //     const article = await this.articleRepository.findOne({ slug });
    //     return { comments: article.comments };
    // }

    async create(userId: number, ideaData: CreateIdeaDto): Promise<IdeaEntity> {

        let idea = new IdeaEntity();
        idea.title = ideaData.title;
        idea.businessIdea = ideaData.businessIdea;
        idea.usp = ideaData.usp;
        idea.customers = ideaData.customers;
        idea.businessModel = ideaData.businessModel;
        idea.competitors = ideaData.competitors;
        idea.team = ideaData.team;
        idea.marketBarriers = ideaData.marketBarriers;

        const newIdea = await this.ideaRepository.save(idea);

        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ["ideas"] });

        if (Array.isArray(user.ideas)) {
            user.ideas.push(idea);
        } else {
            user.ideas = [idea];
        }

        await this.userRepository.save(user);

        return newIdea;

    }

    // async update(slug: string, articleData: any): Promise<ArticleRO> {
    //     let toUpdate = await this.articleRepository.findOne({ slug: slug });
    //     let updated = Object.assign(toUpdate, articleData);
    //     const article = await this.articleRepository.save(updated);
    //     return { article };
    // }

    // async delete(slug: string): Promise<DeleteResult> {
    //     return await this.articleRepository.delete({ slug: slug });
    // }

    // slugify(title: string) {
    //     return slug(title, { lower: true }) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
    // }
}
