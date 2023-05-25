export class CreateResourceRequestDto {
  ownerId: number;
  ownerType: string;
  type: string;
  name: string;
  groupId: string;
  amount?: number;
  receivingProbability: number;
  rarenessProbability: number;
  resources: any;
  extraArgs: Record<string, any>;

  constructor(partial: Partial<CreateResourceRequestDto>) {
    Object.assign(this, partial);
  }
}
