import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidateFeeling implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    console.log(metadata);
    // Aquí puedes implementar tu lógica de validación de color
    // Por ejemplo, podrías verificar si el valor es un color válido
    const validFeeling = 'love';
    const feeling = value.toLowerCase(); // Convertimos el sentiminto a minúsculas para una comparación insensible a mayúsculas
    if (validFeeling != feeling) {
      throw new BadRequestException(
        'Invalid feeling. The feeling must be: "Love".',
      );
    }
    return feeling; // Si pasa la validación, devolvemos el valor original
  }
}
