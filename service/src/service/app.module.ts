import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenModule } from './authen/authen.module';
import { ProfileModule } from './profile/profile.module';
import { PrismaModule } from '../modules/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ProfileModule,
    AuthenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
