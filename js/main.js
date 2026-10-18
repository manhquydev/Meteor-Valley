/**
 * ============================================================================
 * THUNG LŨNG SAO BĂNG (STARLIGHT VALLEY v11.0 - MYTHIC ASTRAL GENESIS EDITION:
 * 5 REALMS, ASTRAL WORLD BOSS, 14 MULTI-STAGE PIXEL CROPS & 5 HYBRID RECIPES,
 * +20 FORGE & WEAPON AWAKENING ★1-★5, SET RESONANCE WINGS & 15 STORY CHAPTERS)
 * js/main.js
 * ============================================================================
 */

class StarlightFarmGame {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;

    this.world = new window.FarmWorld();
    this.cameraZoom = 1.0;
    this.camX = 0;
    this.camY = 0;

    this.player = new window.PlayerFarmer(2.5 * this.world.tileSize, 3.5 * this.world.tileSize);
    this.cat = new window.PetCat(1.6 * this.world.tileSize, 3.6 * this.world.tileSize);
    this.animals = [
      new window.FarmAnimal('chicken', 360, 220)
    ];
    this.fairies = [];

    this.syncCanvasOrientation();

    this.gold = 340;
    this.totalWealthEarned = 340;
    this.starShards = 2;
    this.refineStones = 8;
    this.energy = 100;
    this.maxEnergy = 100;
    this.level = 1;
    this.xp = 0;
    this.xpToNext = 80;

    // 1. Trạng thái Mở Khóa 5 Bản Đồ Đa Không Gian, Boss Kỳ Lân, Tháp Tinh Tú & Luân Hồi
    this.unlockedMaps = {
      valley: true,
      crystal_cavern: false,
      sky_island: false,
      dragon_sanctum: false,
      astral_nexus: false
    };
    this.ascensionCount = 0;
    this.starlightTowerFloor = 1;
    this.astralBossLevel = 1;
    this.astralBossMaxHp = 500;
    this.astralBossHp = 500;

    // 2. Hệ thống Đập Đồ Cường Hóa (+0 -> +20), Thức Tỉnh (★0 -> ★5), Phụ Ma & Khảm 3 Ô Ngọc
    this.selectedForgeTool = 'scythe';
    this.useStarCharm = false;
    this.lastForgeResult = null;
    this.toolEnhance = {
      scythe: { plus: 1, pity: 0, awaken: 0, sockets: [{ type: 'ruby', tier: 1 }, null, null], affix: 'affix_gold_1' },
      hoe:    { plus: 0, pity: 0, awaken: 0, sockets: [null, null, null], affix: null },
      water:  { plus: 0, pity: 0, awaken: 0, sockets: [null, null, null], affix: null },
      rod:    { plus: 0, pity: 0, awaken: 0, sockets: [null, null, null], affix: null }
    };

    this.gemInventory = {
      ruby_1: 2,
      sapphire_1: 2,
      emerald_1: 1,
      amethyst_1: 1,
      ruby_2: 0,
      sapphire_2: 0,
      emerald_2: 0,
      amethyst_2: 0,
      ruby_3: 0,
      sapphire_3: 0,
      emerald_3: 0,
      amethyst_3: 0,
      ruby_4: 0,
      sapphire_4: 0,
      emerald_4: 0,
      amethyst_4: 0
    };

    // 3. Hệ thống Kỹ năng Tinh Thông (Mastery Tree)
    this.skillPoints = 1;
    this.totalMasterySpent = 0;
    this.mastery = {
      golden_touch: 0,
      hydro_vitality: 0,
      fairy_drone: 0,
      star_alchemy: 0
    };

    // 4. Độ Thông Thạo & Cấp Đột Biến Gen 14 Giống Cây (G1 -> G5)
    this.cropHarvestCounts = {
      radish: 0,
      strawberry: 0,
      pumpkin: 0,
      sunflower: 0,
      eggplant: 0,
      starfruit: 0,
      void_mushroom: 0,
      mystic_lotus: 0,
      golden_apple: 0,
      dragon_fruit: 0,
      chrono_rose: 0,
      phoenix_blossom: 0,
      cosmic_worldfruit: 0,
      yggdrasil_fruit: 0
    };
    this.cropGeneLevels = {
      radish: 1,
      strawberry: 1,
      pumpkin: 1,
      sunflower: 1,
      eggplant: 1,
      starfruit: 1,
      void_mushroom: 1,
      mystic_lotus: 1,
      golden_apple: 1,
      dragon_fruit: 1,
      chrono_rose: 1,
      phoenix_blossom: 1,
      cosmic_worldfruit: 1,
      yggdrasil_fruit: 1
    };

    // 5. 6 Xưởng Tinh Chế Thu Nhập Thụ Động Mỗi Giây (+G/s)
    this.passiveBuildings = {
      mead_workshop: 0,
      star_winery: 0,
      crystal_spire: 0,
      celestial_mint: 0,
      dragon_heart_reactor: 0,
      astral_genesis_core: 0
    };
    this.passiveIncomeTimer = 0;
    this.passiveFloatTimer = 0;

    // 6. Nấc Thang Thành Tựu Đế Chế & Vòng Quay Sao Băng May Mắn
    this.empirePoints = 10;
    this.claimedMilestones = [];
    this.wheelTickets = 1;
    this.isWheelSpinning = false;
    this.lastWheelPrize = null;

    // 7. Hệ thống Combo & Fever Mode & Market Surge
    this.comboCount = 0;
    this.comboTimer = 0;
    this.feverTimer = 0;
    this.hotCropId = 'radish';
    this.chestSpawnTimer = 0;

    this.storyChapter = 1;
    this.treeLevel = 1;
    this.completedBundles = [];

    this.smartMode = true;
    this.selectedTool = 'smart';
    this.selectedSeed = 'radish';

    this.seeds = {
      radish: 6,
      strawberry: 2,
      pumpkin: 1,
      sunflower: 1,
      eggplant: 0,
      starfruit: 0,
      void_mushroom: 1,
      mystic_lotus: 0,
      golden_apple: 0,
      dragon_fruit: 0,
      chrono_rose: 0,
      phoenix_blossom: 0,
      cosmic_worldfruit: 0,
      yggdrasil_fruit: 0
    };
    this.devices = {
      sprinkler: 1,
      lantern: 0
    };
    this.upgrades = {};
    this.inventory = {};
    this.discovered = { radish: 1 };
    this.stats = {
      harvested: 0,
      mutatedHarvested: 0,
      fishCaught: 0,
      dishesCooked: 0,
      enhanceSuccesses: 1,
      oresMined: 0,
      bossesDefeated: 0
    };

    this.dailyStats = {
      goldEarned: 0,
      harvested: 0
    };

    this.quests = [
      { id: 'q1', npc: 'bamai', title: 'Bà Mai: Thu hoạch 5 nông sản', type: 'harvest', target: 5, rewardGold: 160, rewardStars: 1 },
      { id: 'q2', npc: 'bactam', title: 'Bác Tâm: Cây Đột Biến / Khổng Lồ', type: 'mutated', target: 1, rewardGold: 320, rewardStars: 2 },
      { id: 'q3', npc: 'laokien', title: 'Lão Kiên: Câu 2 Cá Chép Koi', type: 'fish', target: 2, rewardGold: 240, rewardStars: 1 },
      { id: 'q4', npc: 'colinh', title: 'Cô Linh: Nấu 2 món ăn tại Bếp', type: 'cook', target: 2, rewardGold: 300, rewardStars: 2 }
    ];

    this.keys = {};
    this.hoverTile = null;
    this.isPointerDown = false;
    this.lastDraggedTileKey = null;
    this.fishingState = null;

    this.ui = new window.GameUI(this);
    this.loadGame();
    this.checkAndAutoUnlockMaps(true);
    this.syncFairyDrones();
    this.bindEvents();
    this.ui.updateHUD();

