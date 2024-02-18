import { Outlet } from "react-router-dom";

type Props = {};

const Layout = (props: Props) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
