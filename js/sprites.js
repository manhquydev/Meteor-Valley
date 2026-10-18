/**
 * ============================================================================
 * THUNG LŨNG SAO BĂNG (STARLIGHT VALLEY v11.0 - 5 REALMS, ASTRAL BOSS & 14 PIXEL CROPS)
 * js/sprites.js - Bộ dựng đồ họa Pixel Art 16x16 riêng cho CẢ 5 GIAI ĐOẠN (Stage 0 -> 4)
 *                 của 14 Giống Cây Trồng (kể cả Hoa Phượng Hoàng Lửa & Trái Sáng Thế Yggdrasil),
 *                 5 Không gian Bản đồ, Mỏ Thiên Thạch Thái Cổ & Boss Kỳ Lân Tinh Vân
 * ============================================================================
 */

class PixelSpriteRenderer {
  constructor() {
    this.cache = {};
    this.externalImages = {};
    this.loadExternalSprites();
    this.buildPixelCache();
  }

  loadExternalSprites() {
    const files = ['tileset', 'crops', 'characters', 'npc_portraits', 'items_icons'];
    files.forEach(name => {
      const img = new Image();
      img.src = `assets/${name}.png`;
      img.onload = () => {
        this.externalImages[name] = img;
      };
      img.onerror = () => {};
    });
  }

  createPixelCanvas(w = 16, h = 16) {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    return { c, ctx };
  }

  drawAsciiMatrix(ctx, grid, palette, ox = 0, oy = 0) {
    for (let r = 0; r < grid.length; r++) {
      const row = grid[r];
      for (let c = 0; c < row.length; c++) {
        const ch = row[c];
        if (palette[ch]) {
          ctx.fillStyle = palette[ch];
          ctx.fillRect(ox + c, oy + r, 1, 1);
        }
      }
    }
  }

  buildPixelCache() {
    window.GAME_CONFIG.SEASONS.forEach(s => {
      this.cache[`grass_${s.id}_0`] = this.makeSeasonGrassTile(s, false);
      this.cache[`grass_${s.id}_1`] = this.makeSeasonGrassTile(s, true);
    });

    // Nền đặc trưng cho Map 2, Map 3, Map 4 & Map 5 (Vương Quốc Tinh Tú)
    this.cache.cavern_floor_0 = this.makeCavernFloorTile(false);
    this.cache.cavern_floor_1 = this.makeCavernFloorTile(true);
    this.cache.sky_floor_0 = this.makeSkyFloorTile(false);
    this.cache.sky_floor_1 = this.makeSkyFloorTile(true);
    this.cache.dragon_floor_0 = this.makeDragonFloorTile(false);
    this.cache.dragon_floor_1 = this.makeDragonFloorTile(true);
    this.cache.astral_floor_0 = this.makeAstralFloorTile(false);
    this.cache.astral_floor_1 = this.makeAstralFloorTile(true);

    this.cache.dry_soil = this.makeSoilTile(false);
    this.cache.wet_soil = this.makeSoilTile(true);
    this.cache.crystal_soil = this.makeCrystalSoilTile();
    this.cache.sky_soil = this.makeSkySoilTile();
    this.cache.dragon_soil = this.makeDragonSoilTile();
    this.cache.astral_soil = this.makeAstralSoilTile();
    this.cache.path = this.makePathTile();
    this.cache.wood_bridge = this.makeBridgeTile();

    this.cache.farmer = this.makeFarmerSprite();
    this.cache.cat = this.makeCatSprite();
    this.cache.chicken = this.makeChickenSprite();
    this.cache.cow = this.makeCowSprite();
    this.cache.bee = this.makeBeeSprite();
    this.cache.fairy = this.makeFairySprite();

    this.cache.sprinkler = this.makeSprinklerSprite();
    this.cache.lantern = this.makeLanternSprite();
    this.cache.chest = this.makeChestSprite();
    this.cache.weed = this.makeWeedSprite();
    this.cache.rock = this.makeRockSprite();
    this.cache.stump = this.makeStumpSprite();

    // 5 Loại Mỏ Khoáng Sản Quý
    this.cache.ore_stone = this.makeOreVeinSprite('#29b6f6', '#b3e5fc', '#0277bd');
    this.cache.ore_gem = this.makeOreVeinSprite('#e040fb', '#f8bbd0', '#6a1b9a');
    this.cache.ore_gold = this.makeOreVeinSprite('#ffd700', '#fff9c4', '#ff6f00');
    this.cache.ore_dragon = this.makeOreVeinSprite('#ff1744', '#ffea00', '#b71c1c');
    this.cache.ore_astral = this.makeOreVeinSprite('#00e5ff', '#ffd700', '#4a148c');

    this.cache.prod_egg = this.makeEggSprite();
    this.cache.prod_milk = this.makeMilkSprite();
    this.cache.prod_honey = this.makeHoneySprite();

    // Pre-bake 5 Giai đoạn Pixel Art 16x16 cho cả 14 giống cây trồng!
    this.buildCropSpeciesSprites();

    if (!window.PIXEL_ICONS) window.PIXEL_ICONS = {};
    Object.keys(window.GAME_CONFIG.CROPS).forEach(id => {
      if (this.cache[`crop_icon_${id}`]) {
        window.PIXEL_ICONS[id] = this.cache[`crop_icon_${id}`].toDataURL();
      }
    });
  }

