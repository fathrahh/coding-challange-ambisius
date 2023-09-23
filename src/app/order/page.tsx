"use client";
import { useState, useEffect } from "react";

import Button from "@/components/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import { tables } from "@/constants";
import { getMenu } from "@/features/menu";
import { MenuType } from "@/types";
import { createOrder } from "@/features/order";

import { ToastContainer, toast } from "react-toastify";

export default function OrderPage() {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [menus, setMenus] = useState<MenuType[]>([]);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    setMenus(getMenu());
  }, []);

  return (
    <section>
      <div className="grid grid-cols-12">
        {tables.map((table) => (
          <Button
            key={table.id}
            variant={selectedTable === table.id ? "neutral" : "light"}
            size={"fill"}
            className="col-span-4"
            onClick={() => {
              if (selectedTable === table.id) {
                return setSelectedTable(null);
              }
              setSelectedTable(table.id);
            }}
          >
            {table.name}
          </Button>
        ))}
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          if (!selectedTable || !selectedMenu || !quantity) {
            return;
          }

          createOrder({
            tableID: selectedTable,
            order: {
              ID: parseInt(selectedMenu),
              quantity: parseInt(quantity),
            },
          });

          toast.success("New Order Is Created !!!");
          setSelectedTable(null);
          setSelectedMenu("");
          setQuantity("");
        }}
      >
        <fieldset className="grid grid-cols-12 gap-2 mt-6">
          <div className="col-span-8">
            <label htmlFor=""></label>
            <Select
              value={selectedMenu}
              onValueChange={(value) => setSelectedMenu(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem disabled value={""}>
                  Menu
                </SelectItem>
                {menus.map((menu) => (
                  <SelectItem key={menu.ID} value={menu.ID.toString()}>
                    {menu.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-4">
            <div>
              <label htmlFor=""></label>
              <Select
                onValueChange={(value) => setQuantity(value)}
                value={quantity}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Quantity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem disabled value="">
                    Quantity
                  </SelectItem>
                  {new Array(3).fill(null).map((_, idx) => (
                    <SelectItem key={idx} value={(idx + 1).toString()}>
                      {idx + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              disabled={!quantity || !selectedMenu || !selectedTable}
              className="mt-2 flex ml-auto"
              size={"sm"}
            >
              Order
            </Button>
          </div>
        </fieldset>
      </form>
      <ToastContainer />
    </section>
  );
}
