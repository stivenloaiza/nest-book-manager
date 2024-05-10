import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';




@Injectable()
export class ValidateFeelingsPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    
    const sentimientosAceptados: string[] = [
      'felicidad',
      'tristeza',
      'miedo',
      'enojo',
      'amor'
    ];
    const sentimientoExpresado = value.toLowerCase(); 
    
 
    if (!sentimientosAceptados.includes(sentimientoExpresado)) {
      throw new BadRequestException('Invalid feeling. Please provide a valid feeling.');
    }
 
    return value; 
  }
}