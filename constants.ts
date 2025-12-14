import { AppMode, Language, Translation } from './types';

export const TRANSLATIONS: Record<Language, Translation> = {
  en: {
    title: "Fusion AI",
    uploadTitle: "Upload Images",
    image1Label: "First Image (Adult/Man/Main)",
    image2Label: "Second Image (Child/Woman/Secondary)",
    generateBtn: "Merge / Generate",
    downloadBtn: "Download Image",
    loading: "Processing with AI...",
    selectMode: "Select Effect",
    modes: {
      [AppMode.HUG_PAST_SELF]: "Hug My Past Self",
      [AppMode.COUPLE_KISS]: "Couple Kissing",
      [AppMode.STANDING_TOGETHER]: "Standing Together",
      [AppMode.ZOO_BACKGROUND]: "Zoo Background",
      [AppMode.SMOOTH_FACE]: "Face Retouching",
      [AppMode.CUSTOM_TEXT]: "Custom Text Edit",
    },
    footer: "Designed by Haitham Al-Nuaimi",
    customPromptPlaceholder: "Describe how you want to change the image...",
  },
  ar: {
    title: "الذكاء الاصطناعي للدمج",
    uploadTitle: "رفع الصور",
    image1Label: "الصورة الأولى (الكبير/الشاب/الرئيسية)",
    image2Label: "الصورة الثانية (الصغير/الفتاة/الثانوية)",
    generateBtn: "دمج / إنشاء",
    downloadBtn: "تحميل الصورة",
    loading: "جارٍ المعالجة بالذكاء الاصطناعي...",
    selectMode: "اختر التأثير",
    modes: {
      [AppMode.HUG_PAST_SELF]: "دمج الكبير يحضن الصغير",
      [AppMode.COUPLE_KISS]: "دمج قبلة (شاب وفتاة)",
      [AppMode.STANDING_TOGETHER]: "دمج وقوف معاً",
      [AppMode.ZOO_BACKGROUND]: "خلفية حديقة حيوانات",
      [AppMode.SMOOTH_FACE]: "تصفية الوجه",
      [AppMode.CUSTOM_TEXT]: "تعديل عبر النص",
    },
    footer: "تصميم هيثم النعيمي",
    customPromptPlaceholder: "اكتب وصفاً للتعديل الذي تريده...",
  },
  fa: {
    title: "هوش مصنوعی فیوژن",
    uploadTitle: "بارگذاری تصاویر",
    image1Label: "تصویر اول (بزرگسال/مرد/اصلی)",
    image2Label: "تصویر دوم (کودک/زن/ثانویه)",
    generateBtn: "ادغام / تولید",
    downloadBtn: "دانلود تصویر",
    loading: "در حال پردازش با هوش مصنوعی...",
    selectMode: "انتخاب حالت",
    modes: {
      [AppMode.HUG_PAST_SELF]: "آغوش با کودکی",
      [AppMode.COUPLE_KISS]: "بوسه زوجین",
      [AppMode.STANDING_TOGETHER]: "ایستاده کنار هم",
      [AppMode.ZOO_BACKGROUND]: "پس‌زمینه باغ وحش",
      [AppMode.SMOOTH_FACE]: "رتوش صورت",
      [AppMode.CUSTOM_TEXT]: "ویرایش متنی",
    },
    footer: "طراحی توسط هیثم النعیمی",
    customPromptPlaceholder: "توضیح دهید چه تغییری می‌خواهید...",
  },
};

export const INSTAGRAM_LINK = "https://instagram.com/h1.1hk";

export const MODE_CONFIG: Record<AppMode, { requiresTwoImages: boolean }> = {
  [AppMode.HUG_PAST_SELF]: { requiresTwoImages: true },
  [AppMode.COUPLE_KISS]: { requiresTwoImages: true },
  [AppMode.STANDING_TOGETHER]: { requiresTwoImages: true },
  [AppMode.ZOO_BACKGROUND]: { requiresTwoImages: false },
  [AppMode.SMOOTH_FACE]: { requiresTwoImages: false },
  [AppMode.CUSTOM_TEXT]: { requiresTwoImages: false },
};