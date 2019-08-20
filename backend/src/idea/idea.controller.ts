import { Get, Post, Body, Put, Delete, Query, Param, Controller } from '@nestjs/common';
import { CreateIdeaDto } from './dto';
import {
    ApiUseTags,
    ApiBearerAuth,
    ApiResponse,
    ApiOperation,
} from '@nestjs/swagger';
import { IdeaService } from './idea.service';
import { IdeasRO, IdeaRO } from './idea.interface';
import { User } from '../user/user.decorator';

@ApiBearerAuth()
@ApiUseTags('ideas')
@Controller('ideas')
export class IdeaController {

    constructor(private readonly ideaService: IdeaService) { }

    @ApiOperation({ title: 'Get all ideas' })
    @ApiResponse({ status: 200, description: 'Return all ideas.' })
    @Get()
    async findAll(@Query() query): Promise<IdeasRO> {
        return await this.ideaService.findAll(query);

        // ToDo: debug
        // ToDo: check if a user receives the ideas of all users
    }

    @ApiOperation({ title: 'Get specified idea' })
    @ApiResponse({ status: 200, description: 'Return specified idea.' })
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<IdeaRO> {
        return await this.ideaService.findOne({ id });

        // ToDo: return error if no idea were matched
        // ToDo: debug
        // ToDo: check if a user receives the ideas of all users
    }

    @ApiOperation({ title: 'Create idea' })
    @ApiResponse({ status: 201, description: 'The idea has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Post()
    async create(@User('id') userId: number, @Body('idea') ideaData: CreateIdeaDto) {
        return this.ideaService.create(userId, ideaData);
    }

    @ApiOperation({ title: 'Update idea' })
    @ApiResponse({ status: 201, description: 'The idea has been successfully updated.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Put(':id')
    async update(@Param('id') id: number, @Body('idea') ideaData: CreateIdeaDto) {
        return this.ideaService.update(id, ideaData);
    }

    // @Get()
    // findAll(@Query() query: ListAllEntities) {
    //     return `This action returns all cats (limit: ${query.limit} items)`;
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return `This action returns a #${id} cat`;
    // }

    // @Put(':id')
    // update(@Param('id') id: string, @Body() updateIdeaDto: CreateIdeaDto) {
    //     return `This action updates a #${id} cat`;
    // }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} cat`;
    }
}
