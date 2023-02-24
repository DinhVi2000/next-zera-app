/* eslint-disable no-console */
/* eslint-disable quotes */
// eslint-disable-next-line quotes
import { http } from "@/utils/http";

const getShopItem = async () => {
  try {
    const { data } = await http.get("/shops/items");

    return data;
  } catch (e) {
    throw e;
  }
};

const buyShopItem = async (params) => {
  try {
    const { data } = await http.post("/shops/buy", params);
    return data;
  } catch (e) {
    throw e;
  }
};

export { getShopItem, buyShopItem };
