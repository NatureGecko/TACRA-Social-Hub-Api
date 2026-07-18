import { JsonValue } from '@prisma/client/runtime/client';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

// = --- = --- = --- = --- = --- = --- = --- =
export type TProfileItem = {
  bio: string | null;
  id: string;
  userName: string | null;
  displayName: string;
  email: string | null;
  social: JsonValue[];
  createdAt: Date;
  imageProfile: string | null;
  imageBanner: string | null;
};

// = --- = --- = --- = --- = --- = --- = --- =
// [ GET ] profile/get/:user-id
export type TProfilegetProfileByUserIdResponse = TProfileItem;

// = --- = --- = --- = --- = --- = --- = --- =
// [ POST ] profile/update-image-profile
export type TProfileUpdateProfileImageResponse = TProfileItem;

// = --- = --- = --- = --- = --- = --- = --- =
// [ POST ] profile/update-image-banner
export type TProfileUpdateBannerImageResponse = TProfileItem;

// = --- = --- = --- = --- = --- = --- = --- =
// [ POST ] profile/update-profile
export class TProfileUpdateProfileRequest {
  @IsNotEmpty()
  @IsString()
  userId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  bio?: string;

  @IsOptional()
  @IsString()
  @MaxLength(75)
  displayName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(75)
  userName?: string;
}
export type TProfileUpdateProfileResponse = TProfileItem;
