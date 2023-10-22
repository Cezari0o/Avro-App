export default interface Reserva {
  id_pedido: number;
  horario: Date;
  quant_pessoas: number;
  numero_mesa: number;
  cliente: string;
  descricao_adicional: null | string;
}
