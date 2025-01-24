import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { XataModule } from './xata/xata.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    XataModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
