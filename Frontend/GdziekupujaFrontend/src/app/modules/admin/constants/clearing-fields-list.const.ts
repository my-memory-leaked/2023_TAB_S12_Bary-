export const ADMIN_FIELDS_LIST = {
  AddOffer: [
    "price",
    "salesPointId",
    "productId",
    "categoryIds",
    "additionalInfo",
    "image",
  ],
  ModifyOffer: [
    "offer",
    "price",
  ],
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
    "availableProps",
    "propertyName",
    "property",
  ],
  ModifyProduct: [
    "product",
    "name",
    "availableProps",
    "propertyName",
    "property",
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
  BanUser: [
    "userId",
  ],
  UnbanUser: [
    "userId",
  ],
};