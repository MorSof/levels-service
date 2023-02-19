export class ResourceResponseDto {
  id: number;
  ownerId: string;
  ownerType: string;
  type: string;
  name: string;
  amount: number;
  receivingProbability: number;
  rarenessProbability: number;
  extraArgs: object;
  updatedAt: Date;
  createdAt: Date;

  constructor(partial: Partial<ResourceResponseDto>) {
    Object.assign(this, partial);
  }
}
