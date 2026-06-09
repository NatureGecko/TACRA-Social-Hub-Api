import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { BaseInterceptor } from '@/interceptors/base.interceptor';
import { TProfileUpdateProfileRequest } from '@/definitions/types';
import { GeneralExceptionFilter } from '@/exception/base.exception';

import { Body, Controller, Get, Param, Post, Query, UseFilters, UploadedFile, UseInterceptors } from '@nestjs/common';

@Controller('profile')
@UseInterceptors(BaseInterceptor)
@UseFilters(GeneralExceptionFilter)
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  // [ GET ] profile/get/:user-id
  @Get('get/:userId')
  async getProfileByUserId(@Param('userId') userId: string, @Query('displayName') displayName?: string) {
    return this.service.getProfileByUserId(userId, displayName);
  }

  // [ POST ] profile/update-image-profile
  @Post('update-image-profile')
  @UseInterceptors(FileInterceptor('file'))
  async updateProfileImage(@Body('userId') userId: string, @UploadedFile() file: Express.Multer.File) {
    return this.service.updateProfileImage(userId, file);
  }

  // [ POST ] profile/update-image-banner
  @Post('update-image-banner')
  @UseInterceptors(FileInterceptor('file'))
  async updateBannerImage(@Body('userId') userId: string, @UploadedFile() file: Express.Multer.File) {
    return this.service.updateBannerImage(userId, file);
  }

  // [ POST ] profile/update-profile
  @Post('update-profile')
  async updateProfile(@Body() body: TProfileUpdateProfileRequest) {
    return this.service.updateProfile(body);
  }
}
