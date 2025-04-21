import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import React from "react";
import {
  FaGem,
  FaRunning,
  FaHeart,
  FaFire,
  FaBullseye,
  FaBomb,
  FaBolt,
  FaAngleDoubleRight,
} from "react-icons/fa";
import {
  GiPistolGun,
  GiShotgun,
  GiMachineGun,
  GiMagicSwirl,
  GiSwordWound,
} from "react-icons/gi";
import {
  RiHeartPulseFill,
  RiTimerFlashFill,
  RiSpeedFill,
  RiShieldFlashFill,
  RiSwordFill,
} from "react-icons/ri";

/*
 * IMPORTANT NOTE ON SCORING:
 * According to the grading document, this project should have:
 * - 1015 total required points
 * - 320 total optional points
 * - 1335 grand total points
 *
 * The score overview is configured to display these totals even though the actual
 * implementation of all requirements may not yet be complete in the file.
 */

interface Requirement {
  id: string;
  title: string;
  persian_title: string;
  description: string;
  persian_description: string;
  score: number;
  is_optional: boolean;
  category: string;
}

interface Hero {
  id: string;
  name: string;
  hp: number;
  speed: number;
}

interface Weapon {
  id: string;
  name: string;
  damage: number;
  projectile: number;
  reload_time: number;
  max_ammo: number;
}

interface Ability {
  id: string;
  name: string;
  description: string;
  persian_description: string;
}

// LocalStorage key for completed requirements
const COMPLETED_REQUIREMENTS_KEY = "graphic_app_completed_requirements";

// const heroes: Hero[] = [
//   {
//     id: "shana",
//     name: "SHANA",
//     hp: 4,
//     speed: 4,
//   },
//   {
//     id: "diamond",
//     name: "DIAMOND",
//     hp: 7,
//     speed: 1,
//   },
//   {
//     id: "scarlet",
//     name: "SCARLET",
//     hp: 3,
//     speed: 5,
//   },
//   {
//     id: "lilith",
//     name: "LILITH",
//     hp: 5,
//     speed: 3,
//   },
//   {
//     id: "dasher",
//     name: "DASHER",
//     hp: 2,
//     speed: 10,
//   },
// ];

// const weapons: Weapon[] = [
//   {
//     id: "revolver",
//     name: "Revolver",
//     damage: 20,
//     projectile: 1,
//     reload_time: 1,
//     max_ammo: 6,
//   },
//   {
//     id: "shotgun",
//     name: "Shotgun",
//     damage: 10,
//     projectile: 4,
//     reload_time: 1,
//     max_ammo: 2,
//   },
//   {
//     id: "dual_smgs",
//     name: "Dual SMGs",
//     damage: 8,
//     projectile: 1,
//     reload_time: 2,
//     max_ammo: 24,
//   },
// ];

// const abilities: Ability[] = [
//   {
//     id: "witality",
//     name: "WITALITY",
//     description: "Increase maximum HP by 1 unit",
//     persian_description: "افزایش ماکسیمم hp به اندازه یک واحد",
//   },
//   {
//     id: "damager",
//     name: "DAMAGER",
//     description: "Increase weapon damage by 25% for 10 seconds",
//     persian_description: "افزایش ۲۵ درصدی میزان دمیج سلاح به مدت ۱۰ ثانیه",
//   },
//   {
//     id: "procrease",
//     name: "PROCREASE",
//     description: "Increase weapon projectile count by 1",
//     persian_description: "افزایش یک واحدی projectile سلاح",
//   },
//   {
//     id: "amocrease",
//     name: "AMOCREASE",
//     description: "Increase maximum ammo by 5",
//     persian_description: "افزایش ۵ واحدی حداکثر تعداد تیر های سلاح",
//   },
//   {
//     id: "speedy",
//     name: "SPEEDY",
//     description: "Double movement speed for 10 seconds",
//     persian_description: "۲ برابر شدن سرعت حرکت بازیکن به مدت ۱۰ ثانیه",
//   },
// ];

// // Add hero avatar images - you can replace these with better images for your project
// const heroImages = {
//   shana: "https://i.imgur.com/JQ5kAUX.png", // Female character with red theme
//   diamond: "https://i.imgur.com/VZRR6Ww.png", // Heavy armored character
//   scarlet: "https://i.imgur.com/8FTHvll.png", // Fast female character
//   lilith: "https://i.imgur.com/Yl7sx3H.png", // Magic wielder female character
//   dasher: "https://i.imgur.com/3kskAJH.png", // Quick male character
// };

// // Add weapon images
// const weaponImages = {
//   revolver: "https://i.imgur.com/N1QkBik.png",
//   shotgun: "https://i.imgur.com/rLIClmu.png",
//   dual_smgs: "https://i.imgur.com/NvRoSw8.png",
// };

// // Add ability icons - using appropriate icon components
// const abilityIcons = {
//   witality: <RiHeartPulseFill className="text-green-400 text-3xl" />,
//   damager: <FaFire className="text-red-400 text-3xl" />,
//   procrease: <FaBolt className="text-yellow-400 text-3xl" />,
//   amocrease: <FaBomb className="text-purple-400 text-3xl" />,
//   speedy: <RiSpeedFill className="text-blue-400 text-3xl" />,
// };

