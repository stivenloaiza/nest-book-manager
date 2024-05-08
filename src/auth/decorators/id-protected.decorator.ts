import { SetMetadata } from '@nestjs/common';
import { ValidId } from '../interfaces/valid-id';

export const META_ID = 'id';

export const IdProtected = (id: ValidId) => {
  return SetMetadata(META_ID, id);
};
