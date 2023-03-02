import { Module } from '@nestjs/common';
import { FilterResolver } from './filter.resolver';
import { FilterService } from './filter.service';
import { ContactModule } from '../contact/contact.module';

@Module({
  imports: [ContactModule],
  providers: [FilterResolver, FilterService],
})
export class FilterModule {}
