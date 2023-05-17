export interface Product {
  id: number,
  name: string,
  availableProps: Object,
}

export interface Categories {
  id: number,
  name: string,
  inverseParent: Categories[],
}

export interface Category {
  id: number,
  name: string,
  parentId: number,
}

export interface SalesPoint {
  id: number,
  name: string,
  address: Address,
}

export interface Address {
  city: string,
  street: string,
  postalCode: string,
  number: number,
  county: County,
}

export interface County {
  id: number,
  name: string,
}

export interface MainOffer {
  count: number,
  offers: Offers[],
}

export interface Offers {
  id: number,
  price: number,
  isFavourite: boolean,
  creationTime: Date,
  userName: string,
  salesPoint: SalesPoint,
  productInstance: ProductInstance,
  opened?: boolean,
  comments?: MyComment[],
}

export interface ProductInstance {
  id: number,
  product: Product,
  additionalInfo: string,
  categories: Category[],
  imageName: string,
}

export interface MyComment {
  id: number,
  likes: number,
  disLikes: number,
  content: string,
  author: string,
  authorId: number,
  isLikedOrDislikedByUser: boolean,
}
