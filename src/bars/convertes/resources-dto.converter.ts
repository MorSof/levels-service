import { Injectable } from '@nestjs/common';
import { Resource } from '../models/resource.model';
import { BaseResourceRequestDto, ResourceResponseDto } from '../../api/build';

@Injectable()
export class ResourcesDtoConverter {
  public convertFrom(resourceRequestDto: BaseResourceRequestDto): Resource {
    const {
      name,
      amount,
      type,
      receivingProbability,
      rarenessProbability,
      resources,
      extraArgs,
    } = resourceRequestDto;
    return new Resource({
      name,
      amount,
      type,
      receivingProbability,
      rarenessProbability,
      resources,
      extraArgs,
    });
  }

  public convertTo(resource: Resource): ResourceResponseDto {
    const resourceResponseDto = new ResourceResponseDto();
    resourceResponseDto.name = resource.name;
    resourceResponseDto.amount = resource.amount;
    resourceResponseDto.type = resource.type;
    resourceResponseDto.receivingProbability = resource.receivingProbability;
    resourceResponseDto.rarenessProbability = resource.rarenessProbability;
    resourceResponseDto.resources = resource.resources;
    resourceResponseDto.extraArgs = resource.extraArgs;
    return resourceResponseDto;
  }
}
