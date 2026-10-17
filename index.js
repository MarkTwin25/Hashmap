import { HashMap } from "./Hashmap.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

// Update value keys
test.set("apple", "red2");
test.set("lion", "golden2");

// Add a new element
test.set("moon", "silver");
test.set("sun", "ultra-yellow");

console.log(test.length());
console.log(test.capacity);
console.log(test.entries());
