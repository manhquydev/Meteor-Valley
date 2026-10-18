/**
 * ============================================================================
 * THUNG LŨNG SAO BĂNG (STARLIGHT VALLEY v11.0 - 5 REALMS, ASTRAL BOSS & 14 PIXEL CROPS)
 * js/world.js - Hệ thống 5 Không Gian Bản Đồ (Thung Lũng, Động Pha Lê, Thiên Không,
 *               Thánh Địa Thần Long, Vương Quốc Tinh Tú), Boss Kỳ Lân Tinh Vân,
 *               Mỏ Thiên Thạch Thái Cổ & Tự Động Lai Tạo 5 Giống Cây Trên Đồng
 * ============================================================================
 */

class FarmWorld {
  constructor() {
    this.tileSize = window.GAME_CONFIG.TILE_SIZE;
    this.maxCols = 16;
    this.maxRows = 14;

    this.isPortrait = window.innerHeight > window.innerWidth;
    this.cols = this.isPortrait ? 11 : 16;
    this.rows = this.isPortrait ? 14 : 11;

    this.day = 1;
    this.seasonIndex = 0;
    this.timeOfDay = 0.28;
    this.weather = 'sunny';

    this.currentMap = 'valley';
    this.mapGrids = {
      valley: [],
      crystal_cavern: [],
      sky_island: [],
      dragon_sanctum: [],
      astral_nexus: []
    };
    this.tiles = [];

    this.particles = [];
    this.floatingTexts = [];
    this.shootingStars = [];
    this.fireflies = [];
    this.oreRespawnTimer = 0;

    this.initAllMaps();
    this.initFireflies();
  }

  updateOrientationMode(isPortrait) {
    this.isPortrait = isPortrait;
    this.cols = isPortrait ? 11 : 16;
    this.rows = isPortrait ? 14 : 11;
  }

  getCurrentSeason() {
    return window.GAME_CONFIG.SEASONS[this.seasonIndex % window.GAME_CONFIG.SEASONS.length];
  }

  getCurrentMapConfig() {
    return window.GAME_CONFIG.MAPS[this.currentMap] || window.GAME_CONFIG.MAPS.valley;
  }

  initAllMaps() {
    this.mapGrids.valley = this.buildValleyGrid();
    this.mapGrids.crystal_cavern = this.buildCrystalCavernGrid();
    this.mapGrids.sky_island = this.buildSkyIslandGrid();
    this.mapGrids.dragon_sanctum = this.buildDragonSanctumGrid();
    this.mapGrids.astral_nexus = this.buildAstralNexusGrid();
    this.tiles = this.mapGrids[this.currentMap];
  }

  buildValleyGrid() {
    const grid = [];
    for (let r = 0; r < this.maxRows; r++) {
      const row = [];
      for (let c = 0; c < this.maxCols; c++) {
        let type = 'grass';
        let obstacle = null;

        if (r >= 1 && r <= 2 && c >= 1 && c <= 3) {
          type = 'house_zone';
        } else if (r === 2 && c === 4) {
          type = 'shipping_bin';
        } else if (r === 2 && c === 5) {
          type = 'kitchen_oven';
        } else if (r === 2 && c === 6) {
          type = 'artisan_workshop';
        } else if (r >= 1 && r <= 2 && c >= 7 && c <= 8) {
          type = 'sacred_tree';
        } else if (r === 2 && c === 9) {
          type = 'realm_portal';
        } else if ((r === 3 && c >= 1 && c <= 9) || (c === 5 && r >= 3 && r <= 4)) {
          type = 'path';
        } else if (r >= 8 && r <= 10 && c >= 6 && c <= 9) {
          type = (r === 9 && c === 6) ? 'bridge' : 'water';
        } else if (r >= 4 && r <= 6 && c >= 1 && c <= 3) {
          type = 'soil';
        } else if (r >= 11 && r <= 12 && c >= 1 && c <= 4) {
          type = 'soil';
        } else if (((c >= 4 && c <= 9 && r >= 5 && r <= 7) || (r >= 11 && c >= 6)) && Math.random() < 0.16) {
          const rand = Math.random();
          obstacle = rand < 0.5 ? 'weed' : (rand < 0.8 ? 'rock' : 'stump');
        }

        row.push({
          r,
          c,
          type,
          flowerVariant: (r * 7 + c * 13) % 5 === 0,
          watered: false,
          crop: null,
          device: null,
          obstacle
        });
      }
      grid.push(row);
    }

    grid[4][1].watered = true;
    grid[4][1].crop = { id: 'radish', stage: 4, progress: 1, isMutated: false, isGiant: false };
    grid[4][2].watered = true;
    grid[4][2].crop = { id: 'radish', stage: 4, progress: 1, isMutated: false, isGiant: false };
    grid[4][3].watered = true;
    grid[4][3].crop = { id: 'strawberry', stage: 3, progress: 0.85, isMutated: false, isGiant: false };
    grid[5][4].obstacle = 'chest';
    return grid;
  }

