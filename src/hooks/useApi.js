import { notifyErrorMessage } from "@/utils/helper";
import { useToast } from "@chakra-ui/react";

export const useApi = () => {
  const toast = useToast();

  const call = async (callback) => {
    callback.then((res) => res).catch((e) => notifyErrorMessage(toast, e));
  };

  return { call };
};
