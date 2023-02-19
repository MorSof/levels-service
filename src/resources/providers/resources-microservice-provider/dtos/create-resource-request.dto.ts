export class CreateResourceRequestDto {
  ownerId: string;
  ownerType: string;
  type: string;
  name: string;
  amount: number;
  receivingProbability: number;
  rarenessProbability: number;
  extraArgs: Record<string, any>;
}
