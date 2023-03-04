import { Module } from '@nestjs/common';
import { FilterResolver } from './filter.resolver';
import { FilterService } from './filter.service';

@Module({
  imports: [],
  providers: [FilterResolver, FilterService],
  exports: [FilterService],
})
export class FilterModule {}
