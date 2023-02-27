/* eslint-disable no-console */
/* eslint-disable quotes */
// eslint-disable-next-line quotes
import { http } from "@/utils/http";

export const getCategoriesShop = async () => {
  try {
    const { data } = await http.get("/shops/categories");
    return data;
  } catch (e) {
    throw e;
  }
};

export const getItemByCategory = async (params) => {
  try {
    const { data } = await http.get(`/shops/categories/${params}/items`);
    return data;
  } catch (e) {
    throw e;
  }
};

export const buyShopItem = async (params) => {
  try {
    const { data } = await http.post("/shops/buy", params);
    return data;
  } catch (e) {
    throw e;
  }
};
