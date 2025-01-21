import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelsService } from './travels.service';
import { TravelsResolver } from './travels.resolver';
import { Travel } from './entities/travel.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Travel])],
  providers: [TravelsService, TravelsResolver],
})
export class TravelsModule {}

