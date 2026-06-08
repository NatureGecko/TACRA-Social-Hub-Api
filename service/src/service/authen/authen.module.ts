import { Module } from '@nestjs/common';
import { AuthenService } from './authen.service';
import { AuthenController } from './authen.controller';

@Module({
  imports: [],
  controllers: [AuthenController],
  providers: [AuthenService],
})
export class AuthenModule {}
