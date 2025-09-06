
export enum Category {
  ELECTRONICS = "Electronics",
  FURNITURE = "Furniture",
  CLOTHING = "Clothing",
  BOOKS = "Books",
  HOME_GOODS = "Home Goods",
  TOYS = "Toys",
  OTHER = "Other",
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
  sellerId: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  password?: string; // Should not be stored in frontend state long-term
}

export interface CartItem extends Product {
  quantity: number;
}
