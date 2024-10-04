import { createContext } from "react";

export interface GlobalValueInterface {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export const GlobalValue = createContext<GlobalValueInterface | null>(null);

export default GlobalValue;
