export interface SwapProps {
  token: null | Token;
  price: number;
}

export interface TokenSelector {
  token: null | Token;
  disabled: boolean;
  setToken: (token: Token) => void;
}

export interface Token {
  address: string;
  symbol: string;
  icon: string;
  chainId?: string;
  decimals?: number;
}

export interface Chain {
  id: string;
  name: string;
  icon: string;
}

