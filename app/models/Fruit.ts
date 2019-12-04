import { BaseModel, BaseCollection } from "/model/Base";
import { TYPES } from "data";

export interface Fruit {
  id: number;
  name: string;
  type: TYPES;
  color: string;
  amount: number;
  accessoryType: number;
}

export class Model extends BaseModel<Fruit> {
  public markAsRead(): Promise<BaseModel<Fruit>> {
    return Promise.resolve().then(() => {
      return this.set("id", 0);
    });
  }
}

export class Collection extends BaseCollection<Model> {
  public sortOrder = "name";
  public model: new (...args: any[]) => Model = Model;

  // public fetch(options?: Backbone.CollectionFetchOptions): JQueryXHR {
  // 	options = options ? options : {};
  // 	options.reset = true;
  // 	return super.fetch(options);
  // }

  public comparator = (a: Model, b: Model): number => {
    if (this.sortOrder === "amount") {
      // access with ` model.attributes` is faster
      // here `model.get()` is only for example
      const aValue: number = a.get("amount");
      const bValue: number = b.get("amount");
      return aValue - bValue;
    }
    const aValue: string = a.attributes.name;
    const bValue: string = b.attributes.name;
    if (aValue > bValue) {
      return 1;
    } else if (aValue < bValue) {
      return -1;
    } else {
      return 0;
    }
  };
}
