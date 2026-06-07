import type { Response } from 'express';
import { ProfileService } from './profile.service';
import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller('profile')
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get('image/:filename')
  async getImage(
    @Param('filename') filename: string,
  ): Promise<{ url: string }> {
    const response = await this.service.getImage(
      'user_profile_image',
      filename,
    );
    return response;
  }

  // [ GET ] profile/gallery/:userId
  @Get('gallery')
  async galleryByUserId(@Param('userId') userId: string) {
    return 'Hi';
  }

  // [ GET ] profile/profile-image/:userId
  @Get('profile-image')
  async profileImageByUserId(@Param('userId') userId: string) {
    return 'Hi';
  }

  // [ GET ] profile/profile-image-list/:userId
  @Get('profile-image-list')
  async profileImageListByUserId(@Param('userId') userId: string) {
    return 'Hi';
  }
}

// tacra-social-hub/user_profile_image/8e528b55-01d8-4dd6-9581-9f5f72cbb60b.webp
