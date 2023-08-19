import { Injectable } from '@nestjs/common';
import { Resource } from '../../../models/resource.model';
import {
  ResourceRequestDto,
  ResourceResponseDto,
} from '@morsof/bars-service-api';
@Injectable()
export class ResourcesDtoConverter {
  public toModel(resourceResponseDto: ResourceResponseDto): Resource {
    const {
      name,
      amount,
      type,
      receivingProbability,
      rarenessProbability,
      resources,
      extraArgs,
    } = resourceResponseDto;
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

  public toDto(resource: Resource): ResourceResponseDto {
    const {
      name,
      amount,
      type,
      receivingProbability,
      rarenessProbability,
      resources,
      extraArgs,
    } = resource;
    const resourceRequestDto = new ResourceRequestDto();
    resourceRequestDto.name = name;
    resourceRequestDto.amount = amount;
    resourceRequestDto.type = type;
    resourceRequestDto.receivingProbability = receivingProbability;
    resourceRequestDto.rarenessProbability = rarenessProbability;
    resourceRequestDto.resources = resources;
    resourceRequestDto.extraArgs = extraArgs;
    return resourceRequestDto;
  }
}
