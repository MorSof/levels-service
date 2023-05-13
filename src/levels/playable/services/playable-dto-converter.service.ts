import { Injectable } from '@nestjs/common';
import { Playable } from '../models/playable.model';
import { PlayableRequestDto } from '../dtos/playable-request.dto';
import { PlayableResponseDto } from '../dtos/playable-response.dto';

@Injectable()
export class PlayableDtoConverter {
  public convertFrom(playableRequestDto: PlayableRequestDto): Playable {
    const { name, ttl, interactableTime, cooldown, vertices, score } =
      playableRequestDto;
    return new Playable({
      name,
      ttl,
      interactableTime,
      cooldown,
      vertices,
      score,
    });
  }

  public convertTo(playable: Playable): PlayableResponseDto {
    const { name, ttl, interactableTime, cooldown, vertices, score } = playable;
    return new PlayableResponseDto({
      name,
      ttl,
      interactableTime,
      cooldown,
      vertices,
      score,
    });
  }
}
