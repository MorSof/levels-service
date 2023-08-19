import { Injectable } from '@nestjs/common';
import { Playable } from '../models/playable.model';
import { PlayableRequestDto, PlayableResponseDto } from '../../../api/build';

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
    const playableResponseDto = new PlayableResponseDto();
    playableResponseDto.name = playable.name;
    playableResponseDto.ttl = playable.ttl;
    playableResponseDto.interactableTime = playable.interactableTime;
    playableResponseDto.cooldown = playable.cooldown;
    playableResponseDto.vertices = playable.vertices;
    playableResponseDto.score = playable.score;
    return playableResponseDto;
  }
}
