import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

@Injectable()
export class UploadFilesDto {
  @IsOptional()
  @ApiProperty({ type: 'array', items: { type: 'file' } })
  files: Array<Express.Multer.File>;
}
