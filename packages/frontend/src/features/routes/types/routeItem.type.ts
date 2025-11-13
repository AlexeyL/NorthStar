import type { Icon, IconProps } from "@tabler/icons-react";
import type { RouteChildItem } from "./routeChildItem.type";
import { RouteItemType } from "./routeItemType.enum";

export type RouteItem =
  | {
      type: RouteItemType.ROUTE_ONLY;
      title: string;
      path: string;
      description?: string;
      page: React.FC;
      isPublic: boolean;
      requiredRoles?: string[];
      requiredPermissions?: string[];
    }
  | {
      type: RouteItemType.MENU_HEADER;
      title: string;
      description?: string;
      icon: React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<Icon>
      >;
      path: string;
      page: React.FC;
      isPublic: boolean;
      requiredRoles?: string[];
      requiredPermissions?: string[];
    }
  | {
      type: RouteItemType.MENU_HEADER_WITH_CHILDREN;
      title: string;
      icon: React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<Icon>
      >;
      description?: string;
      children: RouteChildItem[];
    };
