// src/consumo_agua/consumo_agua.controller.ts

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ConsumoAguaService } from './consumo_agua.service';
import { ConsumoAgua } from './consumo_agua_model';

@Controller('consumo_agua')  // A base da URL é '/consumo_agua'
export class ConsumoAguaController {
  constructor(private readonly consumoAguaService: ConsumoAguaService) {}

  @Post('registrar')  
  registrarConsumo(@Body() consumo: ConsumoAgua): ConsumoAgua {
    return this.consumoAguaService.registrarConsumo(consumo);
  }

  // Rota GET para obter o histórico de consumo
  @Get('historico')
  obterHistorico(
    @Query('usuarioId') usuarioId: number,
    @Query('dataInicio') dataInicio: string,
    @Query('dataFim') dataFim: string,
  ) {
    return this.consumoAguaService.obterHistorico(
      usuarioId,
      new Date(dataInicio),
      new Date(dataFim),
    );
  }

  // Rota GET para gerar alerta de consumo elevado
  @Get('alerta/:usuarioId')
  gerarAlerta(@Param('usuarioId') usuarioId: number): string {
    return this.consumoAguaService.gerarAlerta(usuarioId);
  }
}
