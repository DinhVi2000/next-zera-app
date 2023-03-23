import { STATUS } from "@/utils/constant";
import { notifyErrorMessage } from "@/utils/helper";
import { http } from "@/utils/http";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useApi = () => {
  const toast = useToast();
  const dispatch = useDispatch();

  const [status, setStatus] = useState(STATUS.NOT_START);

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
  };

  const post = async (url, formData, config, callback = null) => {
    setStatus(STATUS.IN_PROGRESS);
    try {
      const { data } = await http.post(
        url,
        formData,
        config,
        (callback = null)
      );
      if (!data.success) throw new Error(data?.message);

      callback && dispatch(callback(data.data));
      setStatus(STATUS.SUCCESS);

      return data?.data;
    } catch (e) {
      setStatus(STATUS.FAIL);
      notifyErrorMessage(toast, e);
      throw e;
    }
  };

  return { call, get, post, status };
};
