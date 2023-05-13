import { Resource } from '../../../resources/models/resource.model';

export class Bar {
  score: number;
  resources?: Resource[];

  constructor(partial: Partial<Bar>) {
    Object.assign(this, partial);
  }
}
