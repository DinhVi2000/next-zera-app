export const apiURL = {
  get: {
    all_article_tag: "/article/tag",
    all_article_by_category: "/article/category",
    articles_by_tag: (tagSlug) => `/article/tag/${tagSlug}`,
    articles_by_category: (categorySlug) => `/article/category/${categorySlug}`,
    article_by_slug: (slug) => `/article/detail/${slug}`,
    hall_of_fame_by_username: (username) => `/hall-of-fames/${username}`,
    popular_game: "/game/popular-game",
  },
};