const requirements: Requirement[] = [
  // signup Requirements
  {
    id: "signup_username",
    title: "User Registration - Username & Password",
    persian_title: "ثبت نام - نام کاربری و رمز عبور",
    description: "Implement username and password registration functionality",
    persian_description: "امکان ثبت نام و وارد کردن نام کاربری و رمز عبور",
    score: 10,
    is_optional: false,
    category: "signup",
  },
  {
    id: "duplicate_registration",
    title: "Duplicate Registration Error",
    persian_title: "خطای ثبت نام تکراری",
    description:
      "Display appropriate error for duplicate registration attempts",
    persian_description: "نمایش خطای مناسب در صورت ثبت نام تکراری",
    score: 5,
    is_optional: false,
    category: "signup",
  },
  {
    id: "signup_validation",
    title: "Password Validation",
    persian_title: "اعتبارسنجی رمز عبور",
    description:
      "Password must be at least 8 characters, contain special characters (!@#$%^&*()_), a number, and an uppercase letter",
    persian_description:
      "رمز عبور باید حداقل دارای ۸ کاراکتر باشد و حداقل یکی از کاراکتر های خاص !@#$%&*()_! در آن استفاده شده باشد و حداقل یک عدد و یک حرف بزرگ انگلیسی نیز در آن باشد",
    score: 5,
    is_optional: false,
    category: "signup",
  },
  {
    id: "guest_login",
    title: "Guest Login",
    persian_title: "ورود به عنوان مهمان",
    description: "Allow skipping registration and playing as a guest",
    persian_description:
      "امکان skip کردن ثبت نام و ورود و شروع یک بازی به عنوان مهمان",
    score: 10,
    is_optional: false,
    category: "signup",
  },
  {
    id: "security_question",
    title: "Security Question",
    persian_title: "سوال امنیتی",
    description: "Implement security question for password recovery",
    persian_description: "قرار دادن سوال امنیتی برای فراموشی رمز عبور",
    score: 10,
    is_optional: false,
    category: "signup",
  },
  {
    id: "random_avatar",
    title: "Random Avatar Assignment",
    persian_title: "آواتار تصادفی",
    description: "Assign random avatar to user upon registration",
    persian_description: "نسبت دادن آواتار رندوم به کاربر هنگام ثبت‌نام",
    score: 10,
    is_optional: false,
    category: "signup",
  },

  // Main Menu Requirements
  {
    id: "menu_settings",
    title: "Settings Menu Access",
    persian_title: "دسترسی به منوی تنظیمات",
    description: "Access to settings menu from main menu",
    persian_description: "امکان ورود به منوی تنظیمات",
    score: 5,
    is_optional: false,
    category: "main menu",
  },
  {
    id: "menu_profile",
    title: "Profile Menu Access",
    persian_title: "دسترسی به منوی پروفایل",
    description: "Access to profile menu from main menu",
    persian_description: "امکان ورود به منوی پروفایل",
    score: 5,
    is_optional: false,
    category: "main menu",
  },
  {
    id: "menu_pregame",
    title: "Pre-game Menu Access",
    persian_title: "دسترسی به منوی pre-game",
    description: "Access to pre-game menu from main menu",
    persian_description: "امکان ورود به منو pre-game",
    score: 5,
    is_optional: false,
    category: "main menu",
  },
  {
    id: "menu_scoreboard",
    title: "Scoreboard Menu Access",
    persian_title: "دسترسی به منوی اسکوربرد",
    description: "Access to scoreboard menu from main menu",
    persian_description: "امکان ورود به منوی اسکوربرد",
    score: 5,
    is_optional: false,
    category: "main menu",
  },
  {
    id: "menu_hint",
    title: "Hint Menu Access",
    persian_title: "دسترسی به منوی هینت",
    description: "Access to hint (talent) menu from main menu",
    persian_description: "امکان ورود به منوی هینت (talent)",
    score: 5,
    is_optional: false,
    category: "main menu",
  },
  {
    id: "continue_saved",
    title: "Continue Saved Game",
    persian_title: "ادامه بازی ذخیره شده",
    description: "Button to continue saved game",
    persian_description: "داشتن دکمه ادامه بازی save شده",
    score: 5,
    is_optional: false,
    category: "main menu",
  },
  {
    id: "display_avatar",
    title: "User Avatar Display",
    persian_title: "نمایش آواتار کاربر",
    description: "Display user's avatar in main menu",
    persian_description: "نمایش آواتار کاربر",
    score: 5,
    is_optional: false,
    category: "main menu",
  },
  {
    id: "display_username",
    title: "Username Display",
    persian_title: "نمایش نام کاربری",
    description: "Display username in main menu",
    persian_description: "نمایش نام کاربری کاربر",
    score: 5,
    is_optional: false,
    category: "main menu",
  },
  {
    id: "display_score",
    title: "User Score Display",
    persian_title: "نمایش امتیاز کاربر",
    description: "Display user's score in main menu",
    persian_description: "نمایش امتیاز کاربر",
    score: 5,
    is_optional: false,
    category: "main menu",
  },
  {
    id: "logout",
    title: "Account Logout",
    persian_title: "خروج از حساب کاربری",
    description: "Option to log out from user account",
    persian_description: "امکان خروج از حساب کاربری",
    score: 10,
    is_optional: false,
    category: "main menu",
  },
  // Login Requirements
  {
    id: "login_basic",
    title: "Username & Password Login",
    persian_title: "ورود با نام کاربری و رمز عبور",
    description: "Allow login with username and password",
    persian_description:
      "امکان ثبت نام و ورود با وارد کردن نام کاربری و رمز عبور",
    score: 10,
    is_optional: false,
    category: "Login",
  },
  {
    id: "login_wrong_username",
    title: "Wrong Username Error",
    persian_title: "خطای نام کاربری اشتباه",
    description: "Display appropriate error for incorrect username",
    persian_description: "نمایش خطای مناسب در صورت نام کاربری اشتباه",
    score: 5,
    is_optional: false,
    category: "Login",
  },
  {
    id: "login_wrong_password",
    title: "Wrong Password Error",
    persian_title: "خطای رمز عبور اشتباه",
    description: "Display appropriate error for incorrect password",
    persian_description: "نمایش خطای مناسب در صورت وارد کردن رمز عبور اشتباه",
    score: 5,
    is_optional: false,
    category: "Login",
  },
  {
    id: "password_recovery",
    title: "Password Recovery",
    persian_title: "فراموشی رمز عبور",
    description: "Implement password recovery and change functionality",
    persian_description: "امکان انتخاب گزینه فراموشی رمز عبور و عوض کردن پسورد",
    score: 10,
    is_optional: false,
    category: "Login",
  },
  // Settings Menu Requirements
  {
    id: "music_volume",
    title: "Music Volume Control",
    persian_title: "کنترل صدای موزیک",
    description: "Adjust background music volume level",
    persian_description: "امکان تغییر میزان بلندی موزیک",
    score: 10,
    is_optional: false,
    category: "settings",
  },
  {
    id: "music_track",
    title: "Music Track Selection",
    persian_title: "انتخاب موزیک",
    description: "Change currently playing background music track",
    persian_description: "امکان تغییر موزیک درحال پخش",
    score: 10,
    is_optional: false,
    category: "settings",
  },
  {
    id: "sfx_toggle",
    title: "Sound Effects Toggle",
    persian_title: "کنترل افکت‌های صوتی",
    description: "Toggle game sound effects on/off",
    persian_description: "امکان قطع و وصل کردن sfx بازی",
    score: 10,
    is_optional: false,
    category: "settings",
  },
  {
    id: "keyboard_controls",
    title: "Keyboard Controls",
    persian_title: "تنظیمات کیبورد",
    description: "Customize keyboard control bindings",
    persian_description: "امکان تغییر کنترلر های کیبورد (دکمه های بازی)",
    score: 10,
    is_optional: false,
    category: "settings",
  },
  {
    id: "auto_reload",
    title: "Auto-Reload Setting",
    persian_title: "تنظیم بازآماده‌سازی خودکار",
    description: "Toggle automatic weapon reloading",
    persian_description: "امکان روشن/خاموش کردن auto-reload",
    score: 10,
    is_optional: true,
    category: "settings",
  },
  {
    id: "grayscale_mode",
    title: "Grayscale Mode",
    persian_title: "حالت سیاه و سفید",
    description: "Toggle grayscale display mode",
    persian_description: "امکان سیاه و سفید کردن نمایش بازی",
    score: 10,
    is_optional: true,
    category: "settings",
  },

  // Profile Requirements
  {
    id: "change_username",
    title: "Change Username",
    persian_title: "تغییر نام کاربری",
    description: "Allow users to change their username",
    persian_description: "امکان تغییر نام کاربری",
    score: 10,
    is_optional: false,
    category: "profile",
  },
  {
    id: "duplicate_username_error",
    title: "Duplicate Username Error",
    persian_title: "خطای نام کاربری تکراری",
    description: "Display error for duplicate username attempts",
    persian_description: "نمایش خطا درصورت تکراری بودن نام کاربری",
    score: 5,
    is_optional: false,
    category: "profile",
  },
  {
    id: "change_password",
    title: "Change Password",
    persian_title: "تغییر رمز عبور",
    description: "Allow users to change their password",
    persian_description: "امکان تغییر پسوورد",
    score: 10,
    is_optional: false,
    category: "profile",
  },
  {
    id: "weak_password_error",
    title: "Weak Password Error",
    persian_title: "خطای رمز عبور ساده",
    description: "Display error for weak password attempts",
    persian_description: "نمایش خطا درصورت ساده بودن پسوورد",
    score: 5,
    is_optional: false,
    category: "profile",
  },
  {
    id: "delete_account",
    title: "Delete Account",
    persian_title: "حذف حساب کاربری",
    description: "Allow users to delete their account",
    persian_description: "امکان حذف حساب کاربری",
    score: 10,
    is_optional: false,
    category: "profile",
  },
  {
    id: "select_preset_avatar",
    title: "Select Preset Avatar",
    persian_title: "انتخاب آواتار از تصاویر موجود",
    description: "Allow users to select avatar from preset images",
    persian_description: "امکان انتخاب آواتار از بین تصاویر موجود",
    score: 10,
    is_optional: false,
    category: "profile",
  },
  {
    id: "upload_custom_avatar",
    title: "Upload Custom Avatar",
    persian_title: "آپلود آواتار دلخواه",
    description: "Allow users to upload custom avatar from their system",
    persian_description:
      "امکان انتخاب فایل دلخواه از سیستم کاربر به عنوان آواتار",
    score: 15,
    is_optional: false,
    category: "profile",
  },
  {
    id: "drag_drop_avatar",
    title: "Drag & Drop Avatar",
    persian_title: "درگ و دراپ آواتار",
    description: "Allow users to change avatar through drag and drop",
    persian_description: "امکان تغییر آواتار توسط درگ و دراپ فایل",
    score: 20,
    is_optional: true,
    category: "profile",
  },

  // Add to requirements array
  {
    id: "select_hero",
    title: "Hero Selection",
    persian_title: "انتخاب hero",
    description: "Allow selecting a hero before starting the game",
    persian_description: "امکان انتخاب hero",
    score: 10,
    is_optional: false,
    category: "pre-game",
  },
  {
    id: "select_weapon",
    title: "Weapon Selection",
    persian_title: "انتخاب سلاح",
    description: "Allow selecting a weapon before starting the game",
    persian_description: "امکان انتخاب سلاح",
    score: 10,
    is_optional: false,
    category: "pre-game",
  },
  {
    id: "select_game_duration",
    title: "Game Duration Selection",
    persian_title: "انتخاب مدت زمان بازی",
    description: "Allow selecting game duration (2/5/10/20 minutes)",
    persian_description:
      "امکان انتخاب مدت زمان بازی دارای ۴ آپشن ۲/۵/۱۰/۲۰ دقیقه",
    score: 10,
    is_optional: false,
    category: "pre-game",
  },
  {
    id: "start_game",
    title: "Start Game",
    persian_title: "شروع بازی",
    description: "Start game with selected settings",
    persian_description: "امکان شروع بازی با تنظیمات انتخاب شده",
    score: 10,
    is_optional: false,
    category: "pre-game",
  },

  // Hint (Talent) Menu Requirements
  {
    id: "hero_hints",
    title: "Hero Hints",
    persian_title: "راهنمای قهرمانان",
    description: "Display hints about at least 3 heroes",
    persian_description: "نمایش راهنما درباره حداقل ۳ تا از hero ها",
    score: 5,
    is_optional: false,
    category: "hint",
  },
  {
    id: "game_keys",
    title: "Game Keys Display",
    persian_title: "نمایش کلیدهای بازی",
    description: "Display currently configured game keys",
    persian_description:
      "نمایش کلید هایی که در آن لحظه کاربر در تنظیمات بازی از آن‌ها استفاده می‌کند",
    score: 5,
    is_optional: false,
    category: "hint",
  },
  {
    id: "cheat_codes_hint",
    title: "Cheat Codes Display",
    persian_title: "نمایش کدهای تقلب",
    description: "Display cheat codes and their effects",
    persian_description: "نمایش کد های تقلب و کار هایی که انجام می‌دهند",
    score: 5,
    is_optional: false,
    category: "hint",
  },
  {
    id: "ability_info",
    title: "Ability Information",
    persian_title: "اطلاعات توانایی‌ها",
    description: "Display information about game abilities",
    persian_description: "نمایش کارایی ability های بازی",
    score: 5,
    is_optional: false,
    category: "hint",
  },

  // Pause Menu Requirements
  {
    id: "resume_game",
    title: "Resume Game",
    persian_title: "ادامه بازی",
    description: "Allow resuming the current game",
    persian_description: "امکان ادامه بازی درحال اجرا یا همان resume",
    score: 30,
    is_optional: false,
    category: "pause",
  },
  {
    id: "pause_cheat_codes",
    title: "Cheat Codes Display",
    persian_title: "نمایش کدهای تقلب",
    description: "Display available cheat codes",
    persian_description: "نمایش کد‌های تقلب بازی",
    score: 5,
    is_optional: false,
    category: "pause",
  },
  {
    id: "current_abilities",
    title: "Current Abilities",
    persian_title: "توانایی‌های فعلی",
    description: "Display currently acquired abilities",
    persian_description: "نمایش ability های به دست آمده در بازی فعلی",
    score: 10,
    is_optional: false,
    category: "pause",
  },
  {
    id: "give_up",
    title: "Give Up Option",
    persian_title: "تسلیم شدن",
    description: "Allow exiting and giving up the current game",
    persian_description: "امکان خروج و give up",
    score: 10,
    is_optional: false,
    category: "pause",
  },
  {
    id: "pause_grayscale",
    title: "Grayscale Toggle",
    persian_title: "حالت سیاه و سفید",
    description: "Toggle grayscale display mode",
    persian_description: "امکان سیاه و سفید کردن نمایش بازی",
    score: 5,
    is_optional: true,
    category: "pause",
  },
  {
    id: "save_and_exit",
    title: "Save and Exit",
    persian_title: "ذخیره و خروج",
    description: "Save game progress and exit",
    persian_description: "امکان سیو بازی و خروج",
    score: 5,
    is_optional: true,
    category: "pause",
  },

  // Scoreboard Requirements
  {
    id: "top_players",
    title: "Top Players Display",
    persian_title: "نمایش برترین‌ها",
    description: "Display username and score of top 10 players",
    persian_description: "نمایش نام کاربری و امتیاز ۱۰ کاربر برتر",
    score: 5,
    is_optional: false,
    category: "scoreboard",
  },
  {
    id: "kill_count",
    title: "Kill Count Display",
    persian_title: "نمایش تعداد کشته‌ها",
    description: "Display number of kills for each player",
    persian_description: "نمایش تعداد kill ها",
    score: 5,
    is_optional: false,
    category: "scoreboard",
  },
  {
    id: "survival_time",
    title: "Survival Time Display",
    persian_title: "نمایش زمان بقا",
    description: "Display longest survival time for each player",
    persian_description: "نمایش بیشتری مدت‌زمان زنده ماندن در بازی",
    score: 5,
    is_optional: false,
    category: "scoreboard",
  },
  {
    id: "sort_by_score",
    title: "Sort by Score",
    persian_title: "مرتب‌سازی بر اساس امتیاز",
    description: "Allow sorting players by score",
    persian_description: "امکان مرتب سازی بر اساس score",
    score: 10,
    is_optional: false,
    category: "scoreboard",
  },
  {
    id: "sort_by_username",
    title: "Sort by Username",
    persian_title: "مرتب‌سازی بر اساس نام کاربری",
    description: "Allow sorting players by username",
    persian_description: "امکان مرتب سازی بر اساس username",
    score: 10,
    is_optional: false,
    category: "scoreboard",
  },
  {
    id: "sort_by_kills",
    title: "Sort by Kills",
    persian_title: "مرتب‌سازی بر اساس تعداد کشته‌ها",
    description: "Allow sorting players by kill count",
    persian_description: "امکان مرتب سازی بر اساس kill",
    score: 10,
    is_optional: false,
    category: "scoreboard",
  },
  {
    id: "sort_by_survival",
    title: "Sort by Survival Time",
    persian_title: "مرتب‌سازی بر اساس زمان بقا",
    description: "Allow sorting players by survival time",
    persian_description: "امکان مرتب سازی بر اساس مدت زمان زنده ماندن",
    score: 5,
    is_optional: false,
    category: "scoreboard",
  },
  {
    id: "top_three_visual",
    title: "Top 3 Visual Effect",
    persian_title: "جلوه بصری سه نفر برتر",
    description: "Special visual effects for top 3 players",
    persian_description: "جلوه بصری متفارت برای ۳ نفر برتر",
    score: 5,
    is_optional: false,
    category: "scoreboard",
  },
  {
    id: "current_user_visual",
    title: "Current User Visual Effect",
    persian_title: "جلوه بصری کاربر فعلی",
    description: "Special visual effect for the logged-in user",
    persian_description: "جلوه بصری متفاوت برای کاربر لاگین شده",
    score: 5,
    is_optional: false,
    category: "scoreboard",
  },
];

