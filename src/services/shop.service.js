/* eslint-disable no-console */
/* eslint-disable quotes */
// eslint-disable-next-line quotes
import { PLAYTIME_CATEGORY } from "@/utils/constant";
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

export const getItemTime = async () => {
  try {
    const itemCategories = await getCategoriesShop();
    const category = itemCategories.data.find(
      (category) => category.name.trim() === PLAYTIME_CATEGORY
    );
    const { data } = await getItemByCategory(category?.id);
    if (data) return data;
    return [];
  } catch (e) {
    return [];
  }
};

export const buyShopItem = async (body) => {
  try {
    const { data } = await http.post("/shops/buy", body);
    return data;
  } catch (e) {
    throw e;
  }
};
