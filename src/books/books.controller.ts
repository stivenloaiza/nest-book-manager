import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadFilesDto } from './dto/upload-files.dto';
/* import {personalizado} from '../../dist/auth/guards/personalizado/personalizado.guard' */
import { get } from 'https';
import { AuthGuard } from '@nestjs/passport';
import {GuardDeibyGuard} from '../auth/guards/guard-deiby.guard'
import { PipesPipe } from 'src/auth/pipes/pipes.pipe';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Create book' })
  @ApiCreatedResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Server Error' })
  @Post()
  create(@Body() dto: CreateBookDto, @Request() req) {
    return this.booksService.create(dto, req.user);
  }

  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Upload files by id book' })
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Server Error' })
  @ApiConsumes('multipart/form-data')
  @Post(':id/upload')
  @UseInterceptors(FilesInterceptor('files'))
  upload(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UploadFilesDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Request() req,
  ) {
    return this.booksService.upload(id, dto, files, req.user);
  }

  @Auth()
  @ApiOperation({ summary: 'Get all books' })
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Server Error' })
  @Get()
  findAll(@Query() dto: PaginationDto) {
    return this.booksService.findAll(dto);
  }

  @Auth()
  @ApiOperation({ summary: 'Get book by id' })
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Server Error' })
  @ApiParam({ name: 'id', description: 'uuid book' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.booksService.findOne(id);
  }

  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Update book by id' })
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Server Error' })
  @ApiParam({ name: 'id', description: 'uuid book' })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateBookDto,
    @Request() req,
  ) {
    return this.booksService.update(id, dto, req.user);
  }

  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Delete book by id' })
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Server Error' })
  @ApiParam({ name: 'id', description: 'uuid book' })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    return this.booksService.remove(id, req.user);
  }

  
  @SetMetadata('id_deiby', 'a0a59348-1b2d-45a5-8000-b2d4dd0488d4')
  @UseGuards(AuthGuard(), GuardDeibyGuard)
  @Get('coders/a0a59348-1b2d-45a5-8000-b2d4dd0488d4')
  findDeiby(){
    return this.booksService.findCoder()
  }
  
  @Get('colorNivel')
  pipeColorNivel(@Query('sentimiento',PipesPipe) sentimiento: string, @Query('nivel',PipesPipe) level: number){
    return this.booksService.getPrasheDeiby(sentimiento, level)
  }

}

  