const categories = [
  {
    id: "signup",
    title: "signup",
    icon: "🔐",
    description: "User signup and account management features",
  },
  {
    id: "main menu",
    title: "main menu",
    icon: "📋",
    description: "main menu and their functionalities",
  },
  {
    id: "login",
    title: "Login",
    icon: "🔑",
    description: "User login and password recovery features",
  },
  {
    id: "settings",
    title: "Settings",
    icon: "⚙️",
    description: "Game settings and customization options",
  },
  {
    id: "profile",
    title: "Profile",
    icon: "👤",
    description: "User profile management and customization features",
  },
  {
    id: "pre-game",
    title: "Pre-game",
    icon: "🎮",
    description: "Pre-game setup and configuration options",
  },
  {
    id: "hint",
    title: "Hint",
    icon: "💡",
    description: "Game hints and talent information",
  },
  {
    id: "pause",
    title: "Pause",
    icon: "⏸️",
    description: "In-game pause menu features",
  },
  {
    id: "scoreboard",
    title: "Scoreboard",
    icon: "🏆",
    description: "Game scoreboard and player rankings",
  },
];

export default function ProjectRequirements() {
  const [selectedCategory, setSelectedCategory] = useState("signup");
  const [hoveredRequirement, setHoveredRequirement] = useState<string | null>(
    null
  );
  const [completedRequirements, setCompletedRequirements] = useState<string[]>(
    []
  );
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Function to reset all saved progress
  const resetSavedProgress = () => {
    try {
      localStorage.removeItem(COMPLETED_REQUIREMENTS_KEY);
      setCompletedRequirements([]);
      console.log("Progress reset successfully");
    } catch (error) {
      console.error("Error resetting progress:", error);
    }
  };

  // Function to export progress as a JSON file
  const exportProgress = () => {
    try {
      const data = JSON.stringify({
        completedRequirements,
        exportDate: new Date().toISOString(),
        version: "1.0",
      });

      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `project-progress-${new Date()
        .toISOString()
        .slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting progress:", error);
      alert("Failed to export progress. See console for details.");
    }
  };

  // Function to import progress from a JSON file
  const importProgress = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const contents = e.target?.result as string;
          const parsed = JSON.parse(contents);

          if (Array.isArray(parsed.completedRequirements)) {
            setCompletedRequirements(parsed.completedRequirements);
            console.log(
              "Progress imported successfully:",
              parsed.completedRequirements
            );
          } else {
            throw new Error(
              "Invalid format: completedRequirements is not an array"
            );
          }
        } catch (error) {
          console.error("Error parsing import file:", error);
          alert(
            "Invalid file format. Please select a valid progress export file."
          );
        }
      };

      reader.readAsText(file);
    } catch (error) {
      console.error("Error importing progress:", error);
      alert("Failed to import progress. See console for details.");
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Load completed requirements from localStorage on mount
  useEffect(() => {
    // Check if localStorage is available
    const isLocalStorageAvailable = () => {
      try {
        const testKey = "test_storage";
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
      } catch (e) {
        return false;
      }
    };

    if (!isLocalStorageAvailable()) {
      console.error("localStorage is not available in this browser");
      setLoadError("localStorage is not available in your browser.");
      setDataLoaded(true);
      return;
    }

    try {
      console.log("Attempting to load from localStorage");
      const savedRequirements = localStorage.getItem(
        COMPLETED_REQUIREMENTS_KEY
      );
      console.log("Raw data from localStorage:", savedRequirements);

      if (savedRequirements) {
        const parsedRequirements = JSON.parse(savedRequirements);
        console.log("Loading saved requirements:", parsedRequirements);
        setCompletedRequirements(parsedRequirements);
        setDataLoaded(true);
      } else {
        console.log("No saved requirements found in localStorage");
        setDataLoaded(true);
      }
    } catch (error) {
      console.error("Error loading saved requirements:", error);
      setLoadError(
        "Failed to load saved progress. Storage might be corrupted."
      );
      setDataLoaded(true);
    }
  }, []);

  // Save completed requirements to localStorage when they change
  useEffect(() => {
    // Skip initial save on component mount
    if (!dataLoaded) {
      console.log("Skipping initial save, data not yet loaded");
      return;
    }

    try {
      console.log(
        "Saving requirements to localStorage:",
        completedRequirements
      );
      const dataToSave = JSON.stringify(completedRequirements);
      console.log("Stringified data:", dataToSave);

      localStorage.setItem(COMPLETED_REQUIREMENTS_KEY, dataToSave);

      // Verify storage worked
      const savedData = localStorage.getItem(COMPLETED_REQUIREMENTS_KEY);
      console.log("Verification - data in localStorage:", savedData);

      if (savedData !== dataToSave) {
        console.error("Storage verification failed! Data mismatch.");
      }
    } catch (error) {
      console.error("Error saving requirements:", error);
    }
  }, [completedRequirements, dataLoaded]);

  // Toggle requirement completion
  const toggleRequirement = (id: string) => {
    setCompletedRequirements((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((reqId) => reqId !== id)
        : [...prev, id];

      console.log(`Requirement ${id} toggled. Updated list:`, updated);
      return updated;
    });
  };

  // Calculate completed scores for a category
  const calculateCategoryScores = (categoryId: string) => {
    const categoryReqs = requirements.filter(
      (req) => req.category.toLowerCase() === categoryId
    );

    const completed = categoryReqs
      .filter((req) => completedRequirements.includes(req.id))
      .reduce((sum, req) => sum + req.score, 0);

    const total = categoryReqs.reduce((sum, req) => sum + req.score, 0);

    const optionalCompleted = categoryReqs
      .filter(
        (req) => req.is_optional && completedRequirements.includes(req.id)
      )
      .reduce((sum, req) => sum + req.score, 0);

    const requiredCompleted = completed - optionalCompleted;

    const optionalTotal = categoryReqs
      .filter((req) => req.is_optional)
      .reduce((sum, req) => sum + req.score, 0);

    const requiredTotal = total - optionalTotal;

    return {
      completed,
      total,
      optionalCompleted,
      optionalTotal,
      requiredCompleted,
      requiredTotal,
    };
  };

  // Calculate total completed scores
  const calculateTotalScores = () => {
    const completed = requirements
      .filter((req) => completedRequirements.includes(req.id))
      .reduce((sum, req) => sum + req.score, 0);

    const total = requirements.reduce((sum, req) => sum + req.score, 0);

    const optionalCompleted = requirements
      .filter(
        (req) => req.is_optional && completedRequirements.includes(req.id)
      )
      .reduce((sum, req) => sum + req.score, 0);

    const requiredCompleted = completed - optionalCompleted;

    const optionalTotal = requirements
      .filter((req) => req.is_optional)
      .reduce((sum, req) => sum + req.score, 0);

    const requiredTotal = total - optionalTotal;

    return {
      completed,
      total,
      optionalCompleted,
      optionalTotal,
      requiredCompleted,
      requiredTotal,
    };
  };

  // const renderGameElements = () => {
  //   if (selectedCategory !== "characters") return null;

  //   return <div className="space-y-16"></div>;
  // };

  const renderScoreOverview = () => {
    const scores = calculateTotalScores();

    // Override scores with the values from the CSV
    const csvScores = {
      requiredTotal: 1015,
      optionalTotal: 320,
      total: 1335,
      requiredCompleted: scores.requiredCompleted,
      optionalCompleted: scores.optionalCompleted,
      completed: scores.completed,
    };

    const categoryScores = categories
      .filter((cat) => cat.id !== "score-overview")
      .map((category) => {
        const catScores = calculateCategoryScores(category.id);
        return {
          ...category,
          required: catScores.requiredTotal,
          requiredCompleted: catScores.requiredCompleted,
          optional: catScores.optionalTotal,
          optionalCompleted: catScores.optionalCompleted,
          total: catScores.total,
          completed: catScores.completed,
        };
      })
      .filter((cat) => cat.required > 0 || cat.optional > 0);

    return (
      <div className="space-y-12">
        {/* Total Score Overview */}
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            className="glass p-8 rounded-xl relative overflow-hidden shadow-glow"
            whileHover={{
              scale: 1.03,
              boxShadow: "0 20px 25px -5px rgba(34, 197, 94, 0.1)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-[#f85c70]/10" />
            <h4 className="text-2xl font-orbitron mb-6 text-green-400 text-center">
              Required Score
            </h4>
            <div className="flex justify-center items-center gap-2">
              <p className="text-5xl font-space-grotesk text-center text-white">
                {scores.requiredCompleted}
              </p>
              <p className="text-2xl font-space-grotesk text-center text-gray-400">
                / {csvScores.requiredTotal}
              </p>
            </div>
            {/* Progress Bar */}
            <div className="mt-6 h-3 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-600 to-green-400"
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    (scores.requiredCompleted / csvScores.requiredTotal) * 100
                  }%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          <motion.div
            className="glass p-8 rounded-xl relative overflow-hidden shadow-glow"
            whileHover={{
              scale: 1.03,
              boxShadow: "0 20px 25px -5px rgba(168, 85, 247, 0.1)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-[#f85c70]/10" />
            <h4 className="text-2xl font-orbitron mb-6 text-purple-400 text-center">
              Optional Score
            </h4>
            <div className="flex justify-center items-center gap-2">
              <p className="text-5xl font-space-grotesk text-center text-white">
                {scores.optionalCompleted}
              </p>
              <p className="text-2xl font-space-grotesk text-center text-gray-400">
                / {csvScores.optionalTotal}
              </p>
            </div>
            {/* Progress Bar */}
            <div className="mt-6 h-3 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    (scores.optionalCompleted / csvScores.optionalTotal) * 100
                  }%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          <motion.div
            className="glass p-8 rounded-xl relative overflow-hidden shadow-glow"
            whileHover={{
              scale: 1.03,
              boxShadow: "0 20px 25px -5px rgba(248, 92, 112, 0.1)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#f85c70]/10 to-blue-500/10" />
            <h4 className="text-2xl font-orbitron mb-6 text-[#f85c70] text-center">
              Total Score
            </h4>
            <div className="flex justify-center items-center gap-2">
              <p className="text-5xl font-space-grotesk text-center text-white">
                {scores.completed}
              </p>
              <p className="text-2xl font-space-grotesk text-center text-gray-400">
                / {csvScores.total}
              </p>
            </div>
            {/* Progress Bar */}
            <div className="mt-6 h-3 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#f85c70]/60 to-[#f85c70]"
                initial={{ width: 0 }}
                animate={{
                  width: `${(scores.completed / csvScores.total) * 100}%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Category Breakdown */}
        <div>
          <motion.h3
            className="text-3xl font-orbitron text-[#f85c70] mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Score Breakdown by Category
          </motion.h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryScores.map((category, idx) => (
              <motion.div
                key={category.id}
                className="glass p-6 rounded-xl relative overflow-hidden group"
                whileHover={{ scale: 1.03, y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#f85c70]/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity" />
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl">{category.icon}</span>
                  <h4 className="text-xl font-orbitron text-[#f85c70]">
                    {category.title}
                  </h4>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-space-grotesk">
                      Required
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-32 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-green-600 to-green-400"
                          initial={{ width: 0 }}
                          animate={{
                            width:
                              category.required > 0
                                ? `${
                                    (category.requiredCompleted /
                                      category.required) *
                                    100
                                  }%`
                                : "0%",
                          }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-green-400 font-space-grotesk">
                        {category.requiredCompleted}/{category.required}
                      </span>
                    </div>
                  </div>
                  {category.optional > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-space-grotesk">
                        Optional
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-32 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${
                                (category.optionalCompleted /
                                  category.optional) *
                                100
                              }%`,
                            }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                        <span className="text-purple-400 font-space-grotesk">
                          {category.optionalCompleted}/{category.optional}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom highlight */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f85c70] to-transparent opacity-0 group-hover:opacity-70 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Checkbox animation variants
  const checkboxVariants = {
    unchecked: {
      scale: 0.9,
      opacity: 0.7,
      backgroundColor: "rgba(30, 30, 30, 0.7)",
      borderColor: "rgba(248, 92, 112, 0.4)",
    },
    checked: {
      scale: 1,
      opacity: 1,
      backgroundColor: "rgba(248, 92, 112, 0.9)",
      borderColor: "rgba(248, 92, 112, 1)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.3,
      },
    },
    hover: {
      scale: 1.1,
      boxShadow: "0 0 12px rgba(248, 92, 112, 0.5)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.9 },
  };

  // Checkmark animation variants
  const checkmarkVariants = {
    unchecked: { pathLength: 0, opacity: 0 },
    checked: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-5xl md:text-6xl font-orbitron font-bold mb-8 text-center text-glow bg-clip-text text-transparent bg-gradient-to-r from-[#f85c70] to-[#f85c70]/80"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Project Requirements
        </motion.h2>

        {/* Hero section with animated text */}
        <motion.div
          className="mb-10 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p className="text-xl text-gray-300 font-space-grotesk mb-6">
            Track your project progress and keep score of completed requirements
          </p>
        </motion.div>

        {/* Storage Status Messages with improved styling */}
        <div className="mb-12">
          <div className="flex justify-center items-center gap-4 mb-4">
            {!dataLoaded ? (
              <motion.div
                className="px-6 py-3 rounded-xl bg-blue-500/20 text-blue-400 text-sm font-space-grotesk backdrop-blur-sm border border-blue-500/20"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="animate-spin h-5 w-5 text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading saved progress...
                </div>
              </motion.div>
            ) : loadError ? (
              <motion.div
                className="px-6 py-3 rounded-xl bg-red-500/20 text-red-400 text-sm font-space-grotesk flex items-center gap-3 backdrop-blur-sm border border-red-500/20"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"
                    fill="currentColor"
                  />
                </svg>
                {loadError}
              </motion.div>
            ) : completedRequirements.length > 0 ? (
              <motion.div
                className="px-6 py-3 rounded-xl bg-green-500/20 text-green-400 text-sm font-space-grotesk flex items-center gap-3 backdrop-blur-sm border border-green-500/20"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.177-7.86l-2.765-2.767L7 12.431l3.119 3.121a1 1 0 001.414 0l5.952-5.95-1.062-1.062-5.6 5.6z"
                    fill="currentColor"
                  />
                </svg>
                Progress loaded successfully ({completedRequirements.length}{" "}
                items completed)
              </motion.div>
            ) : (
              <motion.div
                className="px-6 py-3 rounded-xl bg-gray-500/20 text-gray-400 text-sm font-space-grotesk backdrop-blur-sm border border-gray-500/20"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                No saved progress found. Start checking off requirements!
              </motion.div>
            )}
          </div>
        </div>

        {/* Action Buttons with improved styling */}
        <div className="flex justify-center items-center gap-4 flex-wrap mb-12">
          {/* Reset Button */}
          {completedRequirements.length > 0 && (
            <motion.button
              className="px-6 py-3 rounded-xl bg-red-500/10 text-red-400 text-sm font-space-grotesk hover:bg-red-500/20 transition-colors flex items-center gap-3 border border-red-500/20"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to reset all progress? This cannot be undone."
                  )
                ) {
                  resetSavedProgress();
                }
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgba(248, 92, 112, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"
                  fill="currentColor"
                />
              </svg>
              Reset Progress
            </motion.button>
          )}

          {/* Export Button */}
          {dataLoaded && (
            <motion.button
              className="px-6 py-3 rounded-xl bg-blue-500/10 text-blue-400 text-sm font-space-grotesk hover:bg-blue-500/20 transition-colors flex items-center gap-3 border border-blue-500/20"
              onClick={exportProgress}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              title="Export your progress as a JSON file"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 10h5l-6-6-6 6h5v8h2v-8zm-9 9h16v-7h2v8a1 1 0 01-1 1H3a1 1 0 01-1-1v-8h2v7z"
                  fill="currentColor"
                />
              </svg>
              Export Progress
            </motion.button>
          )}

          {/* Import Button */}
          {dataLoaded && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                onChange={importProgress}
                accept=".json"
                className="hidden"
                id="import-progress-file"
              />
              <motion.button
                className="px-6 py-3 rounded-xl bg-purple-500/10 text-purple-400 text-sm font-space-grotesk hover:bg-purple-500/20 transition-colors flex items-center gap-3 border border-purple-500/20"
                onClick={() => fileInputRef.current?.click()}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(168, 85, 247, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                title="Import progress from a JSON file"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 14h5l-6 6-6-6h5V6h2v8zm-9 5h16v-7h2v8a1 1 0 01-1 1H3a1 1 0 01-1-1v-8h2v7z"
                    fill="currentColor"
                  />
                </svg>
                Import Progress
              </motion.button>
            </>
          )}
        </div>

        {/* Category Navigation with improved styling - Tab-like */}
        <div className="mb-16">
          {/* Tab Header */}
          <div className="relative mb-2">
            {/* Bottom Border */}
            <div className="absolute bottom-0 w-full h-0.5 bg-gray-800"></div>

            {/* Tab-Like Buttons */}
            <div className="flex flex-wrap overflow-x-auto hide-scrollbar gap-1 justify-center pb-1">
              {categories.map((category, idx) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-5 py-3 rounded-t-lg relative ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-b from-[#f85c70]/10 to-[#18101e] text-[#f85c70]"
                      : "text-gray-400 hover:text-gray-200"
                  } transition-colors flex items-center gap-2`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                >
                  {/* Tab Bottom Highlight - Only for Active Tab */}
                  {selectedCategory === category.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f85c70]"
                      layoutId="tabIndicator"
                    />
                  )}

                  {/* Icon and Text */}
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-orbitron text-sm whitespace-nowrap">
                    {category.title}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Tab Description */}
          <motion.div
            className="glass rounded-xl p-4 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            key={`description-${selectedCategory}`}
          >
            <p className="text-gray-300 font-space-grotesk text-center">
              {categories.find((c) => c.id === selectedCategory)?.description}
            </p>
          </motion.div>

          {/* Tab Content */}
          <div className="relative min-h-[500px]">
            <motion.div
              key={`tab-content-${selectedCategory}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {selectedCategory === "score-overview" ? (
                renderScoreOverview()
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                  {requirements
                    .filter(
                      (req) => req.category.toLowerCase() === selectedCategory
                    )
                    .map((requirement) => (
                      <motion.div
                        key={requirement.id}
                        className={`glass p-6 rounded-lg relative group ${
                          requirement.is_optional
                            ? "border border-[#f85c70]/30"
                            : ""
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.2 },
                        }}
                        style={{
                          zIndex:
                            hoveredRequirement === requirement.id ? 50 : 1,
                        }}
                      >
                        {/* Card Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#f85c70]/5 to-purple-500/5 group-hover:from-[#f85c70]/10 group-hover:to-purple-500/10 transition-all duration-300" />

                        {/* Header Section */}
                        <div className="relative flex items-start justify-between mb-6">
                          <div className="flex items-center gap-3">
                            {/* Checkbox */}
                            <motion.div
                              className="relative w-10 h-10 rounded-full border-2 cursor-pointer flex items-center justify-center"
                              variants={checkboxVariants}
                              initial="unchecked"
                              animate={
                                completedRequirements.includes(requirement.id)
                                  ? "checked"
                                  : "unchecked"
                              }
                              whileHover="hover"
                              whileTap="tap"
                              onClick={() => toggleRequirement(requirement.id)}
                            >
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                              >
                                <motion.path
                                  d="M3.5 9.5L7 13L14.5 5.5"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  variants={checkmarkVariants}
                                  initial="unchecked"
                                  animate={
                                    completedRequirements.includes(
                                      requirement.id
                                    )
                                      ? "checked"
                                      : "unchecked"
                                  }
                                />
                              </svg>

                              {/* Score Badge */}
                              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#f85c70]/20 flex items-center justify-center">
                                <span className="text-[#f85c70] text-xs font-bold">
                                  {requirement.score}
                                </span>
                              </div>
                            </motion.div>

                            {/* Title */}
                            <h3 className="text-xl font-orbitron text-[#f85c70] text-glow">
                              {requirement.title}
                            </h3>
                          </div>

                          {/* Optional Badge */}
                          {requirement.is_optional && (
                            <div className="px-2 py-1 rounded-full bg-[#f85c70]/10 text-[#f85c70] text-xs font-space-grotesk">
                              Optional
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <div className="relative">
                          <p className="text-gray-300 font-space-grotesk mb-4">
                            {requirement.description}
                          </p>

                          {/* Translation Button Container */}
                          <div className="absolute -top-1 right-0 group/trans">
                            <motion.div
                              className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f85c70]/20 to-purple-500/20 
                                   flex items-center justify-center cursor-pointer backdrop-blur-sm 
                                   border border-[#f85c70]/20 shadow-lg hover:shadow-[#f85c70]/20"
                              whileHover={{
                                scale: 1.1,
                                backgroundColor: "rgba(248, 92, 112, 0.3)",
                              }}
                              whileTap={{ scale: 0.95 }}
                              onHoverStart={() =>
                                setHoveredRequirement(requirement.id)
                              }
                              onHoverEnd={() => setHoveredRequirement(null)}
                            >
                              <span className="text-[#f85c70] text-sm font-nastaliq">
                                فا
                              </span>
                            </motion.div>

                            {/* Persian Tooltip */}
                            {/* Persian Tooltip */}
                            {hoveredRequirement === requirement.id && (
                              <motion.div
                                className="absolute w-[300px] 
                                   bg-gradient-to-br from-black/95 to-[#18101e]/95 
                                   backdrop-blur-md rounded-lg shadow-xl
                                   border border-[#f85c70]/20"
                                style={{
                                  top: "calc(100% + 12px)",
                                  right: "0",
                                  zIndex: 100,
                                }}
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 20,
                                }}
                              >
                                {/* Tooltip Arrow */}
                                <div
                                  className="absolute -top-2 right-3 w-4 h-4 bg-gradient-to-br from-black/95 to-[#18101e]/95 
                                        transform rotate-45 border-t border-r border-[#f85c70]/20"
                                />

                                {/* Content Container */}
                                <div className="relative p-4">
                                  <div
                                    className="text-right space-y-3"
                                    dir="rtl"
                                  >
                                    <motion.h4
                                      className="text-lg font-nastaliq text-[#f85c70] leading-relaxed"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.1 }}
                                    >
                                      {requirement.persian_title}
                                    </motion.h4>
                                    <motion.p
                                      className="text-gray-300 font-nastaliq text-base leading-relaxed"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.2 }}
                                    >
                                      {requirement.persian_description}
                                    </motion.p>
                                  </div>

                                  {/* Decorative Elements */}
                                  <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f85c70]/20 to-transparent" />
                                  <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f85c70]/20 to-transparent" />
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>

                        {/* Status message for completed requirements */}
                        {completedRequirements.includes(requirement.id) && (
                          <motion.div
                            className="mt-4 pt-3 border-t border-[#f85c70]/20 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <motion.span
                              className="text-green-400 text-sm font-space-grotesk"
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                              }}
                            >
                              ✓ Completed
                            </motion.span>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* CSS for tab scrollbar hiding */}
          <style jsx global>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .shadow-glow {
              box-shadow: 0 0 15px rgba(248, 92, 112, 0.15);
            }
            .text-glow {
              text-shadow: 0 0 10px rgba(248, 92, 112, 0.3);
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
