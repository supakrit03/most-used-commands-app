import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

const app = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default app;
