export const regex = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
  NUMERIC: /^[0-9]+$/,
  ALPHA: /^[a-zA-Z]+$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  URL: /^(ftp|http|https):\/\/[^ "]+$/,
  DATE: /^\d{4}-\d{2}-\d{2}$/,
  TIME: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
  HEX_COLOR: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
  CREDIT_CARD: /^(?:3[47]\d{2}([\s-]?)\d{6}\1\d{5}|(?:4\d|5[1-5]|65)\d{2}\d{5}\d{4}|6011([\s-]?)\d{4}\d{4}\d{4})$/,
  HTML_TAG: /<("[^"]*"|'[^']*'|[^'">])*>/,
  BASE64: /[^A-Za-z0-9+/=]/,
}

export type RegexType = {
  [k in keyof typeof regex]: RegExp
}

export const updateRegex = (newRegex: Partial<RegexType>) => {
  for (const key in newRegex) {
    if (newRegex.hasOwnProperty(key)) {
      if (regex.hasOwnProperty(key)) {
        const newValue = newRegex[key as keyof RegexType];
        if (newValue != undefined)
          regex[key as keyof RegexType] = newValue;
      } else {
        console.warn(`Regex key '${key}' does not exist.`);
      }
    }
  }
}
