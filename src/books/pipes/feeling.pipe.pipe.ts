import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FeelingPipePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toLowerCase();
    if (value === 'amor') {
      return value;
    } else if (value === 'tristeza') {
      return value;
    } else {
      throw new BadRequestException(
        'Validation feeling failed, only accept [amor, tristeza]',
      );
    }
  }
}
