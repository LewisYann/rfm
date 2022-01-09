import {useState} from "react";
import {toaster} from "evergreen-ui";

type AsyncHook<T> = {
  execute: (...args) => Promise<T>;
  loading: boolean;
  value: T | null;
  error: any | null;
  reset: () => void;
};

export function useAsync<T>(asyncFn, alert: boolean = true): AsyncHook<T> {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = (...args) => {
    setLoading(true);
    setError(null);
    setValue(null);

    return asyncFn(...args)
      .then((data: T) => {
        setLoading(false);
        setValue(data);
        return data;
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
        console.warn(
          "[Request Error]",
          err.response ? err.response.data : JSON.parse(JSON.stringify(err)),
          err.response ? err.response.status : null
        );
        const detail = err.response ? err.response.data?.detail : err.toString();
        if (alert) {
          toaster.danger(
            detail || "Une erreur est survenue lors de l'exécution de cette opération."
          );
        } else {
          throw err;
        }
      });
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setValue(null);
  };

  return {execute, loading, value, error, reset};
}
