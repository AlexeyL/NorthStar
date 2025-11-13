import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";
import UnauthorizedPage from "@pages/UnauthorizedPage";
import type { RouteItem } from "../types/routeItem.type";
import { RouteItemType } from "../types/routeItemType.enum";

export const routeOnlyItems: RouteItem[] = [
  {
    type: RouteItemType.ROUTE_ONLY,
    title: "Login",
    path: "login",
    page: LoginPage,
    isPublic: true,
  },
  {
    type: RouteItemType.ROUTE_ONLY,
    title: "Register",
    path: "register",
    page: RegisterPage,
    isPublic: true,
  },
  {
    type: RouteItemType.ROUTE_ONLY,
    title: "Unauthorized",
    path: "unauthorized",
    page: UnauthorizedPage,
    isPublic: true,
  },

  // // Fallback routes
  // { type: RouteItemType.ROUTE_ONLY, title: "notFound", path: "not-found", page: NotFoundPage, isPublic: true },
  // { type: RouteItemType.ROUTE_ONLY, title: "notFound", path: "*", page: NotFoundPage, isPublic: true },
];
