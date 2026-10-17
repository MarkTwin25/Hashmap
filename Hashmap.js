import { LinkedList } from "./LinkedList.js";

export class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (!this.buckets[index]) {
      this.buckets[index] = new LinkedList();
      this.buckets[index].append({ key, value });
      return;
    }

    let list = this.buckets[index];
    let temporal = list.head;

    while (temporal !== null) {
      if (temporal.value.key === key) {
        temporal.value.value = value;
        return;
      }
      temporal = temporal.next;
    }

    list.append({ key, value });

    if (this.length() > this.capacity * this.loadFactor) {
      const data = this.entries();
      this.capacity = this.capacity * 2;
      this.buckets = new Array(this.capacity);

      for (const par of data) {
        this.set(par[0], par[1]);
      }
    }
  }

  get(key) {
    const index = this.hash(key);

    if (!this.buckets[index]) {
      return undefined;
    }

    let temporal = this.buckets[index].head;

    while (temporal !== null) {
      if (temporal.value.key === key) {
        return temporal.value.value;
      }
      temporal = temporal.next;
    }

    return undefined;
  }

  has(key) {
    const index = this.hash(key);

    if (!this.buckets[index]) {
      return false;
    }

    let temporal = this.buckets[index].head;

    while (temporal !== null) {
      if (temporal.value.key === key) {
        return true;
      }
      temporal = temporal.next;
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);

    if (!this.buckets[index]) {
      return false;
    }
    let list = this.buckets[index];
    let temporal = list.head;
    let currIndex = 0;
    while (temporal !== null) {
      if (temporal.value.key === key) {
        list.removeAt(currIndex);
        return true;
      }
      currIndex++;
      temporal = temporal.next;
    }
    return false;
  }

  length() {
    let total = 0;

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        total += this.buckets[i].size();
      }
    }

    return total;
  }

  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = undefined;
    }
  }

  keys() {
    return this.entries().map((key) => key[0]);
  }

  values() {
    return this.entries().map((value) => value[1]);
  }

  entries() {
    const entries = [];

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        let temporal = this.buckets[i].head;

        while (temporal !== null) {
          const key = temporal.value.key;
          const value = temporal.value.value;
          entries.push([key, value]);
          temporal = temporal.next;
        }
      }
    }

    return entries;
  }
}
