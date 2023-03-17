import { notifyErrorMessage } from "@/utils/helper";
import { http } from "@/utils/http";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

export const useApi = () => {
  const toast = useToast();
  const dispatch = useDispatch();

  const call = async (callback) => {
    callback.then((res) => res).catch((e) => notifyErrorMessage(toast, e));
  };

  const get = async (url, config, callback = null) => {
    try {
      const { data } = await http.get(url, config);
      if (!data.success) throw new Error(data?.message);

      callback && dispatch(callback(data.data));

      return data?.data;
    } catch (e) {
      notifyErrorMessage(toast, e);
      throw e;
    }
    // http
    //   .get(url, config)
    //   .then(({ data }) => {
    //     if (!data?.success) throw new Error(data?.message);
    //     console.log("data :", data);
    //     return data;
    //   })
    //   .catch((e) => {
    //     notifyErrorMessage(toast, e);
    //     throw e;
    //   });
  };

  return { call, get };
};
