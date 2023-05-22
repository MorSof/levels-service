import { Resource } from '../models/resource.model';
import { BadRequestException } from '@nestjs/common';

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
