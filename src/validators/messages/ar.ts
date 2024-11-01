import { ErrorMessage } from "./index";

export const ar: ErrorMessage = {
  noMessage: "No Error Message Was Provided!",
  string: {
    required: "هذا الحقل إلزامي!",
    notEmpty: "هذا الحقل إلزامي!",
    min: "الحد الأدنى للطول هو %1",
    max: "الحد الأقصى للطول هو %1",
    includes: "يجب أن يحتوي على \"%1\"",
    includesAll: "يجب أن يحتوي على الكل: %1",
    startsWith: "يجب أن يبدأ بـ \"%1\"",
    endsWith: "يجب أن ينتهي بـ \"%1\"",
    matches: "لا يتطابق مع النمط المطلوب",
    email: "صيغة البريد الإلكتروني غير صالحة",
    phone: "صيغة الهاتف غير صالحة",
    url: "صيغة الرابط غير صالحة",
    date: "صيغة التاريخ غير صالحة",
    time: "صيغة الوقت غير صالحة",
    hexColor: "صيغة اللون الهكساديسيمال غير صالحة",
    creditCard: "صيغة رقم بطاقة الائتمان غير صالحة",
    htmlTag: "صيغة العلامة HTML غير صالحة",
    base64: "صيغة Base64 غير صالحة",
    alphanumeric: "يجب أن يحتوي على حروف أبجدية وأرقام فقط",
    numeric: "يجب أن يحتوي على أرقام فقط",
    alpha: "يجب أن يحتوي على حروف أبجدية فقط",
    as: "القيمة يجب أن تكون كـ '%1'",
  },
  number: {
    required: "هذا الحقل إلزامي!",
    min: "القيمة يجب أن تكون أكبر من أو تساوي %1",
    max: "القيمة يجب أن تكون أصغر من أو تساوي %1",
    range: "القيمة يجب أن تكون بين %1 و %2",
    integer: "القيمة يجب أن تكون عدد صحيح",
    positive: "القيمة يجب أن تكون إيجابية",
    negative: "القيمة يجب أن تكون سالبة",
    decimal: "القيمة يجب أن تكون عددًا عشريًا",
    multipleOf: "القيمة يجب أن تكون مضاعفة لـ %1",
    betweenExclusive: "القيمة يجب أن تكون بين %1 (حصريًا) و %2 (حصريًا)",
    even: "القيمة يجب أن تكون عددًا زوجيًا",
    odd: "القيمة يجب أن تكون عددًا فرديًا",
    positiveInteger: "القيمة يجب أن تكون عددًا صحيحًا موجبًا",
    negativeInteger: "القيمة يجب أن تكون عددًا صحيحًا سالبًا",
    positiveDecimal: "القيمة يجب أن تكون عددًا عشريًا موجبًا",
    negativeDecimal: "القيمة يجب أن تكون عددًا عشريًا سالبًا",
    divisibleBy: "القيمة يجب أن تكون قابلة للقسمة على %1",
    perfectSquare: "القيمة يجب أن تكون عددًا مربعًا مثاليًا",
    primeNumber: "القيمة يجب أن تكون عددًا أوليًا",
    fibonacciNumber: "القيمة يجب أن تكون عددًا في سلسلة فيبوناتشي",
    powerOfTwo: "القيمة يجب أن تكون عددًا مربعًا للعدد 2",
    as: "القيمة يجب أن تكون كـ '%1'",
  },
  boolean: {
    required: "هذا الحقل إلزامي!",
    true: "القيمة يجب أن تكون 'صحيحة'",
    false: "القيمة يجب أن تكون 'خاطئة'",
    equals: "القيمة يجب أن تكون %1",
    as: "القيمة يجب أن تكون '%1'",
  },
  array: {
    length: "القيمة يجب أن تكون بطول %1",
    min: "الحد الأدنى للطول المطلوب هو %1",
    max: "الحد الأقصى المسموح به هو %1",
    has: "القيمة يجب أن تتضمن %1",
    hasAll: "القيمة يجب أن تتضمن الكل من: %1",
    hasAny: "القيمة يجب أن تتضمن أيًا من: %1",
    hasNone: "القيمة يجب أن لا تتضمن أيًا من: %1",
    some: "المصفوفة لا تتطابق مع الشرط المعطى!",
    every: "المصفوفة لا تتطابق مع الشرط المعطى!",
  },
  datetime: {
    required: "هذا الحقل إلزامي!",
    equals: "القيمة يجب أن تكون %1",
    after: "يجب أن يكون التاريخ بعد %1",
    before: "يجب أن يكون التاريخ قبل %1",
    between: "يجب أن يكون التاريخ بين %1 و %2",
    todayOrAfter: "يجب أن يكون التاريخ اليوم أو بعد اليوم",
    todayOrBefore: "يجب أن يكون التاريخ اليوم أو قبل اليوم",
    past: "يجب أن يكون التاريخ في الماضي",
    future: "يجب أن يكون التاريخ في المستقبل",
    weekday: "يجب أن يكون التاريخ يومًا عمليًا",
    weekend: "يجب أن يكون التاريخ عطلة نهاية أسبوع",
    as: "القيمة يجب أن تكون كـ '%1'",
  },
  date: {
    required: "هذا الحقل إلزامي!",
    equals: "القيمة يجب أن تكون %1",
    after: "يجب أن يكون التاريخ بعد %1",
    before: "يجب أن يكون التاريخ قبل %1",
    between: "يجب أن يكون التاريخ بين %1 و %2",
    todayOrAfter: "يجب أن يكون التاريخ اليوم أو بعد اليوم",
    todayOrBefore: "يجب أن يكون التاريخ اليوم أو قبل اليوم",
    past: "يجب أن يكون التاريخ في الماضي",
    future: "يجب أن يكون التاريخ في المستقبل",
    weekday: "يجب أن يكون التاريخ يومًا عمليًا",
    weekend: "يجب أن يكون التاريخ عطلة نهاية أسبوع",
    leapYear: "يجب أن يكون التاريخ في سنة كبيسة",
    sameDayAs: "يجب أن يكون التاريخ نفس اليوم كـ %1",
    as: "القيمة يجب أن تكون كـ '%1'",
  },
  time: {
    required: "هذا الحقل إلزامي!",
    equals: "القيمة يجب أن تكون %1",
    after: "يجب أن يكون الوقت بعد %1",
    before: "يجب أن يكون الوقت قبل %1",
    between: "يجب أن يكون الوقت بين %1 و %2",
    nowOrAfter: "يجب أن يكون الوقت الآن أو بعد الآن",
    nowOrBefore: "يجب أن يكون الوقت الآن أو قبل الآن",
    past: "يجب أن يكون الوقت في الماضي",
    future: "يجب أن يكون الوقت في المستقبل",
    within24Hours: "يجب أن يكون الوقت خلال الـ 24 ساعة القادمة",
    as: "القيمة يجب أن تكون كـ '%1'",
  },
};
