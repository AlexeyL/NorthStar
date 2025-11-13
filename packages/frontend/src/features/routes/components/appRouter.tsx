
import { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { usePageRoutes } from "../hooks/usePageRoutes";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
    const allRoutes = usePageRoutes();

    const routes = useMemo(() => allRoutes.map((route) =>
        <Route
            key={route.path}
            path={route.path}
            element={
                <ProtectedRoute
                    isPublic={route.isPublic}
                    requiredRoles={route.requiredRoles}
                    requiredPermissions={route.requiredPermissions}
                >
                    <route.page />
                </ProtectedRoute>
            }
        />
    ), [allRoutes]);

    return (
        <Routes>
            {routes}
        </Routes>
    )
}