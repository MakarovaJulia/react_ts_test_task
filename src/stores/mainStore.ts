import ItemStore from "./itemStore";
import MessageStore from "./messageStore";

export class MainStore {
  itemStore: ItemStore;
  messageStore: MessageStore;

  constructor() {
    this.itemStore = new ItemStore(this);
    this.messageStore = new MessageStore(this);
  }
}

const mainStore = new MainStore();

export default mainStore;
