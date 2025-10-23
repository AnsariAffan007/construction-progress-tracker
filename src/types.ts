export type FloorProgress = {
  flats: FlatProgress[];
} & ProgressItem

type FlatProgress = {
  bhk: number;
  areas: AreaProgress[];
} & ProgressItem

type AreaProgress = {
  items: LineItem[]
} & ProgressItem

type LineItem = {
  planned_quantity: number;
  remarks: string;
} & Omit<ProgressItem, "expanded">;

type ProgressItem = {
  id: number;
  name: string;
  status: boolean;

  expanded?: boolean;
  checked?: boolean
}