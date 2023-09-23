"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "@/components/Button";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectTrigger,
} from "@/components/Select";

import type { MenuType, OrderListType, OrderType } from "@/types";
import { clearOrder, getOrder } from "@/features/order";
import { getMenu } from "@/features/menu";
import { ToastContainer, toast } from "react-toastify";

export default function KasirPage() {
  const [menus, setMenus] = useState<MenuType[]>([]);
  const [ordered, setOrdered] = useState<OrderListType[]>([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderListType | null>();

  const handleDelete = () => {
    if (!selectedOrder) return;

    setOrdered(clearOrder(parseInt(selectedTable)));
    setSelectedTable("");
    setSelectedOrder(null);
    toast.success(`Success Cleaning Table ${selectedTable}`);
  };

  const selectContent = () => {
    if (!selectedTable) return;

    const selectOrder = ordered.filter(
      (order) => order.tableID === parseInt(selectedTable)
    );
    if (selectOrder.length === 0) {
      return null;
    }

    setSelectedOrder(selectOrder[0]);
  };

  const tableContent = useMemo(() => {
    if (!selectedOrder) return null;

    const { order } = selectedOrder;

    let totalPrice = 0;

    const displayedMenu = order.map((o) => {
      const selectedMenu = menus.filter((menu) => menu.ID === o.ID);
      if (selectedMenu.length === 0) return;

      const { price, name } = selectedMenu[0];
      const calcPrice = price * o.quantity;

      totalPrice += calcPrice;

      return { price, name, quantity: o.quantity, totalPrice: calcPrice };
    });

    return { displayedMenu, totalPrice };
  }, [selectedOrder, menus]);

  useEffect(() => {
    setOrdered(getOrder());
    setMenus(getMenu());
  }, []);

  return (
    <section>
      <label htmlFor="">Meja</label>
      <div className="flex flex-col sm:flex-row gap-2 mt-2">
        <Select
          value={selectedTable}
          onValueChange={(value) => setSelectedTable(value)}
        >
          <SelectTrigger className="w-full sm:max-w-[190px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem disabled value="">
              Nomor Meja
            </SelectItem>
            {ordered.map((order) => (
              <SelectItem key={order.tableID} value={order.tableID.toString()}>
                {order.tableID}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex flex-1 mt-4 sm:mt-0">
          <Button onClick={() => selectContent()} size="sm">
            Print struk
          </Button>
          {selectedTable && (
            <Button
              onClick={handleDelete}
              size="md"
              variant={"danger"}
              className="sm:ml-auto"
            >
              Kosongkan meja
            </Button>
          )}
        </div>
      </div>

      {tableContent && (
        <div className="mt-4">
          <table className="[&_tr]:border-b-2 [&_tr]:border-gray-200 [&_td]:py-2 w-full [&_th]:text-start [&_th]:font-medium [&_th]:text-gray-500 text-base">
            <thead>
              <tr className="">
                <th>Jumlah</th>
                <th>Menu</th>
                <th>Harga</th>
              </tr>
            </thead>
            <tbody>
              {tableContent.displayedMenu.map((menu, idx) => {
                if (!menu) return;
                return (
                  <tr className="[&_td]:pt-4" key={idx}>
                    <td>{menu.quantity}</td>
                    <td>{menu.name}</td>
                    <td>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(menu.totalPrice)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="border-t-[1px] border-t-gray-200">
              <tr>
                <td className="py-8 text-center" colSpan={2}>
                  Total
                </td>
                <td>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(tableContent.totalPrice)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
      <ToastContainer />
    </section>
  );
}
