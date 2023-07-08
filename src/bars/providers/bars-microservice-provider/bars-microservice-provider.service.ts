import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Bar } from '../../models/bar.model';
import { BarsDtoConverter } from './convertes/bars-dto.converter';
import { BarResponseDto } from './dtos/bar-response.dto';
import { BarsProvider } from '../bars-provider.service';
import { AxiosError } from 'axios';

@Injectable()
export class BarsMicroserviceProvider extends BarsProvider {
  private readonly CREATE_BAR_PATH: string = '/v1/bars';
  private readonly FETCH_BAR_PATH: string = '/v1/bars';

  constructor(
    @Inject('BARS_BASE_URL') private readonly BARS_BASE_URL: string,
    private readonly httpService: HttpService,
    private readonly barsDtoConverter: BarsDtoConverter,
  ) {
    super();
  }

  async fetchBarsByName(name: string): Promise<Bar[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<BarResponseDto[]>(`${this.BARS_BASE_URL}${this.FETCH_BAR_PATH}`, {
          params: { name },
        })
        .pipe(
          catchError((error) => {
            throw new Error(`Failed to fetch bars by name: ${error.message}`);
          }),
        ),
    );
    return data.map((barDto) => this.barsDtoConverter.toModel(barDto));
  }

  async createBar(bar: Bar): Promise<Bar> {
    const body = this.barsDtoConverter.toDto(bar);
    const { data } = await firstValueFrom(
      this.httpService
        .post<BarResponseDto>(
          `${this.BARS_BASE_URL}${this.CREATE_BAR_PATH}`,
          body,
        )
        .pipe(
          catchError((error: AxiosError) => {
            if (
              error.response?.status === HttpStatus.BAD_REQUEST ||
              error.response?.status === HttpStatus.CONFLICT
            ) {
              throw new BadRequestException(error.response?.data);
            }
            throw new Error(`Failed to create bar: ${error.message}`);
          }),
        ),
    );
    return this.barsDtoConverter.toModel(data);
  }
}
