import type { Response } from 'express';
import { ProfileService } from './profile.service';
import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('image/:filename')
  async getImage(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): Promise<void> {
    const buffer = await this.profileService.getImage(
      'user_profile_image',
      filename,
    );
    // return result;
    const ext = filename.split('.').pop()?.toLowerCase() ?? '';
    const mimeTypes: Record<string, string> = {
      webp: 'image/webp',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
    };
    res.setHeader('Content-Type', mimeTypes[ext] ?? 'application/octet-stream');
    res.send(buffer);
  }
}
