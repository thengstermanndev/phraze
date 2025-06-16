import { phraze } from "./mod.ts";

// Load English
phraze.load("en", {
  greeting: "Hello {name}!",
  items: {
    one: "{count} item",
    other: "{count} items"
  },
});

// Load German
phraze.load("de", {
  greeting: "Hallo {name}!",
  items: {
    one: "{count} Artikel",
    other: "{count} Artikel"
  },
});

// Use it
phraze.set("en");
console.log(phraze.it("greeting", { vars: { name: "Anna" } }));
console.log(phraze.it("items", { count: 1 }));

phraze.set("de");
console.log(phraze.it("greeting", { vars: { name: "Max" } }));
console.log(phraze.it("items", { count: 3 }));