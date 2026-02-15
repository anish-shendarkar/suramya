import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsArray,
    IsUrl,
    IsOptional,
    Min,
} from 'class-validator';

export class CreateOutfitDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsOptional()
    size?: string;

    @IsString()
    @IsNotEmpty()
    color: string;

    @IsString()
    @IsNotEmpty()
    gender: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsUrl()
    @IsNotEmpty()
    coverImage: string;

    @IsArray()
    @IsUrl({}, { each: true })
    images: string[];
}