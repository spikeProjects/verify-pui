
export interface StoreState {
  languageName: string;
  enthusiasmLevel: number;
}

export interface Props {
  name: string;
  enthusiasmLevel?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}
