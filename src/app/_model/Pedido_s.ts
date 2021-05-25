import { DetallePedido } from './DetallePedido';
export class Pedidos_s{
    Id_pedido: number;
    Cliente_id: number;
    Fecha : any;
    Estado_id: number;
    Valor_total : number;
    Domiciliario_id : number;
    Comentario_cliente : string;
    Comentario_aliado : string;
    Aliado_id : number;
    Estado_pedido :number;
    Estado_domicilio_id : number;
    Compras : DetallePedido;
    Compras1 : DetallePedido;
    Detnombrecliente : string;
    Nombre_estado_ped : string;
    Nombre_estado_domicilio : string;
    Det_valor_unitario : number;
    Det_cantidad : number;
    Nombre_aliado : string;
    Direccion_aliado : string;
    Nombre_cliente : string;
    Direccion_cliente : string;
    Telefono_cliente : string;

}