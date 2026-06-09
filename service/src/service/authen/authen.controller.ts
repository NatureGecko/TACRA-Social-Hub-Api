import { AuthenService } from './authen.service';
import { Controller, UseInterceptors } from '@nestjs/common';
import { BaseInterceptor } from '../../interceptors/base.interceptor';

@Controller('authen')
@UseInterceptors(BaseInterceptor)
export class AuthenController {
  constructor(private readonly service: AuthenService) {}
}
