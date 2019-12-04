import Alloy from "alloy";
import { TYPES, load } from "/data";
import { IndexAbstract } from "./IndexAbstract";
import Detail from "./Detail";
import { Collection as FruitCollection, Model as FruitModel } from "/models/Fruit";

export default class Index extends IndexAbstract {
  private sort = "name";
  private filter: TYPES = TYPES.ALL;
  private fruitsSingleton: FruitCollection = Alloy.Collections.Fruit;
  constructor() {
    super();
    load();
    this.navWin.open();
  }
  filterSortDialog(e: any): void {
    if (e.index === 0) {
      this.filter = TYPES.ALL;
      this.filterButton.title = "Filter: all";
    } else if (e.index === 1) {
      this.filter = TYPES.FRUIT;
      this.filterButton.title = "Filter: fruit";
    } else if (e.index === 2) {
      this.filter = TYPES.VEGETABLE;
      this.filterButton.title = "Filter: vegetables";
    }

    // trigger the data function to re-render. This will trigger the dataFilter function as well
    this.rerenderList();
  }

  handleClickItem(e: any): void {
    const item = e.section.items[e.itemIndex];
    const model = this.fruitsSingleton.get(item.properties.itemId);
    this.navWin.openWindow(new Detail({ model }).getView() as Ti.UI.Window);
  }

  handleSortDialog(e: any): void {
    if (e.index === 0) {
      this.sort = "name";
    } else if (e.index === 1) {
      this.sort = "amount";
    }
    this.sortButton.title = "Sort: " + this.sort;
    this.fruitsSingleton.sortOrder = this.sort;

    // after changing sort rules, re-sort the list.
    this.fruitsSingleton.sort();
  }

  showFilterDialog(): void {
    this.filterDialog.show();
  }

  showSortDialog(): void {
    this.sortDialog.show();
  }

  filterFruit(collection: FruitCollection): FruitModel[] {
    if (this.filter === TYPES.ALL) {
      return collection.models;
    } else {
      return collection.filter(m => {
        return m.get("type") === this.filter;
      });
    }
  }

  transformFruit(model: FruitModel): any {
    return {
      name: model.attributes.name,
      amount: "Amount: " + model.attributes.amount,
      color: model.attributes.color,
      accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
      itemId: model.attributes.id,
    };
  }
}
