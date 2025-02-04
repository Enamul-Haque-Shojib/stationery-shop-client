import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";
import ShopFooter from "../components/shared/footer/ShopFooter";





const MainLayout = () => {
   
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <ShopFooter></ShopFooter>
        </div>

    );
};

export default MainLayout;