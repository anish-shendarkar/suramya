import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsArray,
    IsUrl,
    Min,
} from 'class-validator';

export class CreateJewelleryDto {
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
    @IsNotEmpty()
    color: string;

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
