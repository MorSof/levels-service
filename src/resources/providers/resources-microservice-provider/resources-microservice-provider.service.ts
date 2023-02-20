import { Inject, Injectable } from '@nestjs/common';
import { ResourcesProvider } from '../resources-provider.service';
import { Resource } from '../../models/resource.model';
import { HttpService } from '@nestjs/axios';
import { ResourceResponseDto } from './dtos/resource-response.dto';
import { ResourceType } from '../../models/resourceTypes.enum';
import { firstValueFrom } from 'rxjs';
import { CurrencyNamesEnum } from '../../models/currencyNamesEnum';
import { CreateResourceRequestDto } from './dtos/create-resource-request.dto';

@Injectable()
export class ResourcesMicroserviceProvider extends ResourcesProvider {
  private readonly CREATE_RESOURCE_PATH: string = '/v1/resources';

  constructor(
    @Inject('RESOURCES_BASE_URL') private readonly RESOURCES_BASE_URL: string,
    private readonly httpService: HttpService,
  ) {
    super();
  }

  async createResources(
    resources: Resource[],
    levelId: number,
  ): Promise<Resource[]> {
    const body: CreateResourceRequestDto[] = resources.map((resource) => {
      const { type, name, amount, receivingProbability, rarenessProbability } =
        resource;
      return new CreateResourceRequestDto({
        ownerId: levelId,
        ownerType: 'LEVEL',
        type,
        name,
        amount,
        receivingProbability,
        rarenessProbability,
      });
    });

    const { data } = await firstValueFrom(
      this.httpService.post<ResourceResponseDto[]>(
        `${this.RESOURCES_BASE_URL}${this.CREATE_RESOURCE_PATH}`,
        body,
      ),
    );
    return data.map(
      (dto) =>
        new Resource({
          id: dto.id,
          type: ResourceType[dto.type.toUpperCase()],
          name: CurrencyNamesEnum[dto.name.toUpperCase()],
          amount: dto.amount,
          receivingProbability: dto.receivingProbability,
          rarenessProbability: dto.rarenessProbability,
        }),
    );
  }

  async getResourcesByLevelId(levelId: number): Promise<Resource[]> {
    return undefined;
  }
}
