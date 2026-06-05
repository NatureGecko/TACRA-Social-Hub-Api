import { Storage } from '@google-cloud/storage';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProfileService {
  private readonly storage: Storage;
  private readonly bucketName: string =
    process.env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME || '';

  constructor() {
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
}
