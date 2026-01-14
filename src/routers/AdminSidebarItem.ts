import Analytic from "@/pages/Admin/Analytic";
import type { ISidebarItem } from "@/types";
import TourList from "@/pages/Admin/TourList";
import DivisionList from "@/pages/Admin/DivisionList";
import TourTypeList from "@/pages/Admin/TourTypeList";

export const AdminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytic",
        url: "/admin/analytic",
        component: Analytic,
      },
    ],
  },
  {
    title: "Tour Management",
    items: [
      {
        title: "Tour",
        url: "/admin/add-tour",
        component: TourList,
      },
      {
        title: "Tour Type",
        url: "/admin/add-tour-type",
        component: TourTypeList,
      },
      {
        title: "Division",
        url: "/admin/add-division",
        component: DivisionList,
      },
    ],
  },
];
