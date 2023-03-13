import { useRouter } from "next/router";
import { useRef } from "react";

export const usePreviousRoute = () => {
  const ref = useRef();

  const router = useRouter();
  if (ref.current) localStorage?.setItem("previousRoute", ref.current);

  router.events?.on("routeChangeStart", () => {
    ref.current = router.asPath;
  });
  return ref.current;
};
