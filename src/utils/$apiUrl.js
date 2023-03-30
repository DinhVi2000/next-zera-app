export const apiURL = {
  get: {
    all_article_tag: "/article/tag",
    all_article_by_category: "/article/category",
    all_game_categories: "/game/categories",
    all_messages_by_room_id: (room_id) => `/game/${room_id}/messages`,
    articles_by_tag: (tagSlug) => `/article/tag/${tagSlug}`,
    articles_by_category: (categorySlug) => `/article/category/${categorySlug}`,
    article_by_slug: (slug) => `/article/detail/${slug}`,
    achievements_by_username: (username) => `/achievement/${username}`,
    games_by_tag: (tagSlug) => `/game/tag/${tagSlug}`,
    hall_of_fame_by_username: (username) => `/hall-of-fames/${username}`,
    my_hall_of_fame: "/hall-of-fames",
    my_achievement: "/achievement",
    popular_game: "/game/popular-game",
  },
  post: {
    forgot_password: "/users/forgot-password",
    new_password: "/users/new-password",
  },
};