  buildCropSpeciesSprites() {
    const speciesDefs = {
      radish: {
        palette: { K: '#2c1a0e', G: '#2e7d32', L: '#76ff03', R: '#e53935', P: '#ff8a80', W: '#ffffff' },
        grid: [
          ".....GG..GG.....",
          "....GLLGGLLG....",
          "....GLLLLLLG....",
          ".....GGGGGG.....",
          "....KKKKKKKK....",
          "...KRRRRRRRRK...",
          "..KRRWWPRRRRRK..",
          "..KRRWPRRRRRRK..",
          "..KRRRRRRRRRRK..",
          "...KRRRRRRRRK...",
          "...KPPPPPPPPK...",
          "....KPPPPPPK....",
          ".....KWWWWK.....",
          "......KKKK......",
          ".......KK.......",
          "................"
        ]
      },
      strawberry: {
        palette: { K: '#2c1a0e', G: '#2e7d32', L: '#66bb6a', R: '#d81b60', P: '#ff80ab', Y: '#ffd54f' },
        grid: [
          "....GGG..GGG....",
          "...GLLLGGLLLG...",
          "....GLLLLLLG....",
          "...KKKKKKKKKK...",
          "..KRRRRRRRRRRK..",
          ".KRRPRRRRRRYRRK.",
          ".KRRRRRYRRRRRRK.",
          ".KRYRRRRRRRYRRK.",
          "..KRRRRRYRRRRK..",
          "..KRRRYRRRRRRK..",
          "...KRRRRRRRRK...",
          "....KRRRRRRK....",
          ".....KRRRRK.....",
          "......KKKK......",
          "................",
          "................"
        ]
      },
      pumpkin: {
        palette: { K: '#3e2723', G: '#388e3c', L: '#81c784', O: '#ef6c00', Y: '#ffa726', H: '#ffe082' },
        grid: [
          ".......GG.......",
          "......GLLG......",
          ".....GLLLLG.....",
          "...KKKKKKKKKK...",
          "..KOOYYYYYYOOK..",
          ".KOOYYHYYYYYOOK.",
          ".KOOYHYYYYYYOOK.",
          ".KOOYYYYYYYYOOK.",
          ".KOOYYYYYYYYOOK.",
          ".KOOYYYYYYYYOOK.",
          "..KOOYYYYYYOOK..",
          "...KKKKKKKKKK...",
          "................",
          "................",
          "................",
          "................"
        ]
      },
      sunflower: {
        palette: { K: '#3e2723', G: '#2e7d32', L: '#66bb6a', Y: '#ffd600', H: '#ffff8d', B: '#5d4037', O: '#ff8f00' },
        grid: [
          "....YY.YY.YY....",
          "..YYHHYYYYHHYY..",
          ".YHHYBBBBBBYHHY.",
          ".YYBBBBBBBBBBYY.",
          "YYBBBOOOOOOBBBYY",
          ".YBBBOOOOOOBBBY.",
          ".YYBBBBBBBBBBYY.",
          "..YYHBBBBBBHYY..",
          "....YYYYYYYY....",
          ".......GG.......",
          "....GGGLLGGG....",
          "...GLLLLLLLLG...",
          "......GLLG......",
          "......GGGG......",
          "................",
          "................"
        ]
      },
      eggplant: {
        palette: { K: '#1a0f2e', G: '#2e7d32', L: '#66bb6a', P: '#6a1b9a', M: '#ab47bc', W: '#ea80fc' },
        grid: [
          "......GGGG......",
          "....GGLLLLGG....",
          "....GLLLLLLG....",
          ".....KKKKKK.....",
          "....KPPPPPPK....",
          "...KPPWMMMPPK...",
          "..KPPWMMMMMPPK..",
          "..KPPMMMMMMPPK..",
          "..KPPMMMMMMPPK..",
          "..KPPPPPPPPPPK..",
          "...KPPPPPPPPK...",
          "....KPPPPPPK....",
          ".....KKKKKK.....",
          "................",
          "................",
          "................"
        ]
      },
      starfruit: {
        palette: { K: '#3e2723', Y: '#ffd700', H: '#ffff8d', C: '#00e5ff', W: '#ffffff', O: '#ffab00' },
        grid: [
          ".......KK.......",
          "......KWWK......",
          "......KHHK......",
          ".KKKKKKHHKKKKKK.",
          "KWWWWYYYYYYWWWWK",
          ".KYYYYHWWYYYYYK.",
          "..KYYYHWWYYYYK..",
          "...KYYYYYYYYK...",
          "..KYYYYYYYYYYK..",
          "..KYYOYYYYOYYK..",
          ".KYYOOKKKKOOYYK.",
          ".KKKK......KKKK.",
          "................",
          "................",
          "................",
          "................"
        ]
      },
      void_mushroom: {
        palette: { K: '#120824', P: '#7c4dff', M: '#e040fb', C: '#00e5ff', W: '#ffffff', S: '#d1c4e9' },
        grid: [
          ".....KKKKKK.....",
          "...KKPPPPPPKK...",
          "..KPPCCPPPPMMK..",
          ".KPPCCWWPPPMMMK.",
          ".KPPPPPPPPPPMMK.",
          "KPPWWPPPPCCPPPPK",
          "KPPPPPPPPCCPPPPK",
          "KKKKKKKKKKKKKKKK",
          "....KSSSSSSK....",
          "....KSSWWSSK....",
          "....KSSSSSSK....",
          "...KSSSSSSSSK...",
          "...KSSSSSSSSK...",
          "....KKKKKKKK....",
          "................",
          "................"
        ]
      },
      mystic_lotus: {
        palette: { K: '#0d3b66', C: '#00e5ff', B: '#40c4ff', W: '#ffffff', P: '#ff80ab', G: '#26a69a' },
        grid: [
          ".......WW.......",
          "......WCCW......",
          "...WW.WCCW.WW...",
          "..WCCWWCCWWCCW..",
          ".WCCBBBBBBBBCCW.",
          ".WCBBWWPPWWBBCW.",
          "WBBBBWPPPPWBBBBW",
          "WBBBBBBBBBBBBBBW",
          ".KBBBBBBBBBBBBK.",
          "..GGGGGGGGGGGG..",
          ".GGGGGGGGGGGGGG.",
          "..KKKKKKKKKKKK..",
          "................",
          "................",
          "................",
          "................"
        ]
      },
      golden_apple: {
        palette: { K: '#3e2723', G: '#2e7d32', L: '#76ff03', Y: '#ffd700', O: '#ff9100', W: '#ffffff', R: '#ff5252' },
        grid: [
          "......GGGG......",
          "....GGLLLLGG....",
          "...GLLYYYYLLG...",
          "..GLLYYWWYYLLG..",
          "..GLLYYYYYYLLG..",
          "...KKKKKKKKKK...",
          "..KOOYYYYYYOOK..",
          ".KOOYYWWYYYYOOK.",
          ".KOOYYWYYYYYOOK.",
          ".KOOYYYYYYYYRRK.",
          "..KOOYYYYYYRRK..",
          "...KOOOOOOOOk...",
          "....KKKKKKKK....",
          "................",
          "................",
          "................"
        ]
      },
      dragon_fruit: {
        palette: { K: '#2b0918', G: '#00e676', L: '#76ff03', R: '#ff1744', P: '#ff80ab', W: '#ffffff', Y: '#ffd700' },
        grid: [
          "..GG........GG..",
          "...GLL....LLG...",
          "...GLLKKKKLLG...",
          "..GLLKRRRRKLLG..",
          ".GLLKRRRRRRKLLG.",
          "..KKRRWPWRRRRKK.",
          "..KRRWWPWWWRRRK.",
          ".KRRRWPYYPWRRRRK",
          ".KRRRRYYYYRRRRRK",
          "..KRRRRRRRRRRRK.",
          "..KGRRRRRRRRRGK.",
          "...KRRRRRRRRRK..",
          "....KKKKKKKKK...",
          "................",
          "................",
          "................"
        ]
      },
      chrono_rose: {
        palette: { K: '#102027', C: '#00e5ff', B: '#18ffff', Y: '#ffd700', P: '#ea80fc', G: '#00bfa5', W: '#ffffff' },
        grid: [
          "....YY....YY....",
          "...YWWY..YWWY...",
          "..YKCCCCCCCCKY..",
          ".KCCBBWWWWBBCCK.",
          ".KCBWWPPPPWWBCK.",
          ".KCBWPPYYPPWBCK.",
          ".KCCBBWWWWBBCCK.",
          "..KKCCCCCCCCKK..",
          "....YYKKKKYY....",
          "......GGGG......",
          "....GGGLLGGG....",
          "...GGGGGGGGGG...",
          "......GGGG......",
          "......KKKK......",
          "................",
          "................"
        ]
      },
      phoenix_blossom: {
        palette: { K: '#2b0000', R: '#ff1744', O: '#ff6d00', Y: '#ffea00', W: '#ffffff', G: '#76ff03' },
        grid: [
          "...YY..YY..YY...",
          "..YWWY.WW.YWWY..",
          ".YOORRRRRRRROOY.",
          "YOORRYYYYYYRROOY",
          "KRRYYWWWWWWYYRRK",
          ".KRYWWOOOOWWYRK.",
          ".KRYWOOYYOOWYRK.",
          "..KRYYWWWWYYRK..",
          "..KKRRRRRRRRKK..",
          "...YYKKKKKKYY...",
          ".....GGGGGG.....",
          "...GGGGGGGGGG...",
          ".....GGGGGG.....",
          "......KKKK......",
          "................",
          "................"
        ]
      },
      cosmic_worldfruit: {
        palette: { K: '#1a0033', P: '#e040fb', M: '#7c4dff', C: '#00e5ff', Y: '#ffd700', W: '#ffffff', G: '#76ff03' },
        grid: [
          ".....YYYYYY.....",
          "...YYWWWWWWYY...",
          "..YKKKKKKKKKKY..",
          ".YKPPPMMMMPPPKY.",
          "YKPPMMCCWWCMMPKY",
          "YKPMMCWWWWCCMPKY",
          "YKPPMMCCWWCMMPKY",
          "CCYYYYPPPPYYYYCC",
          ".CCYYYYYYYYYYCC.",
          ".YKPPPPPPPPPPKY.",
          "..YKPPMMMMPPKY..",
          "...YKKKKKKKKY...",
          ".....GGGGGG.....",
          "......KKKK......",
          "................",
          "................"
        ]
      },
      yggdrasil_fruit: {
        palette: { K: '#1a0f00', Y: '#ffd700', H: '#ffff8d', C: '#00e5ff', P: '#ff4081', G: '#76ff03', W: '#ffffff' },
        grid: [
          "..YY...YY...YY..",
          ".YWWY.YWWY.YWWY.",
          ".YYYYYYYYYYYYYY.",
          "..KKKKKKKKKKKK..",
          ".KYYYYCCCCYYYYK.",
          "KYYCCWWWWWWCCYYK",
          "KYCWWHPPPPWHWCYK",
          "KYCWWHPPPPWHWCYK",
          "KYYCCWWWWWWCCYYK",
          ".KYYYYCCCCYYYYK.",
          "..KYYYYYYYYYYK..",
          "...GGGGGGGGGG...",
          "..GGGGGGGGGGGG..",
          "....KKKKKKKK....",
          "................",
          "................"
        ]
      }
    };

    Object.entries(speciesDefs).forEach(([id, def]) => {
      const cfg = window.GAME_CONFIG.CROPS[id] || {};
      const mainCol = cfg.color || '#ffca28';
      const lightCol = cfg.lightColor || '#fff59d';
      const leafCol = cfg.leafColor || '#66bb6a';

      // Stage 0: Hạt giống 3D Pixel riêng cho từng loài
      const s0 = this.createPixelCanvas(16, 16);
      this.drawAsciiMatrix(s0.ctx, [
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "......KKKK......",
        ".....KLLLLK.....",
        "...KKKMMMMKKK...",
        "..KLLMKKKKMLLK..",
        "..KMMK....KMMK..",
        "...KK......KK...",
        "................",
        "................",
        "................"
      ], { K: '#2c1a0e', M: mainCol, L: lightCol });
      this.cache[`crop_stage0_${id}`] = s0.c;

      // Stage 1: Mầm non 2 lá đẫm sương có sắc thái riêng
      const s1 = this.createPixelCanvas(16, 16);
      this.drawAsciiMatrix(s1.ctx, [
        "................",
        "................",
        "................",
        "................",
        "................",
        "....KKK..KKK....",
        "...KLLLK.KLLK...",
        "...KGGGGKGGGK...",
        "....KKKGGKKK....",
        "......KGGK......",
        "......KGGK......",
        ".....KMMMMK.....",
        ".....KKKKKK.....",
        "................",
        "................",
        "................"
      ], { K: '#1b3b1a', G: '#2e7d32', L: leafCol, M: mainCol });
      this.cache[`crop_stage1_${id}`] = s1.c;

      // Stage 2: Thân lá xum xuê kèm nụ hoa đặc trưng từng loài
      const s2 = this.createPixelCanvas(16, 16);
      this.drawAsciiMatrix(s2.ctx, [
        "................",
        "................",
        "......KKKK......",
        ".....KLLLLK.....",
        "...KKKMMMMKKK...",
        "..KGGGGGGGGGGK..",
        ".KGGJJGGGGJJGGK.",
        ".KGGGGGGGGGGGGK.",
        "..KGGGJJJJGGGK..",
        "...KKKGGGGKKK...",
        ".....KGGGGK.....",
        "....KGGGGGGK....",
        "....KKKKKKKK....",
        "................",
        "................",
        "................"
      ], { K: '#1b3b1a', G: '#2e7d32', J: leafCol, M: mainCol, L: lightCol });
      this.cache[`crop_stage2_${id}`] = s2.c;

      // Stage 4: Chín rộ hoàn chỉnh
      const { c, ctx } = this.createPixelCanvas(16, 16);
      this.drawAsciiMatrix(ctx, def.grid, def.palette);
      this.cache[`crop_stage4_${id}`] = c;

      // Stage 3: Đơm hoa / Kết trái non (tán lá pixel + quả non ở giữa)
      const s3 = this.createPixelCanvas(16, 16);
      this.drawAsciiMatrix(s3.ctx, [
        "................",
        "....KKKKKKKK....",
        "..KKGGGGGGGGKK..",
        ".KGGJJGGGGJJGGK.",
        ".KGGGGGGGGGGGGK.",
        ".KGGGGGGGGGGGGK.",
        "..KGGGGGGGGGGK..",
        "...KKKKKKKKKK...",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................"
      ], { K: '#1b3b1a', G: '#2e7d32', J: leafCol });
      s3.ctx.drawImage(c, 2, 3, 12, 12);
      this.cache[`crop_stage3_${id}`] = s3.c;

      // Upscaled 48x48 cho icon UI
      const iconCanvas = document.createElement('canvas');
      iconCanvas.width = 48;
      iconCanvas.height = 48;
      const ictx = iconCanvas.getContext('2d');
      ictx.imageSmoothingEnabled = false;
      ictx.drawImage(c, 0, 0, 48, 48);
      this.cache[`crop_icon_${id}`] = iconCanvas;
    });
  }

