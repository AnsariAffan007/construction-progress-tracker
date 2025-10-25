export type FlatProgress = {
  floor_id: number;
  flat_number: number;
  bhk: number;
} & Omit<ProgressItem, "name">

export type AreaProgress = {
  flat_id: number;
} & ProgressItem

export type LineItem = {
  area_id: number;
  planned_quantity: number;
  remarks: string;
} & Omit<ProgressItem, "expanded">;

export type ProgressItem = {
  id: number;
  name: string;
  status: boolean;

  expanded?: boolean;
}