import { Global, Module } from '@nestjs/common';
import { MediaConversionService } from './media-conversion.service';

@Global()
@Module({
  providers: [MediaConversionService],
  exports: [MediaConversionService],
})
export class MediaConversionModule {}
