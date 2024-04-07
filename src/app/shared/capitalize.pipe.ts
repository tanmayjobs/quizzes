import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true,
})
export class Capitalize implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    value = value.toLowerCase();
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
