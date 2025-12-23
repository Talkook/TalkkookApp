/**
 * Theme Constants - Standardized Color System
 * 
 * این فایل شامل سیستم رنگ‌بندی استاندارد برای تم لایت و دارک است.
 * نام‌گذاری رنگ‌ها بر اساس کاربرد و معنای آن‌ها انجام شده است.
 * 
 * Color System Structure:
 * - Core Colors: رنگ‌های اصلی (Primary, Secondary, Accent)
 * - Surface Colors: رنگ‌های سطح (Backgrounds, Cards, Modals)
 * - Text Colors: رنگ‌های متن (Primary, Secondary, Tertiary, Inverse)
 * - Border Colors: رنگ‌های حاشیه
 * - Interactive Colors: رنگ‌های تعاملی (Buttons, Links, States)
 * - Status Colors: رنگ‌های وضعیت (Success, Error, Warning, Info)
 * - Special Colors: رنگ‌های خاص (Gradients, Overlays, Shadows)
 */

// ============================================
// Light Theme Colors
// ============================================
export const lightTheme = {
  // ============================================
  // Core Colors - رنگ‌های اصلی
  // ============================================
  primary: '#0B5FFF',                    // رنگ اصلی برنامه
  primaryDark: '#0A46D4',                // رنگ اصلی تیره‌تر
  primaryLight: '#3B82F6',              // رنگ اصلی روشن‌تر
  secondary: '#6B7280',                  // رنگ ثانویه
  accent: '#10B981',                     // رنگ تاکیدی

  // ============================================
  // Surface Colors - رنگ‌های سطح
  // ============================================
  surface: '#FFFFFF',                    // سطح اصلی (پس‌زمینه صفحه)
  surfaceVariant: '#F9FAFB',            // سطح متغیر (پس‌زمینه ثانویه)
  surfaceContainer: '#F3F4F6',           // سطح کانتینر (پس‌زمینه سوم)
  backgroundSecondary: '#F9FAFB',       // پس‌زمینه ثانویه (برای سازگاری با کد قدیمی)
  backgroundTertiary: '#F3F4F6',         // پس‌زمینه سوم (برای سازگاری با کد قدیمی)
  
  // Card & Modal Surfaces
  card: '#FFFFFF',                       // کارت
  cardElevated: '#FFFFFF',               // کارت با ارتفاع
  modal: '#FFFFFF',                      // مودال
  sheet: '#FFFFFF',                      // شیت (Bottom Sheet)
  modalBackground: '#FFFFFF',            // پس‌زمینه مودال (برای سازگاری با کد قدیمی)
  cardBackground: '#FFFFFF',              // پس‌زمینه کارت (برای سازگاری با کد قدیمی)

  // ============================================
  // Text Colors - رنگ‌های متن
  // ============================================
  onSurface: '#1F2937',                  // متن روی سطح اصلی
  onSurfaceVariant: '#6B7280',           // متن روی سطح متغیر
  onSurfaceDisabled: '#9CA3AF',         // متن غیرفعال روی سطح
  
  // Text Hierarchy
  textPrimary: '#1F2937',                // متن اصلی
  textSecondary: '#6B7280',              // متن ثانویه
  textTertiary: '#9CA3AF',               // متن سوم
  textInverse: '#F9FAFB',                // متن معکوس (روی پس‌زمینه تیره)
  text: '#1F2937',                        // متن (برای سازگاری با کد قدیمی - معادل textPrimary)
  
  // Text on Colored Backgrounds
  onPrimary: '#FFFFFF',                  // متن روی رنگ اصلی
  onSecondary: '#FFFFFF',                // متن روی رنگ ثانویه
  onAccent: '#FFFFFF',                   // متن روی رنگ تاکیدی
  onError: '#FFFFFF',                    // متن روی رنگ خطا
  onSuccess: '#FFFFFF',                  // متن روی رنگ موفقیت

  // ============================================
  // Border Colors - رنگ‌های حاشیه
  // ============================================
  border: '#E5E7EB',                     // حاشیه اصلی
  borderLight: '#F3F4F6',                // حاشیه روشن
  borderDark: '#D1D5DB',                 // حاشیه تیره
  divider: '#E5E7EB',                     // جداکننده

  // ============================================
  // Interactive Colors - رنگ‌های تعاملی
  // ============================================
  // Button Colors
  buttonDefault: '#F3F4F6',              // دکمه پیش‌فرض
  buttonDefaultText: '#374151',          // متن دکمه پیش‌فرض
  buttonPrimary: '#2563EB',              // دکمه اصلی
  buttonPrimaryText: '#FFFFFF',           // متن دکمه اصلی
  buttonSecondary: '#6B7280',             // دکمه ثانویه
  buttonSecondaryText: '#FFFFFF',         // متن دکمه ثانویه
  buttonBackground: '#F3F4F6',           // پس‌زمینه دکمه (برای سازگاری با کد قدیمی)
  buttonText: '#374151',                  // متن دکمه (برای سازگاری با کد قدیمی)
  buttonIcon: '#374151',                  // آیکون دکمه (برای سازگاری با کد قدیمی)
  
  // Button Variants (for Button component)
  buttonNormal: '#FFFFFF',                // دکمه نرمال
  buttonNormalText: '#0B5FFF',           // متن دکمه نرمال
  buttonNormalBorder: 'transparent',     // حاشیه دکمه نرمال
  buttonNext: '#2563EB',                  // دکمه بعدی
  buttonNextText: '#FFFFFF',              // متن دکمه بعدی
  buttonOk: '#059669',                    // دکمه تایید
  buttonOkText: '#FFFFFF',                // متن دکمه تایید
  buttonClose: '#9CA3AF',                 // دکمه بستن
  buttonCloseText: '#FFFFFF',             // متن دکمه بستن
  buttonDelete: '#DC2626',                // دکمه حذف
  buttonDeleteText: '#FFFFFF',            // متن دکمه حذف
  buttonEdit: '#D97706',                  // دکمه ویرایش
  buttonEditText: '#FFFFFF',              // متن دکمه ویرایش
  
  // Link Colors
  link: '#0B5FFF',                        // لینک
  linkHover: '#0A46D4',                   // لینک در حالت هاور
  linkVisited: '#3B82F6',                 // لینک بازدید شده

  // Selected/Active States
  selected: '#EFF6FF',                   // انتخاب شده
  selectedText: '#3B82F6',                // متن انتخاب شده
  selectedBorder: '#3B82F6',              // حاشیه انتخاب شده
  selectedBackground: '#EFF6FF',         // پس‌زمینه انتخاب شده (برای سازگاری با کد قدیمی)
  active: '#EFF6FF',                      // فعال
  hover: '#F3F4F6',                       // هاور

  // ============================================
  // Input Colors - رنگ‌های ورودی
  // ============================================
  inputBackground: '#FFFFFF',             // پس‌زمینه ورودی
  inputBorder: '#E5E7EB',                // حاشیه ورودی
  inputBorderFocused: '#0B5FFF',         // حاشیه ورودی در حالت فوکوس
  inputText: '#1F2937',                   // متن ورودی
  inputPlaceholder: '#9CA3AF',            // متن placeholder

  // ============================================
  // Status Colors - رنگ‌های وضعیت
  // ============================================
  success: '#10B981',                     // موفقیت
  successLight: '#D1FAE5',                // موفقیت روشن
  successDark: '#059669',                 // موفقیت تیره
  
  error: '#EF4444',                       // خطا
  errorLight: '#FEE2E2',                  // خطا روشن
  errorDark: '#DC2626',                   // خطا تیره
  
  warning: '#F59E0B',                     // هشدار
  warningLight: '#FEF3C7',                // هشدار روشن
  warningDark: '#D97706',                 // هشدار تیره
  
  info: '#3B82F6',                        // اطلاعات
  infoLight: '#DBEAFE',                   // اطلاعات روشن
  infoDark: '#2563EB',                    // اطلاعات تیره

  // ============================================
  // Special Colors - رنگ‌های خاص
  // ============================================
  // Gradient Colors (for Auth Screens)
  gradientStart: '#0B5FFF',                // شروع گرادیان
  gradientMiddle: 'rgba(10, 70, 212, 0.85)', // وسط گرادیان
  gradientEnd: 'rgba(11, 27, 58, 0.92)',   // پایان گرادیان
  
  // Text on Gradient Backgrounds
  textOnGradient: '#F8FAFC',              // متن روی گرادیان
  textSecondaryOnGradient: 'rgba(248, 250, 252, 0.82)', // متن ثانویه روی گرادیان
  
  // Overlay Colors
  overlayLight: 'rgba(255, 255, 255, 0.25)',    // اوورلی روشن
  overlayMedium: 'rgba(255, 255, 255, 0.5)',    // اوورلی متوسط
  overlayDark: 'rgba(255, 255, 255, 0.75)',     // اوورلی تیره
  overlayFull: 'rgba(255, 255, 255, 1)',       // اوورلی کامل
  overlayWhite: 'rgba(255, 255, 255, 1)',      // اوورلی سفید (برای سازگاری با کد قدیمی)
  
  // Shadow Colors
  shadow: '#0B1B3A',                      // سایه
  shadowLight: 'rgba(255, 255, 255, 0.3)', // سایه روشن
  shadowColor: '#0B1B3A',                 // رنگ سایه (برای سازگاری با کد قدیمی)
  shadowColorLight: 'rgba(255, 255, 255, 0.3)', // رنگ سایه روشن (برای سازگاری با کد قدیمی)
  
  // Indicator Colors (for Sliders, Pagination)
  indicatorActive: '#FFFFFF',              // اندیکاتور فعال
  indicatorInactive: 'rgba(255, 255, 255, 0.4)', // اندیکاتور غیرفعال
  
  // Logo Colors
  logoGradientStart: 'rgba(11, 95, 255, 0.52)',      // شروع گرادیان لوگو
  logoGradientEnd: 'rgba(11, 95, 255, 0.32)',        // پایان گرادیان لوگو
  logoInnerGradientStart: 'rgba(255, 255, 255, 0.24)', // شروع گرادیان داخلی لوگو
  logoInnerGradientEnd: 'rgba(11, 95, 255, 0.55)',   // پایان گرادیان داخلی لوگو
  logoBorder: 'rgba(255, 255, 255, 0.26)',           // حاشیه لوگو
};

