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

const heroes: Hero[] = [
  {
    id: "shana",
    name: "SHANA",
    hp: 4,
    speed: 4,
  },
  {
    id: "diamond",
    name: "DIAMOND",
    hp: 7,
    speed: 1,
  },
  {
    id: "scarlet",
    name: "SCARLET",
    hp: 3,
    speed: 5,
  },
  {
    id: "lilith",
    name: "LILITH",
    hp: 5,
    speed: 3,
  },
  {
    id: "dasher",
    name: "DASHER",
    hp: 2,
    speed: 10,
  },
];

const weapons: Weapon[] = [
  {
    id: "revolver",
    name: "Revolver",
    damage: 20,
    projectile: 1,
    reload_time: 1,
    max_ammo: 6,
  },
  {
    id: "shotgun",
    name: "Shotgun",
    damage: 10,
    projectile: 4,
    reload_time: 1,
    max_ammo: 2,
  },
  {
    id: "dual_smgs",
    name: "Dual SMGs",
    damage: 8,
    projectile: 1,
    reload_time: 2,
    max_ammo: 24,
  },
];

const abilities: Ability[] = [
  {
    id: "witality",
    name: "WITALITY",
    description: "Increase maximum HP by 1 unit",
    persian_description: "افزایش ماکسیمم hp به اندازه یک واحد",
  },
  {
    id: "damager",
    name: "DAMAGER",
    description: "Increase weapon damage by 25% for 10 seconds",
    persian_description: "افزایش ۲۵ درصدی میزان دمیج سلاح به مدت ۱۰ ثانیه",
  },
  {
    id: "procrease",
    name: "PROCREASE",
    description: "Increase weapon projectile count by 1",
    persian_description: "افزایش یک واحدی projectile سلاح",
  },
  {
    id: "amocrease",
    name: "AMOCREASE",
    description: "Increase maximum ammo by 5",
    persian_description: "افزایش ۵ واحدی حداکثر تعداد تیر های سلاح",
  },
  {
    id: "speedy",
    name: "SPEEDY",
    description: "Double movement speed for 10 seconds",
    persian_description: "۲ برابر شدن سرعت حرکت بازیکن به مدت ۱۰ ثانیه",
  },
];

// Add hero avatar images - you can replace these with better images for your project
const heroImages = {
  shana: "https://i.imgur.com/JQ5kAUX.png", // Female character with red theme
  diamond: "https://i.imgur.com/VZRR6Ww.png", // Heavy armored character
  scarlet: "https://i.imgur.com/8FTHvll.png", // Fast female character
  lilith: "https://i.imgur.com/Yl7sx3H.png", // Magic wielder female character
  dasher: "https://i.imgur.com/3kskAJH.png", // Quick male character
};

// Add weapon images
const weaponImages = {
  revolver: "https://i.imgur.com/N1QkBik.png",
  shotgun: "https://i.imgur.com/rLIClmu.png",
  dual_smgs: "https://i.imgur.com/NvRoSw8.png",
};

// Add ability icons - using appropriate icon components
const abilityIcons = {
  witality: <RiHeartPulseFill className="text-green-400 text-3xl" />,
  damager: <FaFire className="text-red-400 text-3xl" />,
  procrease: <FaBolt className="text-yellow-400 text-3xl" />,
  amocrease: <FaBomb className="text-purple-400 text-3xl" />,
  speedy: <RiSpeedFill className="text-blue-400 text-3xl" />,
};

