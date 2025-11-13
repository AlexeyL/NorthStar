import { useMemo } from "react";
import { routeAllItems } from "../constants/routeAllItems";
import { RouteItemType } from "../types/routeItemType.enum";

export const usePageRoutes = () => {
  return useMemo(
    () =>
      routeAllItems.flatMap((parentRoute) => {
        switch (parentRoute.type) {
          case RouteItemType.ROUTE_ONLY:
            return [
              {
                page: parentRoute.page,
                path: parentRoute.path,
                title: parentRoute.title,
                isPublic: parentRoute.isPublic,
                requiredRoles: parentRoute.requiredRoles,
                requiredPermissions: parentRoute.requiredPermissions,
              },
            ];
          case RouteItemType.MENU_HEADER:
            return [
              {
                page: parentRoute.page,
                path: parentRoute.path,
                title: parentRoute.title,
                isPublic: parentRoute.isPublic,
                requiredRoles: parentRoute.requiredRoles,
                requiredPermissions: parentRoute.requiredPermissions,
              },
            ];
          case RouteItemType.MENU_HEADER_WITH_CHILDREN:
            return parentRoute.children.map((route) => ({
              page: route.page,
              path: route.path,
              title: route.title,
              isPublic: route.isPublic,
              requiredRoles: route.requiredRoles,
              requiredPermissions: route.requiredPermissions,
            }));
        }
      }),
    []
  );
};
