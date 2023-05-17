export interface idNameOnly {
  id: number,
  name: string,
}

export interface Login {
  email: string,
  password: string,
}

export interface Register {
  name: string,
  email: string,
  password: string,
  confirmedPassword: string,
}

export interface Token {
  tokenContent: string,
}

export interface TokenContent {
  name: string,
  email: string,
  isAdmin: string,
  userId: string,
  canComment: string,
  exp: number,
}

export interface OfferContent {
  search: string,
  category: string,
}

export interface UserInfo {
  id: number,
  email: string,
  name: string,
  canComment: boolean,
  isAdmin: boolean,
}