import { Test, TestingModule } from '@nestjs/testing';
import { FilterResolver } from './filter.resolver';

describe('FilterResolver', () => {
  let resolver: FilterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilterResolver],
    }).compile();

    resolver = module.get<FilterResolver>(FilterResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
