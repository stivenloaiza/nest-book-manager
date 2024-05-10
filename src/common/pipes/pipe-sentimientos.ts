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

export class SentimentLevelPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    const validLevels = [1, 2, 3, 4, 5]; // Define los niveles válidos
    const level = value.parseInt();

    if (!validLevels.includes(level)) {
      throw new BadRequestException('Level must be one of: low, medium, high');
    }

    return level;
  }
}
