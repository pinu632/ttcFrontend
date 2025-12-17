import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { setUser } from "@/store/Slices/authSlice";
import api from "@/Axios/axiosInstance";

export default function ProtectedRoute({ allowedRoles }: { allowedRoles: string[] }) {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    console.log(allowedRoles)
    console.log(user?.role)


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setLoading(false);
                return;
            }

            if (user) {
                setLoading(false);
                return;
            }

            try {
                const res = await api.get("/auth/getUser");
                dispatch(setUser(res.data.user));
            } catch (err) {
                console.error("Failed to load user:", err);
            }

            setLoading(false);
        };

        loadUser();
    }, []);

    if (loading) return null;

   

   
    const skipRoleCheck = allowedRoles.includes("generalUser");

    if (!skipRoleCheck &&
        !user.role.some((role: string) => allowedRoles.includes(role))) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}
