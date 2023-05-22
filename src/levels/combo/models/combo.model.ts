import { Bar } from '../../../bars/models/bar.model';

export class Combo {
  bars: Bar[];

  constructor(partial: Partial<Combo>) {
    Object.assign(this, partial);
  }
}
