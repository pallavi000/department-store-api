import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { PORT } from 'utils/constant';
import { ErrorHandlerFilter } from './filters/error-handler.filter';

async function bootstrap() {
  config();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  app.useGlobalFilters(new ErrorHandlerFilter());
  await app.listen(PORT);
}
bootstrap();
