import { BaseInterceptor } from '../../interceptors/base.interceptor';
import { ProfileService } from './profile.service';

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';

@Controller('profile')
@UseInterceptors(BaseInterceptor)
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

  // [ GET ] profile/gallery/:env/:userId
  @Get('gallery')
  async galleryByUserId(
    @Param('env') env: string,
    @Param('userId') userId: string,
  ) {
    return 'Hi';
  }

  // [ GET ] profile/profile-image/:env/:userId
  @Get('profile-image')
  async profileImageByUserId(
    @Param('env') env: string,
    @Param('userId') userId: string,
  ) {
    return 'Hi';
  }

  // [ GET ] profile/profile-image-list/:env/:userId
  @Get('profile-image-list')
  async profileImageListByUserId(
    @Param('env') env: string,
    @Param('userId') userId: string,
  ) {
    return 'Hi';
  }

  // [ POST ] profile/update-social
  @Post('update-social')
  async updateSocial(@Body() body: any) {
    throw new Error('not ready');
  }
}

// tacra-social-hub/user_profile_image/8e528b55-01d8-4dd6-9581-9f5f72cbb60b.webp