// ============================================
// Dark Theme Colors
// ============================================
export const darkTheme = {
  // ============================================
  // Core Colors - رنگ‌های اصلی
  // ============================================
  primary: '#0A46D4',                    // رنگ اصلی برنامه
  primaryDark: '#0B1B3A',                // رنگ اصلی تیره‌تر
  primaryLight: '#3B82F6',               // رنگ اصلی روشن‌تر
  secondary: '#9CA3AF',                  // رنگ ثانویه
  accent: '#10B981',                      // رنگ تاکیدی

  // ============================================
  // Surface Colors - رنگ‌های سطح
  // ============================================
  surface: '#111827',                    // سطح اصلی (پس‌زمینه صفحه)
  surfaceVariant: '#1F2937',             // سطح متغیر (پس‌زمینه ثانویه)
  surfaceContainer: '#374151',           // سطح کانتینر (پس‌زمینه سوم)
  backgroundSecondary: '#1F2937',       // پس‌زمینه ثانویه (برای سازگاری با کد قدیمی)
  backgroundTertiary: '#374151',         // پس‌زمینه سوم (برای سازگاری با کد قدیمی)
  
  // Card & Modal Surfaces
  card: '#1F2937',                       // کارت
  cardElevated: '#374151',               // کارت با ارتفاع
  modal: '#1F2937',                      // مودال
  sheet: '#1F2937',                      // شیت (Bottom Sheet)
  modalBackground: '#1F2937',            // پس‌زمینه مودال (برای سازگاری با کد قدیمی)
  cardBackground: '#1F2937',              // پس‌زمینه کارت (برای سازگاری با کد قدیمی)

  // ============================================
  // Text Colors - رنگ‌های متن
  // ============================================
  onSurface: '#F9FAFB',                  // متن روی سطح اصلی
  onSurfaceVariant: '#9CA3AF',           // متن روی سطح متغیر
  onSurfaceDisabled: '#6B7280',         // متن غیرفعال روی سطح
  
  // Text Hierarchy
  textPrimary: '#F9FAFB',                // متن اصلی
  textSecondary: '#9CA3AF',              // متن ثانویه
  textTertiary: '#6B7280',               // متن سوم
  textInverse: '#1F2937',                // متن معکوس (روی پس‌زمینه روشن)
  text: '#F9FAFB',                        // متن (برای سازگاری با کد قدیمی - معادل textPrimary)
  
  // Text on Colored Backgrounds
  onPrimary: '#FFFFFF',                  // متن روی رنگ اصلی
  onSecondary: '#FFFFFF',                // متن روی رنگ ثانویه
  onAccent: '#FFFFFF',                   // متن روی رنگ تاکیدی
  onError: '#FFFFFF',                    // متن روی رنگ خطا
  onSuccess: '#FFFFFF',                  // متن روی رنگ موفقیت

  // ============================================
  // Border Colors - رنگ‌های حاشیه
  // ============================================
  border: '#374151',                     // حاشیه اصلی
  borderLight: '#4B5563',                // حاشیه روشن
  borderDark: '#1F2937',                 // حاشیه تیره
  divider: '#374151',                     // جداکننده

  // ============================================
  // Interactive Colors - رنگ‌های تعاملی
  // ============================================
  // Button Colors
  buttonDefault: '#374151',              // دکمه پیش‌فرض
  buttonDefaultText: '#D1D5DB',          // متن دکمه پیش‌فرض
  buttonPrimary: '#3B82F6',               // دکمه اصلی
  buttonPrimaryText: '#FFFFFF',           // متن دکمه اصلی
  buttonSecondary: '#6B7280',             // دکمه ثانویه
  buttonSecondaryText: '#FFFFFF',         // متن دکمه ثانویه
  buttonBackground: '#374151',           // پس‌زمینه دکمه (برای سازگاری با کد قدیمی)
  buttonText: '#D1D5DB',                  // متن دکمه (برای سازگاری با کد قدیمی)
  buttonIcon: '#D1D5DB',                  // آیکون دکمه (برای سازگاری با کد قدیمی)
  
  // Button Variants (for Button component)
  buttonNormal: '#1E3A5F',                // دکمه نرمال (آبی-خاکستری)
  buttonNormalText: '#F9FAFB',           // متن دکمه نرمال
  buttonNormalBorder: '#2E4A6F',         // حاشیه دکمه نرمال
  buttonNext: '#3B82F6',                  // دکمه بعدی
  buttonNextText: '#FFFFFF',              // متن دکمه بعدی
  buttonOk: '#10B981',                    // دکمه تایید
  buttonOkText: '#FFFFFF',                // متن دکمه تایید
  buttonClose: '#6B7280',                 // دکمه بستن
  buttonCloseText: '#FFFFFF',             // متن دکمه بستن
  buttonDelete: '#EF4444',                // دکمه حذف
  buttonDeleteText: '#FFFFFF',            // متن دکمه حذف
  buttonEdit: '#F59E0B',                  // دکمه ویرایش
  buttonEditText: '#FFFFFF',              // متن دکمه ویرایش
  
  // Link Colors
  link: '#60A5FA',                        // لینک
  linkHover: '#3B82F6',                   // لینک در حالت هاور
  linkVisited: '#93C5FD',                 // لینک بازدید شده

  // Selected/Active States
  selected: '#1E3A8A',                   // انتخاب شده
  selectedText: '#60A5FA',               // متن انتخاب شده
  selectedBorder: '#60A5FA',             // حاشیه انتخاب شده
  selectedBackground: '#1E3A8A',         // پس‌زمینه انتخاب شده (برای سازگاری با کد قدیمی)
  active: '#1E3A8A',                      // فعال
  hover: '#374151',                       // هاور

  // ============================================
  // Input Colors - رنگ‌های ورودی
  // ============================================
  inputBackground: '#1F2937',             // پس‌زمینه ورودی
  inputBorder: '#374151',                // حاشیه ورودی
  inputBorderFocused: '#3B82F6',          // حاشیه ورودی در حالت فوکوس
  inputText: '#F9FAFB',                   // متن ورودی
  inputPlaceholder: '#6B7280',            // متن placeholder

  // ============================================
  // Status Colors - رنگ‌های وضعیت
  // ============================================
  success: '#10B981',                     // موفقیت
  successLight: '#065F46',                // موفقیت روشن
  successDark: '#047857',                 // موفقیت تیره
  
  error: '#EF4444',                       // خطا
  errorLight: '#991B1B',                  // خطا روشن
  errorDark: '#DC2626',                   // خطا تیره
  
  warning: '#F59E0B',                     // هشدار
  warningLight: '#92400E',                // هشدار روشن
  warningDark: '#D97706',                 // هشدار تیره
  
  info: '#3B82F6',                        // اطلاعات
  infoLight: '#1E3A8A',                   // اطلاعات روشن
  infoDark: '#2563EB',                    // اطلاعات تیره

  // ============================================
  // Special Colors - رنگ‌های خاص
  // ============================================
  // Gradient Colors (for Auth Screens)
  gradientStart: '#0A46D4',                // شروع گرادیان
  gradientMiddle: 'rgba(10, 70, 212, 0.95)', // وسط گرادیان
  gradientEnd: 'rgba(11, 27, 58, 0.98)',   // پایان گرادیان
  
  // Text on Gradient Backgrounds
  textOnGradient: '#F8FAFC',              // متن روی گرادیان
  textSecondaryOnGradient: 'rgba(248, 250, 252, 0.82)', // متن ثانویه روی گرادیان
  
  // Overlay Colors
  overlayLight: 'rgba(255, 255, 255, 0.15)',    // اوورلی روشن
  overlayMedium: 'rgba(255, 255, 255, 0.3)',    // اوورلی متوسط
  overlayDark: 'rgba(255, 255, 255, 0.5)',     // اوورلی تیره
  overlayFull: 'rgba(255, 255, 255, 0.9)',     // اوورلی کامل
  overlayWhite: 'rgba(255, 255, 255, 0.9)',    // اوورلی سفید (برای سازگاری با کد قدیمی)
  
  // Shadow Colors
  shadow: '#000000',                      // سایه
  shadowLight: 'rgba(255, 255, 255, 0.2)', // سایه روشن
  shadowColor: '#000000',                 // رنگ سایه (برای سازگاری با کد قدیمی)
  shadowColorLight: 'rgba(255, 255, 255, 0.2)', // رنگ سایه روشن (برای سازگاری با کد قدیمی)
  
  // Indicator Colors (for Sliders, Pagination)
  indicatorActive: '#FFFFFF',              // اندیکاتور فعال
  indicatorInactive: 'rgba(255, 255, 255, 0.4)', // اندیکاتور غیرفعال
  
  // Logo Colors
  logoGradientStart: 'rgba(11, 95, 255, 0.65)',      // شروع گرادیان لوگو
  logoGradientEnd: 'rgba(11, 95, 255, 0.45)',        // پایان گرادیان لوگو
  logoInnerGradientStart: 'rgba(255, 255, 255, 0.3)', // شروع گرادیان داخلی لوگو
  logoInnerGradientEnd: 'rgba(11, 95, 255, 0.65)',   // پایان گرادیان داخلی لوگو
  logoBorder: 'rgba(255, 255, 255, 0.3)',             // حاشیه لوگو
};

