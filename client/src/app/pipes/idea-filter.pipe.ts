import { Pipe, PipeTransform } from '@angular/core';
import * as Fuse from 'fuse.js';
import { Idea } from '../models/idea.model';
import { typePropertyIsNotAllowedMsg } from '@ngrx/store/src/models';

@Pipe({
  name: 'ideaFilter'
})
export class IdeaFilterPipe implements PipeTransform {

  transform(value: Idea[], searchString: string): any {

    // if no search tags are choosen return the whole person array
    if (searchString.length === 0 || searchString === undefined) {
      return value;
    }

    // use fuse.js for searching
    const options: Fuse.FuseOptions<Idea> = {
      shouldSort: true,
      tokenize: true,
      findAllMatches: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 3,

      // ToDo: get all properties of a idea object with Object.keys(value[0])
      keys: ['title', 'businessIdea', 'usp', 'customers', 'businessModel', 'competitors', 'team', 'marketBarriers']
    };
    const fuse = new Fuse(value, options);

    const results = fuse.search(searchString.trim().toLowerCase());

    console.log(results);

    return results;
  }

}
