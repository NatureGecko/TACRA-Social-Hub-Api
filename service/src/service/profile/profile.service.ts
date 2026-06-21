import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '../../../generated/prisma/client';
import { GeneralError } from '@/exception/base.exception';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { CloudflareR2Service } from '@/modules/cloudflare-r2/cloudflare-r2.service';
import { MediaConversionService } from '@/modules/media-conversion/media-conversion.service';

import {
  TProfilegetProfileByUserIdResponse,
  TProfileUpdateBannerImageResponse,
  TProfileUpdateProfileImageResponse,
  TProfileUpdateProfileRequest,
} from '@/definitions/types';

@Injectable()
export class ProfileService {
  private readonly storagePathImageProfile: string = 'image-profile';
  private readonly storagePathImageBanner: string = 'image-banner';
  private readonly bucketName: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly mediaConversion: MediaConversionService,
    private readonly cloudflareR2: CloudflareR2Service,
    private readonly configService: ConfigService,
  ) {
    this.bucketName = this.configService.getOrThrow<string>('CLOUDFLARE_BUCKET_NAME');
  }

  private profileSelectItem: Prisma.UserProfileSelect = {
    id: true,
    userName: true,
    bio: true,
    displayName: true,
    email: true,
    social: true,
    createdAt: true,
    imageProfile: true,
    imageBanner: true,
  };

  // [ GET ] profile/get/:user-id
  async getProfileByUserId(userId: string, displayName?: string): Promise<TProfilegetProfileByUserIdResponse> {
    let profile = await this.prisma.userProfile.findFirst({
      where: { id: userId },
    });

    if (!profile) {
      let username = displayName ? displayName.replace(/[^A-Za-z0-9_]/g, '').replace(/-/g, '_') : userId;
      const usernameExist = await this.prisma.userProfile.findFirst({
        select: this.profileSelectItem,
        where: { userName: username },
      });
      if (usernameExist) username = userId;
      profile = await this.prisma.userProfile.create({
        select: this.profileSelectItem,
        data: {
          id: userId,
          displayName: displayName || userId,
          userName: username,
        },
      });
    }
    return profile;
  }

  // [ POST ] profile/update-image-profile
  async updateProfileImage(userId: string, file: Express.Multer.File): Promise<TProfileUpdateProfileImageResponse> {
    const transformedImage = await this.mediaConversion.convertImageToWebP(file.buffer, '250x250');
    const imageuuid = randomUUID();
    const key = `${imageuuid}-${new Date().getTime()}.webp`;
    const pathKey = `${this.storagePathImageProfile}/${key}`;
    await this.cloudflareR2.uploadFile(pathKey, transformedImage, 'image/webp');
    const result = await this.prisma.userProfile.update({
      select: this.profileSelectItem,
      where: { id: userId },
      data: { imageProfile: pathKey },
    });
    await this.prisma.userMedia.create({
      data: {
        userProfileId: result.id,
        bucket: this.bucketName,
        path: pathKey,
        type: 'image/webp',
      },
    });
    return result;
  }

  // [ POST ] profile/update-image-banner
  async updateBannerImage(userId: string, file: Express.Multer.File): Promise<TProfileUpdateBannerImageResponse> {
    const transformedImage = await this.mediaConversion.convertImageToWebP(file.buffer, '1920x1080');
    const imageuuid = randomUUID();
    const key = `${imageuuid}-${new Date().getTime()}.webp`;
    const pathKey = `${this.storagePathImageBanner}/${key}`;
    await this.cloudflareR2.uploadFile(pathKey, transformedImage, 'image/webp');
    const result = await this.prisma.userProfile.update({
      select: this.profileSelectItem,
      where: { id: userId },
      data: { imageBanner: pathKey },
    });
    await this.prisma.userMedia.create({
      data: {
        userProfileId: result.id,
        bucket: this.bucketName,
        path: pathKey,
        type: 'image/webp',
      },
    });
    return result;
  }

  // [ POST ] profile/update-profile
  async updateProfile(body: TProfileUpdateProfileRequest) {
    const targetUser = await this.prisma.userProfile.findUnique({
      where: { id: body.userId },
    });
    if (!targetUser) throw new GeneralError('USER_NOT_FOUND');

    const profileUpdateItem: Prisma.UserProfileUpdateArgs = {
      select: this.profileSelectItem,
      where: { id: body.userId },
      data: {},
    };

    if (!!body.bio) profileUpdateItem.data.bio = body.bio;
    if (!!body.displayName) profileUpdateItem.data.displayName = body.displayName;
    if (!!body.userName) {
      profileUpdateItem.data.userName = body.userName.replace(/[^A-Za-z0-9_]/g, '').replace(/-/g, '_');
    }

    const updatedProfile = await this.prisma.userProfile.update(profileUpdateItem);

    return updatedProfile;
  }
}
