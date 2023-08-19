export class LevelOwnerProgression {
  id?: number;
  ownerType: string;
  ownerId: string;
  levelOrder: number;
  score: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(partial: Partial<LevelOwnerProgression>) {
    Object.assign(this, partial);
  }
}
