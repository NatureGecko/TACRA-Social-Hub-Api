import { Type } from 'class-transformer';

import {
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  ValidateNested,
} from 'class-validator';

// [ POST ] profile/update-social
export class ProfileUpdateSocialDtoUrlMainStream {
  @IsOptional()
  @IsUrl()
  youtube?: string;

  @IsOptional()
  @IsUrl()
  x?: string;

  @IsOptional()
  @IsUrl()
  facebook?: string;

  @IsOptional()
  @IsUrl()
  blueSky?: string;

  @IsOptional()
  @IsUrl()
  instragrame?: string;
}

export class ProfileUpdateSocialDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => ProfileUpdateSocialDtoUrlMainStream)
  urlMainStream?: ProfileUpdateSocialDtoUrlMainStream;

  @IsOptional()
  @IsObject()
  urlOther?: Record<string, string>;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  bio?: string;
}
