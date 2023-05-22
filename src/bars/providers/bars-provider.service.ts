import { Bar } from '../models/bar.model';

export abstract class BarsProvider {
  abstract createBar(bar: Bar): Promise<Bar>;

  abstract fetchBarsByName(name: string): Promise<Bar[]>;
}
