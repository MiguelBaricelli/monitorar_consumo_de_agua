// src/consumo_agua/consumo_agua.module.ts

import { Module } from '@nestjs/common';
import { ConsumoAguaController } from './consumo_agua.controller';
import { ConsumoAguaService } from './consumo_agua.service';

@Module({
  controllers: [ConsumoAguaController],  // O controlador
  providers: [ConsumoAguaService],      // O serviço
})
export class ConsumoAguaModule {}
