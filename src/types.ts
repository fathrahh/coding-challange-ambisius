// Features Types
export type MenuType = {
  ID: number;
  name: string;
  price: number;
};

export type OrderType = Omit<MenuType, "price" | "name"> & { quantity: number };

export type OrderDTO = {
  tableID: number;
  order: OrderType;
};

export type OrderListType = {
  tableID: number;
  order: OrderType[];
};
