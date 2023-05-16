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

export interface Offers {
  id: number,
  price: number,
  product: Product,
  salesPoint: SalesPoint,
  isFavourite: boolean,
  opened?: boolean,
  comments?: MyComment[],
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