  makeCavernFloorTile(withSparkle) {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    ctx.fillStyle = '#231934';
    ctx.fillRect(0, 0, 16, 16);
    ctx.fillStyle = '#1b1228';
    for (let y = 0; y < 16; y += 2) {
      for (let x = (y % 4 === 0 ? 0 : 2); x < 16; x += 4) {
        ctx.fillRect(x, y, 1, 1);
      }
    }
    ctx.fillStyle = '#33244d';
    [[3, 4], [11, 11], [6, 13], [13, 4]].forEach(([bx, by]) => {
      ctx.fillRect(bx, by, 2, 1);
    });
    if (withSparkle) {
      ctx.fillStyle = '#00e5ff';
      ctx.fillRect(5, 6, 2, 2);
      ctx.fillStyle = '#e040fb';
      ctx.fillRect(11, 10, 2, 2);
    }
    return c;
  }

  makeSkyFloorTile(withStar) {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    ctx.fillStyle = '#2d4a73';
    ctx.fillRect(0, 0, 16, 16);
    ctx.fillStyle = '#223a5e';
    for (let y = 0; y < 16; y += 2) {
      for (let x = (y % 4 === 0 ? 0 : 2); x < 16; x += 4) {
        ctx.fillRect(x, y, 1, 1);
      }
    }
    ctx.fillStyle = '#527bb0';
    [[2, 3], [10, 12], [7, 13], [12, 5]].forEach(([bx, by]) => {
      ctx.fillRect(bx, by, 2, 2);
    });
    if (withStar) {
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(5, 5, 2, 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(11, 10, 1, 1);
    }
    return c;
  }

  makeDragonFloorTile(withEmber) {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    ctx.fillStyle = '#2b1216';
    ctx.fillRect(0, 0, 16, 16);
    ctx.fillStyle = '#1f0b0e';
    for (let y = 0; y < 16; y += 2) {
      for (let x = (y % 4 === 0 ? 0 : 2); x < 16; x += 4) {
        ctx.fillRect(x, y, 1, 1);
      }
    }
    ctx.fillStyle = '#4a1c24';
    [[3, 4], [11, 11], [6, 13], [13, 4]].forEach(([bx, by]) => {
      ctx.fillRect(bx, by, 2, 1);
    });
    if (withEmber) {
      ctx.fillStyle = '#ff9100';
      ctx.fillRect(4, 6, 2, 2);
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(11, 10, 2, 2);
    }
    return c;
  }

  makeAstralFloorTile(withNebula) {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    ctx.fillStyle = '#140b2e';
    ctx.fillRect(0, 0, 16, 16);
    ctx.fillStyle = '#1f1147';
    for (let y = 0; y < 16; y += 2) {
      for (let x = (y % 4 === 0 ? 0 : 2); x < 16; x += 4) {
        ctx.fillRect(x, y, 1, 1);
      }
    }
    ctx.fillStyle = '#311b92';
    [[2, 3], [10, 12], [6, 13], [12, 4]].forEach(([bx, by]) => {
      ctx.fillRect(bx, by, 2, 2);
    });
    if (withNebula) {
      ctx.fillStyle = '#00e5ff';
      ctx.fillRect(4, 5, 2, 2);
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(11, 9, 2, 2);
      ctx.fillStyle = '#ff4081';
      ctx.fillRect(8, 3, 1, 1);
    }
    return c;
  }

  makeCrystalSoilTile() {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    ctx.fillStyle = '#120824';
    ctx.fillRect(0, 0, 16, 16);
    ctx.fillStyle = '#311b4e';
    ctx.fillRect(1, 1, 14, 14);
    for (let y = 2; y <= 12; y += 3) {
      ctx.fillStyle = '#4a2574';
      ctx.fillRect(2, y, 12, 1);
      ctx.fillStyle = '#00b0ff';
      ctx.fillRect(3, y + 1, 10, 1);
    }
    return c;
  }

  makeSkySoilTile() {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    ctx.fillStyle = '#3d2914';
    ctx.fillRect(0, 0, 16, 16);
    ctx.fillStyle = '#735122';
    ctx.fillRect(1, 1, 14, 14);
    for (let y = 2; y <= 12; y += 3) {
      ctx.fillStyle = '#ffd54f';
      ctx.fillRect(2, y, 12, 1);
      ctx.fillStyle = '#996d2e';
      ctx.fillRect(2, y + 1, 12, 1);
    }
    return c;
  }

  makeDragonSoilTile() {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    ctx.fillStyle = '#1f0808';
    ctx.fillRect(0, 0, 16, 16);
    ctx.fillStyle = '#4e1616';
    ctx.fillRect(1, 1, 14, 14);
    for (let y = 2; y <= 12; y += 3) {
      ctx.fillStyle = '#ff6d00';
      ctx.fillRect(2, y, 12, 1);
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(4, y + 1, 8, 1);
    }
    return c;
  }

  makeAstralSoilTile() {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    ctx.fillStyle = '#0d0422';
    ctx.fillRect(0, 0, 16, 16);
    ctx.fillStyle = '#28115c';
    ctx.fillRect(1, 1, 14, 14);
    for (let y = 2; y <= 12; y += 3) {
      ctx.fillStyle = '#00e5ff';
      ctx.fillRect(2, y, 12, 1);
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(4, y + 1, 8, 1);
    }
    return c;
  }

  makeOreVeinSprite(mainCol, lightCol, darkCol) {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    const grid = [
      "................",
      ".......KK.......",
      "......KLLK......",
      "...KK.KMMK.KK...",
      "..KLLKKMMKKLLK..",
      "..KMMMKMMKMMMK..",
      ".KMMMMKMMKMMMMK.",
      ".KMMLLMDDMLLMMK.",
      ".KMMMMDDDDMMMMK.",
      "..KDDDDDDDDDDK..",
      "..GGGGGGGGGGGG..",
      "...KKKKKKKKKK...",
      "................",
      "................",
      "................",
      "................"
    ];
    this.drawAsciiMatrix(ctx, grid, {
      K: '#120824',
      M: mainCol,
      L: lightCol,
      D: darkCol,
      G: '#455a64'
    });
    return c;
  }

  makeChestSprite() {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    const grid = [
      "................",
      "................",
      "................",
      "....KKKKKKKK....",
      "...KYYYYYYYYK...",
      "..KYMMMMMMMMYK..",
      "..KYMMMMMMMMYK..",
      "..KYYYYKKYYYYK..",
      "..KYMMMKKMMMYK..",
      "..KYMMMMMMMMYK..",
      "..KYMMMMMMMMYK..",
      "...KKKKKKKKKK...",
      "................",
      "................",
      "................",
      "................"
    ];
    this.drawAsciiMatrix(ctx, grid, { K: '#2c1a0e', Y: '#ffd700', M: '#c62828' });
    return c;
  }

  makeFairySprite() {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    const grid = [
      "................",
      "................",
      "....WW....WW....",
      "...WWWW..WWWW...",
      "...WWWWYYYYWW...",
      "....WWYYYYYYW...",
      ".....YYYYYYYY...",
      "......YYYYYY....",
      ".......CCCC.....",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................"
    ];
    this.drawAsciiMatrix(ctx, grid, { W: 'rgba(224, 247, 250, 0.85)', Y: '#ffeb3b', C: '#80d8ff' });
    return c;
  }

  makeEggSprite() {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    const grid = [
      "................",
      "......KKKK......",
      "....KKWWWWKK....",
      "...KWWYYYYWWK...",
      "..KWWYYYYWWWWK..",
      "..KWWWWWWWWWWK..",
      "..KWWWWWWWWWWK..",
      "...KWWWWWWWWK...",
      "....KKKKKKKK....",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................"
    ];
    this.drawAsciiMatrix(ctx, grid, { K: '#4a2c18', W: '#fffdf7', Y: '#ffd54f' });
    return c;
  }

  makeMilkSprite() {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    const grid = [
      "................",
      ".....BBBBBB.....",
      "....KWWWWWWK....",
      "...KWWWWWWWWK...",
      "...KWWBBBBWWK...",
      "...KWWBBBBWWK...",
      "...KWWWWWWWWK...",
      "...KWWWWWWWWK...",
      "....KKKKKKKK....",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................"
    ];
    this.drawAsciiMatrix(ctx, grid, { K: '#37474f', W: '#ffffff', B: '#29b6f6' });
    return c;
  }

  makeHoneySprite() {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    const grid = [
      "................",
      "....KKKKKKKK....",
      "...KOOOOOOOOk...",
      "..KOYYYYYYYYOK..",
      "..KOYYYYYYYYOK..",
      "..KOYYYYYYYYOK..",
      "...KOOOOOOOOk...",
      "....KKKKKKKK....",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................"
    ];
    this.drawAsciiMatrix(ctx, grid, { K: '#4e342e', O: '#f57f17', Y: '#ffd54f', k: '#4e342e' });
    return c;
  }

  makeSeasonGrassTile(seasonCfg, withFlower) {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    ctx.fillStyle = seasonCfg.grassMain;
    ctx.fillRect(0, 0, 16, 16);
    ctx.fillStyle = seasonCfg.grassDark;
    for (let y = 0; y < 16; y += 2) {
      for (let x = (y % 4 === 0 ? 0 : 2); x < 16; x += 4) {
        ctx.fillRect(x, y, 1, 1);
      }
    }
    ctx.fillStyle = seasonCfg.grassLight;
    [[3, 4], [11, 11], [6, 13], [13, 4]].forEach(([bx, by]) => {
      ctx.fillRect(bx, by, 1, 2);
      ctx.fillRect(bx + 1, by - 1, 1, 2);
    });
    if (withFlower) {
      [[5, 6], [11, 10]].forEach(([fx, fy]) => {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(fx - 1, fy, 3, 1);
        ctx.fillRect(fx, fy - 1, 1, 3);
        ctx.fillStyle = seasonCfg.flowerColor;
        ctx.fillRect(fx, fy, 1, 1);
      });
    }
    return c;
  }

  makeSoilTile(isWet) {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.fillRect(0, 0, 16, 16);

    const main = isWet ? '#6b4226' : '#b57c4a';
    const ridgeDark = isWet ? '#4d2c16' : '#8c5a30';
    const ridgeLight = isWet ? '#825332' : '#cc925e';

    ctx.fillStyle = main;
    ctx.fillRect(1, 1, 14, 14);
    for (let y = 2; y <= 12; y += 3) {
      ctx.fillStyle = ridgeDark;
      ctx.fillRect(2, y, 12, 1);
      ctx.fillStyle = ridgeLight;
      ctx.fillRect(2, y + 1, 12, 1);
    }
    return c;
  }

  makePathTile() {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    const stones = [
      { x: 1, y: 1, w: 6, h: 6, col: '#b0b8c0' },
      { x: 8, y: 2, w: 7, h: 5, col: '#9aa2aa' },
      { x: 2, y: 8, w: 6, h: 7, col: '#a0a8b0' },
      { x: 9, y: 8, w: 6, h: 6, col: '#b8c0c8' }
    ];
    stones.forEach(s => {
      ctx.fillStyle = '#555d66';
      ctx.fillRect(s.x, s.y, s.w, s.h);
      ctx.fillStyle = s.col;
      ctx.fillRect(s.x, s.y, s.w - 1, s.h - 1);
    });
    return c;
  }

  makeBridgeTile() {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    ctx.fillStyle = '#734626';
    ctx.fillRect(0, 0, 16, 16);
    ctx.fillStyle = '#996236';
    for (let x = 1; x < 16; x += 4) {
      ctx.fillRect(x, 1, 3, 14);
    }
    ctx.fillStyle = '#4a2c18';
    ctx.fillRect(0, 2, 16, 1);
    ctx.fillRect(0, 13, 16, 1);
    return c;
  }

  makeFarmerSprite() {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    const grid = [
      "....RRRRRRRR....",
      "...RRRRRRRRRR...",
      "..YYYYYYYYYYYY..",
      "...BBBBBBBBBB...",
      "...BSSSSSSSSB...",
      "...BSKSSSSKSB...",
      "...BSSSSSSSSB...",
      "....SSSSSSSS....",
      "...CCCCCCCCCC...",
      "..CCBBBBBBBBCC..",
      "..CCBBBBBBBBCC..",
      "...BBBBBBBBBB...",
      "...BBBBBBBBBB...",
      "....BBB..BBB....",
      "....DDD..DDD....",
      "................"
    ];
    this.drawAsciiMatrix(ctx, grid, {
      R: '#d94336', Y: '#ffd54f', B: '#3b73c4',
      S: '#ffdbac', K: '#1f1f29', C: '#f06252', D: '#5c3820'
    });
    return c;
  }

  makeCatSprite() {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    const grid = [
      "................",
      "................",
      "................",
      "...OO......OO...",
      "..OOOO....OOOO..",
      "..OOOOOOOOOOOO..",
      "..OOKOOWWOOKOO..",
      "..OOOOOPPOOOOO..",
      "...OOOOOOOOOO...",
      "..OOOOOOOOOOOO..",
      "..OOOOOOOOOOOO..",
      "..OOOOOOOOOOOO..",
      "...OO.OOOO.OO...",
      "...WW......WW...",
      "................",
      "................"
    ];
    this.drawAsciiMatrix(ctx, grid, {
      O: '#f59b2d', W: '#fff8ee', K: '#212121', P: '#ff8a9e'
    });
    return c;
  }

  makeChickenSprite() {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    const grid = [
      "................",
      "................",
      "......RRRR......",
      ".....WWWWWW.....",
      "....WWKWWWWY....",
      "....WWWWWWWWY...",
      "...WWWWWWWWWW...",
      "...WWWWWWWWWW...",
      "...WWWWWWWWWW...",
      "....WWWWWWWW....",
      ".....WWWWWW.....",
      "......Y..Y......",
      "......Y..Y......",
      "................",
      "................",
      "................"
    ];
    this.drawAsciiMatrix(ctx, grid, {
      R: '#e53935', W: '#fffdf7', K: '#1c1c1c', Y: '#ffb300'
    });
    return c;
  }

  makeCowSprite() {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    const grid = [
      "................",
      "..BB........BB..",
      "...WWWWWWWWWW...",
      "..WWBBWWWWWWWW..",
      "..WWBBWWWWWWWW..",
      "..WWKWWWWWWKWW..",
      "...PPPPPPPPPP...",
      "...PKPPPPPPKP...",
      "..WWWWWWWWWWWW..",
      "..WWBBBWWWWWBB..",
      "..WWBBBWWWWWBB..",
      "...WWWWWWWWWW...",
      "...WW.WW.WW.WW..",
      "...DD.DD.DD.DD..",
      "................",
      "................"
    ];
    this.drawAsciiMatrix(ctx, grid, {
      W: '#fafafa', B: '#373742', K: '#141419', P: '#ffb2c5', D: '#543d32'
    });
    return c;
  }

  makeBeeSprite() {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    const grid = [
      "................",
      "................",
      ".....WW..WW.....",
      "....WWWWWWWW....",
      "....WWWWWWWW....",
      "...YYBBYYBBYY...",
      "..KYYBBYYBBYY...",
      "...YYBBYYBBYY...",
      "....YYBBYYBB....",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................"
    ];
    this.drawAsciiMatrix(ctx, grid, {
      W: 'rgba(215, 245, 255, 0.85)', Y: '#ffd600', B: '#2b241e', K: '#000000'
    });
    return c;
  }

  makeSprinklerSprite() {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    const grid = [
      "................",
      "................",
      "......BBBB......",
      "....BBBBBBBB....",
      "......SSSS......",
      "......SSSS......",
      ".....SSSSSS.....",
      ".....SSSSSS.....",
      "....GGGGGGGG....",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................"
    ];
    this.drawAsciiMatrix(ctx, grid, { B: '#29b6f6', S: '#cfd8dc', G: '#546e7a' });
    return c;
  }

  makeLanternSprite() {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    const grid = [
      ".......DD.......",
      ".....DDDDDD.....",
      "....GGGGGGGG....",
      "....GYYYYYYG....",
      "....GYWWWWYG....",
      "....GYWWWWYG....",
      "....GYYYYYYG....",
      "....GGGGGGGG....",
      "......DDDD......",
      ".......DD.......",
      ".......DD.......",
      "......DDDD......",
      "................",
      "................",
      "................",
      "................"
    ];
    this.drawAsciiMatrix(ctx, grid, { D: '#5d4037', G: '#ff7043', Y: '#ffee58', W: '#ffffff' });
    return c;
  }

  makeWeedSprite() {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    const grid = [
      "................",
      "................",
      "....G......G....",
      "....GG....GG....",
      "..G..GG..GG..G..",
      "..GG.GGGGGG.GG..",
      "...GGGGGGGGGG...",
      "....GGGGGGGG....",
      ".....DDDDDD.....",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................"
    ];
    this.drawAsciiMatrix(ctx, grid, { G: '#388e3c', D: '#1b5e20' });
    return c;
  }

  makeRockSprite() {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    const grid = [
      "................",
      "................",
      "................",
      ".....LLLLLL.....",
      "...LLLLLLLLLL...",
      "..LLLLMMMMMMLL..",
      "..LLMMMMMMMMMM..",
      "..MMMMMMMMDDDD..",
      "..MMMMDDDDDDDD..",
      "...DDDDDDDDDD...",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................"
    ];
    this.drawAsciiMatrix(ctx, grid, { L: '#b0bec5', M: '#78909c', D: '#455a64' });
    return c;
  }

  makeStumpSprite() {
    const { c, ctx } = this.createPixelCanvas(16, 16);
    const grid = [
      "................",
      "................",
      "....LLLLLLLL....",
      "...LMMMMMMMMl...",
      "...LLLLLLLLLL...",
      "...DDDDDDDDDD...",
      "...DDDDDDDDDD...",
      "..DDDDDDDDDDDD..",
      ".DDDD.DDDD.DDDD.",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................"
    ];
    this.drawAsciiMatrix(ctx, grid, { L: '#d7ccc8', M: '#a1887f', D: '#6d4c41' });
    return c;
  }

  drawPixelBadgeLabel(ctx, cx, cy, text, bgColor = 'rgba(24, 16, 38, 0.82)', borderColor = '#ffd54f', textColor = '#fff8e7') {
    ctx.save();
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    const w = ctx.measureText(text).width + 12;
    const h = 16;
    ctx.fillStyle = bgColor;
    ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - w / 2, cy - h / 2, w, h);
    ctx.fillStyle = textColor;
    ctx.fillText(text, cx, cy + 3.5);
    ctx.restore();
  }