const requirements: Requirement[] = [
  // Authentication Requirements
  {
    id: "signup_username",
    title: "User Registration - Username & Password",
    persian_title: "ثبت نام - نام کاربری و رمز عبور",
    description: "Implement username and password registration functionality",
    persian_description: "امکان ثبت نام و وارد کردن نام کاربری و رمز عبور",
    score: 5,
    is_optional: false,
    category: "Authentication",
  },
  {
    id: "signup_validation",
    title: "Password Validation",
    persian_title: "اعتبارسنجی رمز عبور",
    description:
      "Password must be at least 8 characters, contain special characters (!@#$%^&*()_), a number, and an uppercase letter",
    persian_description:
      "رمز عبور باید حداقل دارای ۸ کاراکتر باشد و حداقل یکی از کاراکتر های خاص !@#$%^&*()_ در آن استفاده شده باشد و حداقل یک عدد و یک حرف بزرگ انگلیسی نیز در آن باشد",
    score: 5,
    is_optional: false,
    category: "Authentication",
  },
  {
    id: "guest_login",
    title: "Guest Login",
    persian_title: "ورود به عنوان مهمان",
    description: "Allow skipping registration and playing as a guest",
    persian_description:
      "امکان skip کردن ثبت نام و ورود و شروع یک بازی به عنوان مهمان",
    score: 5,
    is_optional: false,
    category: "Authentication",
  },
  {
    id: "security_question",
    title: "Security Question",
    persian_title: "سوال امنیتی",
    description: "Implement security question for password recovery",
    persian_description: "قرار دادن سوال امنیتی برای فراموشی رمز عبور",
    score: 5,
    is_optional: false,
    category: "Authentication",
  },
  {
    id: "random_avatar",
    title: "Random Avatar Assignment",
    persian_title: "آواتار تصادفی",
    description: "Assign random avatar to user upon registration",
    persian_description: "نسبت دادن آواتار رندوم به کاربر هنگام ثبت‌نام",
    score: 5,
    is_optional: false,
    category: "Authentication",
  },

  // Main Menu Requirements
  {
    id: "main_menu_navigation",
    title: "Main Menu Navigation",
    persian_title: "منوی اصلی",
    description:
      "Access to Settings, Profile, Pre-game, Scoreboard, and Hint menus",
    persian_description:
      "امکان ورود به منوهای تنظیمات، پروفایل، pre-game، اسکوربرد و هینت",
    score: 5,
    is_optional: false,
    category: "Menus",
  },
  {
    id: "continue_saved",
    title: "Continue Saved Game",
    persian_title: "ادامه بازی ذخیره شده",
    description: "Option to continue saved game",
    persian_description: "امکان ادامه بازی save شده",
    score: 5,
    is_optional: false,
    category: "Menus",
  },
  {
    id: "user_info_display",
    title: "User Information Display",
    persian_title: "نمایش اطلاعات کاربر",
    description: "Display user avatar, username, and score",
    persian_description: "نمایش آواتار کاربر، نام کاربری و امتیاز",
    score: 5,
    is_optional: false,
    category: "Menus",
  },

  // Settings Menu Requirements
  {
    id: "audio_settings",
    title: "Audio Settings",
    persian_title: "تنظیمات صدا",
    description: "Control music volume and change music file",
    persian_description:
      "امکان تغییر میزان بلندی موزیک و تغییر فایل موزیک پخشی",
    score: 5,
    is_optional: false,
    category: "Menus",
  },
  {
    id: "sfx_settings",
    title: "SFX Settings",
    persian_title: "تنظیمات افکت‌های صوتی",
    description: "Toggle game sound effects",
    persian_description: "امکان قطع و وصل کردن sfx بازی",
    score: 5,
    is_optional: false,
    category: "Menus",
  },
  {
    id: "gameplay_settings",
    title: "Gameplay Settings",
    persian_title: "تنظیمات گیم‌پلی",
    description: "Toggle auto-reload and outline features",
    persian_description: "امکان روشن/خاموش کردن auto-reload و outline",
    score: 5,
    is_optional: false,
    category: "Menus",
  },

  // Core Gameplay Requirements
  {
    id: "character_movement",
    title: "Character Movement",
    persian_title: "حرکت کاراکتر",
    description: "WASD movement with diagonal support",
    persian_description:
      "امکان حرکت کاراکتر اصلی بازی با w-a-s-d و حرکت در جهت‌های غیر اصلی",
    score: 5,
    is_optional: false,
    category: "Gameplay",
  },
  {
    id: "shooting_mechanics",
    title: "Shooting Mechanics",
    persian_title: "مکانیک تیراندازی",
    description: "Mouse-based shooting with cursor direction",
    persian_description:
      "امکان شلیک تیر با چپ‌کلیک موس در راستای مکان قرارگیری موس",
    score: 5,
    is_optional: false,
    category: "Gameplay",
  },
  {
    id: "auto_aim",
    title: "Auto-Aim System",
    persian_title: "سیستم نشانه‌گیری خودکار",
    description: "Auto-aim system targeting nearest enemy",
    persian_description: "سیستم auto-aim برای نشانه‌گیری نزدیک‌ترین دشمن",
    score: 5,
    is_optional: false,
    category: "Gameplay",
  },

  // Visual Elements
  {
    id: "camera_system",
    title: "Camera System",
    persian_title: "سیستم دوربین",
    description: "Center-focused camera following player character",
    persian_description:
      "ست بودن دوربین اصلی که کاراکتر بازی در مرکز صفحه باشد",
    score: 5,
    is_optional: false,
    category: "Visuals",
  },
  {
    id: "ui_elements",
    title: "UI Elements",
    persian_title: "المان‌های رابط کاربری",
    description: "Display health, time, kills, ammo, and level progress",
    persian_description: "نمایش جان، زمان، کیل‌ها، مهمات و پیشرفت لول",
    score: 5,
    is_optional: false,
    category: "Visuals",
  },
  {
    id: "animations",
    title: "Game Animations",
    persian_title: "انیمیشن‌های بازی",
    description: "Damage, projectile, and enemy death animations",
    persian_description: "انیمیشن دمیج، حرکت تیر و از بین رفتن دشمن‌ها",
    score: 5,
    is_optional: false,
    category: "Visuals",
  },

  // Extra Features
  {
    id: "boss_fight",
    title: "Boss Fight",
    persian_title: "نبرد با باس",
    description: "Implement boss fight with special mechanics",
    persian_description: "پیاده‌سازی باس فایت با مکانیک‌های ویژه",
    score: 5,
    is_optional: true,
    category: "Extras",
  },
  {
    id: "save_system",
    title: "Save System",
    persian_title: "سیستم ذخیره‌سازی",
    description: "Save and load game state",
    persian_description: "ذخیره و بارگذاری وضعیت بازی",
    score: 5,
    is_optional: true,
    category: "Extras",
  },
  {
    id: "localization",
    title: "Game Localization",
    persian_title: "بومی‌سازی بازی",
    description: "Support for multiple languages",
    persian_description: "پشتیبانی از چند زبان",
    score: 5,
    is_optional: true,
    category: "Extras",
  },

  // Profile Menu Requirements
  {
    id: "change_username",
    title: "Change Username",
    persian_title: "تغییر نام کاربری",
    description: "Allow username change with duplicate check",
    persian_description: "امکان تغییر username و نمایش خطا درصورت تکراری بودن",
    score: 5,
    is_optional: false,
    category: "Profile",
  },
  {
    id: "change_password",
    title: "Change Password",
    persian_title: "تغییر رمز عبور",
    description: "Allow password change with validation",
    persian_description: "امکان تغییر پسوورد و نمایش خطا درصورت ساده بودن",
    score: 5,
    is_optional: false,
    category: "Profile",
  },
  {
    id: "avatar_management",
    title: "Avatar Management",
    persian_title: "مدیریت آواتار",
    description:
      "Change avatar from presets or upload custom image with drag & drop support",
    persian_description:
      "امکان تغییر آواتار از تصاویر موجود یا انتخاب فایل دلخواه با پشتیبانی از درگ و دراپ",
    score: 5,
    is_optional: false,
    category: "Profile",
  },
  {
    id: "delete_account",
    title: "Account Deletion",
    persian_title: "حذف حساب کاربری",
    description: "Allow account deletion",
    persian_description: "امکان حذف حساب کاربری",
    score: 5,
    is_optional: false,
    category: "Profile",
  },

  // Scoreboard Requirements
  {
    id: "top_players",
    title: "Top Players Display",
    persian_title: "نمایش بازیکنان برتر",
    description: "Display top 10 players with username and score",
    persian_description: "نمایش نام کاربری و امتیاز ۱۰ کاربر برتر",
    score: 5,
    is_optional: false,
    category: "Scoreboard",
  },
  {
    id: "stats_display",
    title: "Player Statistics",
    persian_title: "آمار بازیکنان",
    description: "Display kill count and survival time",
    persian_description: "نمایش تعداد kill ها و بیشترین مدت‌زمان زنده ماندن",
    score: 5,
    is_optional: false,
    category: "Scoreboard",
  },
  {
    id: "sorting_options",
    title: "Sorting Options",
    persian_title: "گزینه‌های مرتب‌سازی",
    description: "Sort by score, username, kills, and survival time",
    persian_description:
      "امکان مرتب سازی بر اساس score، username، kill و مدت زمان زنده ماندن",
    score: 5,
    is_optional: false,
    category: "Scoreboard",
  },
  {
    id: "visual_highlights",
    title: "Visual Highlights",
    persian_title: "نشانه‌های بصری",
    description: "Special visual effects for top 3 players and logged-in user",
    persian_description: "جلوه بصری متفاوت برای ۳ نفر برتر و کاربر لاگین شده",
    score: 5,
    is_optional: false,
    category: "Scoreboard",
  },

  // Hint Menu Requirements
  {
    id: "hero_guides",
    title: "Hero Guides",
    persian_title: "راهنمای قهرمانان",
    description: "Display guides for at least 3 heroes",
    persian_description: "نمایش راهنما درباره حداقل ۳ تا از hero ها",
    score: 5,
    is_optional: false,
    category: "Hints",
  },
  {
    id: "game_controls",
    title: "Game Controls",
    persian_title: "کنترل‌های بازی",
    description: "Display game key bindings",
    persian_description: "نمایش کلید های بازی",
    score: 5,
    is_optional: false,
    category: "Hints",
  },
  {
    id: "cheat_codes",
    title: "Cheat Codes",
    persian_title: "کدهای تقلب",
    description: "Display available cheat codes and their effects",
    persian_description: "نمایش چیت کد ها و کار هایی که انجام می‌دهند",
    score: 5,
    is_optional: false,
    category: "Hints",
  },
  {
    id: "skill_info",
    title: "Skill Information",
    persian_title: "اطلاعات مهارت‌ها",
    description: "Display information about game skills",
    persian_description: "نمایش کارایی skill های بازی",
    score: 5,
    is_optional: false,
    category: "Hints",
  },

  // Pre-game Menu Requirements
  {
    id: "hero_selection",
    title: "Hero Selection",
    persian_title: "انتخاب قهرمان",
    description: "Allow hero selection",
    persian_description: "امکان انتخاب hero",
    score: 5,
    is_optional: false,
    category: "Pre-game",
  },
  {
    id: "weapon_selection",
    title: "Weapon Selection",
    persian_title: "انتخاب سلاح",
    description: "Allow weapon selection",
    persian_description: "امکان انتخاب سلاح",
    score: 5,
    is_optional: false,
    category: "Pre-game",
  },
  {
    id: "game_duration",
    title: "Game Duration",
    persian_title: "مدت زمان بازی",
    description: "Select game duration (2/5/10/20 minutes)",
    persian_description:
      "امکان انتخاب مدت زمان بازی دارای ۴ آپشن ۲/۵/۱۰/۲۰ دقیقه",
    score: 5,
    is_optional: false,
    category: "Pre-game",
  },

  // Pause Menu Requirements
  {
    id: "pause_display",
    title: "Pause Menu Display",
    persian_title: "نمایش منوی توقف",
    description: "Display pause menu with game options",
    persian_description: "نمایش منوی pause با گزینه‌های بازی",
    score: 5,
    is_optional: false,
    category: "Pause",
  },
  {
    id: "grayscale_toggle",
    title: "Grayscale Toggle",
    persian_title: "تغییر حالت سیاه و سفید",
    description: "Toggle grayscale display",
    persian_description: "امکان سیاه و سفید کردن نمایش بازی",
    score: 5,
    is_optional: false,
    category: "Pause",
  },
  {
    id: "save_exit",
    title: "Save and Exit",
    persian_title: "ذخیره و خروج",
    description: "Save game progress and exit",
    persian_description: "امکان سیو بازی و خروج",
    score: 5,
    is_optional: true,
    category: "Pause",
  },

  // Additional Gameplay Features
  {
    id: "enemy_spawn",
    title: "Enemy Spawning",
    persian_title: "ظاهر شدن دشمنان",
    description: "Random enemy spawning from different directions",
    persian_description:
      "دشمن ها به صورت رندوم از جهات های مختلف زمین به بازی وارد شوند",
    score: 5,
    is_optional: false,
    category: "Gameplay",
  },
  {
    id: "enemy_movement",
    title: "Enemy Movement",
    persian_title: "حرکت دشمنان",
    description: "Continuous enemy movement towards character",
    persian_description: "دشمن ها به سمت کاراکتر همواره در حرکت باشند",
    score: 5,
    is_optional: false,
    category: "Gameplay",
  },
  {
    id: "damage_system",
    title: "Damage System",
    persian_title: "سیستم آسیب",
    description: "Character takes damage from enemies and obstacles",
    persian_description:
      "کم شدن جان کرکتر در صورت برخورد با درخت یا تیر انمی ها",
    score: 5,
    is_optional: false,
    category: "Gameplay",
  },
  {
    id: "invincibility",
    title: "Invincibility Frame",
    persian_title: "زمان شکست‌ناپذیری",
    description: "1-second invincibility after taking damage",
    persian_description:
      "کرکتر پس از برخورد با انمی ها به مدت 1 ثانیه invincible میشود",
    score: 5,
    is_optional: false,
    category: "Gameplay",
  },
  // Hero Implementation Requirements
  {
    id: "hero_implementation_shana",
    title: "Hero Implementation - Shana",
    persian_title: "پیاده‌سازی شخصیت شانا",
    description: "Implement the Shana hero with proper HP and speed attributes",
    persian_description: "پیاده‌سازی شخصیت شانا با ویژگی‌های درست HP و سرعت",
    score: 5,
    is_optional: false,
    category: "characters",
  },
  {
    id: "hero_implementation_diamond",
    title: "Hero Implementation - Diamond",
    persian_title: "پیاده‌سازی شخصیت دایموند",
    description:
      "Implement the Diamond hero with proper HP and speed attributes",
    persian_description: "پیاده‌سازی شخصیت دایموند با ویژگی‌های درست HP و سرعت",
    score: 5,
    is_optional: false,
    category: "characters",
  },
  {
    id: "hero_implementation_scarlet",
    title: "Hero Implementation - Scarlet",
    persian_title: "پیاده‌سازی شخصیت اسکارلت",
    description:
      "Implement the Scarlet hero with proper HP and speed attributes",
    persian_description: "پیاده‌سازی شخصیت اسکارلت با ویژگی‌های درست HP و سرعت",
    score: 5,
    is_optional: false,
    category: "characters",
  },
  {
    id: "hero_implementation_lilith",
    title: "Hero Implementation - Lilith",
    persian_title: "پیاده‌سازی شخصیت لیلیت",
    description:
      "Implement the Lilith hero with proper HP and speed attributes",
    persian_description: "پیاده‌سازی شخصیت لیلیت با ویژگی‌های درست HP و سرعت",
    score: 5,
    is_optional: false,
    category: "characters",
  },
  {
    id: "hero_implementation_dasher",
    title: "Hero Implementation - Dasher",
    persian_title: "پیاده‌سازی شخصیت داشر",
    description:
      "Implement the Dasher hero with proper HP and speed attributes",
    persian_description: "پیاده‌سازی شخصیت داشر با ویژگی‌های درست HP و سرعت",
    score: 5,
    is_optional: false,
    category: "characters",
  },
  // Weapon Implementation Requirements
  {
    id: "weapon_implementation_revolver",
    title: "Weapon Implementation - Revolver",
    persian_title: "پیاده‌سازی سلاح رولور",
    description:
      "Implement the Revolver weapon with proper damage, projectile, reload time, and max ammo attributes",
    persian_description:
      "پیاده‌سازی سلاح رولور با ویژگی‌های درست دمیج، تعداد پرتابه، زمان ریلود و ماکزیمم مهمات",
    score: 5,
    is_optional: false,
    category: "characters",
  },
  {
    id: "weapon_implementation_shotgun",
    title: "Weapon Implementation - Shotgun",
    persian_title: "پیاده‌سازی سلاح شاتگان",
    description:
      "Implement the Shotgun weapon with proper damage, projectile, reload time, and max ammo attributes",
    persian_description:
      "پیاده‌سازی سلاح شاتگان با ویژگی‌های درست دمیج، تعداد پرتابه، زمان ریلود و ماکزیمم مهمات",
    score: 5,
    is_optional: false,
    category: "characters",
  },
  {
    id: "weapon_implementation_dual_smgs",
    title: "Weapon Implementation - Dual SMGs",
    persian_title: "پیاده‌سازی سلاح دوتایی SMG",
    description:
      "Implement the Dual SMGs weapon with proper damage, projectile, reload time, and max ammo attributes",
    persian_description:
      "پیاده‌سازی سلاح دوتایی SMG با ویژگی‌های درست دمیج، تعداد پرتابه، زمان ریلود و ماکزیمم مهمات",
    score: 5,
    is_optional: false,
    category: "characters",
  },
  // Ability Implementation Requirements
  {
    id: "ability_implementation_witality",
    title: "Ability Implementation - Witality",
    persian_title: "پیاده‌سازی قابلیت ویتالیتی",
    description:
      "Implement the Witality ability to increase maximum HP by 1 unit",
    persian_description:
      "پیاده‌سازی قابلیت ویتالیتی برای افزایش ماکزیمم HP به اندازه یک واحد",
    score: 5,
    is_optional: false,
    category: "characters",
  },
  {
    id: "ability_implementation_damager",
    title: "Ability Implementation - Damager",
    persian_title: "پیاده‌سازی قابلیت دمیجر",
    description:
      "Implement the Damager ability to increase weapon damage by 25% for 10 seconds",
    persian_description:
      "پیاده‌سازی قابلیت دمیجر برای افزایش ۲۵ درصدی میزان دمیج سلاح به مدت ۱۰ ثانیه",
    score: 5,
    is_optional: false,
    category: "characters",
  },
  {
    id: "ability_implementation_procrease",
    title: "Ability Implementation - Procrease",
    persian_title: "پیاده‌سازی قابلیت پروکریس",
    description:
      "Implement the Procrease ability to increase weapon projectile count by 1",
    persian_description:
      "پیاده‌سازی قابلیت پروکریس برای افزایش یک واحدی projectile سلاح",
    score: 5,
    is_optional: false,
    category: "characters",
  },
  {
    id: "ability_implementation_amocrease",
    title: "Ability Implementation - Amocrease",
    persian_title: "پیاده‌سازی قابلیت آموکریس",
    description:
      "Implement the Amocrease ability to increase maximum ammo by 5",
    persian_description:
      "پیاده‌سازی قابلیت آموکریس برای افزایش ۵ واحدی حداکثر تعداد تیر های سلاح",
    score: 5,
    is_optional: false,
    category: "characters",
  },
  {
    id: "ability_implementation_speedy",
    title: "Ability Implementation - Speedy",
    persian_title: "پیاده‌سازی قابلیت اسپیدی",
    description:
      "Implement the Speedy ability to double movement speed for 10 seconds",
    persian_description:
      "پیاده‌سازی قابلیت اسپیدی برای ۲ برابر کردن سرعت حرکت بازیکن به مدت ۱۰ ثانیه",
    score: 5,
    is_optional: false,
    category: "characters",
  },
];

