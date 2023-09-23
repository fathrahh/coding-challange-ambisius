"use client";
import { useCallback, useEffect, useState } from "react";
import { tables } from "@/constants";
import { MenuType, OrderListType } from "@/types";
import { getOrder } from "@/features/order";
import { getMenu } from "@/features/menu";

export default function DapurPage() {
  const [menus, setMenus] = useState<MenuType[]>([]);
  const [orders, setOrders] = useState<OrderListType[]>([]);

  useEffect(() => {
    setOrders(getOrder());
    setMenus(getMenu());
  }, []);

  const getMenuById = useCallback(
    (id: number): MenuType | null => {
      const menu = menus.filter((menu) => menu.ID === id);

      if (menu.length === 0) return null;
      return menu[0];
    },
    [menus]
  );

  return (
    <section className="grid grid-cols-12">
      {tables.map((table) => (
        <div key={table.id} className="col-span-4">
          <h4 className="font-semibold text-xl">{table.name}</h4>
          {orders.map((order) => {
            if (order.tableID !== table.id) return;
            return (
              <ul key={order.tableID} className="mt-8">
                {order.order.map((o, idx) => {
                  const menu = getMenuById(o.ID);
                  if (!menu) return;
                  return (
                    <li key={idx}>
                      {o.quantity}x {menu.name}
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>
      ))}
    </section>
  );
}
