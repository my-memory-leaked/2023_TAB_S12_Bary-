export enum Api {
  POST_CATEGORIES = '/api/category',
  GET_CATEGORIES_ALL = '/api/category/getAllCategories',
  GET_CATEGORIES_ALL_FLAT = '/api/category/getAllFlatCategories',
  GET_CATEGORIES_BY_SUPERIOR = '/api/category/getBySuperiorId',
  GET_CATEGORIES_ALL_SUPERIORS = '/api/category/getAllSuperiors',

  COUNTIES = '/api/county',
  COUNTY = '/api/county/:id',

  PRODUCTS = '/api/product',
  
  PRODUCT_INSTANCE = '/api/productInstance',

  SALES_POINTS = '/api/salesPoint',
  SALES_POINT_ID = '/api/salesPoint/:id',

  REGISTER = '/user/register',
  LOGIN = '/user/login',
  USERS = '/user',
}