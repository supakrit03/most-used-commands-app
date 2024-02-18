import { getFromLocalStorage } from "../services/statistic";

type Props = {};

const Statistic = (props: Props) => {
  return (
    <div>
      <pre>{JSON.stringify(getFromLocalStorage(), null, 2)}</pre>
    </div>
  );
};

export default Statistic;
