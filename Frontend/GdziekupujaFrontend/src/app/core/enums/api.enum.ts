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

  FAVOURITES = '/api/offer/favourites',
  FAVOURITES_USER_ID = '/api/offer/favourites/:userId',

  PRODUCTS = '/api/product',
  PRODUCT_ID = '/api/product/:id',

  SALES_POINTS = '/api/salesPoint',
  SALES_POINT_ID = '/api/salesPoint/:id',

  REGISTER = '/user/register',
  LOGIN = '/user/login',
  USERS = '/user',
}