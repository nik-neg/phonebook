import * as GraphQLTypes from '../../../graphql-types';

export class UpdateContactInput extends GraphQLTypes.UpdateContactInput {
  imageFile: Express.Multer.File;
}
