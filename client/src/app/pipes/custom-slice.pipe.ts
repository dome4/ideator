import { Pipe, PipeTransform } from '@angular/core';
import { SlicePipe } from '@angular/common';

/**
 * @description
 * Creates a new `String` containing a subset (slice) of the elements and adds `...`
 * if the length of the input string is greater than `end`.
 */
@Pipe({
  name: 'customSlice'
})
export class CustomSlicePipe implements PipeTransform {

  transform(value: string, start: number, end: number): string {

    if (value == null) {
      return value;
    }

    if (value.length > end) {
      // call slice pipe
      return new SlicePipe().transform(value, start, end) + '...';
    } else {
      return value;
    }
  }
}
