import { Module } from '@nestjs/common';
import { ComboDtoConverter } from './services/combo-dto.converter';
import { BarsModule } from '../../bars/bars.module';
import { BarsDtoConverter } from '../../bars/providers/bars-microservice-provider/convertes/bars-dto.converter';

@Module({
  imports: [BarsModule],
  providers: [ComboDtoConverter],
  exports: [ComboDtoConverter],
})
export class ComboModule {}