// ============================================
// Helper Functions
// ============================================

/**
 * دریافت رنگ‌های تم بر اساس حالت تم فعلی
 * @param {boolean} isDark - آیا تم دارک فعال است؟
 * @returns {Object} شیء رنگ‌های تم
 */
export const getThemeColors = (isDark = false) => {
  return isDark ? darkTheme : lightTheme;
};

/**
 * دریافت یک رنگ خاص از تم
 * @param {string} colorKey - کلید رنگ از تم (مثلاً 'primary', 'textPrimary')
 * @param {boolean} isDark - آیا تم دارک فعال است؟
 * @returns {string} مقدار رنگ
 */
export const getThemeColor = (colorKey, isDark = false) => {
  const theme = isDark ? darkTheme : lightTheme;
  return theme[colorKey] || lightTheme[colorKey];
};

/**
 * دریافت رنگ‌های دکمه بر اساس variant
 * @param {string} variant - نوع دکمه: 'normal' | 'next' | 'ok' | 'close' | 'delete' | 'edit'
 * @param {boolean} isDark - آیا تم دارک فعال است؟
 * @returns {Object} { background, text, border }
 */
export const getButtonColors = (variant = 'normal', isDark = false) => {
  const theme = isDark ? darkTheme : lightTheme;
  
  const buttonMap = {
    normal: {
      background: theme.buttonNormal,
      text: theme.buttonNormalText,
      border: theme.buttonNormalBorder,
    },
    next: {
      background: theme.buttonNext,
      text: theme.buttonNextText,
      border: 'transparent',
    },
    ok: {
      background: theme.buttonOk,
      text: theme.buttonOkText,
      border: 'transparent',
    },
    close: {
      background: theme.buttonClose,
      text: theme.buttonCloseText,
      border: 'transparent',
    },
    delete: {
      background: theme.buttonDelete,
      text: theme.buttonDeleteText,
      border: 'transparent',
    },
    edit: {
      background: theme.buttonEdit,
      text: theme.buttonEditText,
      border: 'transparent',
    },
  };
  
  return buttonMap[variant] || buttonMap.normal;
};

/**
 * دریافت رنگ‌های وضعیت بر اساس نوع وضعیت
 * @param {string} status - نوع وضعیت: 'success' | 'error' | 'warning' | 'info'
 * @param {boolean} isDark - آیا تم دارک فعال است؟
 * @returns {Object} { main, light, dark, text }
 */
export const getStatusColors = (status = 'info', isDark = false) => {
  const theme = isDark ? darkTheme : lightTheme;
  
  const statusMap = {
    success: {
      main: theme.success,
      light: theme.successLight,
      dark: theme.successDark,
      text: theme.onSuccess,
    },
    error: {
      main: theme.error,
      light: theme.errorLight,
      dark: theme.errorDark,
      text: theme.onError,
    },
    warning: {
      main: theme.warning,
      light: theme.warningLight,
      dark: theme.warningDark,
      text: theme.onWarning || theme.textPrimary,
    },
    info: {
      main: theme.info,
      light: theme.infoLight,
      dark: theme.infoDark,
      text: theme.onPrimary,
    },
  };
  
  return statusMap[status] || statusMap.info;
};
