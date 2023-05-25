export class Resource {
  id: number;
  groupId?: string;
  type: string;
  name: string;
  amount?: number;
  receivingProbability?: number;
  rarenessProbability?: number;
  resources?: any;
  extraArgs?: any;

  constructor(partial: Partial<Resource>) {
    Object.assign(this, partial);
  }
}
