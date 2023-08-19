import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Bar } from '../../models/bar.model';
import { BarsDtoConverter } from './convertes/bars-dto.converter';
import { BarsProvider } from '../bars-provider.service';
import { BarsApi } from '@morsof/bars-service-api';

@Injectable()
export class BarsMicroserviceProvider extends BarsProvider {
  constructor(
    @Inject('BarsApi') private readonly resourcesApi: BarsApi,
    private readonly barsDtoConverter: BarsDtoConverter,
  ) {
    super();
  }

  async fetchBarsByName(name: string): Promise<Bar[]> {
    return (await this.resourcesApi.v1BarsGet(name)).map((dto) => {
      return this.barsDtoConverter.toModel(dto);
    });
  }

  async createBar(bar: Bar): Promise<Bar> {
    const body = this.barsDtoConverter.toDto(bar);
    const barResponseDto = await this.resourcesApi
      .v1BarsPost(body)
      .catch((error: { code: number }) => {
        if (
          error.code === HttpStatus.BAD_REQUEST ||
          error.code === HttpStatus.CONFLICT
        ) {
          throw new BadRequestException(error);
        }
        throw new Error(`Failed to create bar: ${error}`);
      });
    return this.barsDtoConverter.toModel(barResponseDto);
  }
}
