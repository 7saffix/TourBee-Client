import type { ISidebarItem } from "@/types";

export const generateRoute = (sidebarItem: ISidebarItem[]) => {
  return sidebarItem.flatMap((section) =>
    section.items.map((item) => ({
      path: item.url,
      Component: item.component,
    }))
  );
};
