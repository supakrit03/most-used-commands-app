import { getFromLocalStorage } from "../services/statistic";

const Statistic = () => {
  return (
    <div>
      <pre>{JSON.stringify(getFromLocalStorage(), null, 2)}</pre>
    </div>
  );
};

export default Statistic;