const categories = [
  {
    id: "score-overview",
    title: "Score Overview",
    icon: "📊",
    description: "Summary of required and optional scores",
  },
  {
    id: "authentication",
    title: "Authentication",
    icon: "🔐",
    description: "User authentication and account management features",
  },
  {
    id: "menus",
    title: "Game Menus",
    icon: "📋",
    description: "Various game menus and their functionalities",
  },
  {
    id: "gameplay",
    title: "Core Gameplay",
    icon: "🎮",
    description: "Main game mechanics and features",
  },
  {
    id: "characters",
    title: "Characters & Weapons",
    icon: "⚔️",
    description: "Heroes, weapons, and abilities",
  },
  {
    id: "visuals",
    title: "Visual Elements",
    icon: "🎨",
    description: "Animations and visual effects",
  },
  {
    id: "extras",
    title: "Extra Features",
    icon: "⭐",
    description: "Optional and bonus features",
  },
  {
    id: "profile",
    title: "Profile",
    icon: "👤",
    description: "User profile management features",
  },
  {
    id: "scoreboard",
    title: "Scoreboard",
    icon: "🏆",
    description: "Player rankings and statistics",
  },
  {
    id: "hints",
    title: "Game Guide",
    icon: "📖",
    description: "Game guides and information",
  },
  {
    id: "pre-game",
    title: "Pre-game Setup",
    icon: "🎲",
    description: "Game setup and configuration",
  },
  {
    id: "pause",
    title: "Pause Menu",
    icon: "⏸️",
    description: "In-game pause menu features",
  },
];

