import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './service/app.module';
import { GeneralError } from './exception/base.exception';

const originList: string[] = ['http://localhost:4321', 'http://uat.tacra.market', 'https://tacra.market'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('tacra-api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const messages = errors.flatMap((e) => Object.values(e.constraints ?? {}));
        return new GeneralError('INPUT_INVALID', messages.join(', '));
      },
    }),
  );
  app.enableCors({ origin: originList });
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
