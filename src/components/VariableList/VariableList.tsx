import { VariableEnv } from "./types";

type Props = {
  variables: VariableEnv[];
};

const VariableList = ({ variables }: Props) => {
  return (
    <div>
      <h3>Variables</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {variables.map((variable, index) => (
            <tr key={index}>
              <td>{variable.name}</td>
              <td>{variable.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VariableList;
