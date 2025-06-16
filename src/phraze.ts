export interface Messages {
  [key: string]: string | Messages;
}

interface TranslateOptions {
  lang?: string;
  vars?: Record<string, string | number>;
  count?: number;
  fallbackLang?: string;
}

const messages: Record<string, Messages> = {};
let currentLang = "en";
const defaultFallbackLang = "en";

function resolvePath(obj: Messages, path: string): string | Messages | undefined {
  return path.split(".").reduce<string | Messages | undefined>((acc, key) => {
    if (acc && typeof acc === "object") {
      return acc[key];
    }
    return undefined;
  }, obj);
}

function interpolate(str: string, vars: Record<string, string | number> = {}): string {
  return str.replace(/{(\w+)}/g, (_, key) => String(vars[key] ?? ""));
}

function getTranslation(lang: string, key: string, count?: number): string | undefined {
  let value = resolvePath(messages[lang], key);

  if (typeof value === "object" && count !== undefined) {
    const form = count === 1 ? "one" : "other";
    value = value[form] ?? value["other"];
  }

  return typeof value === "string" ? value : undefined;
}

export const phraze = {
  it(key: string, opts: TranslateOptions = {}): string {
    const lang = opts.lang ?? currentLang;
    const trans =
      getTranslation(lang, key, opts.count) ??
      getTranslation(opts.fallbackLang ?? defaultFallbackLang, key, opts.count);

    const vars = opts.count !== undefined ? { ...(opts.vars ?? {}), count: opts.count } : { ...(opts.vars ?? {}) };
    return trans ? interpolate(trans, vars) : key;
  },

  set(lang: string) {
    currentLang = lang;
  },

  get(): string {
    return currentLang;
  },

  available(): string[] {
    return Object.keys(messages);
  },

  load(lang: string, data: Messages) {
    messages[lang] = deepMerge(messages[lang] || {}, data);
  },
};

/**
 * Deeply merges two Messages objects.
 */
function deepMerge(target: Messages, source: Messages): Messages {
  const result: Messages = { ...target };
  for (const key in source) {
    if (
      Object.prototype.hasOwnProperty.call(source, key) &&
      typeof source[key] === "object" &&
      source[key] !== null &&
      !Array.isArray(source[key]) &&
      typeof result[key] === "object" &&
      result[key] !== null &&
      !Array.isArray(result[key])
    ) {
      result[key] = deepMerge(result[key] as Messages, source[key] as Messages);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}
