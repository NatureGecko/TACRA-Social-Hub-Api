import { NestFactory } from '@nestjs/core';
import { AppModule } from './service/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('tacra-api/v1');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
