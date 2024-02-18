import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Statistic from "./pages/Statistic";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="statistic" element={<Statistic />} />
        <Route path="*" element={<>No match page</>} />
      </Route>
    </Routes>
  );
};

export default RoutesComponent;
