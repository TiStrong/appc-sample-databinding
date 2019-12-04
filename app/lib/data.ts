import Alloy from "alloy";

export enum TYPES {
  ALL,
  FRUIT,
  VEGETABLE,
}

export const load = function(): void {
  // Loading the data
  Alloy.Collections.Fruit.reset([
    {
      id: 1,
      name: "Apple",
      type: TYPES.FRUIT,
      color: "#ff0800",
      amount: 0,
    },
    {
      id: 2,
      name: "Bell Pepper",
      type: TYPES.VEGETABLE,
      color: "#bb112a",
      amount: 0,
    },
    {
      id: 3,
      name: "Orange",
      type: TYPES.FRUIT,
      color: "#ffa500",
      amount: 0,
    },
    {
      id: 4,
      name: "Lettuce",
      type: TYPES.VEGETABLE,
      color: "#8bd145",
      amount: 0,
    },
  ]);
};
