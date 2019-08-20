import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { IdeaEntity } from './idea.entity';
import { UserEntity } from '../user/user.entity';
import { CreateIdeaDto } from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

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

    async create(userId: number, ideaData: CreateIdeaDto): Promise<IdeaEntity> {

        // ToDo: validate if title is given as param

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

    async update(id: number, ideaData: any): Promise<IdeaRO> {

        if (!ideaData) {
            throw new HttpException('Params missing.', HttpStatus.BAD_REQUEST);
        }

        let toUpdate = await this.ideaRepository.findOne({ id });
        let updated = Object.assign(toUpdate, ideaData);
        const idea = await this.ideaRepository.save(updated);
        return { idea };
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.ideaRepository.delete({ id });

        // ToDo: modify return to client of delete idea action
    }

}
