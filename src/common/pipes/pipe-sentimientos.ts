// sentiment-validation.pipe.ts

import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class SentimentPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, metadata: ArgumentMetadata): string {
    const validSentiments = ['happy', 'sad', 'angry', 'excited'];
    const sentiment = value.toLowerCase();

    if (!validSentiments.includes(sentiment)) {
      throw new BadRequestException(
        'Sentiment must be one of: happy, sad, angry, excited',
      );
    }

    return sentiment;
  }
}
