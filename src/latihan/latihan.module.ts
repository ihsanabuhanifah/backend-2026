import { Module } from '@nestjs/common';
import { LatihanController } from './latihan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Latihan } from './latihan.entity';
import { LatihanService } from './latihan.service';

@Module({
  imports: [TypeOrmModule.forFeature([Latihan])],
  controllers: [LatihanController],
  providers: [LatihanService],
})
export class LatihanModule {}
