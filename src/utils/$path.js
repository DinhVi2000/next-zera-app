export const staticPaths = {
  home: "/",
  login: "/login",
  register: "/register",
  forgot_password: "/forgot-password",
  reset_password: "/auth/reset-password",
  term: "/term",
  policy: "/policy",
  all_article_category: "/article/categories",
  all_article_tags: "/article/tags",
  achievements: "/achievements",
  my_hall_of_fame: "/game/hall-of-fame",
  maintenance: "/maintenance",
  not_found: "/404",
};

export const dynamicPaths = {
  all_game_tags_by_superslug: (superslug) => `/${superslug}/tags`,
  all_categories_by_superslug: (superslug) => `/${superslug}/categories`,
  article_by_slug: (slug) => `/article/${slug}`,
  article_by_tag: (tagSlug) => `/article/tag/${tagSlug}`,
  article_by_category: (categorySlug) => `/article/category/${categorySlug}`,
  achievements_by_username: (username) => `/achievements/${username}`,
  category_by_slug: (superslug, categorySlug) =>
    `/${superslug}/category/${categorySlug}`,
  game_by_slug: (superslug, gameSlug) => `/${superslug}/${gameSlug}`,
  game_by_tag: (superslug, tagSlug) => `/${superslug}/tag/${tagSlug}`,
  hall_of_fame_by_username: (username) => `/hall-of-fame/${username}`,
};
