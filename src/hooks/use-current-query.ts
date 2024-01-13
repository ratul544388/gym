import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

export const useCurrentQuery = () => {
  const params = useSearchParams();
  const currentQuery = qs.parse(params.toString());

  return currentQuery;
};
