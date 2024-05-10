import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ValidateFeelings implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'query') {
      throw new BadRequestException(
        'The ValidateFeelings pipe can only be applied to query params.',
      );
    }

    const RequiredFeelings = ['Happiness'];
    if (!RequiredFeelings.includes(value)) {
      throw new BadRequestException('The feeling is not valid');
    }
    return value;
  }
}
