import { createContext } from "react";
import "./styles.scss";

export interface ErrorContextProps {
  error: string;
  setError(error: string): void;
}

export const ErrorContext = createContext<ErrorContextProps>({
  error: "",
  setError: (d: string) => {},
});

export default function Error({ error }: { error: string }) {
  return (
    <div className="form-error">
      <p>{error}</p>
    </div>
  );
}
