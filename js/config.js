/**
 * ============================================================================
 * THUNG LŨNG SAO BĂNG (STARLIGHT VALLEY v11.0 - MYTHIC ASTRAL GENESIS EDITION:
 * 5 REALMS, ASTRAL WORLD BOSS, 14 MULTI-STAGE PIXEL CROPS & 4 HYBRIDS,
 * +20 FORGE & WEAPON AWAKENING ★1-★5, SET RESONANCE WINGS & 15 STORY CHAPTERS)
 * js/config.js
 * ============================================================================
 */

window.GAME_CONFIG = {
  TILE_SIZE: 48,
  GRID_COLS: 16,
  GRID_ROWS: 11,
  DAY_DURATION_SEC: 120,
  DAYS_PER_SEASON: 5,

  // 1. HỆ THỐNG 5 BẢN ĐỒ ĐA KHÔNG GIAN CÓ ĐIỀU KIỆN MỞ KHÓA (5-REALM WORLD SYSTEM)
  MAPS: {
    valley: {
      id: 'valley',
      name: 'Thung Lũng Khởi Nguyên',
      shortName: '🏡 Thung Lũng',
      icon: '🏡',
      unlockDesc: 'Mở sẵn từ đầu',
      unlockCostGold: 0,
      checkUnlock: () => true,
      soilKeepWet: false,
      growthMult: 1.0,
      mutationMult: 1.0,
      gemDropBonus: 0,
      yieldMult: 1,
      themeDesc: 'Nông trại 4 mùa trù phú, Biệt Thự Hoàng Kim, Đền Đại Thụ, 6 Xưởng Tự Động (+G/s) & Hồ Cá Koi.'
    },
    crystal_cavern: {
      id: 'crystal_cavern',
      name: 'Động Pha Lê Cổ Đại',
      shortName: '⛏️ Động Pha Lê',
      icon: '⛏️',
      unlockDesc: 'Đạt Cấp 2 (hoặc thu hoạch 4 cây) — Mở miễn phí khi đủ điều kiện hoặc mở sớm 200G',
      unlockCostGold: 200,
      checkUnlock: (g) => g.level >= 2 || g.stats.harvested >= 4,
      soilKeepWet: true,
      growthMult: 1.35,
      mutationMult: 1.5,
      gemDropBonus: 0.20,
      yieldMult: 1,
      themeDesc: 'Đất Pha Lê Vĩnh Cửu (Không cần tưới nước!), Mỏ Đá Cường Hóa 🪨, Mỏ Bảo Thạch 💎 & Quặng Vàng tự mọc lại liên tục!'
    },
    sky_island: {
      id: 'sky_island',
      name: 'Đảo Thiên Không Ngân Hà',
      shortName: '🌌 Thiên Không',
      icon: '🌌',
      unlockDesc: 'Đạt Cấp 4 hoặc có Thần Khí +3 (hoặc mở sớm 600G)',
      unlockCostGold: 600,
      checkUnlock: (g) => g.level >= 4 || g.getHighestToolPlus() >= 3 || g.storyChapter >= 4,
      soilKeepWet: true,
      growthMult: 2.0,
      mutationMult: 3.0,
      gemDropBonus: 0.35,
      yieldMult: 1,
      themeDesc: 'Đất Linh Khí Ngân Hà (Tự ẩm 100%, Cây lớn nhanh x2.0, Đột Biến Ánh Sao x3.0), Tháp Tinh Tú & Đài Luân Hồi!'
    },
    dragon_sanctum: {
      id: 'dragon_sanctum',
      name: 'Thánh Địa Thần Long Hoả Diệm',
      shortName: '🔥 Thần Long',
      icon: '🔥',
      unlockDesc: 'Đạt Cấp 6, hoặc Thần Khí +6, hoặc Thăng Hoa ★1 (hoặc mở sớm 1.200G)',
      unlockCostGold: 1200,
      checkUnlock: (g) => g.level >= 6 || g.getHighestToolPlus() >= 6 || (g.ascensionCount || 0) >= 1 || g.storyChapter >= 6,
      soilKeepWet: true,
      growthMult: 2.8,
      mutationMult: 4.0,
      gemDropBonus: 0.55,
      yieldMult: 2,
      themeDesc: 'Đất Dung Nham Thần Long (Tự ẩm 100%, Lớn nhanh x2.8, Đột biến x4.0, Sản lượng x2), Mỏ Hỏa Ngọc rớt Ngọc Cấp 2 & Đài Thần Long!'
    },
    astral_nexus: {
      id: 'astral_nexus',
      name: 'Vương Quốc Tinh Tú Vô Cực',
      shortName: '🪐 Tinh Tú',
      icon: '🪐',
      unlockDesc: 'Đạt Cấp 8, hoặc Thần Khí +10, hoặc Tháp Tầng 3, hoặc Luân Hồi ★2 (hoặc mở sớm 3.000G)',
      unlockCostGold: 3000,
      checkUnlock: (g) => g.level >= 8 || g.getHighestToolPlus() >= 10 || (g.starlightTowerFloor || 1) >= 3 || (g.ascensionCount || 0) >= 2,
      soilKeepWet: true,
      growthMult: 3.8,
      mutationMult: 5.0,
      gemDropBonus: 0.80,
      yieldMult: 3,
      themeDesc: 'Đất Nguyên Thủy Vũ Trụ (Tự ẩm 100%, Lớn siêu tốc x3.8, Đột biến x5.0, Sản lượng x3), Mỏ Thiên Thạch rớt Ngọc Cấp 3 & Boss Kỳ Lân Tinh Vân!'
    }
  },

  // 2. HỆ THỐNG 4 THẦN KHÍ NÔNG CỤ (ĐẬP ĐỒ +1 -> +20, THỨC TỈNH ★1->★5, PHỤ MA & KHẢM 3 Ô NGỌC)
  SACRED_TOOLS: [
    {
      id: 'scythe',
      name: 'Lưỡi Hái Ánh Sao',
      icon: '🧺',
      pixelKey: 'tool_scythe',
      baseEffectDesc: 'Mỗi cấp Cường Hóa: +18% Vàng thu hoạch & +4% tỉ lệ nổ Chí Mạng (x3)',
      milestoneDesc: 'Mốc +4: Hào quang Lam Ngọc • Mốc +7: Tia Sét Gặt Lan • Mốc +15: Bão Kiếm Ngân Hà • Mốc +20: Thần Khí Sáng Thế!'
    },
    {
      id: 'hoe',
      name: 'Cuốc Tinh Vân',
      icon: '⛏️',
      pixelKey: 'tool_hoe',
      baseEffectDesc: 'Mỗi cấp Cường Hóa: +12% sản lượng đào Mỏ Đá Rèn, Mỏ Ngọc Quý & sát thương Boss',
      milestoneDesc: 'Mốc +3: Tự mở Cuốc Rộng 3×3 • Mốc +7: Đào mỏ x2 Khoáng Sản • Mốc +15: Thiên Thạch Chấn Động!'
    },
    {
      id: 'water',
      name: 'Bình Tưới Ngân Hà',
      icon: '🚿',
      pixelKey: 'tool_water',
      baseEffectDesc: 'Mỗi cấp Cường Hóa: +15% tốc độ sinh trưởng cây trồng & giảm tốn sức',
      milestoneDesc: 'Mốc +3: Tự mở Tưới Rộng 3×3 • Mốc +7: Tưới 1 lần thúc chín +25% • Mốc +15: Mưa Pháp Thuật Vĩnh Cửu!'
    },
    {
      id: 'rod',
      name: 'Cần Câu Long Vương',
      icon: '🎣',
      pixelKey: 'tool_rod',
      baseEffectDesc: 'Mỗi cấp Cường Hóa: Mở rộng thanh câu cá dễ trúng & +25% Vàng/Ngọc câu được',
      milestoneDesc: 'Mốc +4: Câu 1 được 2 Cá Koi • Mốc +7: 60% vớt Rương Long Cung • Mốc +15: Thần Long Phun Châu!'
    }
  ],

  // HỆ THỐNG CỘNG HƯỞNG BỘ 4 THẦN KHÍ (EQUIPMENT SET RESONANCE - 6 BẬC)
  SET_RESONANCE_TIERS: [
    { tier: 0, minTotalPlus: 0,  name: 'Chưa Cộng Hưởng', bonusGoldMult: 0,    bonusSpeedMult: 0,    wingColor: null },
    { tier: 1, minTotalPlus: 4,  name: 'Cộng Hưởng Tinh Xảo (Tổng +4)',    bonusGoldMult: 0.25, bonusSpeedMult: 0.15, wingColor: '#66bb6a' },
    { tier: 2, minTotalPlus: 12, name: 'Cộng Hưởng Lam Ngọc (Tổng +12)',   bonusGoldMult: 0.60, bonusSpeedMult: 0.35, wingColor: '#29b6f6' },
    { tier: 3, minTotalPlus: 24, name: 'Cộng Hưởng Sử Thi (Tổng +24)',     bonusGoldMult: 1.25, bonusSpeedMult: 0.65, wingColor: '#ce93d8' },
    { tier: 4, minTotalPlus: 36, name: 'Cộng Hưởng Hoàng Kim (Tổng +36)',  bonusGoldMult: 2.20, bonusSpeedMult: 1.00, wingColor: '#ffd700' },
    { tier: 5, minTotalPlus: 48, name: 'Cộng Hưởng Thần Thoại (Tổng +48)', bonusGoldMult: 3.80, bonusSpeedMult: 1.50, wingColor: '#ff4081' },
    { tier: 6, minTotalPlus: 60, name: 'Cộng Hưởng Sáng Thế Thái Cổ (Tổng +60)', bonusGoldMult: 6.00, bonusSpeedMult: 2.20, wingColor: '#00e5ff' }
  ],

  // HỆ THỐNG DÒNG PHỤ MA THẦN KHÍ (ENCHANTING AFFIX POOL)
  TOOL_AFFIX_POOL: [
    { id: 'affix_gold_1',   rarity: 'Hiếm',        color: '#29b6f6', name: 'Phú Quý Tinh Xảo',   goldBonus: 0.20, speedBonus: 0,    critBonus: 0,    stoneBonus: 0,    desc: '+20% Vàng thu hoạch & bán hàng' },
    { id: 'affix_speed_1',  rarity: 'Hiếm',        color: '#29b6f6', name: 'Gió Xuân Sinh Trưởng', goldBonus: 0,    speedBonus: 0.25, critBonus: 0,    stoneBonus: 0,    desc: '+25% Tốc độ cây trồng sinh trưởng' },
    { id: 'affix_crit_2',   rarity: 'Sử Thi',      color: '#ce93d8', name: 'Lưỡi Gặt Sấm Sét',   goldBonus: 0.25, speedBonus: 0,    critBonus: 0.12, stoneBonus: 0,    desc: '+25% Vàng & +12% Tỷ lệ nổ Chí Mạng (x3)' },
    { id: 'affix_miner_2',  rarity: 'Sử Thi',      color: '#ce93d8', name: 'Mạch Quặng Tinh Vân', goldBonus: 0.15, speedBonus: 0.15, critBonus: 0,    stoneBonus: 0.20, desc: '+20% Tỷ lệ rơi Đá Cường Hóa & +15% Vàng/Tốc độ' },
    { id: 'affix_royal_3',  rarity: 'Huyền Thoại', color: '#ffd700', name: 'Hào Quang Đế Vương', goldBonus: 0.55, speedBonus: 0.30, critBonus: 0.15, stoneBonus: 0.15, desc: '+55% Vàng, +30% Tốc độ lớn & +15% Chí Mạng' },
    { id: 'affix_mythic_4', rarity: 'Thần Thoại ★', color: '#ff4081', name: 'Thần Long Chúc Phúc', goldBonus: 1.00, speedBonus: 0.55, critBonus: 0.25, stoneBonus: 0.30, desc: '+100% Vàng, +55% Tốc độ lớn, +25% Chí Mạng & +30% Rơi Đá!' },
    { id: 'affix_astral_5', rarity: 'Thái Cổ ★★',   color: '#00e5ff', name: 'Ý Chí Sáng Thế Yggdrasil', goldBonus: 1.65, speedBonus: 0.85, critBonus: 0.35, stoneBonus: 0.45, desc: '+165% Vàng, +85% Tốc độ lớn, +35% Chí Mạng & +45% Rơi Đá!' }
  ],

  getEnhanceStepConfig(targetPlus) {
    if (targetPlus <= 3) {
      return {
        plus: targetPlus,
        chance: 0.95 - (targetPlus - 1) * 0.05,
        stoneCost: 1,
        goldCost: 60 * targetPlus,
        pityGainOnFail: 40,
        tierName: 'Lục Bảo (Tinh Xảo)',
        color: '#66bb6a',
        glowColor: 'rgba(102, 187, 106, 0.55)',
        cssClass: 'rarity-uncommon'
      };
    }
    if (targetPlus <= 6) {
      return {
        plus: targetPlus,
        chance: 0.72 - (targetPlus - 4) * 0.06,
        stoneCost: 2,
        goldCost: 140 * targetPlus,
        pityGainOnFail: 35,
        tierName: 'Lam Ngọc (Hiếm)',
        color: '#29b6f6',
        glowColor: 'rgba(41, 182, 246, 0.65)',
        cssClass: 'rarity-rare'
      };
    }
    if (targetPlus <= 9) {
      return {
        plus: targetPlus,
        chance: 0.48 - (targetPlus - 7) * 0.05,
        stoneCost: 3,
        goldCost: 260 * targetPlus,
        pityGainOnFail: 30,
        tierName: 'Tử Kim (Sử Thi)',
        color: '#ce93d8',
        glowColor: 'rgba(206, 147, 216, 0.75)',
        cssClass: 'rarity-epic'
      };
    }
    if (targetPlus <= 12) {
      return {
        plus: targetPlus,
        chance: 0.30 - (targetPlus - 10) * 0.03,
        stoneCost: 4,
        goldCost: 450 * targetPlus,
        pityGainOnFail: 25,
        tierName: 'Hoàng Kim (Huyền Thoại)',
        color: '#ffd700',
        glowColor: 'rgba(255, 215, 0, 0.85)',
        cssClass: 'rarity-legendary'
      };
    }
    if (targetPlus <= 15) {
      return {
        plus: targetPlus,
        chance: Math.max(0.14, 0.20 - (targetPlus - 13) * 0.03),
        stoneCost: 5,
        goldCost: 750 * targetPlus,
        pityGainOnFail: 25,
        tierName: 'Thần Thoại Thất Sắc',
        color: '#ff4081',
        glowColor: 'rgba(255, 64, 129, 0.92)',
        cssClass: 'rarity-mythic'
      };
    }
    return {
      plus: targetPlus,
      chance: Math.max(0.10, 0.14 - (targetPlus - 16) * 0.01),
      stoneCost: 7,
      goldCost: 1100 * targetPlus,
      pityGainOnFail: 25,
      tierName: 'Thái Cổ Sáng Thế (+20)',
      color: '#00e5ff',
      glowColor: 'rgba(0, 229, 255, 0.95)',
      cssClass: 'rarity-mythic'
    };
  },

  // 3. HỆ THỐNG BẢO THẠCH KHẢM NẠM (4 LOẠI NGỌC × 4 BẬC TIẾN HÓA LÊN THÁI CỔ ★★)
  GEM_TYPES: {
    ruby: {
      id: 'ruby',
      name: 'Hồng Ngọc Phú Quý',
      icon: '🔴',
      color: '#ff1744',
      statLabel: 'Vàng Thu Hoạch & Bán Hàng',
      tierValues: [0, 0.25, 0.60, 1.40, 3.00],
      desc: 'Khảm vào nông cụ giúp tăng mạnh lượng Vàng nổ ra khi thu hoạch và giá bán nông sản!'
    },
    sapphire: {
      id: 'sapphire',
      name: 'Lam Ngọc Tốc Độ',
      icon: '🔵',
      color: '#00b0ff',
      statLabel: 'Tốc Độ Cây Lớn & Giảm Thể Lực',
      tierValues: [0, 0.22, 0.55, 1.25, 2.60],
      desc: 'Khảm vào nông cụ giúp toàn bộ cây trên đồng lớn nhanh vượt bậc và tiết kiệm thể lực!'
    },
    emerald: {
      id: 'emerald',
      name: 'Lục Bảo Sinh Mệnh',
      icon: '🟢',
      color: '#00e676',
      statLabel: 'Tỷ Lệ Nổ Chí Mạng Sản Lượng (x3)',
      tierValues: [0, 0.12, 0.28, 0.65, 1.35],
      desc: 'Khảm vào nông cụ giúp tăng xác suất nổ Đại Mùa Màng (nhận gấp 3 sản lượng nông sản)!'
    },
    amethyst: {
      id: 'amethyst',
      name: 'Tử Tinh Vũ Trụ',
      icon: '🟣',
      color: '#d500f9',
      statLabel: 'Tỷ Lệ Đột Biến Ánh Sao & Rơi Đá Rèn',
      tierValues: [0, 0.12, 0.28, 0.60, 1.30],
      desc: 'Khảm vào nông cụ giúp cây dễ đột biến thành Cây Ánh Sao (x4) và rớt nhiều Đá Cường Hóa!'
    }
  },

  GEM_TIER_NAMES: {
    1: 'Cấp 1 (Thô)',
    2: 'Cấp 2 (Tinh Khiết)',
    3: 'Cấp 3 (Thần Châu ★)',
    4: 'Cấp 4 (Thái Cổ ★★)'
  },

  // 4. DANH HIỆU ĐIỀN CHỦ TĂNG TIẾN THEO TỔNG TÀI SẢN TÍCH LŨY
  PRESTIGE_RANKS: [
    { rank: 1, title: 'Nông Dân Tập Sự', icon: '🌱', minWealth: 0, bonusPrice: 0 },
    { rank: 2, title: 'Điền Chủ Khấm Khá', icon: '🌾', minWealth: 800, bonusPrice: 0.12 },
    { rank: 3, title: 'Phú Nông Thịnh Vượng', icon: '🏡', minWealth: 2500, bonusPrice: 0.28 },
    { rank: 4, title: 'Bá Tước Sao Băng', icon: '👑', minWealth: 6000, bonusPrice: 0.50 },
    { rank: 5, title: 'Đại Đế Ngân Hà', icon: '🌌', minWealth: 15000, bonusPrice: 0.90 },
    { rank: 6, title: 'Chúa Tể Thần Long', icon: '🐉', minWealth: 45000, bonusPrice: 1.50 },
    { rank: 7, title: 'Thần Nông Đa Vũ Trụ', icon: '🪐', minWealth: 120000, bonusPrice: 2.50 },
    { rank: 8, title: 'Đấng Sáng Thế Yggdrasil', icon: '👑', minWealth: 350000, bonusPrice: 4.00 }
  ],

  // 5. ĐỘ THÔNG THẠO GIỐNG CÂY (CROP STAR MASTERY ★ -> ★★ -> ★★★)
  CROP_MASTERY_TIERS: [
    { tier: 0, minHarvests: 0, stars: '', name: 'Phổ Thông', priceMult: 1.0, speedMult: 1.0, starShardChance: 0 },
    { tier: 1, minHarvests: 4, stars: '★', name: 'Hạng Bạc ★', priceMult: 1.30, speedMult: 1.18, starShardChance: 0.05 },
    { tier: 2, minHarvests: 12, stars: '★★', name: 'Hạng Vàng ★★', priceMult: 1.75, speedMult: 1.38, starShardChance: 0.12 },
    { tier: 3, minHarvests: 25, stars: '★★★', name: 'Hoàng Kim ★★★', priceMult: 2.50, speedMult: 1.65, starShardChance: 0.25 }
  ],

  // CÔNG THỨC VIỆN LAI TẠO GIỐNG CÂY THẦN THOẠI (4 CROSS-BREEDING LAB RECIPES)
  HYBRID_RECIPES: [
    {
      id: 'breed_void_mushroom',
      resultCrop: 'void_mushroom',
      resultQty: 3,
      parentA: { id: 'radish', qty: 2 },
      parentB: { id: 'eggplant', qty: 1 },
      goldCost: 120,
      desc: 'Kết hợp Củ Cải Đỏ & Cà Tím Ánh Trăng tạo ra 3 Hạt Nấm Linh Chi Tinh Vân (48% rớt Đá Rèn)!'
    },
    {
      id: 'breed_chrono_rose',
      resultCrop: 'chrono_rose',
      resultQty: 2,
      parentA: { id: 'mystic_lotus', qty: 1 },
      parentB: { id: 'starfruit', qty: 1 },
      goldCost: 260,
      desc: 'Lai tạo Sen Pha Lê Tuyết & Khế Ngàn Sao tạo ra 2 Hạt Hoa Hồng Thời Gian ⏳ (+35% tốc độ toàn map)!'
    },
    {
      id: 'breed_phoenix_blossom',
      resultCrop: 'phoenix_blossom',
      resultQty: 2,
      parentA: { id: 'golden_apple', qty: 1 },
      parentB: { id: 'chrono_rose', qty: 1 },
      goldCost: 420,
      desc: 'Lai tạo Táo Vàng & Hoa Hồng Thời Gian tạo ra 2 Hạt Hoa Phượng Hoàng Lửa 🔥 (55% làm chín tức thì cây lân cận)!'
    },
    {
      id: 'breed_cosmic_worldfruit',
      resultCrop: 'cosmic_worldfruit',
      resultQty: 2,
      parentA: { id: 'golden_apple', qty: 1 },
      parentB: { id: 'dragon_fruit', qty: 1 },
      goldCost: 500,
      desc: 'Hợp nhất Táo Vàng & Thanh Long Thần Thoại tạo ra 2 Hạt Quả Thế Giới Vũ Trụ 🪐 (2.400G + Mưa Báu Vật)!'
    },
    {
      id: 'breed_yggdrasil_fruit',
      resultCrop: 'yggdrasil_fruit',
      resultQty: 2,
      parentA: { id: 'cosmic_worldfruit', qty: 1 },
      parentB: { id: 'mystic_lotus', qty: 1 },
      goldCost: 850,
      desc: 'Hợp nhất Quả Thế Giới & Sen Pha Lê tạo ra 2 Hạt Trái Sáng Thế Yggdrasil 👑 (4.200G + 25% rớt Điểm Kỹ Năng ⭐)!'
    }
  ],

  // 6. DÂY CHUYỀN 6 XƯỞNG TINH CHẾ SINH LỜI THỤ ĐỘNG MỖI GIÂY (+G/s)
  PASSIVE_BUILDINGS: [
    {
      id: 'mead_workshop',
      name: 'Xưởng Ủ Mật Hoa Tự Động',
      icon: '🍯',
      baseCost: 160,
      costMult: 1.65,
      goldPerSec: 4,
      maxLevel: 5,
      desc: 'Tự động chiết xuất mật hoa thành vàng ròng mỗi giây (+4G/giây mỗi cấp) ngay cả khi bạn đang ở map khác!'
    },
    {
      id: 'star_winery',
      name: 'Hầm Rượu Vang Ánh Sao',
      icon: '🍷',
      baseCost: 420,
      costMult: 1.75,
      goldPerSec: 12,
      maxLevel: 5,
      desc: 'Ủ rượu vang thượng hạng xuất khẩu khắp thung lũng, thu về +12G/giây mỗi cấp!'
    },
    {
      id: 'crystal_spire',
      name: 'Tháp Tinh Luyện Ngân Hà',
      icon: '💎',
      baseCost: 950,
      costMult: 1.85,
      goldPerSec: 32,
      maxLevel: 5,
      desc: 'Hội tụ năng lượng sao băng thành dòng tiền khổng lồ (+32G/giây mỗi cấp) & tăng tỉ lệ rơi Mảnh Sao!'
    },
    {
      id: 'celestial_mint',
      name: 'Lò Đúc Kim Tinh Thiên Không',
      icon: '🌌',
      baseCost: 2400,
      costMult: 1.9,
      goldPerSec: 85,
      maxLevel: 5,
      desc: 'Khai thác năng lượng từ Đảo Thiên Không, đúc ra +85G/giây mỗi cấp và cung cấp dòng tiền bất tận!'
    },
    {
      id: 'dragon_heart_reactor',
      name: 'Lò Phản Ứng Trái Tim Thần Long',
      icon: '🐉',
      baseCost: 5800,
      costMult: 1.95,
      goldPerSec: 220,
      maxLevel: 5,
      desc: 'Hấp thụ long mạch từ Thánh Địa Thần Long, phun trào +220G/giây mỗi cấp!'
    },
    {
      id: 'astral_genesis_core',
      name: 'Thần Điện Sáng Thế Yggdrasil',
      icon: '🪐',
      baseCost: 14500,
      costMult: 2.0,
      goldPerSec: 600,
      maxLevel: 5,
      desc: 'Khai thác năng lượng từ Vương Quốc Tinh Tú Vô Cực, sinh lời +600G/giây mỗi cấp!'
    }
  ],

  // 7. NẤC THANG THÀNH TỰU ĐẾ CHẾ (EMPIRE MILESTONE PASS)
  EMPIRE_MILESTONES: [
    {
      id: 'ms_1',
      tier: 1,
      pointsNeeded: 25,
      title: 'Mốc 1: Khởi Đầu Thuận Lợi',
      rewardText: '💰 +180G, 🪨 +5 Đá Cường Hóa & 🎟️ +1 Vé Quay',
      rewardGold: 180,
      rewardStones: 5,
      rewardStars: 0,
      rewardSkillPts: 0,
      rewardTickets: 1
    },
    {
      id: 'ms_2',
      tier: 2,
      pointsNeeded: 65,
      title: 'Mốc 2: Thợ Rèn Tinh Tú',
      rewardText: '💰 +320G, 🪨 +8 Đá Cường Hóa, ⭐ +1 Kỹ Năng & 🎟️ +1 Vé Quay',
      rewardGold: 320,
      rewardStones: 8,
      rewardStars: 1,
      rewardSkillPts: 1,
      rewardTickets: 1
    },
    {
      id: 'ms_3',
      tier: 3,
      pointsNeeded: 130,
      title: 'Mốc 3: Chinh Phục Động Pha Lê',
      rewardText: '💦 +1 Vòi Tưới 3x3, 🍄 +3 Hạt Nấm Tinh Vân, 🪨 +12 Đá & 💰 +500G',
      rewardGold: 500,
      rewardStones: 12,
      rewardStars: 2,
      rewardSkillPts: 0,
      rewardTickets: 1,
      rewardDevice: 'sprinkler',
      rewardSeed: { id: 'void_mushroom', qty: 3 }
    },
    {
      id: 'ms_4',
      tier: 4,
      pointsNeeded: 220,
      title: 'Mốc 4: Triệu Hồi Tinh Linh',
      rewardText: '⭐ +2 Điểm Tinh Thông, 🪷 +3 Hạt Sen Pha Lê, 🪨 +15 Đá & 💰 +850G',
      rewardGold: 850,
      rewardStones: 15,
      rewardStars: 2,
      rewardSkillPts: 2,
      rewardTickets: 1,
      rewardSeed: { id: 'mystic_lotus', qty: 3 }
    },
    {
      id: 'ms_5',
      tier: 5,
      pointsNeeded: 360,
      title: 'Mốc 5: Bậc Thầy Thần Khí',
      rewardText: '⏳ +2 Hạt Hoa Hồng Thời Gian, 🪨 +25 Đá Cường Hóa & 💰 +1.500G',
      rewardGold: 1500,
      rewardStones: 25,
      rewardStars: 3,
      rewardSkillPts: 1,
      rewardTickets: 2,
      rewardSeed: { id: 'chrono_rose', qty: 2 }
    },
    {
      id: 'ms_6',
      tier: 6,
      pointsNeeded: 550,
      title: 'Mốc 6: Đại Đế Đa Vũ Trụ',
      rewardText: '🪐 +2 Hạt Quả Thế Giới, 💰 +4.000G, 🪨 +40 Đá & ⭐ +3 Kỹ Năng',
      rewardGold: 4000,
      rewardStones: 40,
      rewardStars: 5,
      rewardSkillPts: 3,
      rewardTickets: 3,
      rewardSeed: { id: 'cosmic_worldfruit', qty: 2 }
    },
    {
      id: 'ms_7',
      tier: 7,
      pointsNeeded: 850,
      title: 'Mốc 7: Đấng Sáng Thế Yggdrasil',
      rewardText: '👑 +2 Hạt Trái Sáng Thế Yggdrasil, 💰 +10.000G, 🪨 +60 Đá & ⭐ +5 Kỹ Năng',
      rewardGold: 10000,
      rewardStones: 60,
      rewardStars: 8,
      rewardSkillPts: 5,
      rewardTickets: 5,
      rewardSeed: { id: 'yggdrasil_fruit', qty: 2 }
    }
  ],

  // 8. VÒNG QUAY SAO BĂNG MAY MẮN
  LUCKY_WHEEL_PRIZES: [
    {
      id: 'gold_jackpot',
      label: '💰 Hũ Vàng Đại Cát',
      icon: '💰',
      desc: 'Nhận ngay +(280 + Cấp×110) Vàng ròng!'
    },
    {
      id: 'stone_jackpot',
      label: '🪨 Rương Đá Cường Hóa & Ngọc',
      icon: '🪨',
      desc: 'Nhận +8 Đá Cường Hóa & +2 Bảo Thạch Khảm Nạm!'
    },
    {
      id: 'fever_burst',
      label: '🔥 Cơn Sốt Hoàng Kim 20s',
      icon: '🔥',
      desc: 'Kích hoạt 20s Cơn Sốt: Cây lớn x3, Vàng x2, 0 tốn sức!'
    },
    {
      id: 'skill_point',
      label: '⭐ +1 Điểm Tinh Thông',
      icon: '⭐',
      desc: 'Nhận ngay 1 Điểm Kỹ Năng Tinh Thông quý giá!'
    },
    {
      id: 'seed_jackpot',
      label: '👑 Gói Hạt Giống Sáng Thế',
      icon: '👑',
      desc: 'Nhận +1 Trái Yggdrasil 👑, +1 Quả Thế Giới 🪐 & +1 Hoa Phượng Hoàng!'
    },
    {
      id: 'star_bundle',
      label: '🌠 +3 Mảnh Sao Băng',
      icon: '🌠',
      desc: 'Nhận ngay 3 Mảnh Sao Băng để dùng Bùa Cường Hóa & Thức Tỉnh!'
    }
  ],

  // 9. CÂY KỸ NĂNG TINH THÔNG (MASTERY SKILL TREE)
  MASTERY_SKILLS: [
    {
      id: 'golden_touch',
      name: 'Bàn Tay Hoàng Kim',
      icon: '🍀',
      maxLevel: 5,
      effectPerLevel: '+8% tỉ lệ nổ Thu Hoạch Chí Mạng (x3 Sản lượng & Vàng)',
      desc: 'Mỗi cấp tăng mạnh xác suất nổ Đại Mùa Màng, tỉ lệ rơi Đá Cường Hóa & Ngọc Quý!'
    },
    {
      id: 'hydro_vitality',
      name: 'Suối Nguồn Sinh Lực',
      icon: '⚡',
      maxLevel: 5,
      effectPerLevel: '+22% tốc độ lớn toàn bộ cây & -12% năng lượng tiêu hao',
      desc: 'Truyền sinh khí vào lòng đất giúp mọi cây trồng lớn nhanh vượt bậc và giữ sức bền bỉ.'
    },
    {
      id: 'fairy_drone',
      name: 'Tinh Linh Phụ Tá Tự Động',
      icon: '🧚',
      maxLevel: 5,
      effectPerLevel: 'Triệu hồi Tinh Linh bay lượn tự tưới nước & tự thu hoạch',
      desc: 'Tinh Linh Ánh Sao bay khắp bản đồ đang mở để tự động tưới ẩm đất khô và thu hoạch cây chín!'
    },
    {
      id: 'star_alchemy',
      name: 'Thuật Giả Kim Vương Giả',
      icon: '👑',
      maxLevel: 5,
      effectPerLevel: '+20% giá bán mọi nông sản & +25% sản lượng Xưởng Tự Động',
      desc: 'Biến nông sản thành thương phẩm thượng hạng và kích hoạt lãi kép cho toàn bộ Xưởng Tinh Chế!'
    }
  ],

  SEASONS: [
    {
      id: 'spring',
      name: 'Mùa Xuân',
      icon: '🌸',
      grassMain: '#5da632',
      grassDark: '#4f9128',
      grassLight: '#7ac74a',
      flowerColor: '#ff80ab',
      bonusDesc: 'Củ Cải, Dâu Tây, Sen Pha Lê, Hoa Hồng Thời Gian & Yggdrasil lớn nhanh +25%',
      boostCrops: ['radish', 'strawberry', 'mystic_lotus', 'chrono_rose', 'yggdrasil_fruit']
    },
    {
      id: 'summer',
      name: 'Mùa Hạ',
      icon: '☀️',
      grassMain: '#4c992a',
      grassDark: '#3f8420',
      grassLight: '#6db843',
      flowerColor: '#ffd54f',
      bonusDesc: 'Hướng Dương, Khế Sao, Thanh Long, Hoa Phượng Hoàng & Quả Thế Giới lớn nhanh +25%',
      boostCrops: ['sunflower', 'starfruit', 'dragon_fruit', 'phoenix_blossom', 'cosmic_worldfruit']
    },
    {
      id: 'autumn',
      name: 'Mùa Thu',
      icon: '🍁',
      grassMain: '#b88232',
      grassDark: '#9c6b24',
      grassLight: '#d49d46',
      flowerColor: '#ff7043',
      bonusDesc: 'Bí Ngô, Cà Tím, Táo Vàng, Quả Thế Giới & Yggdrasil bán được giá +25%',
      boostCrops: ['pumpkin', 'eggplant', 'golden_apple', 'cosmic_worldfruit', 'yggdrasil_fruit']
    },
    {
      id: 'winter',
      name: 'Mùa Đông',
      icon: '❄️',
      grassMain: '#9ec3d6',
      grassDark: '#86aec4',
      grassLight: '#cbe4f2',
      flowerColor: '#80d8ff',
      bonusDesc: 'Nấm Tinh Vân, Sen Pha Lê, Hoa Hồng Thời Gian, Yggdrasil & Cá Koi nhân đôi hiệu quả!',
      boostCrops: ['void_mushroom', 'mystic_lotus', 'chrono_rose', 'yggdrasil_fruit', 'starfruit']
    }
  ],

  // 10. CỐT TRUYỆN 15 CHƯƠNG + THÁP THỬ THÁCH VÔ TẬN + SĂN BOSS KỲ LÂN TINH VÂN
  STORY_CHAPTERS: [
    {
      chapter: 1,
      title: 'Chương 1: Bức Thư Của Ông Nội',
      npc: 'lumia',
      introText: 'Ông Nội để lại mảnh đất này cùng lời nhắn: "Hãy đánh thức Cây Đại Thụ Ánh Sao và rèn bộ Thần Khí Nông Cụ." Hãy thu hoạch củ cải và tích lũy 300G nhé!',
      goalDesc: 'Thu hoạch 4 nông sản bất kỳ & tích lũy 300 Vàng',
      check: (g) => g.stats.harvested >= 4 && g.gold >= 300,
      progressRatio: (g) => Math.min(1, (Math.min(1, g.stats.harvested / 4) + Math.min(1, g.gold / 300)) / 2),
      progressText: (g) => `Thu hoạch ${Math.min(4, g.stats.harvested)}/4 | Vàng ${Math.min(300, Math.floor(g.gold))}/300`,
      rewardGold: 220,
      rewardStars: 2,
      unlockText: 'Mở khóa Cổng Dịch Chuyển sang ⛏️ ĐỘNG PHA LÊ CỔ ĐẠI, nhận +220G & +2 🌠 Sao!'
    },
    {
      chapter: 2,
      title: 'Chương 2: Bí Mật Động Pha Lê Cổ Đại',
      npc: 'bactam',
      introText: 'Bác Tâm chỉ về phía Cổng Dịch Chuyển: "Động Pha Lê đã mở! Hãy sang Động Pha Lê đào Mạch Quặng Đá/Ngọc và đập 1 Thần Khí lên +2 nhé!"',
      goalDesc: 'Cường hóa Thần Khí đạt +2 & thu hoạch đủ 10 nông sản',
      check: (g) => g.getHighestToolPlus() >= 2 && g.stats.harvested >= 10,
      progressRatio: (g) => (Math.min(1, g.getHighestToolPlus() / 2) + Math.min(1, g.stats.harvested / 10)) / 2,
      progressText: (g) => `Thần Khí +${Math.min(2, g.getHighestToolPlus())}/2 | Thu hoạch ${Math.min(10, g.stats.harvested)}/10`,
      rewardGold: 380,
      rewardStars: 3,
      unlockText: 'Thân Cây Đại Thụ đâm chồi (Cấp 2), tặng 3 Hạt Nấm Tinh Vân 🍄 & +1 Vòi Tưới 3x3!'
    },
    {
      chapter: 3,
      title: 'Chương 3: Hương Vị Của Thung Lũng',
      npc: 'colinh',
      introText: 'Cô Linh Đầu Bếp nhắn nhủ: "Nông sản tươi kết hợp với trứng gà, sữa bò hay Nấm Linh Chi sẽ tạo nên những món ăn tuyệt hảo trong Nhà Bếp!"',
      goalDesc: 'Hoàn thành 1 Gói Hiến Tế Đền Thờ (hoặc nấu 2 món ăn tại Bếp)',
      check: (g) => g.completedBundles.length >= 1 || g.stats.dishesCooked >= 2,
      progressRatio: (g) => Math.max(Math.min(1, g.completedBundles.length / 1), Math.min(1, g.stats.dishesCooked / 2)),
      progressText: (g) => `Hiến tế ${g.completedBundles.length}/1 | Nấu ăn ${Math.min(2, g.stats.dishesCooked)}/2`,
      rewardGold: 550,
      rewardStars: 3,
      unlockText: 'Tán Lá Ánh Sao tỏa sáng (Cấp 3) & giảm 25% năng lượng tiêu hao!'
    },
    {
      chapter: 4,
      title: 'Chương 4: Hào Quang Lam Ngọc & Đảo Thiên Không',
      npc: 'bactam',
      introText: 'Bác Tâm Thợ Rèn hào hứng: "Hãy rèn Thần Khí lên mốc +4 Lam Ngọc để kích hoạt Vòng Hào Quang và mở đường lên 🌌 Đảo Thiên Không Ngân Hà!"',
      goalDesc: 'Cường hóa Thần Khí bất kỳ đạt +4 & đạt Cấp độ 3',
      check: (g) => g.getHighestToolPlus() >= 4 && g.level >= 3,
      progressRatio: (g) => (Math.min(1, g.getHighestToolPlus() / 4) + Math.min(1, g.level / 3)) / 2,
      progressText: (g) => `Thần Khí +${Math.min(4, g.getHighestToolPlus())}/4 | Cấp độ ${Math.min(3, g.level)}/3`,
      rewardGold: 850,
      rewardStars: 4,
      unlockText: 'Mở khóa 🌌 ĐẢO THIÊN KHÔNG NGÂN HÀ (Đất Linh Khí lớn nhanh x2) & tặng 2 Hạt Sen Pha Lê 🪷!'
    },
    {
      chapter: 5,
      title: 'Chương 5: Tự Động Hóa Đế Chế',
      npc: 'bamai',
      introText: 'Bà Mai mỉm cười: "Một Đại Điền Chủ thực thụ biết để tiền tự đẻ ra tiền! Hãy xây dựng Xưởng Tinh Chế Tự Động và đạt chuẩn Hạng Sao cho cây trồng nhé!"',
      goalDesc: 'Sở hữu ít nhất 1 Xưởng Tự Động (+G/s) & hoàn thành 2 Gói Hiến Tế',
      check: (g) => g.getPassiveGoldPerSec() > 0 && g.completedBundles.length >= 2,
      progressRatio: (g) => ((g.getPassiveGoldPerSec() > 0 ? 1 : 0) + Math.min(1, g.completedBundles.length / 2)) / 2,
      progressText: (g) => `Xưởng +${g.getPassiveGoldPerSec()}G/s | Hiến tế ${Math.min(2, g.completedBundles.length)}/2`,
      rewardGold: 1200,
      rewardStars: 5,
      unlockText: 'Hoa Đại Thụ Nở Rộ (Cấp 4), tặng 2 Hạt Táo Vàng Hesperides 🍎 & +1200G!'
    },
    {
      chapter: 6,
      title: 'Chương 6: Tia Sét Tử Kim & Thánh Địa Thần Long',
      npc: 'bactam',
      introText: 'Bác Tâm giơ cao búa thần: "Khi Thần Khí đạt +6/+7, mỗi nhát gặt sẽ phóng ra Tia Sét Tinh Tú và mở khóa 🔥 THÁNH ĐỊA THẦN LONG!"',
      goalDesc: 'Cường hóa Thần Khí bất kỳ đạt +6 & khảm ít nhất 2 Bảo Thạch',
      check: (g) => g.getHighestToolPlus() >= 6 && g.getActiveToolGems().length >= 2,
      progressRatio: (g) => (Math.min(1, g.getHighestToolPlus() / 6) + Math.min(1, g.getActiveToolGems().length / 2)) / 2,
      progressText: (g) => `Thần Khí +${Math.min(6, g.getHighestToolPlus())}/6 | Ngọc đã khảm ${Math.min(2, g.getActiveToolGems().length)}/2`,
      rewardGold: 1800,
      rewardStars: 6,
      unlockText: 'Mở khóa 🔥 THÁNH ĐỊA THẦN LONG (Đất Dung Nham lớn nhanh x2.8), nhận +1800G & +10 🪨 Đá Rèn!'
    },
    {
      chapter: 7,
      title: 'Chương 7: Đại Thụ Thức Tỉnh & Viện Lai Tạo Gen',
      npc: 'lumia',
      introText: 'Tinh Linh Lumia xúc động: "Hãy hoàn tất 4 Gói Hiến Tế tại Đền Thờ hoặc lai tạo giống cây mới trong Viện Nghiên Cứu Lai Tạo Gen!"',
      goalDesc: 'Hoàn thành 4 Gói Hiến Tế (hoặc nâng cấp Gen cây trồng lên G2)',
      check: (g) => g.completedBundles.length >= 4 || g.getHighestCropGene() >= 2,
      progressRatio: (g) => Math.max(Math.min(1, g.completedBundles.length / 4), Math.min(1, g.getHighestCropGene() / 2)),
      progressText: (g) => `Hiến tế ${Math.min(4, g.completedBundles.length)}/4 | Cấp Gen G${g.getHighestCropGene()}/2`,
      rewardGold: 2600,
      rewardStars: 8,
      unlockText: '🌳 ĐẠI THỤ CẤP 5 THỨC TỈNH: Tặng 2 Hạt Hoa Hồng Thời Gian ⏳ & 2 Hạt Thanh Long 🐉!'
    },
    {
      chapter: 8,
      title: 'Chương 8: Cộng Hưởng Bộ Thần Khí & Đôi Cánh Ánh Sao',
      npc: 'bactam',
      introText: 'Bác Tâm tiết lộ: "Khi tổng cấp Cường Hóa của cả 4 Thần Khí đạt mốc +12, bộ giáp sẽ kích hoạt Cộng Hưởng Lam Ngọc và mọc Đôi Cánh Ánh Sao sau lưng!"',
      goalDesc: 'Tổng cấp Cường Hóa cả 4 Thần Khí đạt +12 & thu hoạch 40 nông sản',
      check: (g) => g.getTotalToolPlus() >= 12 && g.stats.harvested >= 40,
      progressRatio: (g) => (Math.min(1, g.getTotalToolPlus() / 12) + Math.min(1, g.stats.harvested / 40)) / 2,
      progressText: (g) => `Tổng cấp Bộ Thần Khí +${Math.min(12, g.getTotalToolPlus())}/12 | Thu hoạch ${Math.min(40, g.stats.harvested)}/40`,
      rewardGold: 4200,
      rewardStars: 10,
      unlockText: '🪽 KÍCH HOẠT ĐÔI CÁNH CỘNG HƯỞNG: Tặng 2 Hạt Hoa Phượng Hoàng 🔥 & +4200G!'
    },
    {
      chapter: 9,
      title: 'Chương 9: Thần Khí Hoàng Kim (+10) & Vương Quốc Tinh Tú',
      npc: 'bactam',
      introText: 'Bác Tâm rực sáng ánh mắt: "Đập 1 Thần Khí lên mốc +10 Hoàng Kim sẽ mở cánh cổng tới Thế Giới Thứ 5: 🪐 VƯƠNG QUỐC TINH TÚ VÔ CỰC!"',
      goalDesc: 'Cường hóa Thần Khí bất kỳ đạt +10 (Hoàng Kim) & tổng tài sản đạt 12.000G',
      check: (g) => g.getHighestToolPlus() >= 10 && g.totalWealthEarned >= 12000,
      progressRatio: (g) => (Math.min(1, g.getHighestToolPlus() / 10) + Math.min(1, g.totalWealthEarned / 12000)) / 2,
      progressText: (g) => `Thần Khí +${Math.min(10, g.getHighestToolPlus())}/10 | Tài sản ${Math.min(12000, Math.floor(g.totalWealthEarned))}/12000`,
      rewardGold: 6500,
      rewardStars: 12,
      unlockText: '🪐 MỞ KHÓA MAP 5: VƯƠNG QUỐC TINH TÚ VÔ CỰC (Đất x3.8 & Boss Kỳ Lân Tinh Vân) + 6.500G!'
    },
    {
      chapter: 10,
      title: 'Chương 10: Luân Hồi Thăng Hoa Đa Vũ Trụ',
      npc: 'lumia',
      introText: 'Tinh Linh Lumia cúi chào: "Hãy kích hoạt ĐÀI LUÂN HỒI THĂNG HOA để nhân đôi vĩnh viễn toàn bộ lợi nhuận mà vẫn giữ nguyên mọi Thần Khí & Xưởng!"',
      goalDesc: 'Thực hiện ít nhất 1 lần Luân Hồi Thăng Hoa (hoặc đạt Thần Khí +12)',
      check: (g) => (g.ascensionCount || 0) >= 1 || g.getHighestToolPlus() >= 12,
      progressRatio: (g) => Math.max(Math.min(1, (g.ascensionCount || 0) / 1), Math.min(1, g.getHighestToolPlus() / 12)),
      progressText: (g) => `Thăng Hoa ★${g.ascensionCount || 0}/1 | Thần Khí +${Math.min(12, g.getHighestToolPlus())}/12`,
      rewardGold: 12000,
      rewardStars: 16,
      unlockText: '🌌 CHÚA TỂ LUÂN HỒI: Nhận +12.000G, +25 🪨 Đá Rèn & +2 Hạt Quả Thế Giới 🪐!'
    },
    {
      chapter: 11,
      title: 'Chương 11: Chinh Phục Tháp Thử Thách Tinh Tú',
      npc: 'lumia',
      introText: 'Lumia chỉ lên đỉnh trời: "Tháp Thử Thách Tinh Tú có vô hạn tầng! Hãy vượt qua Tầng 3 của Tháp Tinh Tú để khắc tên vào Bảng Vàng Ngân Hà!"',
      goalDesc: 'Chinh phục Tầng 3 của Tháp Thử Thách Tinh Tú & sở hữu Quả Thế Giới 🪐',
      check: (g) => (g.starlightTowerFloor || 1) >= 3 && (g.discovered.cosmic_worldfruit || 0) >= 1,
      progressRatio: (g) => (Math.min(1, (g.starlightTowerFloor || 1) / 3) + Math.min(1, (g.discovered.cosmic_worldfruit || 0) / 1)) / 2,
      progressText: (g) => `Tháp Tinh Tú Tầng ${g.starlightTowerFloor || 1}/3 | Quả Thế Giới ${Math.min(1, g.discovered.cosmic_worldfruit || 0)}/1`,
      rewardGold: 22000,
      rewardStars: 20,
      unlockText: '🗼 BÁ CHỦ THÁP TINH TÚ: Nhận +22.000G, +35 🪨 Đá Rèn & +2 Hạt Trái Sáng Thế Yggdrasil 👑!'
    },
    {
      chapter: 12,
      title: 'Chương 12: Thức Tỉnh Thần Khí (Awakening ★)',
      npc: 'bactam',
      introText: 'Bác Tâm trao bí kíp cổ truyền: "Hãy Thức Tỉnh ít nhất 1 ngôi sao ★ cho Thần Khí của bạn trong Lò Rèn để nhân bội uy lực thu hoạch!"',
      goalDesc: 'Thức Tỉnh Thần Khí đạt ★1 (hoặc đạt Thần Khí +14)',
      check: (g) => g.getHighestToolAwakening() >= 1 || g.getHighestToolPlus() >= 14,
      progressRatio: (g) => Math.max(Math.min(1, g.getHighestToolAwakening() / 1), Math.min(1, g.getHighestToolPlus() / 14)),
      progressText: (g) => `Thức Tỉnh ★${g.getHighestToolAwakening()}/1 | Thần Khí +${g.getHighestToolPlus()}/14`,
      rewardGold: 32000,
      rewardStars: 24,
      unlockText: '⚡ THỨC TỈNH THẦN KHÍ: Nhận +32.000G, +40 🪨 Đá Rèn & +24 🌠 Sao!'
    },
    {
      chapter: 13,
      title: 'Chương 13: Săn Lùng Boss Kỳ Lân Tinh Vân',
      npc: 'lumia',
      introText: 'Lumia chỉ về phía 🪐 Vương Quốc Tinh Tú: "Tại đó có Boss Kỳ Lân Tinh Vân trấn giữ kho báu vũ trụ! Hãy chạm tấn công và hạ gục Boss ít nhất 1 lần!"',
      goalDesc: 'Hạ gục Boss Kỳ Lân Tinh Vân ở Map 5 (hoặc vượt Tầng 5 Tháp Tinh Tú)',
      check: (g) => (g.astralBossLevel || 1) >= 2 || (g.starlightTowerFloor || 1) >= 5,
      progressRatio: (g) => Math.max(Math.min(1, ((g.astralBossLevel || 1) - 1) / 1), Math.min(1, (g.starlightTowerFloor || 1) / 5)),
      progressText: (g) => `Boss Đã Hạ ${(g.astralBossLevel || 1) - 1}/1 | Tháp Tầng ${g.starlightTowerFloor || 1}/5`,
      rewardGold: 48000,
      rewardStars: 30,
      unlockText: '👾 DŨNG SĨ DIỆT KỲ LÂN: Nhận +48.000G, +50 🪨 Đá Rèn & +2 Hạt Yggdrasil 👑!'
    },
    {
      chapter: 14,
      title: 'Chương 14: Trái Cây Sáng Thế Yggdrasil',
      npc: 'bamai',
      introText: 'Bà Mai trầm trồ: "Giống cây tối thượng Trái Sáng Thế Yggdrasil 👑 kết tinh toàn bộ sinh mệnh vũ trụ. Hãy thu hoạch nó và nâng Gen cây lên G3!"',
      goalDesc: 'Thu hoạch Trái Sáng Thế Yggdrasil 👑 & đạt Gen G3 cho ít nhất 1 cây',
      check: (g) => (g.discovered.yggdrasil_fruit || 0) >= 1 && g.getHighestCropGene() >= 3,
      progressRatio: (g) => (Math.min(1, (g.discovered.yggdrasil_fruit || 0) / 1) + Math.min(1, g.getHighestCropGene() / 3)) / 2,
      progressText: (g) => `Yggdrasil ${Math.min(1, g.discovered.yggdrasil_fruit || 0)}/1 | Cấp Gen G${g.getHighestCropGene()}/3`,
      rewardGold: 75000,
      rewardStars: 40,
      unlockText: '👑 VIỆN TRƯỞNG SÁNG THẾ: Nhận +75.000G, +65 🪨 Đá Rèn & +40 🌠 Sao!'
    },
    {
      chapter: 15,
      title: 'Chương 15: Đỉnh Cao Thái Cổ Sáng Thế (+20)',
      npc: 'bactam',
      introText: 'Bác Tâm nghiêng mình kính cẩn: "Đập Thần Khí đạt cảnh giới tối thượng +20 Thái Cổ Sáng Thế sẽ đưa tên tuổi bạn lưu danh vĩnh hằng!"',
      goalDesc: 'Đạt Thần Khí +20 (hoặc Tổng Cộng Hưởng Bộ đạt +60)',
      check: (g) => g.getHighestToolPlus() >= 20 || g.getTotalToolPlus() >= 60,
      progressRatio: (g) => Math.max(Math.min(1, g.getHighestToolPlus() / 20), Math.min(1, g.getTotalToolPlus() / 60)),
      progressText: (g) => `Thần Khí +${g.getHighestToolPlus()}/20 | Tổng Bộ +${g.getTotalToolPlus()}/60`,
      rewardGold: 150000,
      rewardStars: 60,
      unlockText: '🪐 ĐẤNG SÁNG THẾ VĨNH HẰNG CỦA ĐA VŨ TRỤ: +150.000G, +60 🌠 Sao & Hào Quang Vô Cực!'
    }
  ],

  BUNDLES: [
    {
      id: 'bundle_spring',
      name: 'Gói Hiến Tế Mầm Xanh',
      icon: '🌱',
      desc: 'Dâng tặng những nông sản tươi ngon đầu mùa để đánh thức bộ rễ Cây Đại Thụ.',
      requirements: { radish: 3, strawberry: 2 },
      rewardText: '+250 Vàng, +2 🌠 Sao & +1 Vòi Tưới Tự Động',
      rewardGold: 250,
      rewardStars: 2,
      rewardDevice: 'sprinkler'
    },
    {
      id: 'bundle_ranch',
      name: 'Gói Hiến Tế Đồng Cỏ Ấm',
      icon: '🥚',
      desc: 'Sản vật từ đàn vật nuôi chăm chỉ và vườn hoa hướng dương rực rỡ.',
      requirements: { sunflower: 2, egg: 2 },
      rewardText: '+400 Vàng, +2 🌠 Sao & +1 Đèn Lồng Đom Đóm',
      rewardGold: 400,
      rewardStars: 2,
      rewardDevice: 'lantern'
    },
    {
      id: 'bundle_pond',
      name: 'Gói Hiến Tế Thủy Tinh Hồ Sao',
      icon: '🐟',
      desc: 'Kết tinh của dòng nước lấp lánh và vụ mùa thu hoạch trù phú.',
      requirements: { fish: 2, pumpkin: 2 },
      rewardText: '+550 Vàng, +3 🌠 Sao & +2 Hạt Khế Ngàn Sao',
      rewardGold: 550,
      rewardStars: 3,
      rewardSeed: { id: 'starfruit', qty: 2 }
    },
    {
      id: 'bundle_starlight',
      name: 'Gói Hiến Tế Ngân Hà Tối Thượng',
      icon: '🌟',
      desc: 'Những tuyệt phẩm quý giá nhất của Thung Lũng Sao Băng để Đại Thụ nở hoa vĩnh cửu.',
      requirements: { starfruit: 2, eggplant: 2, honey: 1 },
      rewardText: '+1.200 Vàng, +5 🌠 Sao & +2 Hạt Hoa Hồng Thời Gian ⏳',
      rewardGold: 1200,
      rewardStars: 5,
      rewardSeed: { id: 'chrono_rose', qty: 2 }
    }
  ],

  STAR_SHOP_ITEMS: [
    {
      id: 'instant_grow',
      name: 'Bụi Tiên Tăng Trưởng',
      icon: '✨',
      starCost: 1,
      desc: 'Làm chín ngay lập tức toàn bộ cây trồng đang có trên bản đồ hiện tại!'
    },
    {
      id: 'star_mutate_3',
      name: 'Tinh Thể Đột Biến Ngân Hà',
      icon: '🌈',
      starCost: 2,
      desc: 'Biến tối đa 3 cây trên đồng thành Cây Ánh Sao (x4 giá trị) và chín ngay!'
    },
    {
      id: 'trigger_fever',
      name: 'Trống Hội Cơn Sốt Hoàng Kim',
      icon: '🔥',
      starCost: 1,
      desc: 'Kích hoạt ngay 18 giây CƠN SỐT HOÀNG KIM (Cây lớn x3 tốc độ, Thu hoạch x2 Vàng, 0 tốn sức)!'
    },
    {
      id: 'respawn_cavern_ores',
      name: 'Địa Chấn Long Mạch (Tái Tạo Mỏ Quặng)',
      icon: '⛏️',
      starCost: 1,
      desc: 'Làm mọc lại ngay lập tức toàn bộ Mỏ Đá Rèn 🪨, Mỏ Ngọc 💎, Mỏ Hỏa Ngọc 🔥 & Thiên Thạch ☄️!'
    }
  ],

  NPCS: {
    lumia: {
      id: 'lumia',
      name: 'Tinh Linh Lumia',
      role: 'Hộ Vệ Đa Vũ Trụ',
      icon: '🧚',
      color: '#80d8ff',
      quote: 'Bạn có thể khám phá 5 Thế Giới: Thung Lũng, Động Pha Lê, Thiên Không, Thần Long & 🪐 Vương Quốc Tinh Tú!'
    },
    bamai: {
      id: 'bamai',
      name: 'Bà Mai',
      role: 'Viện Trưởng Lai Tạo Giống',
      icon: '👵',
      color: '#81c784',
      quote: 'Trồng 2 giống cây cạnh nhau hoặc ghé Viện Lai Tạo để ghép ra Hoa Phượng Hoàng 🔥 và Trái Sáng Thế Yggdrasil 👑 nhé!'
    },
    bactam: {
      id: 'bactam',
      name: 'Bác Tâm',
      role: 'Đại Sư Đập Đồ (+20) & Thức Tỉnh',
      icon: '🧔',
      color: '#ff8a65',
      quote: 'Đập 4 Thần Khí lên +20 Thái Cổ và Thức Tỉnh ★5 sẽ triệu hồi Đôi Cánh Sáng Thế và chém Boss Kỳ Lân cực mạnh!'
    },
    colinh: {
      id: 'colinh',
      name: 'Cô Linh',
      role: 'Đầu Bếp Nông Trại',
      icon: '👩‍🍳',
      color: '#f48fb1',
      quote: 'Món Đại Yến Sáng Thế Yggdrasil trong Bếp có giá trị chấn động cả Đa Vũ Trụ đấy!'
    },
    laokien: {
      id: 'laokien',
      name: 'Lão Ngư Kiên',
      role: 'Bậc Thầy Hồ Sao Băng',
      icon: '🎣',
      color: '#ffd54f',
      quote: 'Hồ Tinh Vân ở Map 5 ẩn chứa những kho báu cổ xưa nhất!'
    }
  },

  // 11. HỆ THỐNG 14 GIỐNG CÂY TRỒNG (ĐỒ HỌA PIXEL 5 GIAI ĐOẠN & 4 SIÊU GIỐNG LAI TẠO)
  CROPS: {
    radish: {
      id: 'radish',
      name: 'Củ Cải Đỏ',
      emoji: '🥕',
      pixelRow: 0,
      seedPrice: 15,
      sellPrice: 38,
      growTime: 14,
      xp: 12,
      regrow: false,
      color: '#eb4034',
      lightColor: '#ff8a80',
      leafColor: '#43a047',
      specialEffectDesc: 'Lớn siêu tốc 14s — Xoay vòng vốn cực nhanh đầu game.',
      desc: 'Lớn cực nhanh (14s)! Cây khởi đầu lý tưởng để xoay vòng vốn.'
    },
    strawberry: {
      id: 'strawberry',
      name: 'Dâu Tây Ngọt',
      emoji: '🍓',
      pixelRow: 1,
      seedPrice: 45,
      sellPrice: 46,
      growTime: 22,
      xp: 18,
      regrow: true,
      regrowStage: 2,
      color: '#f0325a',
      lightColor: '#ff80ab',
      leafColor: '#2e7d32',
      specialEffectDesc: 'Cây lưu niên: Thu hoạch xong giữ nguyên gốc tự ra quả mới!',
      desc: 'Thu hoạch xong vẫn giữ lại gốc và tự động ra lứa quả mới liên tục!'
    },
    pumpkin: {
      id: 'pumpkin',
      name: 'Bí Ngô Hoàng Kim',
      emoji: '🎃',
      pixelRow: 2,
      seedPrice: 60,
      sellPrice: 150,
      growTime: 30,
      xp: 28,
      regrow: false,
      color: '#f59b19',
      lightColor: '#ffd54f',
      leafColor: '#388e3c',
      specialEffectDesc: 'Trồng cụm 2×2 tự hợp nhất thành Bí Ngô Khổng Lồ (x3 sản lượng)!',
      desc: 'Trồng theo cụm 2x2 dễ hợp nhất thành Bí Ngô Khổng Lồ (x3 sản lượng)!'
    },
    sunflower: {
      id: 'sunflower',
      name: 'Hoa Hướng Dương',
      emoji: '🌻',
      pixelRow: 3,
      seedPrice: 50,
      sellPrice: 120,
      growTime: 20,
      xp: 22,
      regrow: false,
      auraBoost: 0.30,
      color: '#ffd700',
      lightColor: '#fff59d',
      leafColor: '#66bb6a',
      specialEffectDesc: 'Hào quang Mặt Trời: Tăng +30% tốc độ lớn cho 8 ô cây xung quanh!',
      desc: 'Tỏa năng lượng mặt trời giúp toàn bộ 8 ô cây xung quanh lớn nhanh hơn +30%!'
    },
    eggplant: {
      id: 'eggplant',
      name: 'Cà Tím Ánh Trăng',
      emoji: '🍆',
      pixelRow: 4,
      seedPrice: 80,
      sellPrice: 190,
      growTime: 32,
      xp: 35,
      regrow: true,
      regrowStage: 2,
      nightBoost: 2.2,
      color: '#9444d2',
      lightColor: '#ea80fc',
      leafColor: '#26a69a',
      specialEffectDesc: 'Hấp thụ ánh trăng: Lớn nhanh x2.2 vào ban đêm & tái thu hoạch!',
      desc: 'Hấp thụ ánh trăng: lớn nhanh gấp 2.2 lần vào ban đêm và thu hoạch nhiều lần!'
    },
    starfruit: {
      id: 'starfruit',
      name: 'Khế Ngàn Sao',
      emoji: '🌟',
      pixelRow: 5,
      seedPrice: 150,
      sellPrice: 400,
      growTime: 40,
      xp: 65,
      regrow: false,
      color: '#50e6ff',
      lightColor: '#ffff8d',
      leafColor: '#00acc1',
      specialEffectDesc: 'Tỉ lệ đột biến thành Cây Ánh Sao (x4 giá trị) cao gấp đôi!',
      desc: 'Giống cây huyền thoại của Thung Lũng Sao Băng! Tỉ lệ đột biến Ánh Sao cao gấp đôi.'
    },
    void_mushroom: {
      id: 'void_mushroom',
      name: 'Nấm Linh Chi Tinh Vân',
      emoji: '🍄',
      pixelRow: 6,
      seedPrice: 110,
      sellPrice: 280,
      growTime: 24,
      xp: 45,
      regrow: true,
      regrowStage: 2,
      bonusStoneChance: 0.48,
      color: '#00e5ff',
      lightColor: '#ea80fc',
      leafColor: '#7c4dff',
      specialEffectDesc: 'Đặc sản Động Pha Lê: 48% rớt thêm 🪨 Đá Cường Hóa mỗi lần gặt & tái sinh!',
      desc: 'Nấm phát sáng hấp thụ tinh thể: 48% rớt Đá Cường Hóa khi thu hoạch và mọc lại nhiều lần!'
    },
    mystic_lotus: {
      id: 'mystic_lotus',
      name: 'Sen Pha Lê Tuyết',
      emoji: '🪷',
      pixelRow: 7,
      seedPrice: 190,
      sellPrice: 520,
      growTime: 34,
      xp: 75,
      regrow: false,
      bonusEnergyRestore: 15,
      bonusGemChance: 0.30,
      color: '#40c4ff',
      lightColor: '#f8bbd0',
      leafColor: '#00bfa5',
      specialEffectDesc: 'Linh hoa băng tuyết: Hồi ngay +15⚡ Thể lực & 30% rớt 💎 Bảo Thạch khi gặt!',
      desc: 'Sen pha lê tinh khiết: mỗi lần thu hoạch hồi ngay +15⚡ Năng lượng và dễ rớt Bảo Thạch!'
    },
    golden_apple: {
      id: 'golden_apple',
      name: 'Táo Vàng Hesperides',
      emoji: '🍎',
      pixelRow: 8,
      seedPrice: 280,
      sellPrice: 720,
      growTime: 44,
      xp: 95,
      regrow: true,
      regrowStage: 2,
      bonusDirectGold: 180,
      color: '#ffab00',
      lightColor: '#ff5252',
      leafColor: '#64dd17',
      specialEffectDesc: 'Cây thần thoại tái sinh: Nổ thêm +180G trực tiếp mỗi lần hái quả!',
      desc: 'Quả táo bằng vàng ròng của thần thoại, thu hoạch nhiều lần và nổ +180 Vàng trực tiếp!'
    },
    dragon_fruit: {
      id: 'dragon_fruit',
      name: 'Thanh Long Thần Thoại',
      emoji: '🐉',
      pixelRow: 9,
      seedPrice: 420,
      sellPrice: 1150,
      growTime: 50,
      xp: 140,
      regrow: true,
      regrowStage: 2,
      bonusStarChance: 0.40,
      color: '#ff1744',
      lightColor: '#76ff03',
      leafColor: '#00e676',
      specialEffectDesc: 'Đỉnh cao Thiên Không: Tái sinh liên tục, 40% rớt 🌠 Sao Băng & 🪨 Đá Rèn!',
      desc: 'Giống cây Tối Thượng trên Đảo Thiên Không! Tái thu hoạch liên tục, 40% rớt Mảnh Sao Băng!'
    },
    chrono_rose: {
      id: 'chrono_rose',
      name: 'Hoa Hồng Thời Gian',
      emoji: '⏳',
      pixelRow: 10,
      seedPrice: 560,
      sellPrice: 1550,
      growTime: 38,
      xp: 180,
      regrow: true,
      regrowStage: 2,
      mapWideSpeedAura: 0.35,
      bonusTicketChance: 0.45,
      isHybrid: true,
      hybridParents: '🪷 Sen Pha Lê + 🌟 Khế Sao',
      color: '#00e5ff',
      lightColor: '#ffd700',
      leafColor: '#1de9b6',
      specialEffectDesc: '[Giống Lai Tạo] Tăng +35% tốc độ lớn toàn bản đồ & 45% rớt 🎟️ Vé Quay / 🪨 Đá!',
      desc: 'Giống hoa lai tạo bẻ cong thời gian: Tăng +35% tốc độ chín cho toàn bộ bản đồ đang trồng!'
    },
    phoenix_blossom: {
      id: 'phoenix_blossom',
      name: 'Hoa Phượng Hoàng Lửa',
      emoji: '🐦‍🔥',
      pixelRow: 11,
      seedPrice: 720,
      sellPrice: 2100,
      growTime: 45,
      xp: 220,
      regrow: true,
      regrowStage: 2,
      bonusDirectGold: 280,
      phoenixInstantRipenChance: 0.55,
      bonusStoneChance: 0.60,
      isHybrid: true,
      hybridParents: '🍎 Táo Vàng + ⏳ Hoa Hồng Thời Gian',
      color: '#ff3d00',
      lightColor: '#ffea00',
      leafColor: '#ff9100',
      specialEffectDesc: '[Giống Lai Tạo] Nổ +280G & 55% phóng Lửa Phượng Hoàng làm chín tức thì 1 cây khác!',
      desc: 'Đóa hoa Niết Bàn bất tử: Thu hoạch nổ +280G và đánh thức 1 cây đang lớn chín ngay lập tức!'
    },
    cosmic_worldfruit: {
      id: 'cosmic_worldfruit',
      name: 'Quả Thế Giới Vũ Trụ',
      emoji: '🪐',
      pixelRow: 12,
      seedPrice: 880,
      sellPrice: 2400,
      growTime: 54,
      xp: 260,
      regrow: true,
      regrowStage: 2,
      bonusDirectGold: 350,
      bonusStoneChance: 0.75,
      bonusGemChance: 0.55,
      bonusStarChance: 0.55,
      isHybrid: true,
      hybridParents: '🍎 Táo Vàng + 🐉 Thanh Long',
      color: '#e040fb',
      lightColor: '#00e5ff',
      leafColor: '#ffd700',
      specialEffectDesc: '[Giống Lai Tạo] Tái sinh vĩnh cửu, nổ +350G, 🪨 Đá Rèn, 💎 Ngọc & 🌠 Sao!',
      desc: 'Trái cây kết tinh của Đa Vũ Trụ: Bán 2.400G và nổ Mưa Báu Vật mỗi lần thu hoạch!'
    },
    yggdrasil_fruit: {
      id: 'yggdrasil_fruit',
      name: 'Trái Sáng Thế Yggdrasil',
      emoji: '👑',
      pixelRow: 13,
      seedPrice: 1450,
      sellPrice: 4200,
      growTime: 60,
      xp: 400,
      regrow: true,
      regrowStage: 2,
      bonusDirectGold: 650,
      bonusStoneChance: 1.0,
      bonusGemChance: 0.75,
      bonusSkillPointChance: 0.25,
      isHybrid: true,
      hybridParents: '🪐 Quả Thế Giới + 🪷 Sen Pha Lê',
      color: '#ffd700',
      lightColor: '#00e5ff',
      leafColor: '#76ff03',
      specialEffectDesc: '[Đỉnh Cao Sáng Thế] Tái sinh vĩnh cửu, nổ +650G, +2🪨 Đá, +1💎 Ngọc & 25% rớt +1⭐ Kỹ Năng!',
      desc: 'Quả thần của Cây Thế Giới Yggdrasil: Bán 4.200G, chắc chắn rớt 2 Đá Rèn và 25% rớt Điểm Kỹ Năng!'
    }
  },

  ANIMALS: {
    chicken: {
      id: 'chicken',
      name: 'Gà Cục Tác',
      icon: '🐔',
      price: 180,
      produceId: 'egg',
      produceName: 'Trứng Gà Tươi',
      goldenProduceName: 'Trứng Hoàng Kim',
      produceIcon: '🥚',
      produceValue: 48,
      produceInterval: 20,
      desc: 'Chạy lon ton quanh đồng cỏ. Chạm vuốt ve mỗi ngày để nhận Trứng Hoàng Kim!'
    },
    cow: {
      id: 'cow',
      name: 'Bò Sữa Mũm Mĩm',
      icon: '🐄',
      price: 420,
      produceId: 'milk',
      produceName: 'Sữa Tươi Nguyên Kem',
      goldenProduceName: 'Sữa Hoàng Kim',
      produceIcon: '🥛',
      produceValue: 115,
      produceInterval: 28,
      desc: 'Cung cấp nguồn sữa béo ngậy để làm bánh kem dâu tây và phô mai.'
    },
    bee: {
      id: 'bee',
      name: 'Tổ Ong Mật Hoa',
      icon: '🐝',
      price: 300,
      produceId: 'honey',
      produceName: 'Mật Ong Rừng',
      goldenProduceName: 'Mật Ong Sao Băng',
      produceIcon: '🍯',
      produceValue: 90,
      produceInterval: 24,
      desc: 'Ong bay quanh vườn hoa tạo mật ngọt để nấu Súp Bí Ngô & Rượu Khế Sao!'
    }
  },

  DEVICES: {
    sprinkler: {
      id: 'sprinkler',
      name: 'Vòi Tưới Tự Động (3x3)',
      icon: '💦',
      price: 220,
      desc: 'Đặt lên ô đất để tự động tưới ẩm toàn bộ 9 ô xung quanh (3x3) mỗi 3.5 giây!'
    },
    lantern: {
      id: 'lantern',
      name: 'Đèn Lồng Đom Đóm (3x3)',
      icon: '🏮',
      price: 250,
      desc: 'Thắp sáng lung linh vào ban đêm, tăng +20% tốc độ lớn & gấp đôi tỉ lệ Đột Biến Ánh Sao vùng 3x3!'
    }
  },

  RECIPES: [
    {
      id: 'radish_salad',
      name: 'Salad Củ Cải Giòn',
      icon: '🥗',
      ingredients: { radish: 2 },
      sellPrice: 115,
      energyRestore: 40,
      desc: 'Món khai vị thanh mát từ 2 Củ Cải Đỏ. Ăn hồi 40⚡ Năng lượng hoặc bán lời cao!'
    },
    {
      id: 'strawberry_cake',
      name: 'Bánh Kem Dâu Tây',
      icon: '🍰',
      ingredients: { strawberry: 2, egg: 1, milk: 1 },
      sellPrice: 380,
      energyRestore: 85,
      desc: 'Bánh kem mềm mịn thơm lừng mùi dâu tươi, trứng và sữa tươi.'
    },
    {
      id: 'pumpkin_soup',
      name: 'Súp Bí Ngô Mật Ong',
      icon: '🍲',
      ingredients: { pumpkin: 1, honey: 1 },
      sellPrice: 350,
      energyRestore: 80,
      desc: 'Súp bí ngô quyện mật ong rừng, tăng tốc độ chạy +45% khi thưởng thức!'
    },
    {
      id: 'star_elixir',
      name: 'Rượu Mật Khế Ngàn Sao',
      icon: '🍹',
      ingredients: { starfruit: 1, honey: 1 },
      sellPrice: 820,
      energyRestore: 100,
      desc: 'Tuyệt phẩm thượng hạng của Thung Lũng Sao Băng, lấp lánh ánh ngân hà!'
    },
    {
      id: 'grilled_koi',
      name: 'Cá Chép Nướng Thảo Mộc',
      icon: '🍱',
      ingredients: { fish: 1, radish: 1 },
      sellPrice: 220,
      energyRestore: 60,
      desc: 'Cá tươi câu từ Hồ Sao Băng nướng cùng củ cải giòn ngọt.'
    },
    {
      id: 'crystal_lotus_tea',
      name: 'Trà Sen Pha Lê Linh Chi',
      icon: '🍵',
      ingredients: { void_mushroom: 1, mystic_lotus: 1 },
      sellPrice: 1350,
      energyRestore: 100,
      desc: 'Tinh hoa Động Pha Lê giúp hồi đầy thể lực và bán với giá thương gia săn đón!'
    },
    {
      id: 'dragon_ambrosia',
      name: 'Đại Tiệc Thanh Long Thiên Không',
      icon: '👑',
      ingredients: { dragon_fruit: 1, golden_apple: 1, honey: 1 },
      sellPrice: 3400,
      energyRestore: 120,
      desc: 'Món ngự thiện tối thượng của Đảo Thiên Không, giá trị gấp bội!'
    },
    {
      id: 'cosmic_nectar',
      name: 'Thần Dược Quả Thế Giới Vĩnh Hằng',
      icon: '🪐',
      ingredients: { cosmic_worldfruit: 1, chrono_rose: 1 },
      sellPrice: 6800,
      energyRestore: 150,
      desc: 'Tuyệt phẩm kết tinh từ 2 giống cây Lai Tạo Thần Thoại!'
    },
    {
      id: 'yggdrasil_banquet',
      name: 'Đại Yến Sáng Thế Yggdrasil',
      icon: '🏆',
      ingredients: { yggdrasil_fruit: 1, phoenix_blossom: 1 },
      sellPrice: 14500,
      energyRestore: 200,
      desc: 'Món thần thực tối cao của Đa Vũ Trụ kết hợp Trái Yggdrasil & Hoa Phượng Hoàng!'
    }
  ],

  UPGRADES: [
    {
      id: 'watering_can_2',
      name: 'Bình Tưới Bạc (Tưới 3x3)',
      icon: '🚿',
      price: 240,
      type: 'tool',
      desc: 'Một lần tưới làm ướt cả vùng 9 ô đất (3x3) xung quanh!'
    },
    {
      id: 'hoe_2',
      name: 'Cuốc Chim Hoàng Kim (Cuốc 3x3)',
      icon: '⛏️',
      price: 300,
      type: 'tool',
      desc: 'Một nhát cuốc xới tung 9 ô đất (3x3) cùng lúc, tiết kiệm thể lực!'
    },
    {
      id: 'cat_skill',
      name: 'Vòng Cổ Chuông Vàng Cho Mèo',
      icon: '🐱',
      price: 200,
      type: 'pet',
      desc: 'Mèo cưng chạy nhanh gấp đôi và tự động thu hoạch cây chín quanh bạn!'
    },
    {
      id: 'house_tier_2',
      name: 'Biệt Thự Hoàng Kim (Nâng Cấp Nhà)',
      icon: '🏰',
      price: 650,
      type: 'house',
      desc: 'Nâng cấp Nhà Chính thành Biệt Thự Mái Vàng, tặng +150G, +1 🌠 Sao & +1 🎟️ Vé Quay mỗi sáng!'
    },
    {
      id: 'greenhouse_charm',
      name: 'Đài Quan Sát Sao Băng',
      icon: '🔭',
      price: 550,
      type: 'farm',
      desc: 'Tăng tần suất Mưa Sao Băng ban đêm và cộng thêm +35% giá bán mọi nông sản!'
    }
  ]
};
