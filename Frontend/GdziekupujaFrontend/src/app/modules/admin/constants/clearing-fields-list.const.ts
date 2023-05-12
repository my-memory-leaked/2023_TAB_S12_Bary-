export const ADMIN_FIELDS_LIST = {
  AddCategory: [
    "name",
    "parentId",
  ],
  ModifyCategory: [
    "category",
    "name",
    "parentId",
  ],
  AddProduct: [
    "name",
  ],
  ModifyProduct: [
    "product",
    "name",
  ],
  AddProductInstance: [
    "productId",
    "categoryIds",
    "additionalInfo",
    "image",
  ],
  ModifyProductInstance: [
    "productInstanceId",
    "productId",
    "categoryIds",
    "additionalInfo",
    "image",
  ],
  AddSalesPoint: [
    "name",
    "address",
  ],
  ModifySalesPoint: [
    "salesPoint",
    "name",
    "address",
  ],
};