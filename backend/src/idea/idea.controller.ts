import { Get, Post, Body, Put, Delete, Query, Param, Controller } from '@nestjs/common';
import { CreateIdeaDto } from './dto';

@Controller('ideas')
export class IdeaController {

    @Post()
    create(@Body() createIdeaDto: CreateIdeaDto) {
        return 'This action adds a new cat';
    }

    // @Get()
    // findAll(@Query() query: ListAllEntities) {
    //     return `This action returns all cats (limit: ${query.limit} items)`;
    // }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns a #${id} cat`;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateIdeaDto: CreateIdeaDto) {
        return `This action updates a #${id} cat`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} cat`;
    }
}
