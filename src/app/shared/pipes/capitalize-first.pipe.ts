import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirst',
  standalone: true
})
export class CapitalizeFirstPipe implements PipeTransform {
  
  /**
   * Transforms the input string by capitalizing the first letter.
   * 
   * @param value - The input string to be transformed.
   * @returns The transformed string with the first letter capitalized.
   */
  transform(value: string): string {
    if(!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
