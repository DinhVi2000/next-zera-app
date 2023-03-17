export const apiURL = {
  get: {
    all_article_tag: "/article/tag",
    articles_by_tag: (tagSlug) => `/article/tag/${tagSlug}`,
    articles_by_category: (categorySlug) => `/article/category/${categorySlug}`,
    article_by_slug: (slug) => `/article/detail/${slug}`,
  },
};
