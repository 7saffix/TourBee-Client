import Analytic from "@/pages/Admin/Analytic";
import type { ISidebarItem } from "@/types";
import TourType from "@/pages/Admin/TourType";
import Tour from "@/pages/Admin/Tour";
import Division from "@/pages/Admin/Division";

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
        component: Tour,
      },
      {
        title: "Tour Type",
        url: "/admin/add-tour-type",
        component: TourType,
      },
      {
        title: "Division",
        url: "/admin/add-division",
        component: Division,
      },
    ],
  },
];