export default function ProjectRequirements() {
  const [selectedCategory, setSelectedCategory] = useState("authentication");
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

  const renderGameElements = () => {
    if (selectedCategory !== "characters") return null;

    return (
      <div className="space-y-16">
        {/* Heroes Section */}
        <div>
          <motion.h3
            className="text-3xl font-orbitron text-[#f85c70] mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Heroes
          </motion.h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {heroes.map((hero) => (
              <motion.div
                key={hero.id}
                className="glass rounded-xl relative overflow-hidden group h-[300px]"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * heroes.findIndex((h) => h.id === hero.id),
                }}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-transparent" />

                {/* Hero Image */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                  <motion.img
                    src={heroImages[hero.id as keyof typeof heroImages]}
                    alt={hero.name}
                    className="h-full w-full object-cover object-center filter"
                    initial={{ scale: 1.2 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <motion.h4
                    className="text-2xl font-orbitron text-white mb-2 text-center drop-shadow-glow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {hero.name}
                  </motion.h4>

                  {/* Stats */}
                  <div className="space-y-3 mt-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FaHeart className="text-red-500" />
                        <span className="text-gray-200 font-space-grotesk text-sm">
                          HP
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(hero.hp)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-6 bg-gradient-to-t from-red-700 to-red-400 rounded-sm"
                            initial={{ height: 0 }}
                            animate={{ height: 6 + i * 1.2 }}
                            transition={{
                              delay: 0.5 + i * 0.05,
                              duration: 0.4,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FaRunning className="text-blue-500" />
                        <span className="text-gray-200 font-space-grotesk text-sm">
                          Speed
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(hero.speed)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-6 bg-gradient-to-t from-blue-700 to-blue-400 rounded-sm"
                            initial={{ height: 0 }}
                            animate={{ height: 6 + i * 0.6 }}
                            transition={{
                              delay: 0.7 + i * 0.02,
                              duration: 0.4,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hero Glow Effect */}
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f85c70] to-transparent opacity-70" />
              </motion.div>
            ))}
          </div>

          {/* Hero Implementation Requirements */}
          <div className="mt-12">
            <motion.h4
              className="text-2xl font-orbitron text-[#f85c70] mb-6 text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Hero Implementation Requirements
            </motion.h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requirements
                .filter(
                  (req) =>
                    req.category.toLowerCase() === "characters" &&
                    req.id.startsWith("hero_implementation_")
                )
                .map((requirement) => (
                  <motion.div
                    key={requirement.id}
                    className="glass p-6 rounded-lg relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                    style={{
                      zIndex: hoveredRequirement === requirement.id ? 50 : 1,
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
                                completedRequirements.includes(requirement.id)
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
                        <h3 className="text-lg text-white font-space-grotesk">
                          {requirement.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="pl-12">
                      <p className="text-gray-300 text-sm mb-2">
                        {requirement.description}
                      </p>
                      <p className="text-[#f85c70] text-sm" dir="rtl">
                        {requirement.persian_description}
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>

        {/* Weapons Section */}
        <div>
          <motion.h3
            className="text-3xl font-orbitron text-[#f85c70] mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Weapons
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-8">
            {weapons.map((weapon, index) => (
              <motion.div
                key={weapon.id}
                className="glass p-8 rounded-xl relative overflow-hidden group"
                whileHover={{
                  y: -5,
                  boxShadow:
                    "0 20px 25px -5px rgba(248, 92, 112, 0.1), 0 10px 10px -5px rgba(248, 92, 112, 0.04)",
                }}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                {/* Weapon Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f85c70]/5 to-purple-500/10 opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

                {/* Weapon Image and Name */}
                <div className="flex flex-col items-center justify-center mb-6 relative">
                  <motion.div
                    className="w-24 h-24 mb-4 relative"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                  >
                    <img
                      src={weaponImages[weapon.id as keyof typeof weaponImages]}
                      alt={weapon.name}
                      className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(248,92,112,0.5)]"
                    />
                  </motion.div>

                  <h4 className="text-2xl font-orbitron text-[#f85c70] relative">
                    {weapon.name}
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#f85c70] to-transparent opacity-70" />
                  </h4>
                </div>

                {/* Weapon Stats */}
                <div className="space-y-4 mt-6">
                  <motion.div
                    className="flex justify-between items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-2">
                      <GiSwordWound className="text-red-500" />
                      <span className="text-gray-400 font-space-grotesk">
                        Damage
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-red-600 to-red-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${(weapon.damage / 20) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                      <span className="text-white font-space-grotesk ml-2 min-w-[30px] text-right">
                        {weapon.damage}
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex justify-between items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center gap-2">
                      <FaBullseye className="text-yellow-500" />
                      <span className="text-gray-400 font-space-grotesk">
                        Projectiles
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex gap-1">
                        {[...Array(weapon.projectile)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-4 h-4 rounded-full bg-yellow-500"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                          />
                        ))}
                      </div>
                      <span className="text-white font-space-grotesk ml-2 min-w-[30px] text-right">
                        {weapon.projectile}
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex justify-between items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-2">
                      <RiTimerFlashFill className="text-blue-500" />
                      <span className="text-gray-400 font-space-grotesk">
                        Reload Time
                      </span>
                    </div>
                    <span className="text-white font-space-grotesk">
                      {weapon.reload_time}s
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex justify-between items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center gap-2">
                      <RiShieldFlashFill className="text-purple-500" />
                      <span className="text-gray-400 font-space-grotesk">
                        Max Ammo
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(weapon.max_ammo / 24) * 100}%`,
                          }}
                          transition={{ duration: 1, delay: 0.7 }}
                        />
                      </div>
                      <span className="text-white font-space-grotesk ml-2 min-w-[30px] text-right">
                        {weapon.max_ammo}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Weapon Implementation Requirements */}
          <div className="mt-12">
            <motion.h4
              className="text-2xl font-orbitron text-[#f85c70] mb-6 text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Weapon Implementation Requirements
            </motion.h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requirements
                .filter(
                  (req) =>
                    req.category.toLowerCase() === "characters" &&
                    req.id.startsWith("weapon_implementation_")
                )
                .map((requirement) => (
                  <motion.div
                    key={requirement.id}
                    className="glass p-6 rounded-lg relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                    style={{
                      zIndex: hoveredRequirement === requirement.id ? 50 : 1,
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
                                completedRequirements.includes(requirement.id)
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
                        <h3 className="text-lg text-white font-space-grotesk">
                          {requirement.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="pl-12">
                      <p className="text-gray-300 text-sm mb-2">
                        {requirement.description}
                      </p>
                      <p className="text-[#f85c70] text-sm" dir="rtl">
                        {requirement.persian_description}
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>

        {/* Abilities Section */}
        <div>
          <motion.h3
            className="text-3xl font-orbitron text-[#f85c70] mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Abilities
          </motion.h3>
          <div className="grid md:grid-cols-5 gap-6">
            {abilities.map((ability, idx) => (
              <motion.div
                key={ability.id}
                className="glass rounded-lg relative overflow-hidden group"
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
                onHoverStart={() => setHoveredRequirement(ability.id)}
                onHoverEnd={() => setHoveredRequirement(null)}
              >
                {/* Top highlight */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f85c70] to-transparent opacity-70" />

                {/* Icon and glow effect */}
                <div className="pt-8 pb-4 px-4 relative flex flex-col items-center">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4 relative"
                    initial={{ scale: 0.8, opacity: 0.7 }}
                    whileHover={{ scale: 1.1, opacity: 1 }}
                    style={{
                      background:
                        "radial-gradient(circle, rgba(248,92,112,0.2) 0%, rgba(248,92,112,0) 70%)",
                    }}
                  >
                    {/* Icon */}
                    {abilityIcons[ability.id as keyof typeof abilityIcons]}

                    {/* Animated glow */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        boxShadow: [
                          "0 0 0 rgba(248, 92, 112, 0)",
                          "0 0 15px rgba(248, 92, 112, 0.5)",
                          "0 0 0 rgba(248, 92, 112, 0)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  <h4 className="text-xl font-orbitron text-[#f85c70] text-center mb-2">
                    {ability.name}
                  </h4>

                  {/* Description in english */}
                  <p className="text-gray-300 font-space-grotesk text-center text-sm mb-4">
                    {ability.description}
                  </p>
                </div>

                {/* Persian description on hover */}
                <motion.div
                  className="bg-gradient-to-t from-[#18101e]/95 to-[#18101e]/85 backdrop-blur-sm py-3 px-4 absolute bottom-0 left-0 right-0 text-right"
                  initial={{ y: 60 }}
                  animate={{ y: hoveredRequirement === ability.id ? 0 : 60 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <p
                    className="text-gray-300 font-nastaliq text-base"
                    dir="rtl"
                  >
                    {ability.persian_description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Ability Implementation Requirements */}
          <div className="mt-12">
            <motion.h4
              className="text-2xl font-orbitron text-[#f85c70] mb-6 text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Ability Implementation Requirements
            </motion.h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requirements
                .filter(
                  (req) =>
                    req.category.toLowerCase() === "characters" &&
                    req.id.startsWith("ability_implementation_")
                )
                .map((requirement) => (
                  <motion.div
                    key={requirement.id}
                    className="glass p-6 rounded-lg relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                    style={{
                      zIndex: hoveredRequirement === requirement.id ? 50 : 1,
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
                                completedRequirements.includes(requirement.id)
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
                        <h3 className="text-lg text-white font-space-grotesk">
                          {requirement.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="pl-12">
                      <p className="text-gray-300 text-sm mb-2">
                        {requirement.description}
                      </p>
                      <p className="text-[#f85c70] text-sm" dir="rtl">
                        {requirement.persian_description}
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderScoreOverview = () => {
    const scores = calculateTotalScores();

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
                / {scores.requiredTotal}
              </p>
            </div>
            {/* Progress Bar */}
            <div className="mt-6 h-3 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-600 to-green-400"
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    (scores.requiredCompleted / scores.requiredTotal) * 100
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
                / {scores.optionalTotal}
              </p>
            </div>
            {/* Progress Bar */}
            <div className="mt-6 h-3 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    (scores.optionalCompleted / scores.optionalTotal) * 100
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
                / {scores.total}
              </p>
            </div>
            {/* Progress Bar */}
            <div className="mt-6 h-3 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#f85c70]/60 to-[#f85c70]"
                initial={{ width: 0 }}
                animate={{
                  width: `${(scores.completed / scores.total) * 100}%`,
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
    <div className="min-h-screen py-20 px-4 bg-transparent">
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
              ) : selectedCategory === "characters" ? (
                renderGameElements()
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
