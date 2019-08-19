import { IdeaEntity } from './idea.entity';

export interface IdeaRO {
    idea: IdeaEntity;
}

export interface IdeasRO {
    ideas: IdeaEntity[];
    ideasCount: number;
}