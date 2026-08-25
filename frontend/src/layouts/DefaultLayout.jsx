import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

export function DefaultLayout() {
    return (
        <div className="page__content">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}