import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export const usePreviousRoute = () => {
  const router = useRouter();

  let prevRoute;
  let currentRoute;

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      prevRoute = currentRoute;
      currentRoute = url;
    };
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return { prevRoute, currentRoute };
};
