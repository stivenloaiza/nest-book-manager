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
  SetMetadata,
  UseGuards,
  ParseIntPipe,
  ParseIntPipe,
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
import { GuardStivenGuard } from '../auth/guards/guard-stiven.guard';
import { CoderAuthGuard } from 'src/auth/guards/user-id.guard';
import { FeelingPipePipe } from './pipes/feeling.pipe.pipe';
import { PersonalGuard } from 'src/auth/guards/user-custom.guard';
import { AuthGuard } from '@nestjs/passport';
import { FeelingPipe } from './pipes/feeling.pipe';

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

  @Auth()
  @UseGuards(AuthGuard(), PersonalGuard)
  @SetMetadata('id_samuel', 'e6eaa184-0da1-467d-a9ee-a02b3d4b6b1f')
  @ApiOperation({ summary: 'Get coder phrase' })
  @Get('coder/e6eaa184-0da1-467d-a9ee-a02b3d4b6b1f')
  coder(
    @Query('feeling', FeelingPipe) feeling: string,
    @Query('level', ParseIntPipe) level: number,
  ) {
    return this.booksService.coderSamuel(feeling, level);
  }

  @SetMetadata('id_stiven', '3f5c6077-0667-4f04-9155-f35cd1ea087f')
  @UseGuards(AuthGuard(), GuardStivenGuard)
  @Get('coder/3f5c6077-0667-4f04-9155-f35cd1ea087f')
  getPhraseStivenLoaiza(
    @Query('feeling', FeelingPipePipe) feeling: string,
    @Query('level', ParseIntPipe) level: number,
  ) {
    return this.booksService.getPhraseStivenLoaiza(feeling, level);
  }

  @Auth()
  @UseGuards(CoderAuthGuard)
  @Get('coder/90b3a78d-8ca7-41bf-9407-b8c191bb6868')
  getCoder() {
    return this.booksService.coderAngelica();
  }
}
