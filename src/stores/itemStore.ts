import { MainStore } from "./mainStore";
import { makeObservable, observable, action } from "mobx";
import { IItem } from "../mocks/ItemsMock";

export default class ItemStore {
  @observable isLoading: boolean = false;
  @observable isError: boolean = false;
  @observable items: IItem[] = [];

  constructor(public mainStore: MainStore) {
    makeObservable(this);
    this.loadFromLocalStorage();
  }

  @action
  loadFromLocalStorage = () => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      this.items = JSON.parse(storedItems);
    }
  }

  @action
  saveToLocalStorage = () => {
    localStorage.setItem('items', JSON.stringify(this.items));
  }

  @action
  addItem = (item: IItem) => {
    console.log(item);
    this.items.push(item);
    this.saveToLocalStorage();
  }

  @action
  removeItem = (id: string) => {
    this.items = this.items.filter(item => item.id !== id);
    this.saveToLocalStorage();
  }
}
