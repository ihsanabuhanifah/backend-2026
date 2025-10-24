import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LatihanModule } from './latihan/latihan.module';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true
    }),
    TypeOrmModule.forRootAsync({
      useFactory : async() => {
        const { typeOrmConfig } = await import('./config/typeorm.config.js');
        return typeOrmConfig;
      }
    }),
    
    
    LatihanModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule { }
