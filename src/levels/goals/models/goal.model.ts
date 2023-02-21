import { Resource } from '../../../resources/models/resource.model';

export class Goal {
  score: number;
  resources?: Resource[];

  constructor(partial: Partial<Goal>) {
    Object.assign(this, partial);
  }
}
