import { IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({ required: false })
  limit?: number;

  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({ required: false })
  page?: number;
}
