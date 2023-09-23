import { generateNewId } from "@/lib/utils";
import type { MenuType } from "@/types";

function setMenu(menus: MenuType[]): void {
  localStorage.setItem("menus", JSON.stringify(menus));
}

export function createMockInitialMenu(): MenuType[] {
  const initialMenus = [
    {
      ID: 39393,
      name: "Nasi Goreng",
      price: 20000,
    },
    {
      ID: 14141,
      name: "Nasi Goreng",
      price: 20000,
    },
  ];

  setMenu(initialMenus);
  return initialMenus;
}

export function createValidId(menus: MenuType[]): number {
  while (true) {
    const newId = generateNewId();
    const idExist = menus.some((menu) => {
      menu.ID === newId;
    });

    if (!idExist) {
      return newId;
    }
  }
}

export function getMenu(): MenuType[] {
  const menu = localStorage.getItem("menus");

  //   Check if menu doesn't exist in localStorage
  if (!menu) return createMockInitialMenu();

  return JSON.parse(menu) as MenuType[];
}

export function createMenu(menu: Omit<MenuType, "ID">): MenuType[] {
  const currentMenus = getMenu();
  const newId = createValidId(currentMenus);

  const newMenus: MenuType[] = [
    ...currentMenus,
    {
      ID: newId,
      name: menu.name,
      price: menu.price,
    },
  ];

  setMenu(newMenus);
  return newMenus;
}

export function deleteMenu(id: number): MenuType[] {
  const currentMenus = getMenu();
  const filteredMenu = currentMenus.filter((menu) => menu.ID !== id);

  setMenu(filteredMenu);
  return filteredMenu;
}
