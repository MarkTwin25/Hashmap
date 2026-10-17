import { Node } from "./Node.js";

export class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  append(value) {
    if (this.head === null) {
      this.head = new Node(value);
      return;
    }

    let temporal = this.head;
    while (temporal.next !== null) {
      temporal = temporal.next;
    }
    temporal.next = new Node(value);
  }

  prepend(value) {
    if (this.head === null) {
      this.head = new Node(value);
      return;
    }

    const temporal = this.head;
    this.head = new Node(value);
    this.head.next = temporal;
  }

  size() {
    let count = 0;
    let temporal = this.head;
    while (temporal !== null) {
      temporal = temporal.next;
      count++;
    }
    return count;
  }

  headOfTheList() {
    if (this.head === null) {
      return undefined;
    }

    return this.head;
  }

  tailOfTheList() {
    if (this.head === null) {
      return undefined;
    }

    let temporal = this.head;
    while (temporal.next !== null) {
      temporal = temporal.next;
    }
    return temporal;
  }

  at(index) {
    let current = 0;
    let temporal = this.head;
    while (temporal !== null && current <= index) {
      if (current === index) {
        return temporal.value;
      }
      temporal = temporal.next;
      current++;
    }
    return undefined;
  }

  pop() {
    if (this.head === null) {
      return undefined;
    }

    let temporal = this.head;
    this.head = this.head.next;
    return temporal.value;
  }

  contains(value) {
    let temporal = this.head;
    while (temporal !== null) {
      if (temporal.value === value) {
        return true;
      }
      temporal = temporal.next;
    }
    return false;
  }

  findIndex(value) {
    let currIndex = 0;
    let temporal = this.head;

    while (temporal !== null) {
      if (temporal.value === value) {
        return currIndex;
      }
      currIndex++;
      temporal = temporal.next;
    }
    return -1;
  }

  insertAt(index, ...values) {
    if (index < 0 || index > this.size()) {
      throw RangeError("Index out of bounds");
    }

    if (values.length === 0) return;

    let temporal = this.head;
    let restOfList;

    if (index === 0) {
      restOfList = temporal;

      const newHead = new Node(values[0]);
      let current = newHead;

      for (let i = 1; i < values.length; i++) {
        current.next = new Node(values[i]);
        current = current.next;
      }
      current.next = restOfList;
      this.head = newHead;
      return;
    }

    let currentIndex = 0;

    while (temporal.next !== null && currentIndex <= index) {
      if (currentIndex + 1 === index) {
        break;
      }
      temporal = temporal.next;
      currentIndex++;
    }

    restOfList = temporal.next;

    for (const value of values) {
      temporal.next = new Node(value);
      temporal = temporal.next;
    }

    temporal.next = restOfList;
  }

  removeAt(index) {
    if (index < 0 || index >= this.size()) {
      throw RangeError("Index out of bounds");
    }

    if (index === 0) {
      this.head = this.head.next;
      return;
    }

    let temporal = this.head;
    let currIndex = 0;

    while (temporal !== null) {
      if (currIndex + 1 === index) {
        break;
      }
      temporal = temporal.next;
      currIndex++;
    }
    const restOfList = temporal.next.next;
    temporal.next = restOfList;
  }

  toString() {
    let stringList = "";
    let temporal = this.head;
    while (temporal !== null) {
      stringList += `( ${temporal.value} ) -> `;
      temporal = temporal.next;
    }
    stringList += "null";
    return stringList;
  }
}
