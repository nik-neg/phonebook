import { Module } from '@nestjs/common';
import { FilterResolver } from './filter.resolver';

@Module({
  providers: [FilterResolver],
})
export class FilterModule {}
