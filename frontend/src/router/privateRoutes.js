import { Navigate } from "react-router-dom";
import BaseLayout from "../layout/base-layout";
import { useAuthContext } from "../hooks/useAuthContext";
import Loading from "../pages/Loading";

const PrivateRoute = () => {
    const { user, loading } = useAuthContext();

    if (loading) {
        return <Loading />
    }

    if (user) {
        return <BaseLayout />
    }
    else {
        return <Navigate to="/login" />
    }
}

export default PrivateRoute;