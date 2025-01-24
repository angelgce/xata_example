import { NestFactory, repl } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);


  if (configService.get('DEBUG')) {
    const replServer = await repl(AppModule);
    replServer.setupHistory('.nestjs_repl.log', (err) => {
      err && console.error(err);
    });
  }
  await app.listen(8080);
}


bootstrap();
