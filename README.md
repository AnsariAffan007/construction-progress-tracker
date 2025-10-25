# Construction Progress Tracker

## Component Hierarchy

```
App.tsx
└── Progress.tsx 
    └── FloorCard.tsx
        ├── ProgressDetailHead.tsx
        └── FlatCard.tsx
            ├── ProgressDetailHead.tsx
            └── FlatCard.tsx
                ├── ProgressDetailHead.tsx
                └── AreaCard.tsx
                    ├── ProgressDetailHead.tsx
                    └── LineItems (no component)
```

### ProgressDetailHead.tsx
- Most of the vdom is made up of this component. It contains the item name (floor name, flat name, etc..), to the left, and status chip & completed progress number on the right.
- While in edit mode, this component displays a checkbox, and shows tick mark if status is completed.

### App.tsx
- Contains basic markup of breadcrumb, title, filter buttons, and the select filter dropdown of items. 
- It wraps its children around a context, called ProgressContext.

### ProgressContext.tsx
- Contains stuff to be passed around between components, most importantly the syncing functions that need to be called from parent, to mutate child states. Other things are editing state and line item filter state, and the action functions (which do save and cancel).

### Progress, FloorCard, FlatCard, AreaCard
All contain respective resource listings. 
- Progress contains floor listing, which renders FloorCards.
- Floor card contains flat listing, and renders FlatCards.
- Flat card contains flat listing, and renders AreaCards.
- AreaCard contains item listing. Item listing does not have a separate component as it is very small and manageable

### Stuff in Common in above all components
- Each resource card contains stuff like
  - Child listing state (For eg: Floor card contains flat listing state)
  - Child checked local state (Floor card contains flat checked state)
  - Syncers (For propagating checkbox events in both directions, above and below). For eg: FlatCard will contain area listing, and areas checked state. And when area is checked, 2 syncs are triggered:
    - When an area is checked, flat checking and items checking, both will be affected. So the 2 syncs in this case are area-flat(upwards) sync, and area-item(downwards) sync. Each sync has 2 way communication. Like for area-flat sync, if area is checked, flat checking is recalculated, but also, if flat is checked, area checking is affected. So this area checking on flat check, is also done in FlatCard, because the area checking state is present in FlatCard.
  - Action handler (Save, Cancel): This is one function, that is triggered from global level, and mutates the listing state or checked state, based on the action (save | cancel).
  - Filtering memo: useMemo variable, that filters the listing state based upon item filter, and is used to map the actual listing markdown (JSX)