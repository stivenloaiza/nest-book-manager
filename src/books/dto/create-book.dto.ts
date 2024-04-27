import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    author: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    description?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    summary?: string;

    @IsDateString()
    @IsOptional()
    @ApiProperty()
    publicationDate?: Date;
}
