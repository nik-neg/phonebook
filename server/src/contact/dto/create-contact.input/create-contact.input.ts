import * as GraphQLTypes from '../../../graphql-types';

export class CreateContactInput extends GraphQLTypes.CreateContactInput {
  imageFile: Express.Multer.File;
}
