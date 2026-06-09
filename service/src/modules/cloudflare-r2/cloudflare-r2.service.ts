import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class CloudflareR2Service {
  private readonly endpoint: string;
  private readonly defaultBucket: string;
  private readonly s3Client: S3Client;

  constructor(private configService: ConfigService) {
    this.endpoint = this.configService.getOrThrow<string>('CLOUDFLARE_BUCKET_API');
    this.defaultBucket = this.configService.getOrThrow<string>('CLOUDFLARE_BUCKET_NAME');

    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: this.configService.getOrThrow<string>('CLOUDFLARE_BUCKET_END_POINT'),
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('CLOUDFLARE_BUCKET_ACCESS_KEY'),
        secretAccessKey: this.configService.getOrThrow<string>('CLOUDFLARE_BUCKET_SECRET_KEY'),
      },
    });
  }

  getPublicUrl(key: string, bucketName?: string): string {
    const bucket = bucketName ?? this.defaultBucket;
    return `${this.endpoint}/${key}`;
  }

  // [ ] uploadFile
  async uploadFile(key: string, fileBuffer: Buffer, contentType: 'image/webp', bucketName?: string): Promise<void> {
    const bucket = bucketName ?? this.defaultBucket;
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: fileBuffer,
        ContentType: contentType,
      }),
    );
  }
}
