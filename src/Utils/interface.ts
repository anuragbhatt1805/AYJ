export interface SwapProps {
  token: null | string;
  value: number;
  price: number;
}

export interface TokenSelector {
  token: null | string;
  setToken: (token: string) => void;
}

export interface Token {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  balance?: string;
  chainId?: number;
}

export interface Chain {
  id: number;
  name: string;
  icon: string;
}

