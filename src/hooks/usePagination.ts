import {useSWRInfinite} from "swr";
import qs from "query-string";
import {fetcher} from "../utils/axios";

export interface IPaginatedResponse<T = any> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type PaginationHook<T, TResponse, Error = any> = {
  data: T[];
  currentData: T[];
  error: Error;
  refresh: () => Promise<TResponse[] | undefined>;
  loadMore: () => void;
  previous: () => void;
  isEmpty: boolean;
  hasReachedEnd: boolean;
  isRefreshing: boolean;
  isFirstPage: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
};

export default function usePagination<
  T = any,
  TResponse extends IPaginatedResponse<T> = IPaginatedResponse<T>
>(url, query = {}, limit = 10): PaginationHook<T, TResponse> {
  const {
    data,
    size,
    setSize,
    error,
    mutate: refresh,
    isValidating,
  } = useSWRInfinite<TResponse>(
    (index, prev) => {
      if (prev && !prev.next) return null;
      const fetchUrl = typeof url === "function" ? url() : url;
      if (!fetchUrl) throw Error("Fetch url for pagination is not defined");

      return qs.stringifyUrl({
        url: fetchUrl,
        query: {
          ...query,
          limit: limit.toString(),
          offset: (limit * index).toString(),
        },
      });
    },
    fetcher,
    {revalidateAll: true}
  );

  return {
    data: data?.reduce((a: T[], b: TResponse) => a.concat(b.results), []),
    currentData: data ? data[data.length - 1].results : null,
    error,
    refresh,
    loadMore: () => setSize(size + 1),
    previous: () => size > 0 && setSize(size - 1),
    isEmpty: data?.[0]?.results?.length === 0,
    isFirstPage: data?.length === 1,
    hasReachedEnd:
      data?.[0]?.results?.length === 0 ||
      (data && data[data.length - 1]?.results.length < limit),
    isRefreshing: isValidating && data && data.length === size,
    isLoading: !data && !error,
    isLoadingMore:
      (!data && !error) || (size > 0 && data && typeof data[size - 1] === "undefined"),
  };
}
