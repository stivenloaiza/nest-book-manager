import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class NivelValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const nivel = Number(value);
    console.log(nivel);
    
    if (isNaN(nivel)) {
      throw new BadRequestException('El nivel debe ser un número');
    }
    if (nivel <= 0) {
      throw new BadRequestException('El nivel debe ser un número positivo');
    }
    return nivel;
  }
}
