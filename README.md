# Phraze

**Phraze** is a lightweight, developer-friendly i18n library for Deno and Fresh.

- Simple API: `phraze.it(key, options)`
- Dynamic language loading: `phraze.load(lang, messages)`
- Supports pluralization, variables, fallback languages
- Works great with SSR frameworks like Fresh

## Usage Example: Overriding `fallbackLang`

You can override the fallback language for a specific translation by passing the `fallbackLang` option:

```ts
phraze.it("greeting", { lang: "fr", fallbackLang: "en" });
```

## Installation

```ts
import { phraze } from "https://deno.land/x/phraze/mod.ts";