  buildCrystalCavernGrid() {
    const grid = [];
    for (let r = 0; r < this.maxRows; r++) {
      const row = [];
      for (let c = 0; c < this.maxCols; c++) {
        let type = 'grass';
        let obstacle = null;
        let watered = false;

        if (r === 2 && c === 2) {
          type = 'realm_portal';
        } else if (r === 2 && c === 4) {
          type = 'shipping_bin';
        } else if (r >= 1 && r <= 2 && c >= 6 && c <= 7) {
          type = 'cavern_anvil';
        } else if (r === 3 && c >= 2 && c <= 8) {
          type = 'path';
        } else if (r >= 8 && r <= 10 && c >= 7 && c <= 9) {
          type = (r === 9 && c === 7) ? 'bridge' : 'water';
        } else if (r >= 4 && r <= 6 && c >= 1 && c <= 4) {
          type = 'soil';
          watered = true;
        } else if (r >= 4 && r <= 7 && c >= 5 && c <= 9) {
          const rand = Math.random();
          if (rand < 0.28) obstacle = 'ore_stone';
          else if (rand < 0.48) obstacle = 'ore_gem';
          else if (rand < 0.62) obstacle = 'ore_gold';
        }

        row.push({
          r,
          c,
          type,
          flowerVariant: (r * 5 + c * 11) % 4 === 0,
          watered,
          crop: null,
          device: null,
          obstacle
        });
      }
      grid.push(row);
    }

    grid[4][1].crop = { id: 'void_mushroom', stage: 4, progress: 1, isMutated: false, isGiant: false };
    grid[4][2].crop = { id: 'mystic_lotus', stage: 3, progress: 0.85, isMutated: false, isGiant: false };
    grid[4][6].obstacle = 'ore_stone';
    grid[4][7].obstacle = 'ore_gem';
    grid[5][6].obstacle = 'ore_gold';
    grid[5][8].obstacle = 'chest';
    return grid;
  }

  buildSkyIslandGrid() {
    const grid = [];
    for (let r = 0; r < this.maxRows; r++) {
      const row = [];
      for (let c = 0; c < this.maxCols; c++) {
        let type = 'grass';
        let obstacle = null;
        let watered = false;

        if (r === 2 && c === 2) {
          type = 'realm_portal';
        } else if (r === 2 && c === 4) {
          type = 'shipping_bin';
        } else if (r === 2 && c === 5) {
          type = 'artisan_workshop';
        } else if (r >= 1 && r <= 2 && c >= 7 && c <= 8) {
          type = 'ascension_altar';
        } else if (r === 3 && c >= 2 && c <= 8) {
          type = 'path';
        } else if (r >= 8 && r <= 10 && c >= 6 && c <= 9) {
          type = (r === 9 && c === 6) ? 'bridge' : 'water';
        } else if (r >= 4 && r <= 7 && c >= 1 && c <= 5) {
          type = 'soil';
          watered = true;
        } else if (r >= 5 && r <= 7 && c >= 7 && c <= 9 && Math.random() < 0.35) {
          obstacle = Math.random() < 0.5 ? 'ore_gem' : 'ore_gold';
        }

        row.push({
          r,
          c,
          type,
          flowerVariant: (r * 3 + c * 7) % 3 === 0,
          watered,
          crop: null,
          device: null,
          obstacle
        });
      }
      grid.push(row);
    }

    grid[4][1].crop = { id: 'golden_apple', stage: 4, progress: 1, isMutated: true, isGiant: false };
    grid[4][2].crop = { id: 'dragon_fruit', stage: 3, progress: 0.85, isMutated: false, isGiant: false };
    grid[5][7].obstacle = 'chest';
    return grid;
  }

  buildDragonSanctumGrid() {
    const grid = [];
    for (let r = 0; r < this.maxRows; r++) {
      const row = [];
      for (let c = 0; c < this.maxCols; c++) {
        let type = 'grass';
        let obstacle = null;
        let watered = false;

        if (r === 2 && c === 2) {
          type = 'realm_portal';
        } else if (r === 2 && c === 4) {
          type = 'shipping_bin';
        } else if (r === 2 && c === 5) {
          type = 'cavern_anvil';
        } else if (r >= 1 && r <= 2 && c >= 7 && c <= 8) {
          type = 'dragon_shrine';
        } else if (r === 3 && c >= 2 && c <= 8) {
          type = 'path';
        } else if (r >= 8 && r <= 10 && c >= 6 && c <= 9) {
          type = (r === 9 && c === 6) ? 'bridge' : 'water';
        } else if (r >= 4 && r <= 7 && c >= 1 && c <= 5) {
          type = 'soil';
          watered = true;
        } else if (r >= 4 && r <= 7 && c >= 6 && c <= 9) {
          const rand = Math.random();
          if (rand < 0.35) obstacle = 'ore_dragon';
          else if (rand < 0.55) obstacle = 'ore_gem';
          else if (rand < 0.70) obstacle = 'ore_gold';
        }

        row.push({
          r,
          c,
          type,
          flowerVariant: (r * 5 + c * 9) % 3 === 0,
          watered,
          crop: null,
          device: null,
          obstacle
        });
      }
      grid.push(row);
    }

    grid[4][1].crop = { id: 'chrono_rose', stage: 4, progress: 1, isMutated: true, isGiant: false };
    grid[4][2].crop = { id: 'cosmic_worldfruit', stage: 4, progress: 1, isMutated: true, isGiant: false };
    grid[4][3].crop = { id: 'dragon_fruit', stage: 3, progress: 0.85, isMutated: false, isGiant: false };
    grid[4][6].obstacle = 'ore_dragon';
    grid[4][7].obstacle = 'ore_dragon';
    grid[5][6].obstacle = 'ore_gem';
    grid[5][8].obstacle = 'chest';
    return grid;
  }

