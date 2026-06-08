import { AuthenService } from './authen.service';
import { BaseInterceptor } from '../../interceptors/base.interceptor';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthenGenerateTokenRequestDto } from '../../definitions/types';

@Controller('authen')
@UseInterceptors(BaseInterceptor)
export class AuthenController {
  constructor(private readonly service: AuthenService) {}

  // [ POST ] authen/generate-token
  @Post('generate-token')
  async generateToken(@Body() body: AuthenGenerateTokenRequestDto) {
    const result = await this.service.generateToken(body);
    return result;
  }
}
