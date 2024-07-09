import logo from "/logo_prosto_ofp.webp";
import main_page_hero from "/main_page_hero.webp";
import main_page_background from "/main_background.svg";

import fb_icon from "/icons/facebook-icon.svg";
import google_icon from "/icons//google-icon.svg";
import telegram_icon from "/icons//telegram-icon.svg";
import errorImg from "/errorImage_150.webp";

import flag_ru_RU from "/flags/ru-RU.png";
import flag_en_US from "/flags/en-US.png";
import flag_he_HE from "/flags/he-IL.png";

export const website_errorImg = () => {
  return errorImg;
};

export const websitelogo = () => {
  return logo;
};

export const website_main_page_hero = () => {
  return main_page_hero;
};

export const website_main_page_background = () => {
  return main_page_background;
};

export const website_fb_icon = () => {
  return fb_icon;
};

export const website_google_icon = () => {
  return google_icon;
};

export const website_telegram_icon = () => {
  return telegram_icon;
};

export const website_flag_ru_RU = () => {
  return flag_ru_RU;
};

export const website_flag_en_US = () => {
  return flag_en_US;
};

export const website_flag_he_HE = () => {
  return flag_he_HE;
};

export const selectLanguageFlag = (val: string) => {
  switch (val) {
    case "ru-RU":
      return website_flag_ru_RU();
    case "en-US":
      return website_flag_en_US();
    case "he-IL":
      return website_flag_he_HE();
    default:
      return website_flag_en_US();
  }
};