  // MAP 5: VƯƠNG QUỐC TINH TÚ VÔ CỰC (ĐẤT VŨ TRỤ x3.8, MỎ THIÊN THẠCH & BOSS KỲ LÂN TINH VÂN)
  buildAstralNexusGrid() {
    const grid = [];
    for (let r = 0; r < this.maxRows; r++) {
      const row = [];
      for (let c = 0; c < this.maxCols; c++) {
        let type = 'grass';
        let obstacle = null;
        let watered = false;

        if (r === 2 && c === 2) {
          type = 'realm_portal';
        } else if (r === 2 && c === 4) {
          type = 'shipping_bin';
        } else if (r === 2 && c === 5) {
          type = 'artisan_workshop';
        } else if (r >= 1 && r <= 2 && c >= 7 && c <= 8) {
          type = 'astral_boss';
        } else if (r === 3 && c >= 2 && c <= 8) {
          type = 'path';
        } else if (r >= 8 && r <= 10 && c >= 6 && c <= 9) {
          type = (r === 9 && c === 6) ? 'bridge' : 'water';
        } else if (r >= 4 && r <= 7 && c >= 1 && c <= 5) {
          type = 'soil';
          watered = true;
        } else if (r >= 4 && r <= 7 && c >= 6 && c <= 9) {
          const rand = Math.random();
          if (rand < 0.42) obstacle = 'ore_astral';
          else if (rand < 0.65) obstacle = 'ore_dragon';
          else if (rand < 0.80) obstacle = 'ore_gold';
        }

        row.push({
          r,
          c,
          type,
          flowerVariant: (r * 7 + c * 5) % 3 === 0,
          watered,
          crop: null,
          device: null,
          obstacle
        });
      }
      grid.push(row);
    }

    // Đặt sẵn Hoa Phượng Hoàng Lửa 🔥 & Trái Sáng Thế Yggdrasil 👑 trên Vương Quốc Tinh Tú!
    grid[4][1].crop = { id: 'phoenix_blossom', stage: 4, progress: 1, isMutated: true, isGiant: false };
    grid[4][2].crop = { id: 'yggdrasil_fruit', stage: 4, progress: 1, isMutated: true, isGiant: false };
    grid[4][3].crop = { id: 'cosmic_worldfruit', stage: 4, progress: 1, isMutated: true, isGiant: false };
    grid[4][6].obstacle = 'ore_astral';
    grid[4][7].obstacle = 'ore_astral';
    grid[5][6].obstacle = 'ore_dragon';
    grid[5][8].obstacle = 'chest';
    return grid;
  }

  switchMap(mapId) {
    if (!this.mapGrids[mapId]) return false;
    this.currentMap = mapId;
    this.tiles = this.mapGrids[mapId];
    return true;
  }

  respawnCavernOres(count = 5) {
    let totalSpawned = 0;
    ['crystal_cavern', 'dragon_sanctum', 'astral_nexus'].forEach(mId => {
      const grid = this.mapGrids[mId];
      if (!grid) return;
      const candidates = [];
      for (let r = 4; r <= 7; r++) {
        for (let c = 5; c <= 9; c++) {
          const t = grid[r] && grid[r][c];
          if (t && t.type === 'grass' && !t.obstacle && !t.crop && !t.device) {
            candidates.push(t);
          }
        }
      }
      let spawned = 0;
      while (spawned < count && candidates.length > 0) {
        const idx = Math.floor(Math.random() * candidates.length);
        const t = candidates.splice(idx, 1)[0];
        const roll = Math.random();
        if (mId === 'astral_nexus') {
          t.obstacle = roll < 0.55 ? 'ore_astral' : (roll < 0.85 ? 'ore_dragon' : 'ore_gold');
        } else if (mId === 'dragon_sanctum') {
          t.obstacle = roll < 0.50 ? 'ore_dragon' : (roll < 0.80 ? 'ore_gem' : 'ore_gold');
        } else {
          t.obstacle = roll < 0.45 ? 'ore_stone' : (roll < 0.80 ? 'ore_gem' : 'ore_gold');
        }
        spawned++;
        totalSpawned++;
        if (this.currentMap === mId) {
          this.spawnParticles((t.c + 0.5) * this.tileSize, (t.r + 0.5) * this.tileSize, '#00e5ff', 10);
        }
      }
    });
    return totalSpawned;
  }

  initFireflies() {
    this.fireflies = [];
    for (let i = 0; i < 22; i++) {
      this.fireflies.push({
        x: Math.random() * this.cols * this.tileSize,
        y: Math.random() * this.rows * this.tileSize,
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.5) * 18,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  getTile(r, c) {
    if (r < 0 || r >= this.rows || c < 0 || c >= this.cols) return null;
    return this.tiles[r][c];
  }

  isNight() {
    return this.timeOfDay >= 0.76 || this.timeOfDay < 0.22;
  }

  getFormattedClock() {
    const totalMinutes = Math.floor(this.timeOfDay * 24 * 60);
    const h = Math.floor(totalMinutes / 60) % 24;
    const m = Math.floor((totalMinutes % 60) / 10) * 10;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  spawnParticles(x, y, color = '#ffd700', count = 10) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 25 + Math.random() * 65;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 30,
        size: 3 + Math.floor(Math.random() * 4),
        color,
        life: 0.55 + Math.random() * 0.35
      });
    }
  }

  spawnFloatingText(x, y, text, color = '#fff8e7') {
    this.floatingTexts.push({ x, y, text, color, life: 1.3 });
  }

  spawnSurpriseChest() {
    const emptyGrass = [];
    for (let r = 4; r < this.rows - 1; r++) {
      for (let c = 1; c < this.cols - 1; c++) {
        const t = this.tiles[r][c];
        if (t.type === 'grass' && !t.obstacle && !t.device) {
          emptyGrass.push(t);
        }
      }
    }
    if (emptyGrass.length > 0) {
      const chosen = emptyGrass[Math.floor(Math.random() * emptyGrass.length)];
      chosen.obstacle = 'chest';
      const px = (chosen.c + 0.5) * this.tileSize;
      const py = (chosen.r + 0.5) * this.tileSize;
      this.spawnParticles(px, py, '#ffd700', 16);
      this.spawnFloatingText(px, py - 10, '🎁 RƯƠNG BÁU XUẤT HIỆN!', '#ffd700');
    }
  }

