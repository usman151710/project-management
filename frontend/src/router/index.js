import { Route, Routes } from "react-router-dom"
import PrivateRoute from "./privateRoutes"
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProjectForm from "../pages/ProjectForm";
import CurrentProjects from "../pages/CurrentProjects";
import ArchivedProjects from "../pages/ArchivedProjects";
import CompletedProjects from "../pages/CompletedProjects";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
    return (
        <Routes>
            <Route
                path="/login"
                element={<Login />}
            />
            <Route
                path="/signup"
                element={<Signup />}
            />
            <Route
                path="/"
                element={<PrivateRoute />}
            >
                <Route path='/dashboard/projects/create' element={<ProjectForm />} />
                <Route path='/dashboard/projects/all' element={<CurrentProjects />} />
                <Route path='/dashboard/projects/archived' element={<ArchivedProjects />} />
                <Route path='/dashboard/projects/completed' element={<CompletedProjects />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRouter;