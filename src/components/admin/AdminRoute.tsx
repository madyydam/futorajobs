import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface AdminRouteProps {
    children: React.ReactNode;
    requiredRole?: 'super_admin' | 'content_admin' | 'hiring_admin';
}

export function AdminRoute({ children, requiredRole }: AdminRouteProps) {
    const { user, loading, role, isAdmin } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    // Not logged in or NOT an admin
    if (!user || !isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    // If a specific role is required, check it (Super Admin can see everything)
    if (requiredRole && role !== 'super_admin' && role !== requiredRole) {
        return <Navigate to="/admin" replace />;
    }

    return <>{children}</>;
}
