
export interface Book {
  name: string;
  isbn: string;
  authors: string[];
  numberOfPages: number;
  publisher: string;
  country: string;
  mediaType: string;
  released: string;
  characters: string[];
  povCharacters: string[];
  url: string;
}

export interface User {
  exp: number;
  iat: number;
  id: number;
  username: string;
}

export interface Session {
  isAuthenticated: boolean;
  user: User;
}
