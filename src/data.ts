import type { FloorProgress } from "./types"

const CONSTRUCTION_DUMMY_PROGRESS: FloorProgress[] = [
  {
    id: 1,
    name: "Floor 1",
    status: false,
    flats: [
      {
        id: 1,
        name: "101",
        bhk: 1,
        status: false,
        areas: [
          {
            id: 1,
            name: "Kitchen",
            status: true,
            items: [
              {
                id: 1,
                name: "LIT-02 (lit)",
                planned_quantity: 1,
                remarks: "",
                status: true
              },
              {
                id: 2,
                name: "SG CHEMICAL NEW X (t)",
                planned_quantity: 1,
                remarks: "",
                status: true
              },
              {
                id: 3,
                name: "LIT-01 (lit)",
                planned_quantity: 1,
                remarks: "",
                status: true
              },
            ]
          },
          {
            id: 2,
            name: "Common Toilet",
            status: true,
            items: [
              {
                id: 4,
                name: "TILE-01 (sqm)",
                planned_quantity: 2,
                remarks: "",
                status: true
              },
              {
                id: 5,
                name: "PAINT-01 (sqm)",
                planned_quantity: 3,
                remarks: "",
                status: true
              },
              {
                id: 6,
                name: "LIT-02 (lit)",
                planned_quantity: 1,
                remarks: "",
                status: true
              },
            ]
          },
        ]
      }
    ]
  }
]

export default CONSTRUCTION_DUMMY_PROGRESS