import { motion } from "framer-motion";
import { useState } from "react";

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

  const renderGameElements = () => {
    if (selectedCategory !== "characters") return null;

    return (
      <div className="space-y-16">
        {/* Heroes Section */}
        <div>
          <h3 className="text-2xl font-orbitron text-[#f85c70] mb-8 text-center">
            Heroes
          </h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {heroes.map((hero) => (
              <motion.div
                key={hero.id}
                className="glass p-6 rounded-lg relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h4 className="text-xl font-orbitron mb-4 text-center text-[#f85c70]">
                  {hero.name}
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-space-grotesk">HP</span>
                    <div className="flex gap-1">
                      {[...Array(hero.hp)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-green-500 rounded-sm"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-space-grotesk">
                      Speed
                    </span>
                    <div className="flex gap-1">
                      {[...Array(hero.speed)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-blue-500 rounded-sm"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Weapons Section */}
        <div>
          <h3 className="text-2xl font-orbitron text-[#f85c70] mb-8 text-center">
            Weapons
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {weapons.map((weapon) => (
              <motion.div
                key={weapon.id}
                className="glass p-6 rounded-lg relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h4 className="text-xl font-orbitron mb-4 text-center text-[#f85c70]">
                  {weapon.name}
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-space-grotesk">
                      Damage
                    </span>
                    <span className="text-white font-space-grotesk">
                      {weapon.damage}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-space-grotesk">
                      Projectiles
                    </span>
                    <span className="text-white font-space-grotesk">
                      {weapon.projectile}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-space-grotesk">
                      Reload Time
                    </span>
                    <span className="text-white font-space-grotesk">
                      {weapon.reload_time}s
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-space-grotesk">
                      Max Ammo
                    </span>
                    <span className="text-white font-space-grotesk">
                      {weapon.max_ammo}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Abilities Section */}
        <div>
          <h3 className="text-2xl font-orbitron text-[#f85c70] mb-8 text-center">
            Abilities
          </h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {abilities.map((ability) => (
              <motion.div
                key={ability.id}
                className="glass p-6 rounded-lg relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setHoveredRequirement(ability.id)}
                onHoverEnd={() => setHoveredRequirement(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h4 className="text-xl font-orbitron mb-4 text-center text-[#f85c70]">
                  {ability.name}
                </h4>
                <p className="text-gray-300 font-space-grotesk text-center text-sm">
                  {ability.description}
                </p>

                {/* Persian Tooltip for Abilities */}
                {/* {hoveredRequirement === ability.id && (
                  <motion.div
                    className="absolute z-50 w-[300px]
                             bg-gradient-to-br from-black/95 to-[#18101e]/95 
                             backdrop-blur-md rounded-lg shadow-xl
                             border border-[#f85c70]/20"
                    style={{
                      bottom: "-12px",
                      left: "50%",
                      transform: "translateX(-50%) translateY(100%)",
                    }}
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  > */}
                {/* Tooltip Arrow */}
                {/* <div
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 
                                  bg-gradient-to-br from-black/95 to-[#18101e]/95 
                                  transform rotate-45 border-t border-r border-[#f85c70]/20"
                    /> */}

                {/* Content Container */}
                {/* <div className="relative p-4">
                      <div className="text-right" dir="rtl">
                        <motion.p
                          className="text-gray-300 font-nastaliq text-base leading-relaxed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {ability.persian_description}
                        </motion.p>
                      </div> */}

                {/* Decorative Elements */}
                {/* <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f85c70]/20 to-transparent" />
                      <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f85c70]/20 to-transparent" />
                    </div>
                  </motion.div>
                )} */}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderScoreOverview = () => {
    const requiredScores = requirements
      .filter((req) => !req.is_optional)
      .reduce((sum, req) => sum + req.score, 0);
    const optionalScores = requirements
      .filter((req) => req.is_optional)
      .reduce((sum, req) => sum + req.score, 0);
    const totalScore = requiredScores + optionalScores;

    const categoryScores = categories
      .filter((cat) => cat.id !== "score-overview")
      .map((category) => {
        const reqs = requirements.filter(
          (req) => req.category.toLowerCase() === category.id
        );
        return {
          ...category,
          required: reqs
            .filter((req) => !req.is_optional)
            .reduce((sum, req) => sum + req.score, 0),
          optional: reqs
            .filter((req) => req.is_optional)
            .reduce((sum, req) => sum + req.score, 0),
        };
      })
      .filter((cat) => cat.required > 0 || cat.optional > 0);

    return (
      <div className="space-y-12">
        {/* Total Score Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            className="glass p-6 rounded-lg relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-[#f85c70]/10" />
            <h4 className="text-xl font-orbitron mb-4 text-green-400 text-center">
              Required Score
            </h4>
            <p className="text-4xl font-space-grotesk text-center text-white">
              {requiredScores}
            </p>
          </motion.div>

          <motion.div
            className="glass p-6 rounded-lg relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-[#f85c70]/10" />
            <h4 className="text-xl font-orbitron mb-4 text-purple-400 text-center">
              Optional Score
            </h4>
            <p className="text-4xl font-space-grotesk text-center text-white">
              {optionalScores}
            </p>
          </motion.div>

          <motion.div
            className="glass p-6 rounded-lg relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#f85c70]/10 to-blue-500/10" />
            <h4 className="text-xl font-orbitron mb-4 text-[#f85c70] text-center">
              Total Score
            </h4>
            <p className="text-4xl font-space-grotesk text-center text-white">
              {totalScore}
            </p>
          </motion.div>
        </div>

        {/* Category Breakdown */}
        <div>
          <h3 className="text-2xl font-orbitron text-[#f85c70] mb-8 text-center">
            Score Breakdown by Category
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryScores.map((category) => (
              <motion.div
                key={category.id}
                className="glass p-6 rounded-lg relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#f85c70]/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{category.icon}</span>
                  <h4 className="text-xl font-orbitron text-[#f85c70]">
                    {category.title}
                  </h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-space-grotesk">
                      Required
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-green-500"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${
                              (category.required / requiredScores) * 100
                            }%`,
                          }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-green-400 font-space-grotesk">
                        {category.required}
                      </span>
                    </div>
                  </div>
                  {category.optional > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-space-grotesk">
                        Optional
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-purple-500"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${
                                (category.optional / optionalScores) * 100
                              }%`,
                            }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                        <span className="text-purple-400 font-space-grotesk">
                          {category.optional}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-orbitron font-bold mb-16 text-center text-glow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Project Requirements
        </motion.h2>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-3 rounded-lg glass relative ${
                selectedCategory === category.id
                  ? "border-2 border-[#f85c70]"
                  : "border-2 border-transparent hover:border-[#f85c70]/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#f85c70]/5 to-purple-500/5 transition-all duration-300" />
              <div className="relative flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <div className="flex flex-col items-start">
                  <span className="font-orbitron text-white text-sm">
                    {category.title}
                  </span>
                  <span className="text-gray-400 text-xs font-space-grotesk">
                    {category.description}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Requirements Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Section Title */}
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-orbitron text-[#f85c70] mb-2">
              {categories.find((c) => c.id === selectedCategory)?.title}
            </h3>
            <p className="text-gray-400 font-space-grotesk">
              {categories.find((c) => c.id === selectedCategory)?.description}
            </p>
          </div>

          {/* Render appropriate content based on selected category */}
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
                      zIndex: hoveredRequirement === requirement.id ? 50 : 1,
                    }}
                  >
                    {/* Card Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f85c70]/5 to-purple-500/5 group-hover:from-[#f85c70]/10 group-hover:to-purple-500/10 transition-all duration-300" />

                    {/* Header Section */}
                    <div className="relative flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3">
                        {/* Score Circle */}
                        <div className="w-10 h-10 rounded-full bg-[#f85c70]/10 flex items-center justify-center">
                          <span className="text-[#f85c70] font-space-grotesk font-bold">
                            {requirement.score}
                          </span>
                        </div>

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
                              <div className="text-right space-y-3" dir="rtl">
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
                  </motion.div>
                ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
