import { Test } from '@nestjs/testing';
import { FilterResolver } from './filter.resolver';
import { FilterService } from './filter.service';
import { FilterImageInput } from '../graphql-types';

describe('FilterResolver', () => {
  let resolver: FilterResolver;
  let service: FilterService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [FilterResolver, FilterService],
    }).compile();

    resolver = moduleRef.get<FilterResolver>(FilterResolver);
    service = moduleRef.get<FilterService>(FilterService);
  });

  describe('filterImage', () => {
    it('should call filterService.filterImage with the correct argument and return the result', async () => {
      const filterImageInput: FilterImageInput = {
        imageFile: 'test-url',
        grayscale: true,
        blur: 5,
        saturation: 30,
      };
      const expected = 'filtered-image-url';
      jest.spyOn(service, 'filterImage').mockResolvedValue(expected);

      const result = await resolver.filterImage(filterImageInput);

      expect(service.filterImage).toHaveBeenCalledWith(filterImageInput);
      expect(result).toBe(expected);
    });
  });
});
