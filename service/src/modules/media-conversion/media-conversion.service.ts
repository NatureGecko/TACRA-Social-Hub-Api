import sharp from 'sharp';
import { Injectable } from '@nestjs/common';

type TImageDimensions = '250x250' | '1280x720' | '1920x1080' | '3840x2160';

@Injectable()
export class MediaConversionService {
  constructor() {}

  // [ ] convertImageToWebP
  async convertImageToWebP(imageBuffer: Buffer, dimensions: TImageDimensions): Promise<Buffer> {
    const [width, height] = dimensions.split('x').map(Number);
    return sharp(imageBuffer).resize(width, height, { fit: 'inside', withoutEnlargement: true }).webp().toBuffer();
  }
}
