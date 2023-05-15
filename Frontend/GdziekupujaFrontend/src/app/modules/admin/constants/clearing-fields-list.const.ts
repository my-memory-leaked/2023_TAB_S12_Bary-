export const ADMIN_FIELDS_LIST = {
  AddOffer: [
    "price",
    "salesPointId",
    "userId",
    "ProductId",
    "CategoryIds",
    "AdditionalInfo",
    "Image",
  ],
  ModifyOffer: [
    "offer",
    "price",
    "salesPointId",
    "userId",
    "ProductId",
    "CategoryIds",
    "AdditionalInfo",
    "Image",
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
};