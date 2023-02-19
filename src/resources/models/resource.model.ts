import { ResourceType } from './resourceTypes.enum';
import { CurrencyNamesEnum } from './currencyNamesEnum';
import { BoosterNamesEnum } from './boosterNamesEnum';

export class Resource {
  id?: number;
  type?: ResourceType;
  name?: CurrencyNamesEnum | BoosterNamesEnum;
  amount?: number;
  receivingProbability?: number;
  rarenessProbability?: number;
  extraArgs?: any;

  constructor(partial: Partial<Resource>) {
    Object.assign(this, partial);
  }
}
