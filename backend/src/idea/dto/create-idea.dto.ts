import { IsNotEmpty } from 'class-validator';

export class CreateIdeaDto {

    // ToDo update class

    @IsNotEmpty()
    readonly title: string;

    readonly description: string;
    readonly body: string;
    readonly tagList: string[];
}
