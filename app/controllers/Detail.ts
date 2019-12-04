import Alloy from "alloy";
import { DetailAbstract } from "./DetailAbstract";
import { Model as FruitModel } from "/models/Fruit";

export default class Detail extends DetailAbstract {
  private updateTimeout?: number;
  constructor(args: { model: FruitModel }) {
    super(args);
    this.fruit.set(args.model.toJSON());
    // when internal model changes, change the global one too
    this.fruit.on("change", this.handleFruitChange.bind(this));
  }
  handleFruitChange(): void {
    clearTimeout(this.updateTimeout);
    // prevent a lot of changes from re-sorting/re-rendering in a short time
    this.updateTimeout = setTimeout(() => {
      this.args.model.set(this.fruit.toJSON());

      // Sort collection after changing a property
      Alloy.Collections.Fruit.sort();
    }, 750);
  }
  handleClose(): void {
    this.off();
    this.destroy();
    this.fruit.off();
  }
  handleNameChange(e: { value: string }): void {
    // no updating if value is the same
    if (e.value === this.fruit.attributes.name) {
      return;
    }
    this.fruit.set("name", e.value);
  }

  alterAmount(e: { source: { title: string } }): void {
    let num = parseInt(e.source.title + "1");
    if (isNaN(num)) {
      num = 1;
    }
    // alter the amount by the manipulator set in Detail.xml. In this case we just have a + & - button, so +1 or -1
    this.fruit.set("amount", this.fruit.attributes.amount + num);
  }
}