  // VẼ CÂY TRỒNG VỚI ĐỒ HỌA PIXEL ART 5 GIAI ĐOẠN (STAGE 0 -> STAGE 4) & CẤP GEN ĐỘT BIẾN
  drawCrop(ctx, cropCfg, stage, px, py, size, isMutated = false, isGiant = false, time = 0, progress = 0, starTier = 0, geneLevel = 1) {
    ctx.save();
    const sway = Math.sin(time * 3.2 + px * 0.1) * (stage >= 2 ? 1.6 : 0.6);
    const cx = px + size * 0.5 + sway;
    const cy = py + size * 0.52;

    if (stage < 4) {
      const stageImg = this.cache[`crop_stage${stage}_${cropCfg.id}`];
      if (stageImg) {
        const sSize = size - 8;
        ctx.drawImage(stageImg, cx - sSize / 2, cy - sSize / 2 + 2, sSize, sSize);
      }
    } else {
      const scale = isGiant ? 1.28 : 1.0;

      if (isMutated || starTier >= 3 || cropCfg.isHybrid || geneLevel >= 3) {
        const glowAlpha = 0.34 + 0.22 * Math.sin(time * 6);
        ctx.fillStyle = isMutated
          ? `rgba(213, 128, 255, ${glowAlpha})`
          : (cropCfg.isHybrid ? `rgba(0, 229, 255, ${glowAlpha})` : `rgba(255, 215, 0, ${glowAlpha})`);
        ctx.beginPath();
        ctx.arc(cx, cy, size * 0.46 * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      const sp = this.cache[`crop_stage4_${cropCfg.id}`];
      const drawW = (size - 6) * scale;
      const drawH = (size - 6) * scale;
      if (sp) {
        ctx.drawImage(sp, cx - drawW / 2, cy - drawH / 2, drawW, drawH);
      }

      if (isMutated || cropCfg.isHybrid) {
        ctx.fillStyle = '#00e5ff';
        ctx.fillRect(cx - 12, cy - 12, 4, 4);
        ctx.fillRect(cx + 9, cy - 8, 4, 4);
      }

      const bounce = Math.sin(time * 5.5) * 3;
      ctx.fillStyle = '#181425';
      ctx.fillRect(cx - 5, py + 1 + bounce, 10, 10);
      ctx.fillStyle = isMutated ? '#00e5ff' : '#ffd700';
      ctx.fillRect(cx - 3, py + 3 + bounce, 6, 6);
    }

    if (starTier > 0 || geneLevel > 1) {
      const starsStr = (geneLevel > 1 ? `G${geneLevel}` : '') + '★'.repeat(starTier);
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillStyle = 'rgba(0,0,0,0.82)';
      ctx.fillText(starsStr, px + size - 2, py + 11);
      ctx.fillStyle = geneLevel >= 3 ? '#00e5ff' : (starTier === 3 ? '#ffd700' : '#fff59d');
      ctx.fillText(starsStr, px + size - 3, py + 10);
    }

    if (stage < 4 && progress > 0) {
      const barW = size - 12;
      const bx = px + 6;
      const by = py + size - 7;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
      ctx.fillRect(bx, by, barW, 4);
      ctx.fillStyle = '#76ff03';
      ctx.fillRect(bx + 1, by + 1, Math.max(2, (barW - 2) * Math.min(1, progress)), 2);
    }
    ctx.restore();
  }

  drawRealmPortal(ctx, px, py, size, time = 0, label = '🌀 CHUYỂN MAP') {
    ctx.save();
    const cx = px + size / 2;
    const cy = py + size / 2;
    const pulse = 0.7 + 0.3 * Math.sin(time * 5);

    ctx.fillStyle = `rgba(0, 229, 255, ${0.28 * pulse})`;
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.48, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ce93d8';
    ctx.lineWidth = 4;
    ctx.strokeRect(px + 8, py + 6, size - 16, size - 12);

    ctx.fillStyle = '#00e5ff';
    ctx.fillRect(px + 13, py + 11, size - 26, size - 22);
    ctx.fillStyle = '#e040fb';
    const swirl = Math.sin(time * 6) * 4;
    ctx.fillRect(cx - 5 + swirl, cy - 5, 10, 10);

    this.drawPixelBadgeLabel(ctx, cx, py + size - 3, label, 'rgba(49, 27, 146, 0.92)', '#00e5ff', '#ffffff');
    ctx.restore();
  }

  drawAscensionAltar(ctx, px, py, tileSize, ascensionCount = 0, towerFloor = 1, time = 0) {
    const cx = px + tileSize;
    const cy = py + tileSize;
    ctx.save();
    const glow = 26 + Math.sin(time * 4) * 6;
    const grad = ctx.createRadialGradient(cx, cy, 4, cx, cy, glow);
    grad.addColorStop(0, 'rgba(255, 215, 0, 0.75)');
    grad.addColorStop(1, 'rgba(224, 64, 251, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, glow, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#37474f';
    ctx.fillRect(cx - 34, cy + 4, 68, 18);
    ctx.fillStyle = '#ffd54f';
    ctx.fillRect(cx - 26, cy - 10, 52, 16);
    ctx.fillStyle = '#ff4081';
    ctx.fillRect(cx - 10, cy - 26 + Math.sin(time * 5) * 3, 20, 20);

    this.drawPixelBadgeLabel(
      ctx,
      cx,
      cy + 24,
      `🌌 LUÂN HỒI ★${ascensionCount} • 🗼 TẦNG ${towerFloor}`,
      'rgba(74, 20, 140, 0.92)',
      '#ffd700',
      '#ffd700'
    );
    ctx.restore();
  }

  drawDragonShrine(ctx, px, py, tileSize, time = 0) {
    const cx = px + tileSize;
    const cy = py + tileSize;
    ctx.save();
    const glow = 30 + Math.sin(time * 5) * 6;
    const grad = ctx.createRadialGradient(cx, cy, 4, cx, cy, glow);
    grad.addColorStop(0, 'rgba(255, 23, 68, 0.85)');
    grad.addColorStop(1, 'rgba(255, 215, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, glow, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#4e1616';
    ctx.fillRect(cx - 36, cy + 4, 72, 18);
    ctx.fillStyle = '#ff6d00';
    ctx.fillRect(cx - 26, cy - 12, 52, 18);
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(cx - 12, cy - 28 + Math.sin(time * 6) * 3, 24, 20);

    this.drawPixelBadgeLabel(
      ctx,
      cx,
      cy + 24,
      '🐉 ĐÀI THẦN LONG BAN PHƯỚC',
      'rgba(183, 28, 28, 0.92)',
      '#ffd700',
      '#fff59d'
    );
    ctx.restore();
  }

  // VẼ BOSS KỲ LÂN TINH VÂN CÓ THANH MÁU TRÊN MAP 5 (VƯƠNG QUỐC TINH TÚ)
  drawAstralBoss(ctx, px, py, tileSize, bossLv = 1, hp = 500, maxHp = 500, time = 0) {
    const cx = px + tileSize;
    const cy = py + tileSize;
    const bob = Math.sin(time * 5) * 4;
    ctx.save();

    const glow = 34 + Math.sin(time * 6) * 7;
    const grad = ctx.createRadialGradient(cx, cy, 4, cx, cy, glow);
    grad.addColorStop(0, 'rgba(0, 229, 255, 0.88)');
    grad.addColorStop(0.5, 'rgba(224, 64, 251, 0.45)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, glow, 0, Math.PI * 2);
    ctx.fill();

    // Bệ đá Tinh Vân
    ctx.fillStyle = '#311b92';
    ctx.fillRect(cx - 38, cy + 6, 76, 16);
    ctx.fillStyle = '#00e5ff';
    ctx.fillRect(cx - 30, cy + 2, 60, 6);

    // Đôi cánh & Thân Kỳ Lân Tinh Vân Pixel
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(cx - 32, cy - 22 + bob, 14, 10);
    ctx.fillRect(cx + 18, cy - 22 + bob, 14, 10);
    ctx.fillStyle = '#e040fb';
    ctx.fillRect(cx - 18, cy - 24 + bob, 36, 24);
    ctx.fillStyle = '#00e5ff';
    ctx.fillRect(cx - 12, cy - 18 + bob, 24, 14);
    // Sừng Hoàng Kim & Mắt sáng
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(cx - 4, cy - 36 + bob, 8, 12);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 8, cy - 14 + bob, 5, 5);
    ctx.fillRect(cx + 3, cy - 14 + bob, 5, 5);

    // Thanh Máu Boss (HP Bar)
    const barW = 84;
    const barH = 8;
    const pct = Math.max(0, Math.min(1, hp / Math.max(1, maxHp)));
    ctx.fillStyle = '#120824';
    ctx.fillRect(cx - barW / 2, cy - 46, barW, barH);
    ctx.fillStyle = '#ff1744';
    ctx.fillRect(cx - barW / 2 + 1, cy - 45, (barW - 2) * pct, barH - 2);
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - barW / 2, cy - 46, barW, barH);

    this.drawPixelBadgeLabel(
      ctx,
      cx,
      cy + 25,
      `👾 KỲ LÂN Lv.${bossLv} (${hp}/${maxHp} HP)`,
      'rgba(49, 27, 146, 0.95)',
      '#00e5ff',
      '#ffea00'
    );
    ctx.restore();
  }

  drawArtisanWorkshop(ctx, px, py, size, gps = 0, time = 0) {
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.28)';
    ctx.fillRect(px + 4, py + size - 6, size - 8, 6);

    ctx.fillStyle = gps > 0 ? '#6a1b9a' : '#4e342e';
    ctx.fillRect(px + 5, py + 10, size - 10, size - 14);
    ctx.fillStyle = gps > 0 ? '#ffd54f' : '#8d6e63';
    ctx.fillRect(px + 3, py + 7, size - 6, 6);

    ctx.fillStyle = gps > 0 ? '#76ff03' : '#b0bec5';
    const pulseH = gps > 0 ? Math.abs(Math.sin(time * 5)) * 4 : 0;
    ctx.fillRect(px + 14, py + 17 - pulseH, size - 28, 12 + pulseH);

    const label = gps > 0 ? `+${gps}G/s` : 'XƯỞNG';
    this.drawPixelBadgeLabel(
      ctx,
      px + size / 2,
      py + 5,
      label,
      gps > 0 ? 'rgba(27, 94, 32, 0.92)' : 'rgba(58, 34, 18, 0.9)',
      gps > 0 ? '#76ff03' : '#ffd54f',
      '#ffffff'
    );
    ctx.restore();
  }

  drawFarmhouse(ctx, x, y, tileSize, isNight, isGoldenMansion = false) {
    const w = tileSize * 3;
    const h = tileSize * 2.2;
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.28)';
    ctx.fillRect(x + 6, y + h - 8, w - 8, 12);

    ctx.fillStyle = isGoldenMansion ? '#fff8e1' : '#d7a15c';
    ctx.fillRect(x + 8, y + tileSize * 0.85, w - 16, tileSize * 1.25);
    ctx.fillStyle = isGoldenMansion ? '#ffe082' : '#b07838';
    for (let ry = y + tileSize; ry < y + tileSize * 2.0; ry += 8) {
      ctx.fillRect(x + 8, ry, w - 16, 2);
    }

    ctx.fillStyle = isGoldenMansion ? '#f57f17' : '#8e2424';
    ctx.fillRect(x, y + tileSize * 0.5, w, tileSize * 0.42);
    ctx.fillStyle = isGoldenMansion ? '#ffb300' : '#b73232';
    ctx.fillRect(x + 6, y + tileSize * 0.22, w - 12, tileSize * 0.32);
    ctx.fillStyle = isGoldenMansion ? '#ffd54f' : '#d44646';
    ctx.fillRect(x + 16, y, w - 32, tileSize * 0.26);

    ctx.fillStyle = isGoldenMansion ? '#6a1b9a' : '#5d3a1a';
    ctx.fillRect(x + 22, y + tileSize * 1.25, 24, tileSize * 0.85);
    ctx.fillStyle = '#ffd54f';
    ctx.fillRect(x + 40, y + tileSize * 1.65, 4, 4);

    ctx.fillStyle = '#4a2c18';
    ctx.fillRect(x + w - 56, y + tileSize * 1.2, 32, 26);
    ctx.fillStyle = isNight ? '#ffeb3b' : '#81d4fa';
    ctx.fillRect(x + w - 52, y + tileSize * 1.2 + 4, 24, 18);

    const label = isGoldenMansion ? 'BIỆT THỰ HOÀNG KIM' : 'NHÀ CHÍNH (NGỦ)';
    this.drawPixelBadgeLabel(ctx, x + w / 2, y + tileSize * 0.65, label, 'rgba(74, 44, 24, 0.9)', '#ffd54f', '#fff8e7');
    ctx.restore();
  }

  drawSacredStarTree(ctx, x, y, tileSize, treeLevel, time) {
    const cx = x + tileSize;
    const cy = y + tileSize * 1.35;
    ctx.save();

    ctx.fillStyle = '#607d8b';
    ctx.fillRect(cx - 40, cy - 12, 80, 22);
    ctx.fillStyle = '#90a4ae';
    ctx.fillRect(cx - 34, cy - 16, 68, 18);

    const glowRadius = 24 + treeLevel * 8 + Math.sin(time * 3) * 4;
    const grad = ctx.createRadialGradient(cx, cy - 28, 4, cx, cy - 28, glowRadius);
    grad.addColorStop(0, 'rgba(224, 64, 251, 0.6)');
    grad.addColorStop(1, 'rgba(128, 216, 255, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy - 28, glowRadius, 0, Math.PI * 2);
    ctx.fill();

    const trunkW = 14 + treeLevel * 3;
    const trunkH = 26 + treeLevel * 6;
    ctx.fillStyle = '#6d4c41';
    ctx.fillRect(cx - trunkW / 2, cy - trunkH, trunkW, trunkH);

    const canopyRadius = 18 + treeLevel * 6;
    ctx.fillStyle = treeLevel >= 4 ? '#ab47bc' : '#26a69a';
    ctx.fillRect(cx - canopyRadius, cy - trunkH - canopyRadius * 0.8, canopyRadius * 2, canopyRadius * 1.1);
    ctx.fillStyle = treeLevel >= 5 ? '#ea80fc' : '#4db6ac';
    ctx.fillRect(cx - canopyRadius * 0.75, cy - trunkH - canopyRadius * 1.2, canopyRadius * 1.5, canopyRadius * 0.9);

    for (let i = 0; i < treeLevel + 1; i++) {
      const sx = cx - canopyRadius * 0.6 + (i * 13) % (canopyRadius * 1.2);
      const sy = cy - trunkH - 12 - (i * 7) % 18;
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(sx, sy, 5, 5);
    }

    this.drawPixelBadgeLabel(ctx, cx, cy + 16, `ĐẠI THỤ CẤP ${treeLevel}/5`, 'rgba(49, 27, 146, 0.88)', '#ea80fc', '#ffd54f');
    ctx.restore();
  }

  drawShippingBin(ctx, x, y, tileSize) {
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(x + 4, y + tileSize - 6, tileSize - 8, 6);
    ctx.fillStyle = '#6d4c41';
    ctx.fillRect(x + 6, y + 12, tileSize - 12, tileSize - 16);
    ctx.fillStyle = '#ffb300';
    ctx.fillRect(x + 4, y + 8, tileSize - 8, 8);
    this.drawPixelBadgeLabel(ctx, x + tileSize / 2, y + 28, 'BÁN ĐỒ', 'rgba(74, 44, 24, 0.9)', '#ffd54f', '#ffd54f');
    ctx.restore();
  }
}

window.SPRITES = new PixelSpriteRenderer();
