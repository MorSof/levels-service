export class Playable {
  name: string;
  ttl: number;
  intractableTime: number;
  cooldown: number;
  vertices: number[];
  score: number;

  constructor(partial: Partial<Playable>) {
    Object.assign(this, partial);
  }
}
