
import NavBar from "../Components/NavBar";
import { Outlet } from "react-router-dom";
const LayoutPage = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default LayoutPage;
