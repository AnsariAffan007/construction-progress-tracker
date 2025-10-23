import type { AreaProgress, FlatProgress, LineItem, ProgressItem } from "./types"

// #region Floors
export const FLOORS_DUMMY: ProgressItem[] = [
  {
    id: 1,
    name: "Floor 1",
    status: false
  },
  {
    id: 2,
    name: "Floor 2",
    status: false
  },
  {
    id: 3,
    name: "Floor 3",
    status: false
  },
  {
    id: 4,
    name: "Floor 4",
    status: false
  },
  {
    id: 5,
    name: "Floor 5",
    status: false
  },
]

// #region Flats
export const FLATS_DUMMY: FlatProgress[] = [
  {
    floor_id: 1,
    id: 1,
    flat_number: 101,
    bhk: 1,
    status: true
  },
  {
    floor_id: 1,
    id: 2,
    flat_number: 102,
    bhk: 2,
    status: true
  },
  {
    floor_id: 1,
    id: 3,
    flat_number: 103,
    bhk: 3,
    status: false
  },
  {
    floor_id: 2,
    id: 4,
    flat_number: 201,
    bhk: 2,
    status: false
  },
  {
    floor_id: 3,
    id: 5,
    flat_number: 301,
    bhk: 1,
    status: false
  },
  {
    floor_id: 4,
    id: 6,
    flat_number: 401,
    bhk: 3,
    status: true
  },
  {
    floor_id: 5,
    id: 7,
    flat_number: 501,
    bhk: 2,
    status: false
  }
]

// #region Areas
export const AREAS_DUMMY: AreaProgress[] = [
  {
    flat_id: 1,
    id: 1,
    name: "Kitchen",
    status: true
  },
  {
    flat_id: 1,
    id: 2,
    name: "Common Toilet",
    status: true
  },
  {
    flat_id: 2,
    id: 3,
    name: "Kitchen",
    status: true
  },
  {
    flat_id: 3,
    id: 4,
    name: "Kitchen",
    status: false
  },
  {
    flat_id: 3,
    id: 5,
    name: "Master Bedroom",
    status: false
  },
  {
    flat_id: 4,
    id: 6,
    name: "Kitchen",
    status: false
  },
  {
    flat_id: 4,
    id: 7,
    name: "Living Room",
    status: false
  },
  {
    flat_id: 5,
    id: 8,
    name: "Kitchen",
    status: false
  },
  {
    flat_id: 6,
    id: 9,
    name: "Kitchen",
    status: true
  },
  {
    flat_id: 6,
    id: 10,
    name: "Bedroom 1",
    status: true
  },
  {
    flat_id: 6,
    id: 11,
    name: "Bedroom 2",
    status: true
  },
  {
    flat_id: 7,
    id: 12,
    name: "Kitchen",
    status: false
  },
  {
    flat_id: 7,
    id: 13,
    name: "Balcony",
    status: false
  },
]

// #region Line Items
export const LINE_ITEMS_DUMMY: LineItem[] = [
  {
    area_id: 1,
    id: 1,
    name: "LIT-02 (lit)",
    planned_quantity: 1,
    remarks: "",
    status: true
  },
  {
    area_id: 1,
    id: 2,
    name: "SG CHEMICAL NEW X (t)",
    planned_quantity: 1,
    remarks: "",
    status: true
  },
  {
    area_id: 1,
    id: 3,
    name: "LIT-01 (lit)",
    planned_quantity: 1,
    remarks: "",
    status: true
  },
  {
    area_id: 2,
    id: 4,
    name: "TILE-01 (sqm)",
    planned_quantity: 2,
    remarks: "",
    status: true
  },
  {
    area_id: 2,
    id: 5,
    name: "PAINT-01 (sqm)",
    planned_quantity: 3,
    remarks: "",
    status: true
  },
  {
    area_id: 2,
    id: 6,
    name: "LIT-02 (lit)",
    planned_quantity: 1,
    remarks: "",
    status: true
  },
  {
    area_id: 3,
    id: 7,
    name: "LIT-02 (lit)",
    planned_quantity: 1,
    remarks: "",
    status: true
  },
  {
    area_id: 3,
    id: 8,
    name: "SG CHEMICAL NEW X (t)",
    planned_quantity: 1,
    remarks: "",
    status: true
  },
  {
    area_id: 3,
    id: 9,
    name: "LIT-01 (lit)",
    planned_quantity: 1,
    remarks: "",
    status: true
  },
  {
    area_id: 3,
    id: 10,
    name: "PAINT-01 (sqm)",
    planned_quantity: 2,
    remarks: "",
    status: true
  },
  {
    area_id: 4,
    id: 11,
    name: "LIT-02 (lit)",
    planned_quantity: 2,
    remarks: "",
    status: true
  },
  {
    area_id: 4,
    id: 12,
    name: "SG CHEMICAL NEW X (t)",
    planned_quantity: 1,
    remarks: "",
    status: false
  },
  {
    area_id: 4,
    id: 13,
    name: "LIT-01 (lit)",
    planned_quantity: 1,
    remarks: "",
    status: false
  },
  {
    area_id: 4,
    id: 14,
    name: "PAINT-01 (sqm)",
    planned_quantity: 3,
    remarks: "",
    status: false
  },
  {
    area_id: 4,
    id: 15,
    name: "TILE-01 (sqm)",
    planned_quantity: 2,
    remarks: "",
    status: false
  },
  {
    area_id: 5,
    id: 16,
    name: "PAINT-01 (sqm)",
    planned_quantity: 4,
    remarks: "",
    status: false
  },
  {
    area_id: 5,
    id: 17,
    name: "LIT-01 (lit)",
    planned_quantity: 2,
    remarks: "",
    status: false
  },
  {
    area_id: 5,
    id: 18,
    name: "TILE-01 (sqm)",
    planned_quantity: 3,
    remarks: "",
    status: false
  },
  {
    area_id: 5,
    id: 19,
    name: "LIT-02 (lit)",
    planned_quantity: 1,
    remarks: "",
    status: false
  },
]