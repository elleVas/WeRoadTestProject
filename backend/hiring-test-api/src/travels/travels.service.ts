// src/travels/travels.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Travel } from './entities/travel.entities';
import { CreateTravelInput } from './dto/create-travel.input';

@Injectable()
export class TravelsService {
  constructor(
    @InjectRepository(Travel)
    private readonly travelRepository: Repository<Travel>,
  ) {}

  findAll() {
    return this.travelRepository.find();
  }

  findOne(id: string) {
    return this.travelRepository.findOneBy({ id });
  }

  async create(createTravelInput: CreateTravelInput): Promise<Travel> {
    const travel = this.travelRepository.create(createTravelInput);
    return this.travelRepository.save(travel);
  }
}
