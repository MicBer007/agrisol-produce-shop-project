import { OrderModel } from "./order";
import { OrderStatus } from "./order-status";

export class SimplifiedOrder{
   id!: string;
   orderProducts!: SimplifiedOrderProduct[];
   value!: number;
   status!: OrderStatus;


}

export class SimplifiedOrderProduct{
   productName!: string;
   quantity!: number;
}

export function ToSimplifiedOrder(order: OrderModel): SimplifiedOrder {
   if(order.id == undefined) console.error("ID cannot be undefined when creating a simplified order!");

   var value = 0;
   var orderProducts: SimplifiedOrderProduct[] = [];
   order.orderProducts.forEach(oP => {
      if(oP.product == undefined) console.error("Product cannot be undefined when creating a simplified order!");
      var product = oP.product!;
      orderProducts.push({productName: product.name, quantity: oP.quantity});
      value += oP.quantity * product.price;
   });

   var simplifiedOrder: SimplifiedOrder = {
      id: order.id!,
      orderProducts,
      value: value,
      status: order.status
   }
   return simplifiedOrder;
}