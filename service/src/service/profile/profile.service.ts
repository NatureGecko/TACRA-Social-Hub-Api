import { Storage } from '@google-cloud/storage';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../modules/prisma/prisma.service';

@Injectable()
export class ProfileService {
  private readonly storage: Storage;
  private readonly profileFilePath: string = 'user_profile_image';
  private readonly bucketName: string =
    process.env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME || '';

  constructor(private readonly prisma: PrismaService) {
    this.storage = new Storage({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      credentials: {
        client_email: process.env.GOOGLE_CLOUD_STORAGE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_CLOUD_STORAGE_PRIVATE_KEY,
      },
    });
  }

  async getImage(
    type: 'user_profile_image',
    filename: string,
  ): Promise<Buffer> {
    const file = this.storage
      .bucket(this.bucketName)
      .file(`${type}/${filename}`);
    const [exists] = await file.exists();
    if (!exists) throw new NotFoundException(`Image not found: ${filename}`);
    // return file.publicUrl();
    const [contents] = await file.download();
    return contents;
  }

  // [ GET ] profile/gallery/:userId
  async galleryByUserId(userId: string) {
    // const taregtMedia = await this.prisma.userMedia.findMany({
    //   where: { userProfileId: userId },
    // });
    const context = this.storage.bucket(this.bucketName).file(``);
  }

  // [ GET ] profile/profile-image/:userId
  async profileImageByUserId(userId: string) {}

  // [ GET ] profile/profile-image-list/:userId
  async profileImageListByUserId(userId: string) {}
}
