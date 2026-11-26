import { Navigate, Route, Routes } from "react-router-dom"

import { ROUTES } from "./paths"
import Layout from "@/layouts/Layout"
import Home from "@/pages/Home/Home"
import Projects from "@/pages/Projects/Projects"
import About from "@/pages/About/About"
import Careers from "@/pages/Careers/Careers"
import Contact from "@/pages/Contact/Contact"
import ProjectDetail from "@/pages/ProjectDetail/ProjectDetail"
import TermsAndCondition from "@/pages/TermsAndConditions/TermsAndConditions"
import Privacy from "@/pages/Privacy/Privacy"
import Disclaimer from "@/pages/Disclaimer/Disclaimer"
import Locations from "@/pages/Locations/Locations"
import NotFound from "@/pages/NotFound/NotFound"
import Login from "@/pages/Login/Login"

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
                <Route path={`${ROUTES.PROJECTS}/:id`} element={<ProjectDetail />} />
                <Route path={ROUTES.ABOUT} element={<About />} />
                <Route path={ROUTES.CAREER} element={<Careers />} />
                <Route path={ROUTES.CONTACT} element={<Contact />} />
                <Route path={ROUTES.TERMS} element={<TermsAndCondition />} />
                <Route path={ROUTES.PRIVACY} element={<Privacy />} />
                <Route path={ROUTES.DISCLAIMER} element={<Disclaimer />} />
                <Route path={ROUTES.LOCATIONS} element={<Locations />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default MainRouter;