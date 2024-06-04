import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PipesPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const sentimientosPermitidos = ['alegría', 'tristeza', 'ira', 'miedo']; 
    console.log(sentimientosPermitidos);
    
    if (!value || !sentimientosPermitidos.includes(value.toLowerCase())) {
      throw new BadRequestException(`El sentimiento "${value}" no es válido. Los sentimientos permitidos son: ${sentimientosPermitidos.join(', ')}`);
    }
    return value;
  }
}