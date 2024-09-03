import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis',
  standalone: true
})
export class EllipsisPipe implements PipeTransform {

  /**
   * Transforms the input string by truncating it to a specified maximum length
   * and appending an ellipsis ("...") if the string exceeds that length.
   * 
   * @param value - The input string to be transformed.
   * @param maxNum - The maximum number of characters allowed before truncation.
   * @returns The transformed string, truncated and appended with an ellipsis if necessary.
   */
  transform(value: string, maxNum: number): string {
    if(value.length > maxNum){
      return value.substring(0, maxNum).trim() + '...';
    }
    return value
  }
}
