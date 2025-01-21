import { Test, TestingModule } from '@nestjs/testing';
import { TravelsResolver } from './travels.resolver';

describe('TravelsResolver', () => {
  let resolver: TravelsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelsResolver],
    }).compile();

    resolver = module.get<TravelsResolver>(TravelsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
