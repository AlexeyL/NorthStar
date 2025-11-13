import { useMemo } from "react";
import { routeAllItems } from "../constants/routeAllItems";
import type { RouteItem } from "../types/routeItem.type";
import { RouteItemType } from "../types/routeItemType.enum";

const filter: RouteItem["type"][] = [
  RouteItemType.MENU_HEADER,
  RouteItemType.MENU_HEADER_WITH_CHILDREN,
];

export const useMenuRoutes = () => {
  return useMemo(
    () => routeAllItems.filter((s) => filter.includes(s.type)),
    []
  );
};
