import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenModule } from './authen/authen.module';
import { ProfileModule } from './profile/profile.module';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { MediaConversionModule } from '@/modules/media-conversion/media-conversion.module';
import { CloudflareR2Module } from '@/modules/cloudflare-r2/cloudflare-r2.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, MediaConversionModule, CloudflareR2Module, ProfileModule, AuthenModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
