import { Resource } from '../models/resource.model';

export class Bar {
  id: number;
  maxValue: number;
  name?: string;
  barIndex?: number;
  milestones?: Bar[];
  rewards?: Resource[];

  constructor(partial: Partial<Bar>) {
    Object.assign(this, partial);
  }
}
