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
import { useRequirements } from "@/context/RequirementsContext";

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

export const requirements: Requirement[] = [
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

  // Game Controls Requirements
  {
    id: "wasd_movement",
    title: "WASD Movement",
    persian_title: "حرکت با دکمه‌های WASD",
    description:
      "Allow character movement using W-A-S-D keys (configurable in settings)",
    persian_description:
      "امکان حرکت کاراکتر اصلی با استفاده از دکمه‌های w-a-s-d به صورت پیش‌فرض. این دکمه‌ها از طریق منو تنظیمات قابل تغییرند",
    score: 10,
    is_optional: false,
    category: "controls",
  },
  {
    id: "diagonal_movement",
    title: "Diagonal Movement",
    persian_title: "حرکت در جهت‌های غیر اصلی",
    description:
      "Allow diagonal movement by pressing two WASD keys simultaneously",
    persian_description:
      "امکان حرکت در جهت‌های غیر اصلی با استفاده همزمان از دو دکمه w-a-s-d",
    score: 10,
    is_optional: false,
    category: "controls",
  },
  {
    id: "mouse_shooting",
    title: "Mouse Shooting",
    persian_title: "شلیک با ماوس",
    description:
      "Shoot projectiles using left mouse click in mouse direction (configurable)",
    persian_description:
      "امکان شلیک گلوله با استفاده از چپ کلیک ماوس (قابل تغییر در تنظیمات) شلیک کردن باید در راستای مکان قرارگیری ماوس باشد",
    score: 10,
    is_optional: false,
    category: "controls",
  },
  {
    id: "auto_aim",
    title: "Auto-aim System",
    persian_title: "سیستم auto-aim",
    description:
      "Toggle auto-aim with spacebar, automatically targeting nearest enemy",
    persian_description:
      "داشتن سیستم auto-aim که با دکمه space فعال و غیرفعال می‌شود. این سیستم به این‌گونه کار می‌کند: همواره هدف را روی نزدیک‌ترین دشمن قرار می‌دهد، به سمت آن شلیک می‌کند و مکان قرارگیری ماوس به صورت خودکار روی دشمن قرار می‌گیرد",
    score: 20,
    is_optional: true,
    category: "controls",
  },
  {
    id: "weapon_reload",
    title: "Weapon Reload",
    persian_title: "بازآماده‌سازی سلاح",
    description:
      "Reload weapon using R key (configurable), preventing shooting during reload",
    persian_description:
      "امکان ریلود اسلحه با استفاده از دکمه R (قابل تغییر در منو تنظیمات) به این صورت که در زمان ریلود سلاح نمیتواند شلیک انجام دهد",
    score: 10,
    is_optional: false,
    category: "controls",
  },

  // Enemies Requirements
  {
    id: "random_spawn",
    title: "Random Enemy Spawn",
    persian_title: "ظهور تصادفی دشمن‌ها",
    description: "Enemies spawn randomly from different directions",
    persian_description:
      "دشمن ها به صورت تصادفی از جهت‌‌های مختلف زمین به بازی وارد شوند",
    score: 5,
    is_optional: false,
    category: "enemies",
  },
  {
    id: "enemy_movement",
    title: "Enemy Movement",
    persian_title: "حرکت دشمن‌ها",
    description: "Enemies constantly move towards the character",
    persian_description: "دشمن ها به سمت کاراکتر همواره در حرکت باشند",
    score: 10,
    is_optional: false,
    category: "enemies",
  },
  {
    id: "enemy_damage",
    title: "Enemy Damage System",
    persian_title: "سیستم آسیب دشمن‌ها",
    description: "Reduce enemy health when hit by character projectiles",
    persian_description: "کم شدن جان دشمن‌ها در صورت برخورد با گلوله‌های کرکتر",
    score: 15,
    is_optional: false,
    category: "enemies",
  },
  {
    id: "enemy_drops",
    title: "Enemy Drops",
    persian_title: "رها کردن دانه توسط دشمن‌ها",
    description: "Enemies drop collectible items upon death",
    persian_description: "پس از کشته شدن انمی ها دانه ای دراپ شود",
    score: 10,
    is_optional: false,
    category: "enemies",
  },
  {
    id: "spawn_rate",
    title: "Dynamic Spawn Rate",
    persian_title: "نرخ ظهور پویا",
    description: "Enemy spawn rate increases over time",
    persian_description: "با گذشت زمان ریت اسپاون شدن دشمن‌ها باید سریعتر شود",
    score: 5,
    is_optional: false,
    category: "enemies",
  },
  {
    id: "tree_enemy",
    title: "Tree Enemy",
    persian_title: "دشمن درخت",
    description: "Trees placed randomly at game start",
    persian_description:
      "در ابتدای شروع کردن بازی به صورت رندوم در جاهای مختلف قرار گیرند",
    score: 5,
    is_optional: false,
    category: "enemies",
  },
  {
    id: "tentacle_monster",
    title: "Tentacle Monster",
    persian_title: "هیولای تنتاکل",
    description: "Basic enemy that moves towards player (HP: 25)",
    persian_description:
      "این دشمن ساده‌ترین دشمن بازی است که صرفا به سمت شما حرکت می‌کند. HP: 25",
    score: 5,
    is_optional: false,
    category: "enemies",
  },
  {
    id: "tentacle_spawn_rate",
    title: "Tentacle Monster Spawn Rate",
    persian_title: "نرخ ظهور هیولای تنتاکل",
    description: "Spawn rate based on game time: i/30 enemies every 3 seconds",
    persian_description:
      "اگر i ثانیه از زمان بازی گذشته باشد i/30 دشمن از این نوع در هر 3 ثانیه اسپان میشود",
    score: 10,
    is_optional: false,
    category: "enemies",
  },
  {
    id: "eyebat_enemy",
    title: "Eyebat Enemy",
    persian_title: "دشمن چشم خفاشی",
    description: "Flying enemy that shoots at player every 3 seconds (HP: 50)",
    persian_description:
      "این دشمن هر ۳ ثانیه یک‌بار یک تیر به سمت کرکتر شلیک می‌کند و هر تیر یک دمیج به کرکتر می‌زند. HP: 50",
    score: 20,
    is_optional: false,
    category: "enemies",
  },
  {
    id: "eyebat_spawn_rate",
    title: "Eyebat Spawn Rate",
    persian_title: "نرخ ظهور چشم خفاشی",
    description: "Complex spawn rate based on game time",
    persian_description: "نرخ ظهور پیچیده بر اساس زمان کل بازی",
    score: 15,
    is_optional: false,
    category: "enemies",
  },
  {
    id: "elder_boss",
    title: "Elder Boss Fight",
    persian_title: "نبرد با باس Elder",
    description:
      "Boss spawns at half game time, dashes every 5 seconds (HP: 400)",
    persian_description:
      "پس از گذشتن نصف زمان تعیین شده برای بازی در کنار اتفاقات در جریان بازی یه انمی بزرگ اسپان میشود که هر ۵ ثانیه به سمت کاراکتر dash میزند",
    score: 40,
    is_optional: true,
    category: "enemies",
  },
  {
    id: "elder_barrier",
    title: "Elder Barrier System",
    persian_title: "سیستم حفاظ Elder",
    description: "Shrinking barrier that damages player on contact",
    persian_description:
      "حفاظی ابتدا به اندازه صفحه کشیده می‌شود که با جلو رفتن زمان این حفاظ کوچکتر شده و کاراکتر با برخورد به آن دمیج می‌خورد",
    score: 30,
    is_optional: true,
    category: "enemies",
  },

  // Character Requirements
  {
    id: "xp_collection",
    title: "XP Collection",
    persian_title: "جمع‌آوری XP",
    description: "Gain 3 XP from each enemy drop",
    persian_description:
      "با دریافت دانه ای که توسط دشمن ها رها شده است توسط کارکتر XP کسب کنید. به ازای هر دانه ۳ XP",
    score: 10,
    is_optional: false,
    category: "character",
  },
  {
    id: "character_damage",
    title: "Character Damage System",
    persian_title: "سیستم آسیب کاراکتر",
    description:
      "Reduce character health on collision with trees, enemies, or projectiles",
    persian_description:
      "کم شدن جان کرکتر در صورت برخورد با درخت‌ها یا دشمن‌ها و تیر‌های آنها",
    score: 15,
    is_optional: false,
    category: "character",
  },
  {
    id: "invincibility",
    title: "Invincibility Frame",
    persian_title: "حالت شکست‌ناپذیری",
    description: "1 second invincibility after enemy collision",
    persian_description:
      "کرکتر پس از برخورد با انمی ها به مدت 1 ثانیه invincible میشود",
    score: 15,
    is_optional: true,
    category: "character",
  },
  {
    id: "random_ability",
    title: "Random Ability Gain",
    persian_title: "دریافت توانایی تصادفی",
    description: "Gain random ability on level up",
    persian_description:
      "حالت اول: یک ابیلیتی رندوم به کاربر داده میشود و نمایش داده میشود",
    score: 10,
    is_optional: false,
    category: "character",
  },
  {
    id: "ability_choice",
    title: "Ability Choice System",
    persian_title: "سیستم انتخاب توانایی",
    description: "Choose from 3 random abilities on level up",
    persian_description:
      "حالت دوم: بازی متوقف شده و 3 ابیلیتی رندوم نمایش داده میشود و کاربر میتواند یکی از آنها را انتخاب کند",
    score: 20,
    is_optional: true,
    category: "character",
  },
  {
    id: "level_progression",
    title: "Level Progression System",
    persian_title: "سیستم پیشرفت سطح",
    description: "Level up requires 20i new XP for level i to i+1",
    persian_description:
      "برای رفتن از لول i به لول i+1 نیازمند 20i exp جدید است",
    score: 5,
    is_optional: false,
    category: "character",
  },
  // Character Heroes
  {
    id: "hero_shana",
    title: "SHANA Hero",
    persian_title: "قهرمان شانا",
    description: "Implement SHANA hero (HP: 4, Speed: 4)",
    persian_description: "پیاده‌سازی قهرمان شانا با HP: 4 و Speed: 4",
    score: 10,
    is_optional: false,
    category: "character",
  },
  {
    id: "hero_diamond",
    title: "DIAMOND Hero",
    persian_title: "قهرمان دایمند",
    description: "Implement DIAMOND hero (HP: 7, Speed: 1)",
    persian_description: "پیاده‌سازی قهرمان دایمند با HP: 7 و Speed: 1",
    score: 10,
    is_optional: false,
    category: "character",
  },
  {
    id: "hero_scarlet",
    title: "SCARLET Hero",
    persian_title: "قهرمان اسکارلت",
    description: "Implement SCARLET hero (HP: 3, Speed: 5)",
    persian_description: "پیاده‌سازی قهرمان اسکارلت با HP: 3 و Speed: 5",
    score: 10,
    is_optional: false,
    category: "character",
  },
  {
    id: "hero_lilith",
    title: "LILITH Hero",
    persian_title: "قهرمان لیلیث",
    description: "Implement LILITH hero (HP: 5, Speed: 3)",
    persian_description: "پیاده‌سازی قهرمان لیلیث با HP: 5 و Speed: 3",
    score: 10,
    is_optional: false,
    category: "character",
  },
  {
    id: "hero_dasher",
    title: "DASHER Hero",
    persian_title: "قهرمان دشر",
    description: "Implement DASHER hero (HP: 2, Speed: 10)",
    persian_description: "پیاده‌سازی قهرمان دشر با HP: 2 و Speed: 10",
    score: 10,
    is_optional: false,
    category: "character",
  },

  // Weapons Requirements
  {
    id: "ammo_system",
    title: "Ammo System",
    persian_title: "سیستم مهمات",
    description: "Implement maximum ammo and auto-reload system",
    persian_description:
      "سلاح ها ماکزیمم تیر برای خشاب دارند که در صورت خالی شدن باید ریلود شود",
    score: 10,
    is_optional: false,
    category: "weapons",
  },
  {
    id: "weapon_revolver",
    title: "Revolver Weapon",
    persian_title: "سلاح رولور",
    description:
      "Implement Revolver (Damage: 20, Projectile: 1, Reload: 1s, Ammo: 6)",
    persian_description:
      "پیاده‌سازی سلاح رولور با Damage: 20, Projectile: 1, Reload Time: 1s, Max Ammo: 6",
    score: 10,
    is_optional: false,
    category: "weapons",
  },
  {
    id: "weapon_shotgun",
    title: "Shotgun Weapon",
    persian_title: "سلاح شاتگان",
    description:
      "Implement Shotgun (Damage: 10, Projectile: 4, Reload: 1s, Ammo: 2)",
    persian_description:
      "پیاده‌سازی سلاح شاتگان با Damage: 10, Projectile: 4, Reload Time: 1s, Max Ammo: 2",
    score: 10,
    is_optional: false,
    category: "weapons",
  },
  {
    id: "weapon_dual_smgs",
    title: "Dual SMGs Weapon",
    persian_title: "سلاح دوتایی SMG",
    description:
      "Implement Dual SMGs (Damage: 8, Projectile: 1, Reload: 2s, Ammo: 24)",
    persian_description:
      "پیاده‌سازی سلاح دوتایی SMG با Damage: 8, Projectile: 1, Reload Time: 2s, Max Ammo: 24",
    score: 10,
    is_optional: false,
    category: "weapons",
  },

  // Abilities Requirements
  {
    id: "ability_vitality",
    title: "VITALITY Ability",
    persian_title: "توانایی VITALITY",
    description: "Increase maximum HP by 1 unit",
    persian_description: "افزایش ماکسیمم HP به اندازه یک واحد",
    score: 15,
    is_optional: false,
    category: "abilities",
  },
  {
    id: "ability_damager",
    title: "DAMAGER Ability",
    persian_title: "توانایی DAMAGER",
    description: "Increase weapon damage by 25% for 10 seconds",
    persian_description: "افزایش ۲۵ درصدی میزان دمیج سلاح به مدت ۱۰ ثانیه",
    score: 15,
    is_optional: false,
    category: "abilities",
  },
  {
    id: "ability_procrease",
    title: "PROCREASE Ability",
    persian_title: "توانایی PROCREASE",
    description: "Increase weapon projectile count by 1",
    persian_description: "افزایش یک واحدی Projectile سلاح",
    score: 15,
    is_optional: false,
    category: "abilities",
  },
  {
    id: "ability_amocrease",
    title: "AMOCREASE Ability",
    persian_title: "توانایی AMOCREASE",
    description: "Increase maximum ammo by 5",
    persian_description: "افزایش ۵ واحدی حداکثر تعداد تیرهای سلاح",
    score: 15,
    is_optional: false,
    category: "abilities",
  },
  {
    id: "ability_speedy",
    title: "SPEEDY Ability",
    persian_title: "توانایی SPEEDY",
    description: "Double movement speed for 10 seconds",
    persian_description: "۲ برابر شدن سرعت حرکت بازیکن به مدت ۱۰ ثانیه",
    score: 15,
    is_optional: false,
    category: "abilities",
  },

  // Game End Requirements
  {
    id: "end_give_up",
    title: "Give Up Ending",
    persian_title: "پایان با تسلیم",
    description: "End game when player chooses to give up",
    persian_description: "بازیکن از طریق منو pause اقدام به give up کردن کند",
    score: 10,
    is_optional: false,
    category: "game_end",
  },
  {
    id: "end_death",
    title: "Death Ending",
    persian_title: "پایان با مرگ",
    description: "End game when character health reaches 0",
    persian_description: "تعداد جان های کاراکتر به 0 برسد",
    score: 10,
    is_optional: false,
    category: "game_end",
  },
  {
    id: "end_time",
    title: "Time Victory",
    persian_title: "پایان با پیروزی",
    description: "End game with victory when time runs out",
    persian_description: "زمان بازی تمام شود (برد)",
    score: 10,
    is_optional: false,
    category: "game_end",
  },

  // Game Save Requirements
  {
    id: "save_system",
    title: "Complete Save System",
    persian_title: "سیستم ذخیره‌سازی کامل",
    description: "Save and restore complete game state",
    persian_description:
      "در صورت انتخاب آپشن خروج از بازی و ذخیره در منوی pause تمام اطلاعات مرتبط به بازی ذخیره شود و کاربر بتواند حتی پس از دوباره اجرا کردن برنامه از نو، بازی سیو شده را از جایی که سیو شده بازی کند",
    score: 50,
    is_optional: true,
    category: "game_save",
  },

  // Add to requirements array
  {
    id: "cheat_reduce_time",
    title: "Reduce Game Time",
    persian_title: "کاهش زمان باقی‌مانده",
    description: "Reduce remaining game time by 1 minute",
    persian_description: "کم شدن زمان باقی‌مانده از بازی به میزان یک دقیقه",
    score: 5,
    is_optional: false,
    category: "cheat_codes",
  },
  {
    id: "cheat_level_up",
    title: "Level Up Character",
    persian_title: "افزایش سطح کاراکتر",
    description: "Level up character with full animation and ability selection",
    persian_description:
      "اضافه شدن لول کاراکتر با اجرای کامل انیمیشن و دریافت ability",
    score: 5,
    is_optional: false,
    category: "cheat_codes",
  },
  {
    id: "cheat_restore_health",
    title: "Restore Health",
    persian_title: "بازیابی جان",
    description: "Restore health when empty (only works with no health)",
    persian_description: "دریافت جان اضافه در صورت خالی بودن جان",
    score: 5,
    is_optional: false,
    category: "cheat_codes",
  },
  {
    id: "cheat_boss_fight",
    title: "Trigger Boss Fight",
    persian_title: "شروع نبرد با باس",
    description: "Skip to boss fight immediately",
    persian_description: "رفتن به باس فایت",
    score: 5,
    is_optional: false,
    category: "cheat_codes",
  },
  {
    id: "cheat_custom",
    title: "Custom Cheat Code",
    persian_title: "کد تقلب دلخواه",
    description: "Implement one reasonable custom cheat code",
    persian_description: "یک مورد کد تقلب دلخواه (چیز معقولی باشد)",
    score: 5,
    is_optional: true,
    category: "cheat_codes",
  },
  // Add to requirements array
  {
    id: "centered_camera",
    title: "Centered Camera",
    persian_title: "دوربین مرکزی",
    description: "Keep character centered on screen while game world moves",
    persian_description:
      "کاراکتر اصلی همواره در مرکز صفحه بازی باشد و زمین بازی و سایر عناصر حرکت کنند",
    score: 10,
    is_optional: false,
    category: "visual_details",
  },
  {
    id: "projectile_animation",
    title: "Projectile Animation",
    persian_title: "انیمیشن حرکت تیر",
    description: "Show projectile movement animation in shooting direction",
    persian_description:
      "هنگامی که تیر شلیک می‌شود، انیمیشن حرکت تیر در صفحه در راستای شلیک شده تا برخورد به دشمن قابل مشاهدا باشد",
    score: 10,
    is_optional: false,
    category: "visual_details",
  },
  {
    id: "health_display",
    title: "Health Display",
    persian_title: "نمایش جان‌های باقیمانده",
    description: "Display remaining health points",
    persian_description: "نمایش تعداد جان های باقیمانده",
    score: 5,
    is_optional: false,
    category: "visual_details",
  },
  {
    id: "time_display",
    title: "Time Display",
    persian_title: "نمایش زمان باقیمانده",
    description: "Display remaining game time",
    persian_description: "نمایش زمان باقیمانده",
    score: 5,
    is_optional: false,
    category: "visual_details",
  },
  {
    id: "kills_display",
    title: "Kills Display",
    persian_title: "نمایش تعداد کشته‌ها",
    description: "Display current kill count",
    persian_description: "نمایش تعداد کیل ها تا این لحظه",
    score: 5,
    is_optional: false,
    category: "visual_details",
  },
  {
    id: "ammo_display",
    title: "Ammo Display",
    persian_title: "نمایش مهمات باقیمانده",
    description: "Display remaining ammo in magazine",
    persian_description: "نمایش تیر های باقی‌مانده در خشاب",
    score: 5,
    is_optional: false,
    category: "visual_details",
  },
  {
    id: "level_display",
    title: "Level Display",
    persian_title: "نمایش سطح کاراکتر",
    description: "Display character level",
    persian_description: "نمایش لول کرکتر",
    score: 5,
    is_optional: false,
    category: "visual_details",
  },
  {
    id: "level_progress",
    title: "Level Progress Bar",
    persian_title: "نوار پیشرفت سطح",
    description: "Display XP progress bar for current level",
    persian_description:
      "نواری که نشان دهد در آن لول بازیکن چقدر xp نیاز دارد تا بتواند به مرحله بعدی برود",
    score: 5,
    is_optional: false,
    category: "visual_details",
  },
  {
    id: "damage_animation",
    title: "Damage Animation",
    persian_title: "انیمیشن آسیب دیدن",
    description: "Show animation when character takes damage",
    persian_description:
      "با برخورد تیر با کراکتر اصلی، انیمیشنی در کنار کاراکتر نمایش داده شود که نشان دهد تیر با کاراکتر برخورد کرده است",
    score: 15,
    is_optional: false,
    category: "visual_details",
  },
  {
    id: "enemy_death_animation",
    title: "Enemy Death Animation",
    persian_title: "انیمیشن نابودی دشمن",
    description: "Show animation when enemies are destroyed",
    persian_description:
      "هنگامی که انمی ها ازبین می‌روند، انیمیشنی در همان نقطه نمایش داده شود که نابود شدن انمی را نمایش دهد",
    score: 15,
    is_optional: false,
    category: "visual_details",
  },
  {
    id: "character_light",
    title: "Character Light Radius",
    persian_title: "روشنایی اطراف کاراکتر",
    description: "Brighter area with specific radius around character",
    persian_description: "روشن تر بودن ناحیه ای با شعاع مشخص اطراف کاراکتر",
    score: 10,
    is_optional: false,
    category: "visual_details",
  },
  {
    id: "enemy_knockback",
    title: "Enemy Knockback",
    persian_title: "عقب‌نشینی دشمن",
    description: "Enemies move slightly backward when hit",
    persian_description: "حرکت کوچک به عقب در صورت تیر خوردن انمی ها",
    score: 15,
    is_optional: true,
    category: "visual_details",
  },
  {
    id: "custom_font",
    title: "Custom Font",
    persian_title: "فونت مخصوص",
    description: "Use custom font in game",
    persian_description: "استفاده از فونت مخصوص",
    score: 5,
    is_optional: false,
    category: "visual_details",
  },
  {
    id: "custom_cursor",
    title: "Custom Cursor",
    persian_title: "نشانگر مخصوص",
    description: "Use custom cursor in game",
    persian_description: "استفاده از کرسر مخصوص",
    score: 5,
    is_optional: false,
    category: "visual_details",
  },
  {
    id: "auto_aim_cursor",
    title: "Auto-aim Cursor",
    persian_title: "نشانگر auto-aim",
    description: "Show cursor on targeted enemy in auto-aim mode",
    persian_description:
      "نمایش کرسر موس روی انمی ای که aim روی آن است (در حالت auto-aim)",
    score: 10,
    is_optional: true,
    category: "visual_details",
  },
  {
    id: "character_movement_animation",
    title: "Character Movement Animation",
    persian_title: "انیمیشن حرکت کاراکترها",
    description: "Animated walking movement for characters and enemies",
    persian_description:
      "کاراکترها، چه انمی ها و چه بازیکن به جای اینکه یک عکس ثابت درحال حرکت باشد، هنگام حرکت حالت گام برداشتن را داشته باشد",
    score: 20,
    is_optional: true,
    category: "visual_details",
  },
  {
    id: "game_end_username",
    title: "End Screen - Username",
    persian_title: "صفحه پایان - نام کاربری",
    description: "Display username on game end screen",
    persian_description: "نمایش یوزرنیم در صفحه پایان بازی",
    score: 5,
    is_optional: false,
    category: "visual_details",
  },
  {
    id: "game_end_survival_time",
    title: "End Screen - Survival Time",
    persian_title: "صفحه پایان - زمان بقا",
    description: "Display survival time on game end screen",
    persian_description: "نمایش زمان زنده ماندن در صفحه پایان بازی",
    score: 5,
    is_optional: false,
    category: "visual_details",
  },
  {
    id: "game_end_kills",
    title: "End Screen - Kill Count",
    persian_title: "صفحه پایان - تعداد کشته‌ها",
    description: "Display kill count on game end screen",
    persian_description: "نمایش تعداد کیل های آن بازی در صفحه پایان",
    score: 5,
    is_optional: false,
    category: "visual_details",
  },
  {
    id: "game_end_score",
    title: "End Screen - Score",
    persian_title: "صفحه پایان - امتیاز",
    description: "Display score (survival_time * kills) on game end screen",
    persian_description:
      "نمایش امتیاز به دست آمده با استفاده از فرمول: survival_time(seconds)*kills",
    score: 5,
    is_optional: false,
    category: "visual_details",
  },
  {
    id: "game_end_status",
    title: "End Screen - Game Status",
    persian_title: "صفحه پایان - وضعیت بازی",
    description: "Display dead/win status on game end screen",
    persian_description: "نمایش dead/win با توجه به برنده یا بازنده شدن بازیکن",
    score: 5,
    is_optional: false,
    category: "visual_details",
  },
  {
    id: "game_end_give_up",
    title: "End Screen - Give Up",
    persian_title: "صفحه پایان - تسلیم",
    description: "Show dead screen when player gives up",
    persian_description:
      "در صورت give up کردن صفحه ای مانند حالت dead نمایش داده شود",
    score: 5,
    is_optional: false,
    category: "visual_details",
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
  {
    id: "controls",
    title: "Game Controls",
    icon: "🎮",
    description: "Game control mechanics and key bindings",
  },
  {
    id: "enemies",
    title: "Enemies",
    icon: "👾",
    description: "Enemy types and behavior mechanics",
  },
  {
    id: "character",
    title: "Character",
    icon: "🦸",
    description: "Character mechanics and progression",
  },
  {
    id: "weapons",
    title: "Weapons",
    icon: "🔫",
    description: "Weapon systems and mechanics",
  },
  {
    id: "abilities",
    title: "Abilities",
    icon: "⚡",
    description: "Character abilities and power-ups",
  },
  {
    id: "game_end",
    title: "Game End",
    icon: "🏁",
    description: "Game ending conditions and mechanics",
  },
  {
    id: "game_save",
    title: "Game Save",
    icon: "💾",
    description: "Game save and load functionality",
  },
  {
    id: "cheat_codes",
    title: "Cheat Codes",
    icon: "🎮",
    description: "Game cheat codes and special commands",
  },
  {
    id: "visual_details",
    title: "Visual Details",
    icon: "🎨",
    description: "Game visual elements and animations",
  },
];

export default function ProjectRequirements() {
  const [selectedCategory, setSelectedCategory] = useState("signup");
  const [hoveredRequirement, setHoveredRequirement] = useState<string | null>(
    null
  );
  const { completedRequirements, toggleRequirement, resetProgress, loading } =
    useRequirements();
  const [loadError, setLoadError] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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
            // Update localStorage with the imported data
            localStorage.setItem(
              COMPLETED_REQUIREMENTS_KEY,
              JSON.stringify(parsed.completedRequirements)
            );

            // Force a reload to apply the changes
            window.location.reload();
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
          Requirements
        </motion.h2>

        {/* Hero section with animated text */}
        <motion.div
          className="mb-10 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p className="text-xl text-gray-300 font-space-grotesk mb-6">
            Track your Practice progress and keep score of completed
            requirements
          </p>
        </motion.div>

        {/* Storage Status Messages with improved styling */}
        <div className="mb-12">
          <div className="flex justify-center items-center gap-4 mb-4">
            {loading ? (
              <motion.div
                className="px-6 py-3 rounded-xl bg-blue-500/20 text-blue-400 text-sm font-space-grotesk backdrop-blur-sm border border-blue-500/20"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-400"
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
                  resetProgress();
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
          {!loading && (
            <motion.button
              className="px-6 py-3 rounded-xl bg-blue-500/10 text-blue-400 text-sm font-space-grotesk hover:bg-blue-500/20 transition-colors flex items-center gap-3 border border-blue-500/20"
              onClick={exportProgress}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.1)",
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Export Progress
            </motion.button>
          )}

          {/* Import Button */}
          {!loading && (
            <>
              <input
                type="file"
                id="fileInput"
                ref={fileInputRef}
                onChange={importProgress}
                style={{ display: "none" }}
                accept=".json"
              />
              <motion.button
                className="px-6 py-3 rounded-xl bg-green-500/10 text-green-400 text-sm font-space-grotesk hover:bg-green-500/20 transition-colors flex items-center gap-3 border border-green-500/20"
                onClick={() => fileInputRef.current?.click()}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(34, 197, 94, 0.1)",
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
