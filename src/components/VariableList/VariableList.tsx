import { VariableEnv } from "./types";

type Props = {
  variables: VariableEnv[];
};

const VariableList = ({ variables }: Props) => {
  return (
    <div>
      <h3>Variables</h3>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {variables.map((variable, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
            >
              <td className="px-2 py-2">{variable.name}</td>
              <td>{variable.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VariableList;
