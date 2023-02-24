export class GetResourcesRequestDto {
  ownerId: number;
  ownerType: string;

  constructor(partial: Partial<GetResourcesRequestDto>) {
    Object.assign(this, partial);
  }
}
