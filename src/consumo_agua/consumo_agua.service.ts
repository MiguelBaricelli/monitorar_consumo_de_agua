// src/consumo_agua/consumo_agua.service.ts

import { Injectable } from '@nestjs/common';
import { ConsumoAgua } from './consumo_agua_model';

@Injectable()
export class ConsumoAguaService {
  private consumos: ConsumoAgua[] = [];  // Armazenando os consumos na memória

  // Função para registrar o consumo
  registrarConsumo(consumo: ConsumoAgua): ConsumoAgua {
    consumo.id = this.consumos.length + 1;  // ID simples baseado no tamanho do array
    this.consumos.push(consumo);
    return consumo;  // Retorna o consumo completo, não apenas o ID
  
  }

  // Função para obter o histórico de consumo
  obterHistorico(usuarioId: number, dataInicio: Date, dataFim: Date): ConsumoAgua[] {
    return this.consumos.filter(
      (consumo) =>
        consumo.usuarioId === usuarioId &&
        new Date(consumo.dataLeitura) >= new Date(dataInicio) &&
        new Date(consumo.dataLeitura) <= new Date(dataFim),
    );
  }

  // Função para gerar alerta de consumo elevado
  gerarAlerta(usuarioId: number): string {
    const consumosUsuario = this.consumos.filter(consumo => consumo.usuarioId === usuarioId);
    if (consumosUsuario.length < 2) {
      return 'Não é possível comparar, menos de 2 meses registrados.';
    }
    const ultimoConsumo = consumosUsuario[consumosUsuario.length - 1];
    const penultimoConsumo = consumosUsuario[consumosUsuario.length - 2];

    if (ultimoConsumo.quantidade > penultimoConsumo.quantidade) {
      return `Alerta: Consumo elevado em relação ao mês anterior! Consumo atual: ${ultimoConsumo.quantidade}m³, mês anterior: ${penultimoConsumo.quantidade}m³.`;
    }

    return 'Consumo dentro dos padrões normais.';
  }
}
