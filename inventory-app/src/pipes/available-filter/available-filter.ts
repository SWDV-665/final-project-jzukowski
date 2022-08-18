import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the AvailableFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'availableFilter',
})
export class AvailableFilterPipe implements PipeTransform {
  /**
   * returns items if they are true
   */
   transform(items: any[], filter: Object): any {
    if (!items || !filter) {
        return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.available == filter["available"]);
    }
}
