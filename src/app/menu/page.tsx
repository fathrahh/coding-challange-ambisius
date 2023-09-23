"use client";

import { FormEvent, useEffect, useState } from "react";
import { Icon } from "@/lib/IconifyClient";

import Button from "@/components/Button";
import TextField from "@/components/Textfield";
import { MenuType } from "@/types";
import { createMenu, deleteMenu, getMenu } from "@/features/menu";
import { ToastContainer, toast } from "react-toastify";

export default function MenuPage() {
  const [newMenu, setNewMenu] = useState({
    name: "",
    price: "",
  });
  const [menus, setMenu] = useState<MenuType[]>([]);

  useEffect(() => {
    setMenu(getMenu());
  }, []);

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMenu(
      createMenu({
        name: newMenu.name,
        price: parseInt(newMenu.price),
      })
    );

    toast.success("New Menu Is Created !!!");
  };

  const onChangeMenu = <K extends keyof typeof newMenu>(
    key: K,
    newData: (typeof newMenu)[K]
  ) => {
    setNewMenu((prev) => ({
      ...prev,
      [key]: newData,
    }));
  };

  const onClickDeleteIcon = (id: number) => {
    setMenu(deleteMenu(id));

    toast.success(`Menu with id ${id} have been deleted`);
  };

  return (
    <section className="">
      <form className="grid lg:flex gap-2" onSubmit={handleSubmitForm}>
        <TextField
          onChange={(event) => onChangeMenu("name", event.target.value)}
          placeholder="Nama Product"
          value={newMenu.name}
          type="text"
        />
        <TextField
          leading={<span className="font-semibold text-gray-200">Rp.</span>}
          onChange={(event) => onChangeMenu("price", event.target.value)}
          placeholder="Harga Menu"
          value={newMenu.price}
          type="number"
          pattern="[0-9]+"
        />
        <Button disabled={!newMenu.name} className="ml-auto">
          Tambah
        </Button>
      </form>

      <div className="mt-8">
        <table className="[&_tr]:border-b-[1px] [&_tr]:border-gray-200 [&_tr]:py-4 w-full [&_th]:text-start [&_th]:font-medium [&_th]:text-gray-500 text-base">
          <thead>
            <tr className="">
              <th>ID</th>
              <th>Menu</th>
              <th>Harga</th>
              <th>Hapus?</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr className="[&_td]:pt-4" key={menu.ID}>
                <td>{menu.ID}</td>
                <td>{menu.name}</td>
                <td>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(menu.price)}
                </td>
                <td className="flex justify-center text-lg text-red-500">
                  <Icon
                    icon={"tabler:trash"}
                    className="cursor-pointer"
                    onClick={() => onClickDeleteIcon(menu.ID)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </section>
  );
}