  triggerMeteorImpact() {
    const plantedTiles = [];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const t = this.tiles[r][c];
        if (t.crop && !t.crop.isMutated) plantedTiles.push(t);
      }
    }
    const targetTile = plantedTiles.length > 0
      ? plantedTiles[Math.floor(Math.random() * plantedTiles.length)]
      : this.getTile(5, 2);

    const tx = (targetTile.c + 0.5) * this.tileSize;
    const ty = (targetTile.r + 0.5) * this.tileSize;

    this.shootingStars.push({
      x: tx - 200,
      y: ty - 200,
      tx,
      ty,
      progress: 0,
      targetTile
    });
  }

  checkGiantCropsOnGrid(grid, isActiveMap = true, game = null) {
    for (let r = 0; r < this.rows - 1; r++) {
      for (let c = 0; c < this.cols - 1; c++) {
        const t00 = grid[r][c];
        const t01 = grid[r][c + 1];
        const t10 = grid[r + 1][c];
        const t11 = grid[r + 1][c + 1];
        if (
          t00.crop && t01.crop && t10.crop && t11.crop &&
          t00.crop.stage === 4 &&
          t00.crop.id === t01.crop.id &&
          t00.crop.id === t10.crop.id &&
          t00.crop.id === t11.crop.id &&
          !t00.crop.isGiant
        ) {
          t00.crop.isGiant = true;
          if (isActiveMap) {
            const px = (c + 0.5) * this.tileSize;
            const py = (r + 0.5) * this.tileSize;
            this.spawnParticles(px, py, '#ffd700', 18);
            this.spawnFloatingText(px, py - 10, '✨ ĐỘT BIẾN KHỔNG LỒ (x3)!', '#ffd700');
            window.SFX.playStar();
          }
        }

        // KIỂM TRA TỰ ĐỘNG LAI TẠO GIỐNG CÂY TRÊN ĐỒNG (FIELD HYBRIDIZATION)
        if (game && t00.crop && t01.crop && t00.crop.stage === 4 && t01.crop.stage === 4 && !t00.crop.hybridChecked) {
          t00.crop.hybridChecked = true;
          const pair = [t00.crop.id, t01.crop.id];
          let hybridSeedId = null;
          if (pair.includes('cosmic_worldfruit') && pair.includes('mystic_lotus')) {
            hybridSeedId = 'yggdrasil_fruit';
          } else if (pair.includes('golden_apple') && pair.includes('chrono_rose')) {
            hybridSeedId = 'phoenix_blossom';
          } else if (pair.includes('mystic_lotus') && pair.includes('starfruit')) {
            hybridSeedId = 'chrono_rose';
          } else if (pair.includes('golden_apple') && pair.includes('dragon_fruit')) {
            hybridSeedId = 'cosmic_worldfruit';
          } else if (pair.includes('radish') && pair.includes('eggplant')) {
            hybridSeedId = 'void_mushroom';
          }
          if (hybridSeedId && Math.random() < 0.45) {
            game.seeds[hybridSeedId] = (game.seeds[hybridSeedId] || 0) + 1;
            const hCfg = window.GAME_CONFIG.CROPS[hybridSeedId];
            if (isActiveMap && hCfg) {
              const px = (c + 0.5) * this.tileSize;
              const py = (r + 0.5) * this.tileSize;
              this.spawnParticles(px, py, '#00e5ff', 20);
              this.spawnFloatingText(px, py - 18, `🧬 ĐỘT BIẾN LAI TẠO: +1 Hạt ${hCfg.emoji}${hCfg.name}!`, '#00e5ff');
            }
          }
        }
      }
    }
  }

  checkGiantCrops() {
    this.checkGiantCropsOnGrid(this.tiles, true, window.GAME);
  }

  update(dt, game) {
    this.timeOfDay += dt / window.GAME_CONFIG.DAY_DURATION_SEC;
    if (this.timeOfDay >= 1.0) {
      game.advanceToNextDay(true);
    }

    this.oreRespawnTimer += dt;
    if (this.oreRespawnTimer >= 16.0) {
      this.oreRespawnTimer = 0;
      this.respawnCavernOres(2);
    }

    if (this.weather === 'rainy') {
      for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.cols; c++) {
          const t = this.tiles[r][c];
          if (t.type === 'soil' && !t.watered && Math.random() < dt * 0.8) {
            t.watered = true;
          }
        }
      }
    }

    if ((this.weather === 'meteor' || this.currentMap !== 'valley') && this.isNight() && Math.random() < dt * 0.25) {
      this.triggerMeteorImpact();
    }

    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const s = this.shootingStars[i];
      s.progress += dt * 1.6;
      if (s.progress >= 1) {
        if (s.targetTile && s.targetTile.crop) {
          s.targetTile.crop.isMutated = true;
          s.targetTile.crop.stage = 4;
          s.targetTile.crop.progress = 1;
          this.spawnFloatingText(s.tx, s.ty - 12, '🌠 ĐỘT BIẾN ÁNH SAO (x4)!', '#e040fb');
          window.SFX.playStar();
        } else {
          game.starShards += 1;
          this.spawnFloatingText(s.tx, s.ty - 12, '+1 🌠 Mảnh Sao Băng!', '#84ffff');
          window.SFX.playStar();
        }
        this.spawnParticles(s.tx, s.ty, '#e040fb', 20);
        this.shootingStars.splice(i, 1);
      }
    }

    this.updateCropsAndDevicesAllMaps(dt, game);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 120 * dt;
      p.life -= dt;
      if (p.life <= 0) this.particles.splice(i, 1);
    }

    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y -= 24 * dt;
      ft.life -= dt;
      if (ft.life <= 0) this.floatingTexts.splice(i, 1);
    }

    for (const f of this.fireflies) {
      f.x += f.vx * dt;
      f.y += f.vy * dt;
      f.phase += dt * 4;
      if (f.x < 0 || f.x > this.cols * this.tileSize) f.vx *= -1;
      if (f.y < 0 || f.y > this.rows * this.tileSize) f.vy *= -1;
    }
  }

  updateCropsAndDevicesAllMaps(dt, game) {
    this.sprinklerTimer = (this.sprinklerTimer || 0) + dt;
    const triggerSprinklers = this.sprinklerTimer >= 3.5;
    if (triggerSprinklers) this.sprinklerTimer = 0;

    const season = this.getCurrentSeason();
    const hydroBonus = game ? (game.mastery.hydro_vitality || 0) * 0.22 : 0;
    const waterSt = game ? game.getToolEnhanceState('water') : { plus: 0, awaken: 0 };
    const waterPlusBonus = waterSt.plus * 0.15 * (1 + (waterSt.awaken || 0) * 0.35);
    const sapphireBonus = game ? game.getTotalGemBonus('sapphire') : 0;
    const amethystBonus = game ? game.getTotalGemBonus('amethyst') : 0;
    const resonanceSpeed = game ? game.getCurrentSetResonance().bonusSpeedMult : 0;
    const affixSpeed = game ? game.getTotalAffixBonus('speedBonus') : 0;
    const feverMult = (game && game.feverTimer > 0) ? 3.0 : 1.0;

    Object.entries(this.mapGrids).forEach(([mapId, grid]) => {
      if (!grid || grid.length === 0) return;
      const mapCfg = window.GAME_CONFIG.MAPS[mapId] || window.GAME_CONFIG.MAPS.valley;
      const isCurrent = mapId === this.currentMap;

      let hasChronoRose = false;
      for (let rr = 0; rr < this.maxRows; rr++) {
        for (let cc = 0; cc < this.maxCols; cc++) {
          if (grid[rr][cc].crop && grid[rr][cc].crop.id === 'chrono_rose') {
            hasChronoRose = true;
            break;
          }
        }
      }

      for (let r = 0; r < this.maxRows; r++) {
        for (let c = 0; c < this.maxCols; c++) {
          const tile = grid[r][c];

          if (mapCfg.soilKeepWet && tile.type === 'soil' && !tile.watered) {
            tile.watered = true;
          }

          if (tile.device === 'sprinkler' && triggerSprinklers) {
            for (let dr = -1; dr <= 1; dr++) {
              for (let dc = -1; dc <= 1; dc++) {
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < this.maxRows && nc >= 0 && nc < this.maxCols) {
                  const nb = grid[nr][nc];
                  if (nb && nb.type === 'soil' && !nb.watered) {
                    nb.watered = true;
                    if (isCurrent) {
                      this.spawnParticles(
                        (nb.c + 0.5) * this.tileSize,
                        (nb.r + 0.5) * this.tileSize,
                        '#4fc3f7',
                        4
                      );
                    }
                  }
                }
              }
            }
          }

          if (tile.crop && tile.watered && tile.crop.stage < 4) {
            const cfg = window.GAME_CONFIG.CROPS[tile.crop.id];
            if (!cfg) continue;
            const cropMastery = game ? game.getCropMasteryInfo(tile.crop.id) : { speedMult: 1.0 };
            const geneLvl = game ? game.getCropGeneLevel(tile.crop.id) : 1;
            const geneSpeedMult = 1 + (geneLvl - 1) * 0.15;

            let speedMultiplier =
              (1.0 + hydroBonus + waterPlusBonus + sapphireBonus + resonanceSpeed + affixSpeed + (hasChronoRose ? 0.35 : 0)) *
              feverMult *
              cropMastery.speedMult *
              geneSpeedMult *
              (mapCfg.growthMult || 1.0);

            if (season.boostCrops.includes(tile.crop.id)) {
              speedMultiplier += 0.25;
            }

            let hasLanternNearby = false;
            for (let dr = -1; dr <= 1; dr++) {
              for (let dc = -1; dc <= 1; dc++) {
                const nr = r + dr;
                const nc = c + dc;
                if (nr < 0 || nr >= this.maxRows || nc < 0 || nc >= this.maxCols) continue;
                const nb = grid[nr][nc];
                if (nb.crop && nb.crop.id === 'sunflower') speedMultiplier += 0.30;
                if (nb.device === 'lantern') {
                  hasLanternNearby = true;
                  speedMultiplier += 0.20;
                }
              }
            }

            if (cfg.nightBoost && (this.isNight() || mapId === 'crystal_cavern')) {
              speedMultiplier *= cfg.nightBoost;
            }

            tile.crop.progress += (dt * speedMultiplier) / cfg.growTime;
            const newStage = Math.min(4, Math.floor(tile.crop.progress * 4));
            if (newStage > tile.crop.stage) {
              tile.crop.stage = newStage;
              if (newStage === 4) {
                const baseMutChance =
                  ((tile.crop.id === 'starfruit' || tile.crop.id === 'dragon_fruit' || cfg.isHybrid) ? 0.25 : 0.10) *
                    (mapCfg.mutationMult || 1.0) +
                  (hasLanternNearby ? 0.18 : 0) +
                  amethystBonus * 0.5;
                if (Math.random() < baseMutChance) {
                  tile.crop.isMutated = true;
                  if (isCurrent) {
                    const px = (c + 0.5) * this.tileSize;
                    const py = (r + 0.5) * this.tileSize;
                    this.spawnParticles(px, py, '#e040fb', 15);
                    this.spawnFloatingText(px, py - 8, '✨ Cây Nhiễm Bụi Sao!', '#ea80fc');
                  }
                }
                this.checkGiantCropsOnGrid(grid, isCurrent, game);
              }
            }
          }
        }
      }
    });
  }

  render(ctx, time, hoverTile, treeLevel = 1, game = null) {
    const ts = this.tileSize;
    const season = this.getCurrentSeason();
    const passiveGps = game ? game.getPassiveGoldPerSec() : 0;

    let floor0 = window.SPRITES.cache[`grass_${season.id}_0`];
    let floor1 = window.SPRITES.cache[`grass_${season.id}_1`];
    if (this.currentMap === 'crystal_cavern') {
      floor0 = window.SPRITES.cache.cavern_floor_0;
      floor1 = window.SPRITES.cache.cavern_floor_1;
    } else if (this.currentMap === 'sky_island') {
      floor0 = window.SPRITES.cache.sky_floor_0;
      floor1 = window.SPRITES.cache.sky_floor_1;
    } else if (this.currentMap === 'dragon_sanctum') {
      floor0 = window.SPRITES.cache.dragon_floor_0;
      floor1 = window.SPRITES.cache.dragon_floor_1;
    } else if (this.currentMap === 'astral_nexus') {
      floor0 = window.SPRITES.cache.astral_floor_0;
      floor1 = window.SPRITES.cache.astral_floor_1;
    }

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const tile = this.tiles[r][c];
        const px = c * ts;
        const py = r * ts;

        ctx.drawImage(tile.flowerVariant ? floor1 : floor0, px, py, ts, ts);

        if (tile.type === 'water') {
          ctx.fillStyle = this.currentMap === 'astral_nexus'
            ? '#311b92'
            : (this.currentMap === 'dragon_sanctum'
              ? '#b71c1c'
              : (this.currentMap === 'crystal_cavern' ? '#006064' : (this.currentMap === 'sky_island' ? '#1e88e5' : '#2b82c9')));
          ctx.fillRect(px, py, ts, ts);
          const wave = Math.sin(time * 3 + r + c) * 4;
          ctx.fillStyle = this.currentMap === 'astral_nexus'
            ? '#00e5ff'
            : (this.currentMap === 'dragon_sanctum'
              ? '#ffd700'
              : (this.currentMap === 'crystal_cavern' ? '#00e5ff' : '#80d8ff'));
          ctx.fillRect(px + 8 + wave, py + 12, 14, 4);
          ctx.fillRect(px + 20 - wave, py + 30, 12, 4);
        } else if (tile.type === 'bridge') {
          ctx.drawImage(window.SPRITES.cache.wood_bridge, px, py, ts, ts);
        } else if (tile.type === 'path') {
          ctx.drawImage(window.SPRITES.cache.path, px, py, ts, ts);
        } else if (tile.type === 'soil') {
          let soilImg = tile.watered ? window.SPRITES.cache.wet_soil : window.SPRITES.cache.dry_soil;
          if (this.currentMap === 'crystal_cavern') soilImg = window.SPRITES.cache.crystal_soil;
          else if (this.currentMap === 'sky_island') soilImg = window.SPRITES.cache.sky_soil;
          else if (this.currentMap === 'dragon_sanctum') soilImg = window.SPRITES.cache.dragon_soil;
          else if (this.currentMap === 'astral_nexus') soilImg = window.SPRITES.cache.astral_soil;
          ctx.drawImage(soilImg, px, py, ts, ts);
        }

        if (tile.obstacle) {
          const obsImg = window.SPRITES.cache[tile.obstacle];
          if (obsImg) {
            const isSpecial = tile.obstacle === 'chest' || tile.obstacle.startsWith('ore_');
            const bounce = isSpecial ? Math.sin(time * 5 + r + c) * 2.5 : 0;
            if (isSpecial) {
              const glowCol = tile.obstacle === 'ore_astral'
                ? 'rgba(0, 229, 255, 0.42)'
                : (tile.obstacle === 'ore_dragon'
                  ? 'rgba(255, 23, 68, 0.36)'
                  : (tile.obstacle === 'ore_gem'
                    ? 'rgba(224, 64, 251, 0.28)'
                    : (tile.obstacle === 'ore_stone' ? 'rgba(0, 229, 255, 0.28)' : 'rgba(255, 215, 0, 0.28)')));
              ctx.fillStyle = glowCol;
              ctx.beginPath();
              ctx.arc(px + ts / 2, py + ts / 2, ts * 0.42, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.drawImage(obsImg, px + 4, py + 4 + bounce, ts - 8, ts - 8);
          }
        }

        if (tile.device) {
          const devImg = window.SPRITES.cache[tile.device];
          if (devImg) ctx.drawImage(devImg, px + 4, py + 4, ts - 8, ts - 8);
          if (tile.device === 'lantern' && (this.isNight() || this.currentMap !== 'valley')) {
            ctx.fillStyle = 'rgba(255, 238, 88, 0.16)';
            ctx.beginPath();
            ctx.arc(px + ts / 2, py + ts / 2, ts * 1.6, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        if (tile.crop) {
          const cfg = window.GAME_CONFIG.CROPS[tile.crop.id];
          if (cfg) {
            const masteryInfo = game ? game.getCropMasteryInfo(tile.crop.id) : { tier: 0 };
            const geneLvl = game ? game.getCropGeneLevel(tile.crop.id) : 1;
            window.SPRITES.drawCrop(
              ctx,
              cfg,
              tile.crop.stage,
              px,
              py,
              ts,
              tile.crop.isMutated,
              tile.crop.isGiant,
              time,
              tile.crop.progress,
              masteryInfo.tier,
              geneLvl
            );
          }
        }

        if (tile.type === 'shipping_bin') {
          window.SPRITES.drawShippingBin(ctx, px, py, ts);
        } else if (tile.type === 'kitchen_oven') {
          ctx.drawImage(window.SPRITES.cache.path, px, py, ts, ts);
          ctx.fillStyle = '#5d4037';
          ctx.fillRect(px + 6, py + 8, ts - 12, ts - 12);
          ctx.fillStyle = '#ff7043';
          ctx.fillRect(px + 12, py + 20, ts - 24, 14);
          window.SPRITES.drawPixelBadgeLabel(ctx, px + ts / 2, py + 14, 'NHÀ BẾP', 'rgba(74, 44, 24, 0.9)', '#ff8a65', '#fff8e7');
        } else if (tile.type === 'artisan_workshop') {
          ctx.drawImage(window.SPRITES.cache.path, px, py, ts, ts);
          window.SPRITES.drawArtisanWorkshop(ctx, px, py, ts, passiveGps, time);
        } else if (tile.type === 'realm_portal') {
          const portalLabel = this.currentMap === 'valley' ? '🌀 CHUYỂN MAP' : '🌀 CỔNG MAP';
          window.SPRITES.drawRealmPortal(ctx, px, py, ts, time, portalLabel);
        }
      }
    }

    // Vẽ kiến trúc đặc trưng của từng Bản Đồ
    if (this.currentMap === 'valley') {
      const isMansion = !!(game && game.upgrades && game.upgrades.house_tier_2);
      window.SPRITES.drawFarmhouse(ctx, 1 * ts, 0.5 * ts, ts, this.isNight(), isMansion);
      window.SPRITES.drawSacredStarTree(ctx, 7 * ts, 0.6 * ts, ts, treeLevel, time);
      window.SPRITES.drawPixelBadgeLabel(ctx, 8.0 * ts, 7.75 * ts, 'HỒ SAO BĂNG (CÂU CÁ)', 'rgba(16, 42, 67, 0.9)', '#4fc3f7', '#80d8ff');
    } else if (this.currentMap === 'crystal_cavern') {
      const ax = 6 * ts;
      const ay = 1 * ts;
      ctx.save();
      ctx.fillStyle = 'rgba(224, 64, 251, 0.25)';
      ctx.beginPath();
      ctx.arc(ax + ts, ay + ts, ts * 1.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#37474f';
      ctx.fillRect(ax + 12, ay + 24, ts * 2 - 24, 34);
      ctx.fillStyle = '#ffd54f';
      ctx.fillRect(ax + 20, ay + 16, ts * 2 - 40, 12);
      window.SPRITES.drawPixelBadgeLabel(ctx, ax + ts, ay + 12, '🔨 ĐE RÈN CỔ ĐẠI (+20)', 'rgba(49, 27, 146, 0.92)', '#ffd54f', '#ffd54f');
      window.SPRITES.drawPixelBadgeLabel(ctx, 7.3 * ts, 7.35 * ts, '⛏️ BÃI QUẶNG ĐÁ RÈN & NGỌC', 'rgba(18, 8, 36, 0.9)', '#00e5ff', '#80d8ff');
      window.SPRITES.drawPixelBadgeLabel(ctx, 2.5 * ts, 7.35 * ts, '💧 ĐẤT PHA LÊ (TỰ ẨM 100%)', 'rgba(18, 8, 36, 0.9)', '#ce93d8', '#f8bbd0');
      ctx.restore();
    } else if (this.currentMap === 'sky_island') {
      const ascCount = game ? (game.ascensionCount || 0) : 0;
      const towerFl = game ? (game.starlightTowerFloor || 1) : 1;
      window.SPRITES.drawAscensionAltar(ctx, 7 * ts, 1 * ts, ts, ascCount, towerFl, time);
      window.SPRITES.drawPixelBadgeLabel(ctx, 3.0 * ts, 7.65 * ts, '✨ ĐẤT LINH KHÍ (LỚN x2 • ĐỘT BIẾN x3)', 'rgba(26, 35, 126, 0.9)', '#ffd700', '#fff59d');
      window.SPRITES.drawPixelBadgeLabel(ctx, 8.0 * ts, 7.75 * ts, '🐉 HỒ THIÊN TRÌ (CÂU BÁU VẬT)', 'rgba(16, 42, 67, 0.9)', '#ffd700', '#ffff8d');
    } else if (this.currentMap === 'dragon_sanctum') {
      window.SPRITES.drawDragonShrine(ctx, 7 * ts, 1 * ts, ts, time);
      window.SPRITES.drawPixelBadgeLabel(ctx, 3.0 * ts, 7.65 * ts, '🌋 ĐẤT THẦN LONG (LỚN x2.8 • SẢN LƯỢNG x2)', 'rgba(127, 0, 0, 0.92)', '#ffd700', '#fff59d');
      window.SPRITES.drawPixelBadgeLabel(ctx, 8.0 * ts, 7.75 * ts, '🔥 MỎ HỎA NGỌC & HỒ LONG MẠCH', 'rgba(127, 0, 0, 0.92)', '#ff9100', '#ffd700');
    } else if (this.currentMap === 'astral_nexus') {
      const bossLv = game ? (game.astralBossLevel || 1) : 1;
      const bossHp = game ? (game.astralBossHp || 500) : 500;
      const bossMaxHp = game ? (game.astralBossMaxHp || 500) : 500;
      window.SPRITES.drawAstralBoss(ctx, 7 * ts, 1 * ts, ts, bossLv, bossHp, bossMaxHp, time);
      window.SPRITES.drawPixelBadgeLabel(ctx, 3.0 * ts, 7.65 * ts, '🪐 ĐẤT SÁNG THẾ (LỚN x3.8 • SẢN LƯỢNG x3)', 'rgba(49, 27, 146, 0.92)', '#00e5ff', '#ffea00');
      window.SPRITES.drawPixelBadgeLabel(ctx, 8.0 * ts, 7.75 * ts, '☄️ MỎ THIÊN THẠCH (NGỌC CẤP 3)', 'rgba(49, 27, 146, 0.92)', '#ffd700', '#80d8ff');
    }

    if (hoverTile && game) {
      const hoe3x3 = game.upgrades.hoe_2 || game.getToolEnhanceState('hoe').plus >= 3;
      const water3x3 = game.upgrades.watering_can_2 || game.getToolEnhanceState('water').plus >= 3;
      const show3x3 =
        game.selectedTool === 'sprinkler' ||
        game.selectedTool === 'lantern' ||
        (game.selectedTool === 'hoe' && hoe3x3) ||
        (game.selectedTool === 'water' && water3x3) ||
        hoverTile.device === 'sprinkler' ||
        hoverTile.device === 'lantern' ||
        (hoverTile.crop && hoverTile.crop.id === 'sunflower');

      ctx.save();
      if (show3x3) {
        const aoeColor = (game.selectedTool === 'water' || game.selectedTool === 'sprinkler' || hoverTile.device === 'sprinkler')
          ? 'rgba(79, 195, 247, 0.25)'
          : 'rgba(255, 213, 79, 0.24)';
        const strokeCol = (game.selectedTool === 'water' || game.selectedTool === 'sprinkler' || hoverTile.device === 'sprinkler')
          ? '#4fc3f7'
          : '#ffd54f';

        const c0 = Math.max(0, hoverTile.c - 1);
        const r0 = Math.max(0, hoverTile.r - 1);
        const c1 = Math.min(this.cols - 1, hoverTile.c + 1);
        const r1 = Math.min(this.rows - 1, hoverTile.r + 1);

        ctx.fillStyle = aoeColor;
        ctx.fillRect(c0 * ts, r0 * ts, (c1 - c0 + 1) * ts, (r1 - r0 + 1) * ts);
        ctx.strokeStyle = strokeCol;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 3]);
        ctx.strokeRect(c0 * ts + 2, r0 * ts + 2, (c1 - c0 + 1) * ts - 4, (r1 - r0 + 1) * ts - 4);
        ctx.setLineDash([]);
      }

      ctx.strokeStyle = 'rgba(255, 235, 59, 0.95)';
      ctx.lineWidth = 3;
      ctx.strokeRect(hoverTile.c * ts + 2, hoverTile.r * ts + 2, ts - 4, ts - 4);
      ctx.restore();
    }
  }

  renderWeatherAndLighting(ctx, width, height, time, game = null) {
    if (this.weather === 'rainy' && this.currentMap === 'valley') {
      ctx.save();
      ctx.strokeStyle = 'rgba(144, 202, 249, 0.55)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 55; i++) {
        const rx = ((i * 97 + time * 260) % width);
        const ry = ((i * 53 + time * 520) % height);
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx - 6, ry + 14);
        ctx.stroke();
      }
      ctx.restore();
    }

    let overlayColor = null;
    if (this.currentMap === 'crystal_cavern') {
      overlayColor = 'rgba(26, 12, 48, 0.25)';
    } else if (this.currentMap === 'sky_island') {
      overlayColor = 'rgba(255, 215, 0, 0.06)';
    } else if (this.currentMap === 'dragon_sanctum') {
      overlayColor = 'rgba(255, 64, 0, 0.08)';
    } else if (this.currentMap === 'astral_nexus') {
      overlayColor = 'rgba(0, 229, 255, 0.07)';
    } else if (this.timeOfDay >= 0.65 && this.timeOfDay < 0.76) {
      const t = (this.timeOfDay - 0.65) / 0.11;
      overlayColor = `rgba(120, 55, 90, ${t * 0.35})`;
    } else if (this.isNight()) {
      overlayColor = this.weather === 'meteor'
        ? 'rgba(18, 12, 48, 0.52)'
        : 'rgba(14, 18, 42, 0.52)';
    }

    if (overlayColor) {
      ctx.fillStyle = overlayColor;
      ctx.fillRect(0, 0, width, height);
    }

    if (game && game.feverTimer > 0) {
      ctx.save();
      const pulse = 0.4 + 0.3 * Math.sin(time * 10);
      ctx.strokeStyle = `rgba(255, 215, 0, ${pulse})`;
      ctx.lineWidth = 10;
      ctx.strokeRect(5, 5, width - 10, height - 10);
      ctx.restore();
    }

    if (this.isNight() || this.currentMap !== 'valley') {
      for (const f of this.fireflies) {
        const alpha = 0.35 + 0.55 * Math.abs(Math.sin(f.phase));
        ctx.fillStyle = this.currentMap === 'astral_nexus'
          ? `rgba(0, 229, 255, ${alpha})`
          : (this.currentMap === 'dragon_sanctum'
            ? `rgba(255, 145, 0, ${alpha})`
            : (this.currentMap === 'crystal_cavern'
              ? `rgba(0, 229, 255, ${alpha})`
              : `rgba(212, 255, 105, ${alpha})`));
        ctx.fillRect(f.x, f.y, 4, 4);
      }
    }

    for (const s of this.shootingStars) {
      const cx = s.x + (s.tx - s.x) * s.progress;
      const cy = s.y + (s.ty - s.y) * s.progress;
      ctx.save();
      ctx.strokeStyle = '#e040fb';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx - 35, cy - 35);
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 4, cy - 4, 8, 8);
      ctx.restore();
    }

    for (const p of this.particles) {
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }

    ctx.save();
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'center';
    for (const ft of this.floatingTexts) {
      ctx.fillStyle = '#000000';
      ctx.fillText(ft.text, ft.x + 1, ft.y + 1);
      ctx.fillStyle = ft.color;
      ctx.fillText(ft.text, ft.x, ft.y);
    }
    ctx.restore();
  }
}

window.FarmWorld = FarmWorld;
