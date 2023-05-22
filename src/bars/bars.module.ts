import { Module } from '@nestjs/common';
import { BarsMicroserviceProviderModule } from './providers/bars-microservice-provider/bars-microservice-provider.module';
import { BarsService } from './services/bars.service';
import { BarsDtoConverter } from './convertes/bars-dto.converter';
import { ResourcesDtoConverter } from './convertes/resources-dto.converter';

@Module({
  imports: [BarsMicroserviceProviderModule],
  providers: [BarsService, BarsDtoConverter, ResourcesDtoConverter],
  exports: [BarsService, BarsDtoConverter, ResourcesDtoConverter],
})
export class BarsModule {}