    this.lastTime = performance.now();
    requestAnimationFrame(t => this.loop(t));
  }

  // ==========================================================================
  // HỆ THỐNG 5 BẢN ĐỒ ĐA KHÔNG GIAN, BOSS KỲ LÂN, THÁP TINH TÚ & LUÂN HỒI
  // ==========================================================================
  checkAndAutoUnlockMaps(silent = false) {
    let newlyUnlocked = false;
    Object.values(window.GAME_CONFIG.MAPS).forEach(m => {
      if (!this.unlockedMaps[m.id] && m.checkUnlock(this)) {
        this.unlockedMaps[m.id] = true;
        newlyUnlocked = true;
        if (!silent) {
          window.SFX.playJackpot();
          this.ui.showToast(`🔓 ĐÃ MỞ KHÓA THẾ GIỚI MỚI: ${m.icon} ${m.name}! Bấm trên thanh Bản Đồ để dịch chuyển ngay!`);
        }
      }
    });
    if (newlyUnlocked && !silent) {
      this.ui.updateHUD();
      this.saveGame();
    }
  }

  unlockMap(mapId) {
    const m = window.GAME_CONFIG.MAPS[mapId];
    if (!m) return;
    if (this.unlockedMaps[mapId]) {
      this.travelToMap(mapId);
      return;
    }
    if (m.checkUnlock(this)) {
      this.unlockedMaps[mapId] = true;
      window.SFX.playJackpot();
      this.ui.showToast(`🔓 Đã mở khóa miễn phí ${m.icon} ${m.name}!`);
      this.travelToMap(mapId);
      return;
    }
    if (this.gold >= m.unlockCostGold) {
      this.gold -= m.unlockCostGold;
      this.unlockedMaps[mapId] = true;
      window.SFX.playJackpot();
      this.ui.showToast(`🔓 Đã mở khóa sớm ${m.icon} ${m.name}!`);
      this.travelToMap(mapId);
      return;
    }
    this.ui.showToast(`🔒 Cần đạt điều kiện (${m.unlockDesc}) hoặc có ${m.unlockCostGold}G để mở khóa sớm!`);
  }

  travelToMap(mapId) {
    const m = window.GAME_CONFIG.MAPS[mapId];
    if (!m) return;
    if (!this.unlockedMaps[mapId]) {
      this.unlockMap(mapId);
      return;
    }
    if (this.world.currentMap === mapId) {
      this.ui.showToast(`📍 Bạn đang ở ${m.icon} ${m.name}!`);
      return;
    }

    this.world.switchMap(mapId);
    this.player.x = 3.5 * this.world.tileSize;
    this.player.y = 3.5 * this.world.tileSize;
    this.player.targetX = null;
    this.player.targetY = null;
    this.cat.x = 2.6 * this.world.tileSize;
    this.cat.y = 3.6 * this.world.tileSize;

    window.SFX.playStar();
    this.world.spawnParticles(this.player.x, this.player.y, '#00e5ff', 28);
    this.ui.showToast(`🌀 Đã dịch chuyển tới ${m.icon} ${m.name}!`);
    this.ui.updateHUD();
    this.saveGame();
  }

  cyclePortalDestination() {
    const order = ['valley', 'crystal_cavern', 'sky_island', 'dragon_sanctum', 'astral_nexus'];
    const curIdx = order.indexOf(this.world.currentMap);
    for (let step = 1; step <= order.length; step++) {
      const nextMap = order[(curIdx + step) % order.length];
      if (this.unlockedMaps[nextMap]) {
        this.travelToMap(nextMap);
        return;
      }
    }
    this.ui.openModalGroup('quests', 'empire');
  }

  // SĂN BOSS KỲ LÂN TINH VÂN (TRÊN MAP 5 HOẶC TRONG TAB ĐẾ CHẾ)
  getPlayerBossDamage() {
    const totalPlus = this.getTotalToolPlus();
    const totalAwk = Object.values(this.toolEnhance || {}).reduce((acc, st) => acc + (st?.awaken || 0), 0);
    const gemPower = this.getActiveToolGems().length * 25;
    return Math.round((45 + totalPlus * 18 + totalAwk * 55 + gemPower) * (1 + (this.ascensionCount || 0) * 0.5));
  }

  strikeAstralBoss() {
    if (!this.consumeEnergy(2.0)) return;
    const dmg = this.getPlayerBossDamage();
    const bx = 7.5 * this.world.tileSize;
    const by = 1.8 * this.world.tileSize;

    this.astralBossHp = Math.max(0, (this.astralBossHp || 500) - dmg);
    const hitGold = Math.round((40 + this.astralBossLevel * 25) * this.getPriceMultiplier());
    this.earnGold(hitGold);
    this.addEmpirePoints(8);
    this.registerComboAction(bx, by);
    window.SFX.playAnvilStrike();

    this.world.spawnParticles(bx, by, '#ff4081', 20);
    this.world.spawnFloatingText(bx, by - 12, `⚔️ -${dmg} HP! (+${hitGold}G)`, '#ffea00');

    if (this.astralBossHp <= 0) {
      const defeatedLv = this.astralBossLevel || 1;
      this.stats.bossesDefeated = (this.stats.bossesDefeated || 0) + 1;
      this.astralBossLevel = defeatedLv + 1;
      this.astralBossMaxHp = Math.round(500 * Math.pow(1.55, this.astralBossLevel - 1));
      this.astralBossHp = this.astralBossMaxHp;

      const bossJackpotGold = Math.round(defeatedLv * 1200 * this.getPriceMultiplier());
      this.earnGold(bossJackpotGold);
      this.refineStones += 12;
      this.starShards += 3;
      this.seeds.yggdrasil_fruit = (this.seeds.yggdrasil_fruit || 0) + 1;
      this.seeds.phoenix_blossom = (this.seeds.phoenix_blossom || 0) + 1;
      this.addEmpirePoints(45);

      window.SFX.playJackpot();
      this.world.spawnParticles(bx, by, '#00e5ff', 42);
      this.ui.showToast(
        `👾 HẠ GỤC KỲ LÂN TINH VÂN Lv.${defeatedLv}! Nổ +${bossJackpotGold.toLocaleString('vi-VN')}G, +12 🪨 Đá Rèn, +3 🌠 Sao & +1 Hạt Trái Sáng Thế Yggdrasil 👑!`
      );
    }

    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  activateDragonShrineBlessing() {
    let grown = 0;
    for (let r = 0; r < this.world.rows; r++) {
      for (let c = 0; c < this.world.cols; c++) {
        const t = this.world.tiles[r][c];
        if (t.crop && t.crop.stage < 4) {
          t.crop.progress = 1;
          t.crop.stage = 4;
          t.watered = true;
          grown++;
        }
      }
    }
    if (this.feverTimer <= 0) {
      this.triggerFeverMode(14);
    }
    window.SFX.playJackpot();
    this.world.spawnParticles(this.player.x, this.player.y, '#ffd700', 30);
    this.ui.showToast(`🐉 PHƯỚC LÀNH THẦN LONG: Đã làm chín tức thì ${grown} cây trồng & kích hoạt Cơn Sốt Hoàng Kim!`);
    this.ui.updateHUD();
    this.saveGame();
  }

  getTowerRequiredPoints() {
    const fl = this.starlightTowerFloor || 1;
    return Math.round(60 * Math.pow(1.45, fl - 1));
  }

  climbStarlightTower() {
    const req = this.getTowerRequiredPoints();
    if (this.empirePoints < req) {
      this.ui.showToast(`🗼 Cần ${req} Điểm Đế Chế để vượt tầng tháp này!`);
      return;
    }
    this.starlightTowerFloor = (this.starlightTowerFloor || 1) + 1;
    this.refineStones += 8;
    this.starShards += 2;
    this.seeds.yggdrasil_fruit = (this.seeds.yggdrasil_fruit || 0) + 1;
    this.earnGold(this.starlightTowerFloor * 550);
    this.checkAndAutoUnlockMaps(true);

    window.SFX.playJackpot();
    this.world.spawnParticles(this.player.x, this.player.y, '#00e5ff', 36);
    this.ui.showToast(
      `🗼 CHINH PHỤC TẦNG ${this.starlightTowerFloor} THÁP TINH TÚ! Giá bán toàn cục tăng vĩnh viễn +${(this.starlightTowerFloor - 1) * 20}%, nhận +1 Hạt Yggdrasil 👑 & +8 🪨 Đá Rèn!`
    );
    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  getAscensionRequiredWealth() {
    return 5000 * Math.pow(2.2, this.ascensionCount || 0);
  }

  performAscension() {
    const reqWealth = this.getAscensionRequiredWealth();
    if (this.totalWealthEarned < reqWealth && this.level < 5) {
      this.ui.showToast(`🌌 Cần đạt Cấp 5 hoặc Tổng tài sản ${reqWealth.toLocaleString('vi-VN')}G để Luân Hồi Thăng Hoa!`);
      return;
    }

    this.ascensionCount = (this.ascensionCount || 0) + 1;
    this.refineStones += 15;
    this.starShards += 5;
    this.skillPoints += 3;
    this.wheelTickets += 2;
    this.seeds.yggdrasil_fruit = (this.seeds.yggdrasil_fruit || 0) + 2;
    this.seeds.cosmic_worldfruit = (this.seeds.cosmic_worldfruit || 0) + 2;
    this.addEmpirePoints(80);
    this.checkAndAutoUnlockMaps(true);

    window.SFX.playJackpot();
    this.world.spawnParticles(this.player.x, this.player.y, '#ffd700', 40);
    this.ui.showToast(
      `🌌 LUÂN HỒI THĂNG HOA ★${this.ascensionCount} THÀNH CÔNG! Toàn bộ lợi nhuận tăng vĩnh viễn lên x${(1 + this.ascensionCount).toFixed(1)}, nhận +15 🪨 Đá Rèn & +2 Hạt Yggdrasil 👑!`
    );
    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  // ==========================================================================
  // HỆ THỐNG LAI TẠO GIỐNG CÂY & ĐỘT BIẾN CẤP GEN (G1 -> G5)
  // ==========================================================================
  getCropGeneLevel(cropId) {
    return (this.cropGeneLevels && this.cropGeneLevels[cropId]) || 1;
  }

  getHighestCropGene() {
    let maxG = 1;
    Object.values(this.cropGeneLevels || {}).forEach(v => {
      if (v > maxG) maxG = v;
    });
    return maxG;
  }

  upgradeCropGene(cropId) {
    const cur = this.getCropGeneLevel(cropId);
    if (cur >= 5) return;
    const stoneCost = cur;
    const goldCost = 150 * cur;
    if (this.refineStones < stoneCost || this.gold < goldCost) {
      this.ui.showToast(`🧬 Cần ${stoneCost} 🪨 Đá Rèn & ${goldCost}G để đột biến Gen lên G${cur + 1}!`);
      return;
    }
    this.refineStones -= stoneCost;
    this.gold -= goldCost;
    this.cropGeneLevels[cropId] = cur + 1;
    this.addEmpirePoints(15);

    const cfg = window.GAME_CONFIG.CROPS[cropId];
    window.SFX.playJackpot();
    this.world.spawnParticles(this.player.x, this.player.y, '#00e5ff', 28);
    this.ui.showToast(`🧬 ĐỘT BIẾN GEN THÀNH CÔNG: ${cfg.emoji} ${cfg.name} đạt Gen G${cur + 1} (+${cur * 30}% Giá bán & +${cur * 15}% Tốc độ chín vĩnh viễn)!`);
    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  breedHybridCrop(recipeId) {
    const r = window.GAME_CONFIG.HYBRID_RECIPES.find(x => x.id === recipeId);
    if (!r) return;
    const consumeFromInvOrSeed = (cropId, qty) => {
      let rem = qty;
      const inInv = this.inventory[cropId] || 0;
      const takeInv = Math.min(rem, inInv);
      this.inventory[cropId] = inInv - takeInv;
      rem -= takeInv;
      if (rem > 0) {
        this.seeds[cropId] = Math.max(0, (this.seeds[cropId] || 0) - rem);
      }
    };

    const haveA = (this.inventory[r.parentA.id] || 0) + (this.seeds[r.parentA.id] || 0);
    const haveB = (this.inventory[r.parentB.id] || 0) + (this.seeds[r.parentB.id] || 0);
    if (haveA < r.parentA.qty || haveB < r.parentB.qty || this.gold < r.goldCost) {
      this.ui.showToast('⚠ Chưa đủ nông sản/hạt bố mẹ hoặc Vàng để ghép giống!');
      return;
    }

    this.gold -= r.goldCost;
    consumeFromInvOrSeed(r.parentA.id, r.parentA.qty);
    consumeFromInvOrSeed(r.parentB.id, r.parentB.qty);
    this.seeds[r.resultCrop] = (this.seeds[r.resultCrop] || 0) + r.resultQty;
    this.selectedSeed = r.resultCrop;
    this.addEmpirePoints(22);

    const resCrop = window.GAME_CONFIG.CROPS[r.resultCrop];
    window.SFX.playJackpot();
    this.world.spawnParticles(this.player.x, this.player.y, '#00e5ff', 30);
    this.ui.showToast(`🧬 LAI TẠO THÀNH CÔNG: Nhận +${r.resultQty} Hạt ${resCrop.emoji} ${resCrop.name}!`);
    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  // ==========================================================================
  // HỆ THỐNG ĐẬP ĐỒ CƯỜNG HÓA (+1 -> +20), THỨC TỈNH ★1-★5, CỘNG HƯỞNG & PHỤ MA
  // ==========================================================================
  getToolEnhanceState(toolId) {
    if (!this.toolEnhance[toolId]) {
      this.toolEnhance[toolId] = { plus: 0, pity: 0, awaken: 0, sockets: [null, null, null], affix: null };
    }
    if (typeof this.toolEnhance[toolId].awaken !== 'number') {
      this.toolEnhance[toolId].awaken = 0;
    }
    return this.toolEnhance[toolId];
  }

  getHighestToolPlus() {
    let maxP = 0;
    Object.values(this.toolEnhance || {}).forEach(st => {
      if (st && st.plus > maxP) maxP = st.plus;
    });
    return maxP;
  }

  getHighestToolAwakening() {
    let maxA = 0;
    Object.values(this.toolEnhance || {}).forEach(st => {
      if (st && (st.awaken || 0) > maxA) maxA = st.awaken;
    });
    return maxA;
  }

  getTotalToolPlus() {
    let sum = 0;
    Object.values(this.toolEnhance || {}).forEach(st => {
      if (st && st.plus) sum += st.plus;
    });
    return sum;
  }

  getCurrentSetResonance() {
    const total = this.getTotalToolPlus();
    const tiers = window.GAME_CONFIG.SET_RESONANCE_TIERS;
    let cur = tiers[0];
    let nextTier = null;
    for (let i = 0; i < tiers.length; i++) {
      if (total >= tiers[i].minTotalPlus) {
        cur = tiers[i];
        nextTier = tiers[i + 1] || null;
      }
    }
    return { ...cur, nextTier };
  }

  awakenTool(toolId) {
    const st = this.getToolEnhanceState(toolId);
    const curAwk = st.awaken || 0;
    if (curAwk >= 5) return;
    const stoneCost = (curAwk + 1) * 4;
    const starCost = curAwk + 1;
    if (this.refineStones < stoneCost || this.starShards < starCost) {
      this.ui.showToast(`⚡ Cần ${stoneCost} 🪨 Đá Rèn & ${starCost} 🌠 Sao để Thức Tỉnh lên ★${curAwk + 1}!`);
      return;
    }
    this.refineStones -= stoneCost;
    this.starShards -= starCost;
    st.awaken = curAwk + 1;
    this.addEmpirePoints(25);

    const toolCfg = window.GAME_CONFIG.SACRED_TOOLS.find(t => t.id === toolId);
    window.SFX.playJackpot();
    this.world.spawnParticles(this.player.x, this.player.y, '#ffea00', 34);
    this.lastForgeResult = {
      success: true,
      msg: `⚡ THỨC TỈNH THÀNH CÔNG: ${toolCfg.icon} ${toolCfg.name} đạt ★${st.awaken} (+${st.awaken * 35}% toàn bộ uy lực & sát thương Boss)!`
    };
    this.ui.showToast(this.lastForgeResult.msg);
    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  rerollToolAffix(toolId) {
    if (this.refineStones < 1 || this.gold < 120) {
      this.ui.showToast('🎲 Cần 1 🪨 Đá Cường Hóa & 120G để Tẩy Luyện Phụ Ma!');
      return;
    }
    this.refineStones -= 1;
    this.gold -= 120;

    const pool = window.GAME_CONFIG.TOOL_AFFIX_POOL;
    const roll = Math.random();
    let picked = pool[0];
    if (roll < 0.08) picked = pool[6]; // Thái Cổ ★★
    else if (roll < 0.22) picked = pool[5]; // Thần Thoại ★
    else if (roll < 0.42) picked = pool[4]; // Huyền Thoại
    else if (roll < 0.70) picked = pool[Math.random() < 0.5 ? 2 : 3]; // Sử Thi
    else picked = pool[Math.random() < 0.5 ? 0 : 1]; // Hiếm

    const st = this.getToolEnhanceState(toolId);
    st.affix = picked.id;
    this.addEmpirePoints(10);

    window.SFX.playGemSocket();
    this.world.spawnParticles(this.player.x, this.player.y, picked.color, 26);
    this.lastForgeResult = {
      success: true,
      msg: `🔮 ĐÚC PHỤ MA THÀNH CÔNG: [${picked.rarity}] ${picked.name} (${picked.desc})!`
    };
    this.ui.showToast(this.lastForgeResult.msg);
    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  getTotalAffixBonus(statKey) {
    let sum = 0;
    Object.values(this.toolEnhance || {}).forEach(st => {
      if (st && st.affix) {
        const af = window.GAME_CONFIG.TOOL_AFFIX_POOL.find(a => a.id === st.affix);
        if (af && af[statKey]) sum += af[statKey];
      }
    });
    return sum;
  }

  getActiveToolGems() {
    const list = [];
    Object.values(this.toolEnhance || {}).forEach(st => {
      if (st && Array.isArray(st.sockets)) {
        st.sockets.forEach(s => {
          if (s && s.type) list.push(s);
        });
      }
    });
    return list;
  }

  getTotalGemBonus(gemType) {
    const cfg = window.GAME_CONFIG.GEM_TYPES[gemType];
    if (!cfg) return 0;
    let total = 0;
    Object.values(this.toolEnhance || {}).forEach(st => {
      if (st && Array.isArray(st.sockets)) {
        st.sockets.forEach(s => {
          if (s && s.type === gemType) {
            total += cfg.tierValues[s.tier] || 0;
          }
        });
      }
    });
    return total;
  }

  getEffectiveEnhanceChance(toolId) {
    const st = this.getToolEnhanceState(toolId);
    if (st.plus >= 20) return 1.0;
    const stepCfg = window.GAME_CONFIG.getEnhanceStepConfig(st.plus + 1);
    if (st.pity >= 100) return 1.0;
    const pityBonus = st.pity * 0.0035;
    const charmBonus = (this.useStarCharm && this.starShards > 0) ? 0.35 : 0;
    return Math.min(1.0, stepCfg.chance + pityBonus + charmBonus);
  }

  attemptEnhanceTool(toolId) {
    const st = this.getToolEnhanceState(toolId);
    if (st.plus >= 20) {
      this.ui.showToast('🪐 Thần Khí này đã đạt cảnh giới Thái Cổ Sáng Thế +20!');
      return;
    }

    const targetPlus = st.plus + 1;
    const stepCfg = window.GAME_CONFIG.getEnhanceStepConfig(targetPlus);
    const toolCfg = window.GAME_CONFIG.SACRED_TOOLS.find(t => t.id === toolId);

    if (this.refineStones < stepCfg.stoneCost) {
      this.ui.showToast(`🪨 Cần ${stepCfg.stoneCost} Đá Cường Hóa! (Đào ở Động Pha Lê / Thần Long / Tinh Tú hoặc mua nhanh)`);
      return;
    }
    if (this.gold < stepCfg.goldCost) {
      this.ui.showToast(`💰 Cần ${stepCfg.goldCost} Vàng để rèn cấp +${targetPlus}!`);
      return;
    }

    const prevResTier = this.getCurrentSetResonance().tier;
    const effChance = this.getEffectiveEnhanceChance(toolId);
    this.refineStones -= stepCfg.stoneCost;
    this.gold -= stepCfg.goldCost;

    if (this.useStarCharm && this.starShards > 0) {
      this.starShards -= 1;
    }

    const roll = Math.random();
    if (roll < effChance) {
      st.plus = targetPlus;
      st.pity = 0;
      this.stats.enhanceSuccesses = (this.stats.enhanceSuccesses || 0) + 1;
      this.addEmpirePoints(12 + targetPlus * 3);

      if (toolId === 'hoe' && targetPlus >= 3) this.upgrades.hoe_2 = true;
      if (toolId === 'water' && targetPlus >= 3) this.upgrades.watering_can_2 = true;

      this.checkAndAutoUnlockMaps(false);
      const newRes = this.getCurrentSetResonance();
      if (newRes.tier > prevResTier) {
        this.ui.showToast(`🪽 KÍCH HOẠT ${newRes.name.toUpperCase()}! Mở khóa Đôi Cánh Ánh Sao & +${Math.round(newRes.bonusGoldMult * 100)}% Vàng!`);
      }

      window.SFX.playEnhanceSuccess(targetPlus);
      this.world.spawnParticles(this.player.x, this.player.y, stepCfg.color, 34);
      this.world.spawnFloatingText(
        this.player.x,
        this.player.y - 26,
        `🔨 ĐẬP ĐỒ THÀNH CÔNG: ${toolCfg.name} +${targetPlus}!`,
        stepCfg.color
      );

      this.lastForgeResult = {
        success: true,
        msg: `🎉 ĐẠI THÀNH CÔNG! ${toolCfg.icon} ${toolCfg.name} thăng cấp +${targetPlus} (${stepCfg.tierName})!`
      };
      this.ui.showToast(this.lastForgeResult.msg);
    } else {
      st.pity = Math.min(100, st.pity + stepCfg.pityGainOnFail);
      this.addEmpirePoints(5);
      window.SFX.playEnhanceFailPity();
      this.world.spawnParticles(this.player.x, this.player.y, '#ffab40', 14);

      this.lastForgeResult = {
        success: false,
        msg: `⚡ Đập +${targetPlus} trượt nhẹ (Không tụt cấp)! Điểm Chúc Phúc tăng lên ${st.pity}% (${st.pity >= 100 ? 'Nhát sau CHẮC CHẮN 100% LÊN!' : 'Tăng mạnh tỷ lệ nhát kế tiếp!'})`
      };
      this.ui.showToast(this.lastForgeResult.msg);
    }

    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  buyRefineStonePack(qty = 5, cost = 150) {
    if (this.gold < cost) {
      this.ui.showToast('⚠ Chưa đủ Vàng để mua Gói Đá Cường Hóa!');
      return;
    }
    this.gold -= cost;
    this.refineStones += qty;
    window.SFX.playCoin();
    this.ui.showToast(`🪨 Đã mua +${qty} Đá Cường Hóa Thần Khí!`);
    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  buyMysteryGemBag(cost = 240) {
    if (this.gold < cost) {
      this.ui.showToast('⚠ Chưa đủ Vàng để mở Túi Bảo Thạch Tinh Tú!');
      return;
    }
    this.gold -= cost;
    const gemIds = Object.keys(window.GAME_CONFIG.GEM_TYPES);
    const picked = gemIds[Math.floor(Math.random() * gemIds.length)];
    const tier = Math.random() < 0.25 ? 2 : 1;
    const key = `${picked}_${tier}`;
    this.gemInventory[key] = (this.gemInventory[key] || 0) + 1;
    const gCfg = window.GAME_CONFIG.GEM_TYPES[picked];

    window.SFX.playGemSocket();
    this.ui.showToast(`💎 Mở Túi Bảo Thạch nhận được: ${gCfg.icon} ${gCfg.name} Cấp ${tier}!`);
    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  socketGemIntoTool(toolId, gemKey) {
    const [type, tierStr] = gemKey.split('_');
    const tier = parseInt(tierStr, 10);
    if ((this.gemInventory[gemKey] || 0) <= 0) return;

    const st = this.getToolEnhanceState(toolId);
    const emptyIdx = st.sockets.findIndex(s => s === null);
    if (emptyIdx === -1) {
      this.ui.showToast('⚠ Cả 3 ô khảm của Thần Khí này đã đầy! Chạm vào ô ngọc trên Thần Khí để tháo ngọc cũ ra trước.');
      return;
    }

    this.gemInventory[gemKey] -= 1;
    st.sockets[emptyIdx] = { type, tier };
    this.addEmpirePoints(10);

    const gCfg = window.GAME_CONFIG.GEM_TYPES[type];
    window.SFX.playGemSocket();
    this.world.spawnParticles(this.player.x, this.player.y, gCfg.color, 24);
    this.ui.showToast(`💎 Đã khảm ${gCfg.icon} ${gCfg.name} (Cấp ${tier}) vào Ô Khảm #${emptyIdx + 1}!`);
    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  unsocketGemFromTool(toolId, socketIdx) {
    const st = this.getToolEnhanceState(toolId);
    const gem = st.sockets[socketIdx];
    if (!gem) return;
    const key = `${gem.type}_${gem.tier}`;
    this.gemInventory[key] = (this.gemInventory[key] || 0) + 1;
    st.sockets[socketIdx] = null;
    window.SFX.playCoin();
    this.ui.showToast('💎 Đã tháo Bảo Thạch về lại túi đồ (không mất ngọc)!');
    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  fuseGems(gemType, fromTier) {
    if (fromTier >= 4) return;
    const fromKey = `${gemType}_${fromTier}`;
    const toKey = `${gemType}_${fromTier + 1}`;
    if ((this.gemInventory[fromKey] || 0) < 3) {
      this.ui.showToast('⚠ Cần đủ 3 viên cùng loại và cùng cấp để Hợp Nhất lên cấp cao hơn!');
      return;
    }
    this.gemInventory[fromKey] -= 3;
    this.gemInventory[toKey] = (this.gemInventory[toKey] || 0) + 1;
    this.addEmpirePoints(18);

    const gCfg = window.GAME_CONFIG.GEM_TYPES[gemType];
    window.SFX.playJackpot();
    this.world.spawnParticles(this.player.x, this.player.y, gCfg.color, 28);
    this.ui.showToast(`✨ HỢP NHẤT THÀNH CÔNG: 3 viên Cấp ${fromTier} ➔ 1 ${gCfg.icon} ${gCfg.name} Cấp ${fromTier + 1}!`);
    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  tryDropForgeMaterials(px, py, baseChance = 0.28) {
    const hoeSt = this.getToolEnhanceState('hoe');
    const hoeBonus = hoeSt.plus * 0.05 * (1 + (hoeSt.awaken || 0) * 0.35);
    const amethystBonus = this.getTotalGemBonus('amethyst') * 0.25;
    const affixStone = this.getTotalAffixBonus('stoneBonus');
    const mapBonus = this.world.getCurrentMapConfig().gemDropBonus || 0;
    if (Math.random() < baseChance + hoeBonus + amethystBonus + affixStone + mapBonus) {
      this.refineStones += 1;
      this.world.spawnFloatingText(px, py - 30, '+1 🪨 Đá Cường Hóa!', '#80d8ff');
    }
    if (Math.random() < 0.10 + amethystBonus * 0.4 + mapBonus * 0.5) {
      const gemIds = Object.keys(window.GAME_CONFIG.GEM_TYPES);
      const picked = gemIds[Math.floor(Math.random() * gemIds.length)];
      const key = `${picked}_1`;
      this.gemInventory[key] = (this.gemInventory[key] || 0) + 1;
      const gCfg = window.GAME_CONFIG.GEM_TYPES[picked];
      this.world.spawnFloatingText(px, py - 42, `+1 ${gCfg.icon} ${gCfg.name}!`, gCfg.color);
    }
  }

  mineOreVein(tile) {
    if (!this.consumeEnergy(1.5)) return;
    const px = (tile.c + 0.5) * this.world.tileSize;
    const py = (tile.r + 0.5) * this.world.tileSize;
    const oreType = tile.obstacle;
    tile.obstacle = null;

    const hoeSt = this.getToolEnhanceState('hoe');
    const yieldMult = (hoeSt.plus >= 7 ? 2 : 1) + (hoeSt.awaken >= 2 ? 1 : 0);
    this.stats.oresMined = (this.stats.oresMined || 0) + 1;
    this.addEmpirePoints(10);
    this.addXP(22);
    this.registerComboAction(px, py);
    window.SFX.playAnvilStrike();

    if (oreType === 'ore_astral') {
      const stones = (4 + (Math.random() < 0.5 ? 2 : 0)) * yieldMult;
      this.refineStones += stones;
      const gemIds = Object.keys(window.GAME_CONFIG.GEM_TYPES);
      const picked = gemIds[Math.floor(Math.random() * gemIds.length)];
      const key = `${picked}_3`; // Rớt thẳng Ngọc Thần Châu Cấp 3!
      this.gemInventory[key] = (this.gemInventory[key] || 0) + 1;
      const gCfg = window.GAME_CONFIG.GEM_TYPES[picked];
      this.world.spawnParticles(px, py, '#00e5ff', 28);
      this.world.spawnFloatingText(px, py - 12, `☄️ THIÊN THẠCH: +1 ${gCfg.icon} Cấp 3 ★ & +${stones} 🪨!`, '#00e5ff');
    } else if (oreType === 'ore_dragon') {
      const stones = (2 + (Math.random() < 0.5 ? 1 : 0)) * yieldMult;
      this.refineStones += stones;
      const gemIds = Object.keys(window.GAME_CONFIG.GEM_TYPES);
      const picked = gemIds[Math.floor(Math.random() * gemIds.length)];
      const key = `${picked}_2`;
      this.gemInventory[key] = (this.gemInventory[key] || 0) + 1;
      const gCfg = window.GAME_CONFIG.GEM_TYPES[picked];
      this.world.spawnParticles(px, py, '#ff1744', 24);
      this.world.spawnFloatingText(px, py - 12, `🔥 HỎA NGỌC: +1 ${gCfg.icon} Cấp 2 & +${stones} 🪨!`, '#ffea00');
    } else if (oreType === 'ore_stone') {
      const stones = (1 + (Math.random() < 0.45 ? 1 : 0)) * yieldMult;
      this.refineStones += stones;
      this.world.spawnParticles(px, py, '#00e5ff', 18);
      this.world.spawnFloatingText(px, py - 12, `⛏️ +${stones} 🪨 Đá Cường Hóa!`, '#80d8ff');
    } else if (oreType === 'ore_gem') {
      const gemIds = Object.keys(window.GAME_CONFIG.GEM_TYPES);
      const picked = gemIds[Math.floor(Math.random() * gemIds.length)];
      const key = `${picked}_1`;
      this.gemInventory[key] = (this.gemInventory[key] || 0) + yieldMult;
      this.refineStones += 1;
      const gCfg = window.GAME_CONFIG.GEM_TYPES[picked];
      this.world.spawnParticles(px, py, gCfg.color, 20);
      this.world.spawnFloatingText(px, py - 12, `💎 +${yieldMult} ${gCfg.icon} ${gCfg.name} & +1 🪨!`, gCfg.color);
    } else if (oreType === 'ore_gold') {
      const goldAmt = Math.round((120 + this.level * 25) * yieldMult * this.getPriceMultiplier());
      this.earnGold(goldAmt);
      this.refineStones += 1;
      this.world.spawnParticles(px, py, '#ffd700', 22);
      this.world.spawnFloatingText(px, py - 12, `💰 MỎ VÀNG: +${goldAmt}G & +1 🪨!`, '#ffd700');
    }

    this.ui.updateHUD();
    this.saveGame();
  }

  getCurrentPrestigeRank() {
    const ranks = window.GAME_CONFIG.PRESTIGE_RANKS;
    let current = ranks[0];
    for (const r of ranks) {
      if (this.totalWealthEarned >= r.minWealth) current = r;
    }
    return current;
  }

  getNextPrestigeRank() {
    const ranks = window.GAME_CONFIG.PRESTIGE_RANKS;
    for (const r of ranks) {
      if (this.totalWealthEarned < r.minWealth) return r;
    }
    return null;
  }

  getCropMasteryInfo(cropId) {
    const count = (this.cropHarvestCounts && this.cropHarvestCounts[cropId]) || 0;
    const tiers = window.GAME_CONFIG.CROP_MASTERY_TIERS;
    let current = tiers[0];
    let nextTier = null;
    for (let i = 0; i < tiers.length; i++) {
      if (count >= tiers[i].minHarvests) {
        current = tiers[i];
        nextTier = tiers[i + 1] || null;
      }
    }
    return {
      ...current,
      count,
      nextTier
    };
  }

  getPassiveGoldPerSec() {
    let baseGps = 0;
    window.GAME_CONFIG.PASSIVE_BUILDINGS.forEach(b => {
      const lvl = (this.passiveBuildings && this.passiveBuildings[b.id]) || 0;
      baseGps += lvl * b.goldPerSec;
    });
    if (baseGps === 0) return 0;
    const resonanceMult = 1 + this.getCurrentSetResonance().bonusGoldMult * 0.5;
    const alchemyMult =
      (1 + (this.mastery.star_alchemy || 0) * 0.25 + this.getTotalGemBonus('ruby') * 0.5) *
      resonanceMult *
      (1 + (this.ascensionCount || 0) * 1.0);
    return Math.round(baseGps * alchemyMult);
  }

  getPassiveBuildingCost(buildingId) {
    const cfg = window.GAME_CONFIG.PASSIVE_BUILDINGS.find(b => b.id === buildingId);
    if (!cfg) return 999999;
    const lvl = (this.passiveBuildings && this.passiveBuildings[buildingId]) || 0;
    return Math.round(cfg.baseCost * Math.pow(cfg.costMult, lvl));
  }

  upgradePassiveBuilding(buildingId) {
    const cfg = window.GAME_CONFIG.PASSIVE_BUILDINGS.find(b => b.id === buildingId);
    if (!cfg) return;
    const curLvl = (this.passiveBuildings && this.passiveBuildings[buildingId]) || 0;
    if (curLvl >= cfg.maxLevel) return;
    const cost = this.getPassiveBuildingCost(buildingId);
    if (this.gold < cost) {
      this.ui.showToast('⚠ Chưa đủ Vàng để nâng cấp Xưởng Tinh Chế!');
      return;
    }

    this.gold -= cost;
    this.passiveBuildings[buildingId] = curLvl + 1;
    this.addEmpirePoints(15);

    window.SFX.playLevelUp();
    const px = 6.5 * this.world.tileSize;
    const py = 2.5 * this.world.tileSize;
    this.world.spawnParticles(px, py, '#76ff03', 24);
    this.ui.showToast(`🏭 Đã nâng cấp "${cfg.name}" Cấp ${curLvl + 1}! Thu nhập thụ động: +${this.getPassiveGoldPerSec()}G/giây!`);
    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  addEmpirePoints(pts) {
    this.empirePoints = (this.empirePoints || 0) + pts;
    const newlyReady = window.GAME_CONFIG.EMPIRE_MILESTONES.find(
      m => !this.claimedMilestones.includes(m.id) && this.empirePoints >= m.pointsNeeded && (this.empirePoints - pts) < m.pointsNeeded
    );
    if (newlyReady) {
      window.SFX.playStar();
      this.ui.showToast(`🏆 ĐẠT MỐC ĐẾ CHẾ: "${newlyReady.title}"! Mở tab 🏆 Đế Chế để nhận thưởng!`);
    }
  }

  claimEmpireMilestone(msId) {
    if (this.claimedMilestones.includes(msId)) return;
    const ms = window.GAME_CONFIG.EMPIRE_MILESTONES.find(m => m.id === msId);
    if (!ms || this.empirePoints < ms.pointsNeeded) return;

    this.claimedMilestones.push(msId);
    if (ms.rewardGold) this.earnGold(ms.rewardGold);
    if (ms.rewardStones) this.refineStones += ms.rewardStones;
    if (ms.rewardStars) this.starShards += ms.rewardStars;
    if (ms.rewardSkillPts) this.skillPoints += ms.rewardSkillPts;
    if (ms.rewardTickets) this.wheelTickets += ms.rewardTickets;
    if (ms.rewardDevice) {
      this.devices[ms.rewardDevice] = (this.devices[ms.rewardDevice] || 0) + 1;
    }
    if (ms.rewardSeed) {
      this.seeds[ms.rewardSeed.id] = (this.seeds[ms.rewardSeed.id] || 0) + ms.rewardSeed.qty;
    }

    window.SFX.playJackpot();
    this.world.spawnParticles(this.player.x, this.player.y, '#ffd700', 30);
    this.ui.showToast(`🏆 Nhận thưởng "${ms.title}": ${ms.rewardText}!`);
    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  spinLuckyWheel() {
    if (this.isWheelSpinning) return;
    const spinGoldCost = 220;
    if (this.wheelTickets > 0) {
      this.wheelTickets -= 1;
    } else if (this.gold >= spinGoldCost) {
      this.gold -= spinGoldCost;
    } else {
      this.ui.showToast('🎟️ Cần 1 Vé Quay hoặc 220G để quay Vòng Quay Sao Băng!');
      return;
    }

    const prizes = window.GAME_CONFIG.LUCKY_WHEEL_PRIZES;
    const winIdx = Math.floor(Math.random() * prizes.length);
    const prize = prizes[winIdx];

    this.isWheelSpinning = true;
    this.ui.updateHUD();

    let ticks = 0;
    const totalTicks = 12 + winIdx;
    const timer = setInterval(() => {
      const highlightIdx = ticks % prizes.length;
      window.SFX.playWheelTick(ticks);
      const slots = document.querySelectorAll('.wheel-prize-slot');
      slots.forEach((el, idx) => {
        el.classList.toggle('wheel-active', idx === highlightIdx);
      });
      ticks++;
      if (ticks > totalTicks) {
        clearInterval(timer);
        this.isWheelSpinning = false;
        this.awardWheelPrize(prize);
      }
    }, 75);
  }

  awardWheelPrize(prize) {
    this.lastWheelPrize = prize;
    window.SFX.playJackpot();
    this.world.spawnParticles(this.player.x, this.player.y, '#ffd700', 32);

    if (prize.id === 'gold_jackpot') {
      const amount = 280 + this.level * 110;
      this.earnGold(amount);
      this.ui.showToast(`🎰 NỔ HŨ VÀNG ĐẠI CÁT: Nhận +${amount} Vàng!`);
    } else if (prize.id === 'stone_jackpot') {
      this.refineStones += 8;
      this.gemInventory.ruby_1 = (this.gemInventory.ruby_1 || 0) + 1;
      this.gemInventory.sapphire_1 = (this.gemInventory.sapphire_1 || 0) + 1;
      this.ui.showToast('🎰 TRÚNG RƯƠNG THỢ RÈN: +8 🪨 Đá Cường Hóa & +2 💎 Bảo Thạch!');
    } else if (prize.id === 'fever_burst') {
      this.triggerFeverMode(20);
    } else if (prize.id === 'skill_point') {
      this.skillPoints += 1;
      this.ui.showToast('🎰 ĐẠI CÁT: Trúng +1 ⭐ Điểm Kỹ Năng Tinh Thông!');
    } else if (prize.id === 'seed_jackpot') {
      this.seeds.yggdrasil_fruit = (this.seeds.yggdrasil_fruit || 0) + 1;
      this.seeds.cosmic_worldfruit = (this.seeds.cosmic_worldfruit || 0) + 1;
      this.seeds.phoenix_blossom = (this.seeds.phoenix_blossom || 0) + 1;
      this.ui.showToast('🎰 TRÚNG HẠT SÁNG THẾ: +1 Yggdrasil 👑, +1 Quả Thế Giới 🪐 & +1 Hoa Phượng Hoàng 🔥!');
    } else if (prize.id === 'star_bundle') {
      this.starShards += 3;
      this.ui.showToast('🎰 TRÚNG KHO BÁU TINH TÚ: +3 🌠 Mảnh Sao Băng!');
    }

    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  earnGold(amount) {
    const prevRank = this.getCurrentPrestigeRank().rank;
    this.gold += amount;
    this.totalWealthEarned += amount;
    this.dailyStats.goldEarned += amount;
    const newRankObj = this.getCurrentPrestigeRank();
    if (newRankObj.rank > prevRank) {
      window.SFX.playLevelUp();
      this.ui.showToast(`👑 THĂNG HẠNG DANH HIỆU: ${newRankObj.icon} ${newRankObj.title} (+${Math.round(newRankObj.bonusPrice * 100)}% giá bán)!`);
    }
  }

  registerComboAction(px, py) {
    this.comboCount += 1;
    this.comboTimer = 3.5;

    if (this.comboCount >= 3 && this.feverTimer <= 0) {
      this.world.spawnFloatingText(px, py - 22, `🔥 COMBO x${this.comboCount}!`, '#ffea00');
    }

    if (this.comboCount >= 8 && this.feverTimer <= 0) {
      this.triggerFeverMode(15);
    }
  }

  triggerFeverMode(durationSec = 15) {
    this.feverTimer = durationSec;
    this.comboCount = 0;
    window.SFX.playFeverTrigger();
    this.world.spawnParticles(this.player.x, this.player.y, '#ffd700', 28);
    this.ui.showToast(`🔥 CƠN SỐT HOÀNG KIM KÍCH HOẠT (${durationSec}s): Cây lớn x3 tốc độ, Thu hoạch x2 Vàng & 0 tốn sức!`);
    this.ui.updateHUD();
  }

  syncFairyDrones() {
    const lvl = this.mastery.fairy_drone || 0;
    const targetCount = lvl >= 5 ? 3 : (lvl >= 3 ? 2 : (lvl >= 1 ? 1 : 0));
    while (this.fairies.length < targetCount) {
      this.fairies.push(new window.FairyHelper(this.fairies.length));
    }
  }

  upgradeMasterySkill(skillId) {
    const cfg = window.GAME_CONFIG.MASTERY_SKILLS.find(s => s.id === skillId);
    if (!cfg || this.skillPoints <= 0) return;
    const cur = this.mastery[skillId] || 0;
    if (cur >= cfg.maxLevel) return;

    this.skillPoints -= 1;
    this.totalMasterySpent += 1;
    this.mastery[skillId] = cur + 1;
    this.syncFairyDrones();
    this.addEmpirePoints(12);

    window.SFX.playLevelUp();
    this.ui.showToast(`⭐ Đã nâng cấp "${cfg.name}" lên Cấp ${this.mastery[skillId]}!`);
    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  buyMasteryPoint(cost) {
    if (this.gold < cost) return;
    this.gold -= cost;
    this.skillPoints += 1;
    this.totalMasterySpent += 1;
    window.SFX.playStar();
    this.ui.showToast('⭐ Đã đổi +1 Điểm Tinh Thông!');
    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  syncCanvasOrientation() {
    const isPortrait = window.innerHeight > window.innerWidth;
    this.world.updateOrientationMode(isPortrait);
    this.canvas.width = this.world.cols * this.world.tileSize;
    this.canvas.height = this.world.rows * this.world.tileSize;
    this.canvas.style.aspectRatio = `${this.world.cols} / ${this.world.rows}`;
    this.ctx.imageSmoothingEnabled = false;
  }

  screenToWorldCoords(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    const canvasX = (clientX - rect.left) * scaleX;
    const canvasY = (clientY - rect.top) * scaleY;

    const worldX = (canvasX - this.canvas.width / 2) / this.cameraZoom + this.camX;
    const worldY = (canvasY - this.canvas.height / 2) / this.cameraZoom + this.camY;
    return { wx: worldX, wy: worldY };
  }

  recordDiscovery(key, qty = 1) {
    this.discovered[key] = (this.discovered[key] || 0) + qty;
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.syncCanvasOrientation();
    });

    ['btn-map-valley', 'btn-map-cavern', 'btn-map-sky', 'btn-map-dragon', 'btn-map-astral'].forEach(btnId => {
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.onclick = () => {
          const mapId = btn.dataset.map;
          if (this.unlockedMaps[mapId]) {
            this.travelToMap(mapId);
          } else {
            this.ui.openModalGroup('quests', 'empire');
          }
        };
      }
    });

    window.addEventListener('keydown', e => {
      this.keys[e.code] = true;
      if (e.code === 'Digit1') this.selectTool('smart');
      if (e.code === 'Digit2') this.selectTool('hoe');
      if (e.code === 'Digit3') this.selectTool('water');
      if (e.code === 'Digit4') this.selectTool('seed');
      if (e.code === 'Digit5') this.selectTool('scythe');
      if (e.code === 'Digit6') this.selectTool('sprinkler');
      if (e.code === 'Digit7') this.selectTool('lantern');
      if (e.code === 'Digit8') this.selectTool('rod');
      if (e.code === 'Escape') {
        this.ui.closeModal();
        this.ui.closeDaySummaryModal();
      }
      if (e.code === 'KeyQ') this.ui.openModalGroup('quests');
      if (e.code === 'KeyE') {
        const modal = document.getElementById('main-modal');
        if (modal.classList.contains('open')) this.ui.closeModal();
        else this.ui.openModalGroup('shop');
      }
      if (e.code === 'Space') {
        if (this.fishingState && this.fishingState.active) {
          e.preventDefault();
          this.resolveFishingStrike();
        } else {
          const r = Math.floor(this.player.y / this.world.tileSize);
          const c = Math.floor(this.player.x / this.world.tileSize);
          const tile = this.world.getTile(r, c);
          if (tile) this.interactWithTile(tile);
        }
      }
    });

    window.addEventListener('keyup', e => {
      this.keys[e.code] = false;
    });

    const handlePointerStart = (clientX, clientY) => {
      window.SFX.startBGM();
      if (this.fishingState && this.fishingState.active) {
        this.resolveFishingStrike();
        return;
      }

      this.isPointerDown = true;
      const { wx, wy } = this.screenToWorldCoords(clientX, clientY);

      if (this.world.currentMap === 'valley') {
        for (const anim of this.animals) {
          if (Math.hypot(wx - anim.x, wy - anim.y) <= 28) {
            this.interactWithAnimal(anim);
            return;
          }
        }
      }

      const c = Math.floor(wx / this.world.tileSize);
      const r = Math.floor(wy / this.world.tileSize);
      const tile = this.world.getTile(r, c);
      if (!tile) return;

      this.hoverTile = tile;
      this.ui.updateTileInspector(tile);
      this.lastDraggedTileKey = `${tile.r},${tile.c}`;

      const tx = (c + 0.5) * this.world.tileSize;
      const ty = (r + 0.5) * this.world.tileSize;

      this.player.moveTo(tx, ty);
      this.interactWithTile(tile);
    };

    const handlePointerMove = (clientX, clientY) => {
      const { wx, wy } = this.screenToWorldCoords(clientX, clientY);
      const c = Math.floor(wx / this.world.tileSize);
      const r = Math.floor(wy / this.world.tileSize);
      this.hoverTile = this.world.getTile(r, c);
      this.ui.updateTileInspector(this.hoverTile);

      if (this.isPointerDown && this.hoverTile) {
        const tileKey = `${this.hoverTile.r},${this.hoverTile.c}`;
        if (tileKey !== this.lastDraggedTileKey) {
          this.lastDraggedTileKey = tileKey;
          if (['grass', 'soil'].includes(this.hoverTile.type)) {
            this.player.x = (this.hoverTile.c + 0.5) * this.world.tileSize;
            this.player.y = (this.hoverTile.r + 0.5) * this.world.tileSize;
            this.interactWithTile(this.hoverTile);
          }
        }
      }
    };

    const handlePointerEnd = () => {
      this.isPointerDown = false;
      this.lastDraggedTileKey = null;
    };

    this.canvas.addEventListener('mousedown', e => handlePointerStart(e.clientX, e.clientY));
    this.canvas.addEventListener('mousemove', e => handlePointerMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', handlePointerEnd);
    this.canvas.addEventListener('mouseleave', () => {
      this.hoverTile = null;
      this.ui.updateTileInspector(null);
    });

    this.canvas.addEventListener('touchstart', e => {
      e.preventDefault();
      if (e.touches.length > 0) {
        handlePointerStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: false });

    this.canvas.addEventListener('touchmove', e => {
      e.preventDefault();
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: false });

    window.addEventListener('touchend', handlePointerEnd);

    const toggleSmart = () => {
      this.smartMode = !this.smartMode;
      if (this.smartMode) this.selectedTool = 'smart';
      this.ui.updateHUD();
    };
    document.getElementById('btn-smart-mode').onclick = toggleSmart;
    document.getElementById('btn-smart-top').onclick = toggleSmart;

    document.getElementById('btn-zoom').onclick = () => {
      this.cameraZoom = this.cameraZoom > 1.0 ? 1.0 : 1.35;
      this.ui.updateHUD();
    };

    document.getElementById('level-text').onclick = () => {
      this.ui.openModalGroup('quests', 'mastery');
    };

    const walletEl = document.getElementById('wallet-widget');
    if (walletEl) {
      walletEl.onclick = () => this.ui.openModalGroup('shop', 'forge');
    }

    document.getElementById('step-guide-pill').onclick = () => {
      const readyMs = window.GAME_CONFIG.EMPIRE_MILESTONES.find(
        m => !this.claimedMilestones.includes(m.id) && this.empirePoints >= m.pointsNeeded
      );
      const chap = window.GAME_CONFIG.STORY_CHAPTERS.find(c => c.chapter === this.storyChapter);
      if (readyMs) {
        this.ui.openModalGroup('quests', 'empire');
      } else if (chap && chap.check(this)) {
        this.completeStoryChapter();
      } else if (this.refineStones >= 2) {
        this.ui.openModalGroup('shop', 'forge');
      } else {
        this.ui.openModalGroup('quests', 'empire');
      }
    };

    document.getElementById('btn-menu-quests').onclick = () => this.ui.openModalGroup('quests');
    document.getElementById('btn-menu-shop').onclick = () => this.ui.openModalGroup('shop');
    document.getElementById('btn-menu-shrine').onclick = () => this.ui.openModalGroup('shrine');
    document.getElementById('btn-menu-guide').onclick = () => this.ui.openModalGroup('guide');

    document.getElementById('mob-btn-quests').onclick = () => this.ui.openModalGroup('quests');
    document.getElementById('mob-btn-shop').onclick = () => this.ui.openModalGroup('shop');
    document.getElementById('mob-btn-shrine').onclick = () => this.ui.openModalGroup('shrine');
    document.getElementById('mob-btn-guide').onclick = () => this.ui.openModalGroup('guide');
    document.getElementById('mob-btn-sleep').onclick = () => this.advanceToNextDay(false);

    document.getElementById('btn-sell-all').onclick = () => this.sellAllInventory();
    document.getElementById('btn-sleep').onclick = () => this.advanceToNextDay(false);
    document.getElementById('btn-audio').onclick = (e) => {
      const muted = window.SFX.toggleMute();
      e.currentTarget.textContent = muted ? '🔇' : '🔊';
    };

    document.getElementById('btn-close-modal').onclick = () => this.ui.closeModal();
    document.getElementById('btn-close-day-summary').onclick = () => this.ui.closeDaySummaryModal();
    document.getElementById('btn-close-dlg').onclick = () => this.ui.hideDialogue();
    document.getElementById('btn-strike-fish').onclick = () => this.resolveFishingStrike();
  }

  selectTool(toolId) {
    this.selectedTool = toolId;
    this.smartMode = (toolId === 'smart');
    this.ui.updateHUD();
  }

  openTreasureChest(tile) {
    const px = (tile.c + 0.5) * this.world.tileSize;
    const py = (tile.r + 0.5) * this.world.tileSize;
    tile.obstacle = null;
    window.SFX.playChestOpen();
    this.world.spawnParticles(px, py, '#ffd700', 26);
    this.addEmpirePoints(10);

    this.refineStones += 3;
    const gemIds = Object.keys(window.GAME_CONFIG.GEM_TYPES);
    const pickedGem = gemIds[Math.floor(Math.random() * gemIds.length)];
    this.gemInventory[`${pickedGem}_1`] = (this.gemInventory[`${pickedGem}_1`] || 0) + 1;
    const gCfg = window.GAME_CONFIG.GEM_TYPES[pickedGem];

    const bonusGold = 110 + this.level * 40;
    this.earnGold(bonusGold);
    this.world.spawnFloatingText(px, py - 12, `🎁 RƯƠNG BÁU: +${bonusGold}G, +3 🪨 Đá & +1 ${gCfg.icon} Ngọc!`, '#ffd700');

    this.addXP(30);
    this.ui.updateHUD();
    this.saveGame();
  }

  useStarShopItem(itemId) {
    const item = window.GAME_CONFIG.STAR_SHOP_ITEMS.find(x => x.id === itemId);
    if (!item || this.starShards < item.starCost) return;

    if (itemId === 'instant_grow') {
      let grown = 0;
      for (let r = 0; r < this.world.rows; r++) {
        for (let c = 0; c < this.world.cols; c++) {
          const t = this.world.tiles[r][c];
          if (t.crop && t.crop.stage < 4) {
            t.crop.progress = 1;
            t.crop.stage = 4;
            t.watered = true;
            grown++;
            this.world.spawnParticles((c + 0.5) * this.world.tileSize, (r + 0.5) * this.world.tileSize, '#76ff03', 8);
          }
        }
      }
      if (grown === 0) {
        this.ui.showToast('🌱 Chưa có cây đang lớn trên bản đồ này! Hãy gieo hạt trước nhé.');
        return;
      }
      this.starShards -= item.starCost;
      this.world.checkGiantCrops();
      window.SFX.playStar();
      this.ui.showToast(`✨ Phép màu Tinh Linh! Đã làm chín tức thì ${grown} cây trồng!`);
    } else if (itemId === 'star_mutate_3') {
      const candidates = [];
      for (let r = 0; r < this.world.rows; r++) {
        for (let c = 0; c < this.world.cols; c++) {
          const t = this.world.tiles[r][c];
          if (t.crop && !t.crop.isMutated) candidates.push(t);
        }
      }
      if (candidates.length === 0) {
        this.ui.showToast('🌱 Hãy gieo cây trên đồng trước khi dùng Tinh Thể Đột Biến nhé!');
        return;
      }
      this.starShards -= item.starCost;
      candidates.slice(0, 3).forEach(t => {
        t.crop.isMutated = true;
        t.crop.stage = 4;
        t.crop.progress = 1;
        this.world.spawnParticles((t.c + 0.5) * this.world.tileSize, (t.r + 0.5) * this.world.tileSize, '#e040fb', 15);
      });
      window.SFX.playStar();
      this.ui.showToast('🌈 Đã biến cây trồng thành Cây Ánh Sao (x4 giá trị)!');
    } else if (itemId === 'trigger_fever') {
      this.starShards -= item.starCost;
      this.triggerFeverMode(18);
      this.ui.closeModal();
      return;
    } else if (itemId === 'respawn_cavern_ores') {
      this.starShards -= item.starCost;
      this.world.respawnCavernOres(8);
      window.SFX.playAnvilStrike();
      this.ui.showToast('⛏️ ĐỊA CHẤN LONG MẠCH: Đã tái tạo đầy ắp Mỏ Đá Rèn, Mỏ Ngọc, Mỏ Hỏa Ngọc & Thiên Thạch!');
      this.ui.closeModal();
      return;
    }

    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  completeStoryChapter() {
    const chap = window.GAME_CONFIG.STORY_CHAPTERS.find(c => c.chapter === this.storyChapter);
    if (!chap || !chap.check(this)) return;

    this.earnGold(chap.rewardGold);
    this.starShards += chap.rewardStars;
    this.refineStones += 5;
    this.skillPoints += 1;
    this.wheelTickets += 1;
    this.treeLevel = Math.min(5, Math.max(this.treeLevel, Math.min(5, this.storyChapter + 1)));

    if (chap.chapter === 1) {
      this.unlockedMaps.crystal_cavern = true;
    } else if (chap.chapter === 2) {
      this.devices.sprinkler = (this.devices.sprinkler || 0) + 1;
      this.seeds.void_mushroom = (this.seeds.void_mushroom || 0) + 3;
    } else if (chap.chapter === 4) {
      this.unlockedMaps.sky_island = true;
      this.seeds.mystic_lotus = (this.seeds.mystic_lotus || 0) + 2;
    } else if (chap.chapter === 5) {
      this.seeds.golden_apple = (this.seeds.golden_apple || 0) + 2;
    } else if (chap.chapter === 6) {
      this.unlockedMaps.dragon_sanctum = true;
    } else if (chap.chapter === 7) {
      this.seeds.chrono_rose = (this.seeds.chrono_rose || 0) + 2;
      this.seeds.dragon_fruit = (this.seeds.dragon_fruit || 0) + 2;
    } else if (chap.chapter === 8) {
      this.seeds.phoenix_blossom = (this.seeds.phoenix_blossom || 0) + 2;
    } else if (chap.chapter === 9) {
      this.unlockedMaps.astral_nexus = true;
    } else if (chap.chapter === 10) {
      this.seeds.cosmic_worldfruit = (this.seeds.cosmic_worldfruit || 0) + 2;
    } else if (chap.chapter === 11) {
      this.seeds.yggdrasil_fruit = (this.seeds.yggdrasil_fruit || 0) + 2;
    }

    this.storyChapter += 1;
    this.checkAndAutoUnlockMaps(true);

    window.SFX.playLevelUp();
    this.world.spawnParticles(this.player.x, this.player.y, '#ea80fc', 28);
    this.ui.showToast(`🌟 ${chap.unlockText}`);

    const nextChap = window.GAME_CONFIG.STORY_CHAPTERS.find(c => c.chapter === this.storyChapter);
    if (nextChap) {
      this.ui.showDialogue(nextChap.npc, nextChap.introText);
    } else {
      this.ui.showDialogue('lumia', 'Chúc mừng bạn đã hoàn thành trọn vẹn 15 Chương Sáng Thế! Hãy tiếp tục săn Boss Kỳ Lân, leo Tháp Tinh Tú & Luân Hồi Vô Tận nhé!');
    }

    this.ui.updateHUD();
    this.saveGame();
  }

  completeBundle(bundleId) {
    if (this.completedBundles.includes(bundleId)) return;
    const b = window.GAME_CONFIG.BUNDLES.find(x => x.id === bundleId);
    if (!b) return;

    for (const [k, q] of Object.entries(b.requirements)) {
      if ((this.inventory[k] || 0) < q) return;
    }
    for (const [k, q] of Object.entries(b.requirements)) {
      this.inventory[k] -= q;
    }

    this.completedBundles.push(bundleId);
    this.earnGold(b.rewardGold);
    this.starShards += b.rewardStars;
    this.refineStones += 6;
    this.skillPoints += 1;
    this.wheelTickets += 1;
    this.addEmpirePoints(25);
    if (b.rewardDevice) {
      this.devices[b.rewardDevice] = (this.devices[b.rewardDevice] || 0) + 1;
    }
    if (b.rewardSeed) {
      this.seeds[b.rewardSeed.id] = (this.seeds[b.rewardSeed.id] || 0) + b.rewardSeed.qty;
    }
    this.treeLevel = Math.min(5, Math.max(this.treeLevel, this.completedBundles.length + 1));
    this.addXP(65);

    window.SFX.playStar();
    this.world.spawnParticles(this.player.x, this.player.y, '#ffd700', 26);
    this.ui.showToast(`🏛️ Đã hiến tế "${b.name}"! Nhận ${b.rewardText}, +6 🪨 Đá Cường Hóa & +1 ⭐ Kỹ Năng!`);
    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  interactWithAnimal(anim) {
    window.SFX.playPet();
    if (anim.hasProductReady) {
      anim.hasProductReady = false;
      const isGolden = anim.affection >= 2 && Math.random() < 0.5;
      const prodKey = anim.cfg.produceId;
      const qty = isGolden ? 2 : 1;
      this.inventory[prodKey] = (this.inventory[prodKey] || 0) + qty;
      this.recordDiscovery(prodKey, qty);
      this.addEmpirePoints(5);
      this.addXP(15);
      this.world.spawnParticles(anim.x, anim.y, '#ffd700', 12);
      this.world.spawnFloatingText(
        anim.x,
        anim.y - 16,
        `+${qty} ${isGolden ? anim.cfg.goldenProduceName : anim.cfg.produceName}!`,
        '#ffd54f'
      );
      this.ui.updateHUD();
      this.saveGame();
    } else {
      anim.affection += 1;
      this.world.spawnParticles(anim.x, anim.y - 10, '#ff4081', 8);
      this.world.spawnFloatingText(anim.x, anim.y - 16, '💕 Thân thiết +1!', '#ff80ab');
    }
  }

  interactWithTile(tile) {
    this.player.actionAnimTimer = 0.25;
    const px = (tile.c + 0.5) * this.world.tileSize;
    const py = (tile.r + 0.5) * this.world.tileSize;

    if (tile.obstacle === 'chest') {
      this.openTreasureChest(tile);
      return;
    }

    if (tile.obstacle && tile.obstacle.startsWith('ore_')) {
      this.mineOreVein(tile);
      return;
    }

    if (tile.type === 'realm_portal') {
      this.cyclePortalDestination();
      return;
    }
    if (tile.type === 'cavern_anvil') {
      this.ui.openModalGroup('shop', 'forge');
      return;
    }
    if (tile.type === 'ascension_altar') {
      this.ui.openModalGroup('quests', 'empire');
      return;
    }
    if (tile.type === 'dragon_shrine') {
      this.activateDragonShrineBlessing();
      return;
    }
    if (tile.type === 'astral_boss') {
      this.strikeAstralBoss();
      return;
    }
    if (tile.type === 'sacred_tree') {
      this.ui.openModalGroup('shrine', 'bundles');
      return;
    }
    if (tile.type === 'house_zone') {
      this.advanceToNextDay(false);
      return;
    }
    if (tile.type === 'shipping_bin') {
      this.sellAllInventory();
      return;
    }
    if (tile.type === 'kitchen_oven') {
      this.ui.openModalGroup('shrine', 'kitchen');
      return;
    }
    if (tile.type === 'artisan_workshop') {
      this.ui.openModalGroup('shop', 'passive');
      return;
    }
    if (tile.type === 'water' || this.selectedTool === 'rod') {
      if (tile.type === 'water') {
        this.startFishingMinigame();
        return;
      }
    }

    if (this.selectedTool === 'sprinkler' || this.selectedTool === 'lantern') {
      const devId = this.selectedTool;
      if ((this.devices[devId] || 0) <= 0) {
        this.ui.showToast('⚠ Bạn chưa có thiết bị này! Hãy mua trong Cửa Hàng.');
        return;
      }
      if (tile.device || tile.obstacle) {
        this.ui.showToast('⚠ Ô đất này đang vướng vật cản!');
        return;
      }
      this.devices[devId] -= 1;
      tile.device = devId;
      window.SFX.playPlant();
      this.world.spawnParticles(px, py, '#4fc3f7', 10);
      this.ui.updateHUD();
      this.saveGame();
      return;
    }

    if (tile.obstacle) {
      if (!this.consumeEnergy(1.5)) return;
      tile.obstacle = null;
      this.addXP(6);
      this.addEmpirePoints(4);
      window.SFX.playHoe();
      this.registerComboAction(px, py);
      this.world.spawnParticles(px, py, '#a5d6a7', 10);

      this.tryDropForgeMaterials(px, py, 0.55);

      const chestChance = 0.14 + (this.mastery.golden_touch || 0) * 0.04 + this.getToolEnhanceState('hoe').plus * 0.03;
      if (Math.random() < chestChance) {
        tile.obstacle = 'chest';
        this.world.spawnFloatingText(px, py - 10, '🎁 ĐÀO TRÚNG RƯƠNG BÁU!', '#ffd700');
      } else {
        this.world.spawnFloatingText(px, py - 8, '+6 XP Dọn đất!', '#a5d6a7');
      }
      this.ui.updateHUD();
      return;
    }

    if (this.smartMode || this.selectedTool === 'smart') {
      if (tile.crop && tile.crop.stage === 4) {
        this.harvestTile(tile, false);
      } else if (tile.type === 'grass') {
        this.useHoeOnTile(tile);
      } else if (tile.type === 'soil' && !tile.crop) {
        if ((this.seeds[this.selectedSeed] || 0) > 0) {
          this.plantSeedOnTile(tile);
        } else if (!tile.watered) {
          this.waterTile(tile);
        } else {
          this.checkSoftlockRelief();
          this.ui.showToast('🌱 Hết hạt giống đang chọn! Hãy chọn hạt khác hoặc mở Cửa Hàng.');
        }
      } else if (tile.type === 'soil' && tile.crop && !tile.watered) {
        this.waterTile(tile);
      }
      return;
    }

    if (this.selectedTool === 'hoe') this.useHoeOnTile(tile);
    else if (this.selectedTool === 'water') this.waterTile(tile);
    else if (this.selectedTool === 'seed') this.plantSeedOnTile(tile);
    else if (this.selectedTool === 'scythe' && tile.crop && tile.crop.stage === 4) {
      this.harvestTile(tile, false);
    }
  }

  useHoeOnTile(centerTile) {
    if (!this.consumeEnergy(1.5)) return;
    const hoePlus = this.getToolEnhanceState('hoe').plus;
    const radius = (this.upgrades.hoe_2 || hoePlus >= 3) ? 1 : 0;
    const keepWet = this.world.getCurrentMapConfig().soilKeepWet;
    let count = 0;
    for (let dr = -radius; dr <= radius; dr++) {
      for (let dc = -radius; dc <= radius; dc++) {
        const t = this.world.getTile(centerTile.r + dr, centerTile.c + dc);
        if (t && t.type === 'grass' && !t.obstacle) {
          t.type = 'soil';
          if (keepWet) t.watered = true;
          count++;
          this.world.spawnParticles((t.c + 0.5) * this.world.tileSize, (t.r + 0.5) * this.world.tileSize, '#b57c4a', 6);
        }
      }
    }
    if (count > 0) {
      window.SFX.playHoe();
      const px = (centerTile.c + 0.5) * this.world.tileSize;
      const py = (centerTile.r + 0.5) * this.world.tileSize;
      this.registerComboAction(px, py);
      if (hoePlus >= 7) {
        const bonusG = hoePlus * 8;
        this.earnGold(bonusG);
        this.world.spawnFloatingText(px, py - 14, `⛏️ Cuốc +${hoePlus}: +${bonusG}G!`, '#ffd700');
      }
      this.addXP(count * 2);
      this.ui.updateHUD();
      this.saveGame();
    }
  }

  plantSeedOnTile(tile) {
    if (tile.type !== 'soil' || tile.crop) return;
    const seedId = this.selectedSeed;
    if ((this.seeds[seedId] || 0) <= 0) {
      this.checkSoftlockRelief();
      this.ui.showToast('🌱 Đã hết hạt giống loại này! Hãy ghé Cửa Hàng mua thêm.');
      return;
    }
    this.seeds[seedId] -= 1;
    tile.crop = { id: seedId, stage: 0, progress: 0, isMutated: false, isGiant: false };
    if (this.world.getCurrentMapConfig().soilKeepWet) {
      tile.watered = true;
    }
    window.SFX.playPlant();
    const px = (tile.c + 0.5) * this.world.tileSize;
    const py = (tile.r + 0.5) * this.world.tileSize;
    this.registerComboAction(px, py);
    this.world.spawnParticles(px, py, '#ffe082', 6);
    if (this.smartMode && !tile.watered && this.energy >= 1.5) {
      this.waterTile(tile);
    }
    this.ui.updateHUD();
    this.saveGame();
  }

  waterTile(centerTile) {
    if (!this.consumeEnergy(1.0)) return;
    const waterPlus = this.getToolEnhanceState('water').plus;
    const radius = (this.upgrades.watering_can_2 || waterPlus >= 3) ? 1 : 0;
    let wateredAny = false;
    for (let dr = -radius; dr <= radius; dr++) {
      for (let dc = -radius; dc <= radius; dc++) {
        const t = this.world.getTile(centerTile.r + dr, centerTile.c + dc);
        if (t && t.type === 'soil' && !t.watered) {
          t.watered = true;
          wateredAny = true;
          if (waterPlus >= 7 && t.crop && t.crop.stage < 4) {
            t.crop.progress = Math.min(1, t.crop.progress + 0.25);
            t.crop.stage = Math.min(4, Math.floor(t.crop.progress * 4));
          }
          this.world.spawnParticles((t.c + 0.5) * this.world.tileSize, (t.r + 0.5) * this.world.tileSize, '#4fc3f7', 7);
        }
      }
    }
    if (wateredAny) {
      window.SFX.playWater();
      this.addXP(2);
      this.ui.updateHUD();
      this.saveGame();
    }
  }

  harvestTile(tile, byHelper = false, isChainLightning = false) {
    if (!tile.crop || tile.crop.stage < 4) return;
    const cfg = window.GAME_CONFIG.CROPS[tile.crop.id];
    if (!cfg) return;
    const px = (tile.c + 0.5) * this.world.tileSize;
    const py = (tile.r + 0.5) * this.world.tileSize;

    const scytheSt = this.getToolEnhanceState('scythe');
    const scythePlus = scytheSt.plus;
    const scytheAwkMult = 1 + (scytheSt.awaken || 0) * 0.35;
    const emeraldBonus = this.getTotalGemBonus('emerald');
    const affixCrit = this.getTotalAffixBonus('critBonus');

    const critChance =
      0.14 +
      (this.mastery.golden_touch || 0) * 0.08 +
      scythePlus * 0.04 * scytheAwkMult +
      emeraldBonus +
      affixCrit +
      (this.feverTimer > 0 ? 0.35 : 0);
    const isCritical = Math.random() < critChance;

    const realmYieldMult = this.world.getCurrentMapConfig().yieldMult || 1;
    let yieldQty = (tile.crop.isGiant ? 3 : 1) * (isCritical ? 3 : 1) * realmYieldMult;
    const isMutated = tile.crop.isMutated;

    const prevMastery = this.getCropMasteryInfo(cfg.id);
    this.cropHarvestCounts[cfg.id] = (this.cropHarvestCounts[cfg.id] || 0) + yieldQty;
    const newMastery = this.getCropMasteryInfo(cfg.id);

    if (newMastery.tier > prevMastery.tier) {
      window.SFX.playJackpot();
      this.world.spawnParticles(px, py, '#00e5ff', 28);
      this.ui.showToast(
        `🌟 THÔNG THẠO CÂY TRỒNG: ${cfg.emoji} ${cfg.name} đạt ${newMastery.name} (Giá bán x${newMastery.priceMult} & Lớn nhanh x${newMastery.speedMult} vĩnh viễn)!`
      );
    }

    if (newMastery.starShardChance > 0 && Math.random() < newMastery.starShardChance) {
      this.starShards += 1;
      this.world.spawnFloatingText(px, py - 34, '✨ +1 🌠 SAO THÔNG THẠO!', '#84ffff');
    }

    // KÍCH HOẠT HIỆU ỨNG ĐẶC BIỆT CỦA 14 GIỐNG CÂY & SIÊU CÂY LAI TẠO
    if (cfg.bonusStoneChance && Math.random() < cfg.bonusStoneChance) {
      const stGain = (cfg.id === 'cosmic_worldfruit' || cfg.id === 'yggdrasil_fruit') ? 2 : 1;
      this.refineStones += stGain;
      this.world.spawnFloatingText(px, py - 36, `${cfg.emoji} +${stGain} 🪨 Đá Cường Hóa!`, '#00e5ff');
    }
    if (cfg.bonusTicketChance && Math.random() < cfg.bonusTicketChance) {
      this.wheelTickets += 1;
      this.refineStones += 1;
      this.world.spawnFloatingText(px, py - 36, '⏳ Hoa Hồng Thời Gian: +1 🎟️ Vé Quay & +1 🪨!', '#ffd700');
    }
    if (cfg.phoenixInstantRipenChance && Math.random() < cfg.phoenixInstantRipenChance) {
      for (let rr = 0; rr < this.world.rows; rr++) {
        let ripened = false;
        for (let cc = 0; cc < this.world.cols; cc++) {
          const other = this.world.tiles[rr][cc];
          if (other && other !== tile && other.crop && other.crop.stage < 4) {
            other.crop.progress = 1;
            other.crop.stage = 4;
            other.watered = true;
            this.world.spawnParticles((cc + 0.5) * this.world.tileSize, (rr + 0.5) * this.world.tileSize, '#ff3d00', 16);
            this.world.spawnFloatingText(px, py - 42, '🐦‍🔥 LỬA PHƯỢNG HOÀNG: Làm chín tức thì 1 cây!', '#ffea00');
            ripened = true;
            break;
          }
        }
        if (ripened) break;
      }
    }
    if (cfg.bonusSkillPointChance && Math.random() < cfg.bonusSkillPointChance) {
      this.skillPoints += 1;
      this.world.spawnFloatingText(px, py - 44, '👑 YGGDRASIL: +1 ⭐ ĐIỂM KỸ NĂNG TINH THÔNG!', '#ffea00');
    }
    if (cfg.bonusEnergyRestore) {
      this.energy = Math.min(this.maxEnergy, this.energy + cfg.bonusEnergyRestore);
      this.world.spawnFloatingText(px, py - 36, `🪷 Sen Pha Lê: +${cfg.bonusEnergyRestore}⚡ Thể lực!`, '#80d8ff');
    }
    if (cfg.bonusGemChance && Math.random() < cfg.bonusGemChance) {
      const gemIds = Object.keys(window.GAME_CONFIG.GEM_TYPES);
      const picked = gemIds[Math.floor(Math.random() * gemIds.length)];
      this.gemInventory[`${picked}_1`] = (this.gemInventory[`${picked}_1`] || 0) + 1;
      const gCfg = window.GAME_CONFIG.GEM_TYPES[picked];
      this.world.spawnFloatingText(px, py - 46, `${cfg.emoji} +1 ${gCfg.icon} ${gCfg.name}!`, gCfg.color);
    }
    if (cfg.bonusDirectGold) {
      const bonusG = Math.round(cfg.bonusDirectGold * this.getPriceMultiplier());
      this.earnGold(bonusG);
      this.world.spawnFloatingText(px, py - 36, `${cfg.emoji} +${bonusG}G!`, '#ffd700');
    }
    if (cfg.bonusStarChance && Math.random() < cfg.bonusStarChance) {
      this.starShards += 1;
      this.refineStones += 1;
      this.world.spawnFloatingText(px, py - 38, `${cfg.emoji} +1 🌠 Sao & +1 🪨 Đá!`, '#ff4081');
    }

    this.tryDropForgeMaterials(px, py, 0.30);

    const prevHarvestTotal = this.stats.harvested;
    this.inventory[cfg.id] = (this.inventory[cfg.id] || 0) + yieldQty;
    this.recordDiscovery(cfg.id, yieldQty);
    this.stats.harvested += yieldQty;
    this.dailyStats.harvested += yieldQty;
    this.addEmpirePoints(4 * yieldQty);

    this.checkAndAutoUnlockMaps(false);

    if (Math.floor(this.stats.harvested / 10) > Math.floor(prevHarvestTotal / 10)) {
      this.wheelTickets += 1;
      this.world.spawnFloatingText(px, py - 42, '🎟️ +1 VÉ QUAY SAO BĂNG!', '#ffd700');
    }

    if (!byHelper) {
      this.registerComboAction(px, py);
    }

    const unitSellPrice = this.getItemSellPrice(cfg.id);
    let directBonusGold = Math.round(unitSellPrice * (scythePlus * 0.18 * scytheAwkMult + this.getTotalGemBonus('ruby') * 0.4));
    if (isMutated || tile.crop.isGiant) {
      this.stats.mutatedHarvested += 1;
      directBonusGold += Math.round(unitSellPrice * (isMutated ? 2.5 : 1.5));
      this.starShards += isMutated ? 1 : 0;
    }
    if (isCritical || this.feverTimer > 0) {
      directBonusGold += Math.round(unitSellPrice * (this.feverTimer > 0 ? 1.5 : 1.0));
    }

    if (directBonusGold > 0) {
      this.earnGold(directBonusGold);
      this.world.spawnFloatingText(
        px,
        py - 24,
        `${isCritical ? '💥 ĐẠI MÙA MÀNG x3! ' : '⚡ THẦN KHÍ '} +${directBonusGold}G!`,
        isCritical ? '#ffea00' : '#e040fb'
      );
    }

    this.addXP(cfg.xp * yieldQty);
    window.SFX.playHarvestCombo(this.comboCount, isCritical);
    this.world.spawnParticles(px, py, isCritical ? '#ffd700' : cfg.color, isCritical ? 22 : 14);
    this.world.spawnFloatingText(
      px,
      py - 8,
      `${byHelper ? '🧚 Tự thu ' : (isChainLightning ? '⚡ Sét Gặt ' : '')}+${yieldQty} ${cfg.name}${newMastery.stars ? ' ' + newMastery.stars : ''}`,
      '#fff59d'
    );

    const keepWet = this.world.getCurrentMapConfig().soilKeepWet;
    if (cfg.regrow) {
      tile.crop.stage = cfg.regrowStage || 2;
      tile.crop.progress = 0.5;
      tile.crop.isMutated = false;
      tile.crop.isGiant = false;
      tile.crop.hybridChecked = false;
      tile.watered = keepWet;
    } else {
      tile.crop = null;
      tile.watered = keepWet;
    }

    if (scythePlus >= 7 && !isChainLightning) {
      let chained = 0;
      const maxChain = scythePlus >= 15 ? 4 : 2;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nb = this.world.getTile(tile.r + dr, tile.c + dc);
          if (nb && nb.crop && nb.crop.stage === 4 && chained < maxChain) {
            chained++;
            this.harvestTile(nb, false, true);
          }
        }
      }
    }

    this.ui.updateHUD();
    this.saveGame();
  }

  startFishingMinigame() {
    if (!this.consumeEnergy(4)) return;
    const rodPlus = this.getToolEnhanceState('rod').plus;
    const uiBox = document.getElementById('fishing-bar-ui');
    const sweet = document.getElementById('fish-sweet-spot');
    const sweetLeft = 20 + Math.random() * 40;
    const sweetWidth = Math.min(55, 25 + rodPlus * 2.5);

    sweet.style.left = `${sweetLeft}%`;
    sweet.style.width = `${sweetWidth}%`;
    uiBox.classList.add('active');

    this.fishingState = {
      active: true,
      cursor: 0,
      dir: 1,
      speed: 92,
      sweetMin: sweetLeft,
      sweetMax: sweetLeft + sweetWidth
    };
  }

  resolveFishingStrike() {
    if (!this.fishingState || !this.fishingState.active) return;
    const st = this.fishingState;
    st.active = false;
    document.getElementById('fishing-bar-ui').classList.remove('active');

    const rodPlus = this.getToolEnhanceState('rod').plus;
    if (st.cursor >= st.sweetMin && st.cursor <= st.sweetMax) {
      window.SFX.playHarvestCombo(4, true);
      this.stats.fishCaught += 1;
      const winterBonus = (this.world.getCurrentSeason().id === 'winter' ? 2 : 1) + (rodPlus >= 4 ? 1 : 0);
      this.inventory.fish = (this.inventory.fish || 0) + winterBonus;
      this.recordDiscovery('fish', winterBonus);
      this.addEmpirePoints(8);
      this.addXP(25);
      this.refineStones += 1;
      if (Math.random() < 0.45 + rodPlus * 0.05 || this.world.currentMap !== 'valley') {
        this.starShards += 1;
        const bonusG = 95 + rodPlus * 30;
        this.earnGold(bonusG);
        this.ui.showToast(`🎣 Câu được +${winterBonus} Cá Koi & Rương Long Cung (+${bonusG}G, +1 🪨 Đá, +1 🌠 Sao)!`);
      } else {
        this.ui.showToast(`🐟 Cắn câu chuẩn xác! +${winterBonus} Cá Chép Koi & +1 🪨 Đá Cường Hóa!`);
      }
    } else {
      window.SFX.playHoe();
      this.ui.showToast('💦 Cá vùng thoát mất rồi! Nâng cấp Cần Câu Long Vương sẽ giúp vạch xanh to hơn nhé.');
    }
    this.ui.updateHUD();
    this.saveGame();
  }

  buySeed(cropId, qty) {
    const cfg = window.GAME_CONFIG.CROPS[cropId];
    const cost = cfg.seedPrice * qty;
    if (this.gold < cost) {
      this.ui.showToast('⚠ Không đủ Vàng! Hãy bán nông sản trước nhé.');
      return;
    }
    this.gold -= cost;
    this.seeds[cropId] = (this.seeds[cropId] || 0) + qty;
    this.selectedSeed = cropId;
    window.SFX.playCoin();
    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  buyAnimal(typeId) {
    const cfg = window.GAME_CONFIG.ANIMALS[typeId];
    if (this.gold < cfg.price) {
      this.ui.showToast('⚠ Không đủ Vàng để nhận nuôi!');
      return;
    }
    this.gold -= cfg.price;
    const ax = 320 + Math.random() * 130;
    const ay = 195 + Math.random() * 110;
    this.animals.push(new window.FarmAnimal(typeId, ax, ay));
    this.addEmpirePoints(15);
    window.SFX.playLevelUp();
    this.ui.showToast(`🎉 Đã đón ${cfg.icon} ${cfg.name} về nông trại!`);
    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  buyDevice(devId) {
    const cfg = window.GAME_CONFIG.DEVICES[devId];
    if (this.gold < cfg.price) {
      this.ui.showToast('⚠ Không đủ Vàng!');
      return;
    }
    this.gold -= cfg.price;
    this.devices[devId] = (this.devices[devId] || 0) + 1;
    this.selectTool(devId);
    this.addEmpirePoints(10);
    window.SFX.playCoin();
    this.ui.showToast(`🛠️ Đã mua ${cfg.name}! Chạm lên ô đất bất kỳ để lắp đặt.`);
    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  buyUpgrade(upId) {
    const up = window.GAME_CONFIG.UPGRADES.find(u => u.id === upId);
    if (!up || this.upgrades[upId]) return;
    if (this.gold < up.price) {
      this.ui.showToast('⚠ Không đủ Vàng để nâng cấp!');
      return;
    }
    this.gold -= up.price;
    this.upgrades[upId] = true;
    if (upId === 'cat_skill') this.cat.upgraded = true;
    this.addEmpirePoints(20);
    window.SFX.playLevelUp();
    this.ui.showToast(`🌟 Nâng cấp thành công: ${up.name}!`);
    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  cookRecipe(recipe, eatNow) {
    for (const [k, q] of Object.entries(recipe.ingredients)) {
      if ((this.inventory[k] || 0) < q) return;
    }
    for (const [k, q] of Object.entries(recipe.ingredients)) {
      this.inventory[k] -= q;
    }
    this.stats.dishesCooked += 1;
    this.recordDiscovery(recipe.id, 1);
    this.addEmpirePoints(10);
    this.addXP(30);

    if (eatNow) {
      this.energy = Math.min(this.maxEnergy, this.energy + recipe.energyRestore);
      this.player.speedBoostTimer = 45;
      window.SFX.playLevelUp();
      this.ui.showToast(`😋 Ăn ${recipe.icon} ${recipe.name}: Hồi +${recipe.energyRestore}⚡ & Tăng tốc!`);
    } else {
      const earned = Math.round(recipe.sellPrice * this.getPriceMultiplier());
      this.earnGold(earned);
      window.SFX.playCoin();
      this.ui.showToast(`💰 Đã bán ${recipe.icon} ${recipe.name} thu về +${earned}G!`);
    }
    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  getPriceMultiplier() {
    const rankBonus = this.getCurrentPrestigeRank().bonusPrice || 0;
    const alchemyBonus = (this.mastery.star_alchemy || 0) * 0.20;
    const rubyBonus = this.getTotalGemBonus('ruby');
    const resonanceBonus = this.getCurrentSetResonance().bonusGoldMult;
    const affixGold = this.getTotalAffixBonus('goldBonus');
    const towerBonus = ((this.starlightTowerFloor || 1) - 1) * 0.20;
    const ascMult = 1.0 + (this.ascensionCount || 0) * 1.0;

    let mult = 1.0 + (this.treeLevel - 1) * 0.12 + rankBonus + alchemyBonus + rubyBonus + resonanceBonus + affixGold + towerBonus;
    if (this.upgrades.greenhouse_charm) mult += 0.35;
    if (this.storyChapter > 5) mult += 0.25;
    return mult * ascMult;
  }

  getItemLabel(key) {
    if (window.GAME_CONFIG.CROPS[key]) return window.GAME_CONFIG.CROPS[key].name;
    const map = { egg: 'Trứng Gà Tươi', milk: 'Sữa Tươi', honey: 'Mật Ong Rừng', fish: 'Cá Chép Koi' };
    return map[key] || key;
  }

  getItemIcon(key) {
    if (window.GAME_CONFIG.CROPS[key]) return window.GAME_CONFIG.CROPS[key].emoji;
    const map = { egg: '🥚', milk: '🥛', honey: '🍯', fish: '🐟' };
    return map[key] || '📦';
  }

  getItemSellPrice(key) {
    let mult = this.getPriceMultiplier();
    const season = this.world.getCurrentSeason();
    if (season.id === 'autumn' && (key === 'pumpkin' || key === 'eggplant' || key === 'golden_apple' || key === 'cosmic_worldfruit' || key === 'yggdrasil_fruit')) {
      mult += 0.25;
    }
    if (key === this.hotCropId) {
      mult *= 1.6;
    }
    if (window.GAME_CONFIG.CROPS[key]) {
      const cropMastery = this.getCropMasteryInfo(key);
      const geneLvl = this.getCropGeneLevel(key);
      const genePriceMult = 1 + (geneLvl - 1) * 0.30;
      return Math.round(window.GAME_CONFIG.CROPS[key].sellPrice * mult * cropMastery.priceMult * genePriceMult);
    }
    const base = { egg: 48, milk: 115, honey: 90, fish: 95 }[key] || 30;
    return Math.round(base * mult);
  }

  sellInventoryItem(key) {
    const qty = this.inventory[key] || 0;
    if (qty <= 0) return;
    const total = qty * this.getItemSellPrice(key);
    this.inventory[key] = 0;
    this.earnGold(total);
    window.SFX.playCoin();
    this.ui.showToast(`💰 Đã bán ${qty} ${this.getItemLabel(key)} (+${total.toLocaleString('vi-VN')}G)!`);
    this.ui.updateHUD();
    this.ui.renderModalContent();
    this.saveGame();
  }

  sellAllInventory() {
    let total = 0;
    Object.keys(this.inventory).forEach(k => {
      const qty = this.inventory[k] || 0;
      if (qty > 0) {
        total += qty * this.getItemSellPrice(k);
        this.inventory[k] = 0;
      }
    });
    if (total === 0) {
      this.ui.showToast('📦 Kho nông sản đang trống! Hãy thu hoạch cây chín trước nhé.');
      return;
    }
    this.earnGold(total);
    window.SFX.playCoin();
    this.world.spawnParticles(4.5 * this.world.tileSize, 2.5 * this.world.tileSize, '#ffd700', 22);
    this.ui.showToast(`🚚 Đã bán toàn bộ nông sản: +${total.toLocaleString('vi-VN')} Vàng!`);
    this.ui.updateHUD();
    this.saveGame();
  }

  checkSoftlockRelief() {
    const totalSeeds = Object.values(this.seeds).reduce((a, b) => a + b, 0);
    const totalInv = Object.values(this.inventory).reduce((a, b) => a + b, 0);
    let plantedCount = 0;
    Object.values(this.world.mapGrids).forEach(grid => {
      for (let r = 0; r < this.world.maxRows; r++) {
        for (let c = 0; c < this.world.maxCols; c++) {
          if (grid[r] && grid[r][c] && grid[r][c].crop) plantedCount++;
        }
      }
    });
    if (this.gold < 15 && totalSeeds === 0 && totalInv === 0 && plantedCount === 0) {
      this.seeds.radish = 4;
      this.selectedSeed = 'radish';
      this.ui.showDialogue('bamai', 'Bà Mai tặng cháu 4 túi hạt Củ Cải Đỏ miễn phí để tiếp tục canh tác nhé!');
      this.ui.updateHUD();
    }
  }

  getQuestProgress(q) {
    if (q.type === 'harvest') return this.stats.harvested;
    if (q.type === 'mutated') return this.stats.mutatedHarvested;
    if (q.type === 'fish') return this.stats.fishCaught;
    if (q.type === 'cook') return this.stats.dishesCooked;
    return 0;
  }

  claimQuest(qId) {
    const idx = this.quests.findIndex(q => q.id === qId);
    if (idx === -1) return;
    const q = this.quests[idx];
    this.earnGold(q.rewardGold);
    this.starShards += q.rewardStars;
    this.refineStones += 3;
    this.wheelTickets += 1;
    this.addEmpirePoints(20);
    this.addXP(45);
    window.SFX.playLevelUp();
    this.ui.showToast(`🎁 Hoàn thành ủy thác! +${q.rewardGold}G, +3 🪨 Đá Cường Hóa & +1 🎟️ Vé Quay!`);

    q.target = Math.round(q.target * 1.7) + 2;
    q.rewardGold = Math.round(q.rewardGold * 1.5);
    this.ui.updateHUD();
    this.saveGame();
  }

  summonMeteorShower() {
    if (this.starShards < 2) {
      this.ui.showToast('🌠 Cần 2 Mảnh Sao Băng để triệu hồi Đêm Mưa Sao Băng!');
      return;
    }
    this.starShards -= 2;
    this.world.weather = 'meteor';
    this.world.timeOfDay = 0.80;
    window.SFX.playStar();
    this.world.triggerMeteorImpact();
    setTimeout(() => this.world.triggerMeteorImpact(), 850);
    this.ui.showToast('🌠 ĐÊM MƯA SAO BĂNG ĐÃ BẮT ĐẦU!');
    this.ui.updateHUD();
  }

  advanceToNextDay(autoFromClock = false) {
    const endedDay = this.world.day;
    const goldToday = this.dailyStats.goldEarned;
    const harvToday = this.dailyStats.harvested;

    let passiveGold = (this.mastery.star_alchemy || 0) * 60 + (this.upgrades.house_tier_2 ? 150 : 0) + this.getPassiveGoldPerSec() * 15;
    if (passiveGold > 0) {
      this.earnGold(passiveGold);
    }
    if (this.upgrades.house_tier_2) {
      this.starShards += 1;
    }
    this.wheelTickets += 1;
    this.refineStones += 2;

    this.world.day += 1;
    this.world.timeOfDay = 0.26;
    this.energy = this.maxEnergy;
    this.dailyStats = { goldEarned: 0, harvested: 0 };

    const cropIds = Object.keys(window.GAME_CONFIG.CROPS);
    this.hotCropId = cropIds[Math.floor(Math.random() * cropIds.length)];

    this.world.spawnSurpriseChest();
    this.world.respawnCavernOres(5);

    const newSeasonIdx = Math.floor((this.world.day - 1) / window.GAME_CONFIG.DAYS_PER_SEASON) % 4;
    this.world.seasonIndex = newSeasonIdx;

    const r = Math.random();
    if (r < 0.30) {
      this.world.weather = 'rainy';
    } else if (r < 0.48 || this.upgrades.greenhouse_charm || this.world.getCurrentSeason().id === 'winter') {
      this.world.weather = 'meteor';
    } else {
      this.world.weather = 'sunny';
    }

    Object.entries(this.world.mapGrids).forEach(([mapId, grid]) => {
      const keepWet = window.GAME_CONFIG.MAPS[mapId]?.soilKeepWet;
      for (let row = 0; row < this.world.maxRows; row++) {
        for (let col = 0; col < this.world.maxCols; col++) {
          const t = grid[row][col];
          if (t.crop && t.watered && t.crop.stage < 4) {
            t.crop.progress = Math.min(1, t.crop.progress + 0.45);
            t.crop.stage = Math.min(4, Math.floor(t.crop.progress * 4));
          }
          if (keepWet) {
            if (t.type === 'soil') t.watered = true;
          } else if (this.world.weather !== 'rainy') {
            t.watered = false;
          } else if (t.type === 'soil') {
            t.watered = true;
          }
        }
      }
      this.world.checkGiantCropsOnGrid(grid, mapId === this.world.currentMap, this);
    });

    this.checkSoftlockRelief();

    window.SFX.playLevelUp();
    const s = this.world.getCurrentSeason();
    const hotCropName = window.GAME_CONFIG.CROPS[this.hotCropId]?.name || 'Củ Cải Đỏ';
    if (!autoFromClock) {
      this.ui.showDaySummaryModal({
        endedDay,
        newDay: this.world.day,
        seasonName: `${s.icon} ${s.name}`,
        goldEarnedToday: goldToday,
        harvestedToday: harvToday,
        passiveGold,
        hotCropName,
        nextWeather: this.world.weather
      });
    } else {
      this.ui.showToast(`🌅 Ngày ${this.world.day}! +2 🪨 Đá Cường Hóa, +1 🎟️ Vé Quay • Sốt giá: ${hotCropName}!`);
    }

    this.ui.updateHUD();
    this.saveGame();
  }

  consumeEnergy(amount) {
    if (this.feverTimer > 0) return true;
    const hydroSave = Math.max(0.35, 1.0 - (this.mastery.hydro_vitality || 0) * 0.12 - this.getTotalGemBonus('sapphire') * 0.25);
    const chapSave = this.storyChapter >= 4 ? 0.75 : 1.0;
    const finalCost = amount * hydroSave * chapSave;
    if (this.energy < finalCost) {
      this.ui.showToast('😴 Hết năng lượng! Hãy bấm "🌙 Ngủ" ở thanh dưới để sang ngày mới nhé!');
      return false;
    }
    this.energy -= finalCost;
    return true;
  }

  addXP(amount) {
    this.xp += amount;
    if (this.xp >= this.xpToNext) {
      this.xp -= this.xpToNext;
      this.level += 1;
      this.xpToNext = Math.round(this.xpToNext * 1.32);
      this.maxEnergy += 15;
      this.energy = this.maxEnergy;
      this.skillPoints += 1;
      this.wheelTickets += 1;
      this.refineStones += 3;
      this.earnGold(this.level * 50);
      this.checkAndAutoUnlockMaps(false);
      window.SFX.playLevelUp();
      this.ui.showToast(`🎉 LÊN CẤP ${this.level}! +3 🪨 Đá Cường Hóa, +1 ⭐ Kỹ Năng, +1 🎟️ Vé Quay & +${this.level * 50}G!`);
    }
  }

  exportSaveJson() {
    this.saveGame();
    const raw = localStorage.getItem('starlight_valley_save_v11') || '{}';
    const blob = new Blob([raw], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `thung_lung_sao_bang_v11_day_${this.world.day}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.ui.showToast('💾 Đã tải file bản lưu (.json) về máy!');
  }

  importSaveJson(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed) {
          this.applySavePayload(parsed, 'file');
          this.saveGame();
          this.ui.updateHUD();
          this.ui.renderModalContent();
          this.ui.showToast('🔄 Đã đồng bộ & nhập thành công dữ liệu Save vào v11.0!');
        }
      } catch (err) {
        this.ui.showToast('⚠ File Save không hợp lệ!');
      }
    };
    reader.readAsText(file);
  }

  resetGameData() {
    ['v11', 'v10', 'v9', 'v8', 'v7', 'v6', 'v5', 'v4'].forEach(v => {
      localStorage.removeItem(`starlight_valley_save_${v}`);
    });
    window.location.reload();
  }

  saveGame() {
    try {
      const data = {
        saveVersion: 11,
        gold: this.gold,
        totalWealthEarned: this.totalWealthEarned,
        starShards: this.starShards,
        refineStones: this.refineStones,
        ascensionCount: this.ascensionCount,
        starlightTowerFloor: this.starlightTowerFloor,
        astralBossLevel: this.astralBossLevel,
        astralBossHp: this.astralBossHp,
        astralBossMaxHp: this.astralBossMaxHp,
        unlockedMaps: this.unlockedMaps,
        currentMap: this.world.currentMap,
        toolEnhance: this.toolEnhance,
        gemInventory: this.gemInventory,
        energy: this.energy,
        maxEnergy: this.maxEnergy,
        level: this.level,
        xp: this.xp,
        xpToNext: this.xpToNext,
        skillPoints: this.skillPoints,
        totalMasterySpent: this.totalMasterySpent,
        mastery: this.mastery,
        cropHarvestCounts: this.cropHarvestCounts,
        cropGeneLevels: this.cropGeneLevels,
        passiveBuildings: this.passiveBuildings,
        empirePoints: this.empirePoints,
        claimedMilestones: this.claimedMilestones,
        wheelTickets: this.wheelTickets,
        hotCropId: this.hotCropId,
        storyChapter: this.storyChapter,
        treeLevel: this.treeLevel,
        completedBundles: this.completedBundles,
        seeds: this.seeds,
        devices: this.devices,
        upgrades: this.upgrades,
        inventory: this.inventory,
        discovered: this.discovered,
        stats: this.stats,
        day: this.world.day,
        seasonIndex: this.world.seasonIndex,
        mapGrids: this.world.mapGrids,
        tiles: this.world.mapGrids.valley,
        animalTypes: this.animals.map(a => a.typeId)
      };
      localStorage.setItem('starlight_valley_save_v11', JSON.stringify(data));
    } catch (e) {}
  }

  // BỘ ĐỒNG BỘ TƯƠNG THÍCH NGƯỢC 100% VỚI MỌI PHIÊN BẢN CŨ (v4 -> v10 -> v11)
  applySavePayload(data, sourceVersion = 'v11') {
    if (!data) return false;
    this.gold = data.gold ?? this.gold;
    this.totalWealthEarned = data.totalWealthEarned ?? Math.max(this.gold, 340);
    this.starShards = data.starShards ?? this.starShards;
    this.refineStones = data.refineStones ?? this.refineStones;
    this.ascensionCount = data.ascensionCount ?? 0;
    this.starlightTowerFloor = data.starlightTowerFloor ?? 1;
    this.astralBossLevel = data.astralBossLevel ?? 1;
    this.astralBossMaxHp = data.astralBossMaxHp ?? 500;
    this.astralBossHp = data.astralBossHp ?? this.astralBossMaxHp;

    if (data.unlockedMaps) {
      this.unlockedMaps = { ...this.unlockedMaps, ...data.unlockedMaps };
    }
    if (data.toolEnhance) {
      Object.keys(this.toolEnhance).forEach(tKey => {
        if (data.toolEnhance[tKey]) {
          this.toolEnhance[tKey] = {
            plus: data.toolEnhance[tKey].plus ?? 0,
            pity: data.toolEnhance[tKey].pity ?? 0,
            awaken: data.toolEnhance[tKey].awaken ?? 0,
            sockets: Array.isArray(data.toolEnhance[tKey].sockets)
              ? data.toolEnhance[tKey].sockets
              : [null, null, null],
            affix: data.toolEnhance[tKey].affix ?? this.toolEnhance[tKey].affix
          };
        }
      });
    }
    if (data.gemInventory) {
      this.gemInventory = { ...this.gemInventory, ...data.gemInventory };
    }

    this.energy = data.energy ?? this.energy;
    this.maxEnergy = data.maxEnergy ?? this.maxEnergy;
    this.level = data.level ?? this.level;
    this.xp = data.xp ?? this.xp;
    this.xpToNext = data.xpToNext ?? this.xpToNext;
    this.skillPoints = data.skillPoints ?? this.skillPoints;
    this.totalMasterySpent = data.totalMasterySpent ?? 0;
    this.mastery = { ...this.mastery, ...(data.mastery || {}) };
    this.cropHarvestCounts = { ...this.cropHarvestCounts, ...(data.cropHarvestCounts || {}) };
    this.cropGeneLevels = { ...this.cropGeneLevels, ...(data.cropGeneLevels || {}) };
    this.passiveBuildings = { ...this.passiveBuildings, ...(data.passiveBuildings || {}) };
    this.empirePoints = data.empirePoints ?? this.empirePoints;
    this.claimedMilestones = data.claimedMilestones || [];
    this.wheelTickets = data.wheelTickets ?? this.wheelTickets;
    this.hotCropId = window.GAME_CONFIG.CROPS[data.hotCropId] ? data.hotCropId : 'radish';
    this.storyChapter = data.storyChapter ?? 1;
    this.treeLevel = data.treeLevel ?? 1;
    this.completedBundles = data.completedBundles || [];
    this.seeds = { ...this.seeds, ...(data.seeds || {}) };
    this.devices = { ...this.devices, ...(data.devices || {}) };
    this.upgrades = data.upgrades || {};
    this.inventory = data.inventory || {};
    this.discovered = { ...this.discovered, ...(data.discovered || {}) };
    this.stats = { ...this.stats, ...(data.stats || {}) };
    this.world.day = data.day || 1;
    this.world.seasonIndex = data.seasonIndex || 0;

    if (data.mapGrids && data.mapGrids.valley && data.mapGrids.valley.length === this.world.maxRows) {
      this.world.mapGrids.valley = data.mapGrids.valley;
      if (data.mapGrids.crystal_cavern && data.mapGrids.crystal_cavern.length === this.world.maxRows) {
        this.world.mapGrids.crystal_cavern = data.mapGrids.crystal_cavern;
      }
      if (data.mapGrids.sky_island && data.mapGrids.sky_island.length === this.world.maxRows) {
        this.world.mapGrids.sky_island = data.mapGrids.sky_island;
      }
      if (data.mapGrids.dragon_sanctum && data.mapGrids.dragon_sanctum.length === this.world.maxRows) {
        this.world.mapGrids.dragon_sanctum = data.mapGrids.dragon_sanctum;
      }
      if (data.mapGrids.astral_nexus && data.mapGrids.astral_nexus.length === this.world.maxRows) {
        this.world.mapGrids.astral_nexus = data.mapGrids.astral_nexus;
      }
    } else if (data.tiles && data.tiles.length === this.world.maxRows) {
      this.world.mapGrids.valley = data.tiles;
    }

    const vGrid = this.world.mapGrids.valley;
    if (vGrid && vGrid[2]) {
      if (vGrid[2][6]) vGrid[2][6].type = 'artisan_workshop';
      if (vGrid[2][9]) {
        vGrid[2][9].type = 'realm_portal';
        vGrid[2][9].obstacle = null;
      }
    }

    const targetMap = (data.currentMap && this.world.mapGrids[data.currentMap]) ? data.currentMap : 'valley';
    this.world.switchMap(targetMap);

    if (this.upgrades.cat_skill) this.cat.upgraded = true;
    if (Array.isArray(data.animalTypes) && data.animalTypes.length > 0) {
      this.animals = data.animalTypes.map(t => new window.FarmAnimal(t, 320 + Math.random() * 130, 195 + Math.random() * 110));
    }

    if (sourceVersion !== 'v11') {
      if ((this.seeds.void_mushroom || 0) === 0 && (this.cropHarvestCounts.void_mushroom || 0) === 0) {
        this.seeds.void_mushroom = 2;
      }
      if ((this.seeds.chrono_rose || 0) === 0 && (this.cropHarvestCounts.chrono_rose || 0) === 0) {
        this.seeds.chrono_rose = 1;
      }
      if ((this.seeds.phoenix_blossom || 0) === 0 && (this.cropHarvestCounts.phoenix_blossom || 0) === 0) {
        this.seeds.phoenix_blossom = 1;
      }
      this.saveGame();
    }
    return true;
  }

  loadGame() {
    try {
      const keys = [
        { k: 'starlight_valley_save_v11', ver: 'v11' },
        { k: 'starlight_valley_save_v10', ver: 'v10' },
        { k: 'starlight_valley_save_v9', ver: 'v9' },
        { k: 'starlight_valley_save_v8', ver: 'v8' },
        { k: 'starlight_valley_save_v7', ver: 'v7' },
        { k: 'starlight_valley_save_v6', ver: 'v6' },
        { k: 'starlight_valley_save_v5', ver: 'v5' },
        { k: 'starlight_valley_save_v4', ver: 'v4' }
      ];
      for (const item of keys) {
        const raw = localStorage.getItem(item.k);
        if (raw) {
          const data = JSON.parse(raw);
          if (data) {
            this.applySavePayload(data, item.ver);
            return true;
          }
        }
      }
    } catch (e) {}
    return false;
  }

  loop(now) {
    const dt = Math.min(0.05, (now - this.lastTime) / 1000);
    this.lastTime = now;
    const timeSec = now / 1000;

    const gps = this.getPassiveGoldPerSec();
    if (gps > 0) {
      this.passiveIncomeTimer += dt;
      this.passiveFloatTimer += dt;
      if (this.passiveIncomeTimer >= 1.0) {
        const secTicks = Math.floor(this.passiveIncomeTimer);
        this.passiveIncomeTimer -= secTicks;
        this.earnGold(gps * secTicks);
        const goldEl = document.getElementById('hud-gold');
        if (goldEl) goldEl.textContent = Math.floor(this.gold).toLocaleString('vi-VN');
      }
      if (this.passiveFloatTimer >= 4.0) {
        this.passiveFloatTimer = 0;
        const wx = 6.5 * this.world.tileSize;
        const wy = 2.2 * this.world.tileSize;
        this.world.spawnParticles(wx, wy, '#76ff03', 6);
        this.world.spawnFloatingText(wx, wy - 6, `🏭 +${gps * 4}G`, '#76ff03');
      }
    }

    if (this.comboTimer > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) {
        this.comboCount = 0;
      }
    }
    if (this.feverTimer > 0) {
      this.feverTimer -= dt;
      if (this.feverTimer <= 0) {
        this.feverTimer = 0;
        this.ui.updateHUD();
      }
    }

    this.chestSpawnTimer += dt;
    if (this.chestSpawnTimer >= 42) {
      this.chestSpawnTimer = 0;
      this.world.spawnSurpriseChest();
    }

    this.world.update(dt, this);
    this.player.update(dt, this.keys, this.canvas.width, this.canvas.height);
    this.cat.update(dt, this.player, this);
    for (const f of this.fairies) {
      f.update(dt, this, this.mastery.fairy_drone || 1);
    }
    if (this.world.currentMap === 'valley') {
      for (const anim of this.animals) {
        anim.update(dt);
      }
    }

    if (this.cameraZoom > 1.0) {
      const halfW = (this.canvas.width / 2) / this.cameraZoom;
      const halfH = (this.canvas.height / 2) / this.cameraZoom;
      const targetCamX = Math.max(halfW, Math.min(this.canvas.width - halfW, this.player.x));
      const targetCamY = Math.max(halfH, Math.min(this.canvas.height - halfH, this.player.y));
      this.camX += (targetCamX - this.camX) * Math.min(1, dt * 8);
      this.camY += (targetCamY - this.camY) * Math.min(1, dt * 8);
    } else {
      this.camX = this.canvas.width / 2;
      this.camY = this.canvas.height / 2;
    }

    if (this.fishingState && this.fishingState.active) {
      this.fishingState.cursor += this.fishingState.dir * this.fishingState.speed * dt;
      if (this.fishingState.cursor >= 96) {
        this.fishingState.cursor = 96;
        this.fishingState.dir = -1;
      } else if (this.fishingState.cursor <= 0) {
        this.fishingState.cursor = 0;
        this.fishingState.dir = 1;
      }
      document.getElementById('fish-cursor').style.left = `${this.fishingState.cursor}%`;
    }

    if (Math.floor(timeSec * 2) !== this.lastHudTick) {
      this.lastHudTick = Math.floor(timeSec * 2);
      document.getElementById('hud-clock').textContent = this.world.getFormattedClock();
      if (this.feverTimer > 0) {
        this.ui.updateStepGuidePill();
      }
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    if (this.cameraZoom > 1.0) {
      this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
      this.ctx.scale(this.cameraZoom, this.cameraZoom);
      this.ctx.translate(-this.camX, -this.camY);
    }

    this.world.render(this.ctx, timeSec, this.hoverTile, this.treeLevel, this);

    if (this.world.currentMap === 'valley') {
      for (const anim of this.animals) {
        anim.render(this.ctx, timeSec);
      }
    }
    this.cat.render(this.ctx, timeSec);
    this.player.render(this.ctx, timeSec, this);
    for (const f of this.fairies) {
      f.render(this.ctx, timeSec);
    }

    this.world.renderWeatherAndLighting(this.ctx, this.canvas.width, this.canvas.height, timeSec, this);
    this.ctx.restore();

    requestAnimationFrame(t => this.loop(t));
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.GAME = new StarlightFarmGame();
});
