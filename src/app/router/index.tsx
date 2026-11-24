import { Navigate, Route, Routes } from "react-router-dom"
import { ROUTES } from "./paths"
import Layout from "../../layouts/Layout"
import Home from "../../pages/Home/Home"
import Projects from "../../pages/Projects/Projects"

const MainRouter: React.FC = () => {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<Layout />}>
                <Route
                    index
                    element={<Navigate to={`/${ROUTES.HOMEPAGE}`} replace />}
                />
                <Route path={ROUTES.HOMEPAGE} element={<Home />} />
                <Route path={ROUTES.PROJECTS} element={<Projects />} />
            </Route>
        </Routes>
    )
}

export default MainRouter;