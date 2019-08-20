import { IsNotEmpty } from 'class-validator';

export class CreateIdeaDto {

    // ToDo update class

    @IsNotEmpty()
    readonly title: string;

    readonly businessIdea: string;
    readonly usp: string;
    readonly customers: string;
    readonly businessModel: string;
    readonly competitors: string;
    readonly team: string;
    readonly marketBarriers: string;
    // readonly user: string;
}
