import { OrderDTO, OrderListType } from "@/types";

export function getOrder(): OrderListType[] {
  const orders = localStorage.getItem("orders");

  //   Check if order doesn't exist in localStorage
  //   if null so create initial order in this case i produce order using empty array
  if (!orders) {
    const initialOrders: OrderListType[] = [];
    localStorage.setItem("orders", JSON.stringify(initialOrders));
    return initialOrders;
  }

  return JSON.parse(orders) as OrderListType[];
}

export function createOrder(orderDTO: OrderDTO): void {
  const currentOrders = getOrder();

  const idxMenu = currentOrders.findIndex(
    (order) => order.tableID === orderDTO.tableID
  );

  if (idxMenu === -1) {
    return localStorage.setItem(
      "orders",
      JSON.stringify([
        ...currentOrders,
        {
          tableID: orderDTO.tableID,
          order: [orderDTO.order],
        },
      ] as OrderListType[])
    );
  }

  currentOrders[idxMenu].order.push(orderDTO.order);
  localStorage.setItem("orders", JSON.stringify(currentOrders));
}

export function clearOrder(id: number): OrderListType[] {
  const currentOrders = getOrder();
  const filteredMenu = currentOrders.filter((menu) => menu.tableID !== id);

  localStorage.setItem("orders", JSON.stringify(filteredMenu));

  return filteredMenu;
}
