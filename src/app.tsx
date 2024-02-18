import { HashRouter } from "react-router-dom";
import Routes from "./Routes";

const app = () => {
  return (
    <HashRouter>
      <Routes />
    </HashRouter>
  );
};

export default app;
