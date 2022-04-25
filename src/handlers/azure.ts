import { createHandler } from '@bittrance/azure-function-express';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from '../app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NotFoundExceptionFilter } from '../NotFoundExceptionFilter';

const expressApp = express();
async function bootstrap() {
  const nestApp = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  nestApp.useGlobalFilters(new NotFoundExceptionFilter());
  await nestApp.init();
}
bootstrap();

export const handler = createHandler(expressApp);
