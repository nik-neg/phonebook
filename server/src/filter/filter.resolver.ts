import { Args, Query, Resolver } from '@nestjs/graphql';
import { FilterImageInput } from '../graphql-types';
import { FilterService } from './filter.service';

@Resolver()
export class FilterResolver {
  constructor(private readonly filterService: FilterService) {}

  @Query('filterImage')
  async filterImage(
    @Args('filterImageInput') filterImageInput: FilterImageInput,
  ): Promise<string> {
    return this.filterService.filterPreviewImage(filterImageInput);
  }
}
