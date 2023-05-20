export enum Api {
  CATEGORIES = '/api/category',
  CATEGORY_ID = '/api/category/:id',
  GET_CATEGORIES_ALL = '/api/category/getAllCategories',
  GET_CATEGORIES_ALL_FLAT = '/api/category/getAllFlatCategories',
  GET_CATEGORIES_BY_SUPERIOR = '/api/category/getBySuperiorId',
  GET_CATEGORIES_ALL_SUPERIORS = '/api/category/getAllSuperiors',

  COUNTIES = '/api/county',
  COUNTY = '/api/county/:id',

  OFFERS = '/api/offer',
  OFFER_ID = '/api/offer/:id',
  OFFER_COMMENTS = '/api/offer/comments',
  OFFER_BAN = '/api/offer/ban',
  
  COMMENT = '/api/comment',
  COMMENT_LIKE = '/api/comment/like',
  COMMENT_DISLIKE = '/api/comment/dislike',
  COMMENT_BAN = '/api/comment/ban',

  FAVOURITES = '/api/offer/favourites',
  FAVOURITES_USER_ID = '/api/offer/favourites/:userId',

  PRODUCTS = '/api/product',
  PRODUCT_ID = '/api/product/:id',

  SALES_POINTS = '/api/salesPoint',
  SALES_POINT_ID = '/api/salesPoint/:id',

  REGISTER = '/user/register',
  LOGIN = '/user/login',
  USERS = '/user',
  USER_BAN = '/user/ban',
  USER_UNBAN = '/user/unban',
}