/**
 * ============================================================================
 * THUNG LŨNG SAO BĂNG (STARLIGHT VALLEY v11.0 - MYTHIC ASTRAL GENESIS EDITION:
 * 5 REALMS, ASTRAL WORLD BOSS, 14 MULTI-STAGE PIXEL CROPS & 5 HYBRID RECIPES,
 * +20 FORGE & WEAPON AWAKENING ★1-★5, SET RESONANCE WINGS & 15 STORY CHAPTERS)
 * js/ui.js
 * ============================================================================
 */

class GameUI {
  constructor(game) {
    this.game = game;
    this.currentGroup = 'shop';
    this.activeModalTab = 'forge';

    this.MODAL_GROUPS = {
      quests: {
        title: '🏆 Đế Chế, 5 Thế Giới, Boss Tinh Vân, Tháp & Kỹ Năng',
        tabs: [
          { id: 'empire', label: '🗺️ 5 Bản Đồ, Boss, Tháp & Luân Hồi' },
          { id: 'mastery', label: '⭐ Kỹ Năng & 14 Cây Thông Thạo' },
          { id: 'story', label: '🌟 Cốt Truyện (15 Chương)' },
          { id: 'commissions', label: '🤝 Ủy Thác Dân Làng' }
        ]
      },
      shop: {
        title: '🔨 Lò Rèn (+20, Thức Tỉnh ★ & Phụ Ma), Viện Lai Tạo 14 Cây & Xưởng',
        tabs: [
          { id: 'forge', label: '🔨 Đập Đồ (+20), Thức Tỉnh ★ & Ngọc' },
          { id: 'seeds', label: '🧬 Viện Lai Tạo & 14 Giống Cây' },
          { id: 'passive', label: '🏭 6 Xưởng Tự Động (+G/s)' },
          { id: 'animals', label: '🐔 Vật Nuôi & Máy' },
          { id: 'upgrades', label: '🏰 Biệt Thự & Phụ Kiện' },
          { id: 'starshop', label: '🌠 Phép Sao Băng' }
        ]
      },
      shrine: {
        title: '🏛️ Đền Thờ Đại Thụ, Nhà Bếp & Kho Đồ',
        tabs: [
          { id: 'bundles', label: '🏛️ Hiến Tế Đại Thụ' },
          { id: 'kitchen', label: '🍳 Nhà Bếp (9 Món)' },
          { id: 'inventory', label: '🧺 Kho Nông Sản' }
        ]
      },
      guide: {
        title: '📖 Cẩm Nang & Bách Khoa Sưu Tầm',
        tabs: [
          { id: 'almanac', label: '📚 Bách Khoa (27 Món)' },
          { id: 'rules', label: '🎮 Mẹo Chơi & Đồng Bộ Save' }
        ]
      }
    };
  }

  pixelIconHtml(key, fallbackEmoji = '🌟', size = 20) {
    if (window.PIXEL_ICONS && window.PIXEL_ICONS[key]) {
      return `<img src="${window.PIXEL_ICONS[key]}" alt="${key}" style="width:${size}px;height:${size}px;image-rendering:pixelated;vertical-align:middle;" />`;
    }
    return `<span>${fallbackEmoji}</span>`;
  }

  showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const div = document.createElement('div');
    div.className = 'toast-msg';
    div.textContent = msg;
    container.appendChild(div);
    setTimeout(() => {
      if (div.parentNode) div.parentNode.removeChild(div);
    }, 2700);
  }

  showDialogue(npcId, customText = null) {
    const npc = window.GAME_CONFIG.NPCS[npcId] || window.GAME_CONFIG.NPCS.lumia;
    const box = document.getElementById('rpg-dialogue');
    document.getElementById('dlg-avatar').textContent = npc.icon;
    document.getElementById('dlg-speaker').textContent = `${npc.name} — ${npc.role}`;
    document.getElementById('dlg-text').textContent = customText || npc.quote;
    box.classList.add('active');
  }

  hideDialogue() {
    document.getElementById('rpg-dialogue').classList.remove('active');
  }

  updateHUD() {
    const g = this.game;
    const season = g.world.getCurrentSeason();
    const rankObj = g.getCurrentPrestigeRank();
    const gps = g.getPassiveGoldPerSec();

    document.getElementById('hud-gold').textContent = Math.floor(g.gold).toLocaleString('vi-VN');
    const gpsEl = document.getElementById('hud-passive-gps');
    if (gpsEl) {
      gpsEl.textContent = gps > 0 ? `(+${gps}G/s)` : '';
    }
    const stonesEl = document.getElementById('hud-stones');
    if (stonesEl) {
      stonesEl.textContent = g.refineStones;
    }
    document.getElementById('hud-stars').textContent = g.starShards;
    document.getElementById('hud-season').textContent = `${season.icon} ${season.name.replace('Mùa ', '')}`;
    document.getElementById('hud-day').textContent = `N.${g.world.day}`;
    document.getElementById('hud-clock').textContent = g.world.getFormattedClock();

    const weatherIcons = { sunny: '☀️', rainy: '🌧️', meteor: '🌠' };
    document.getElementById('hud-weather').textContent = weatherIcons[g.world.weather] || '☀️';

    const energyPct = Math.max(0, Math.min(100, (g.energy / g.maxEnergy) * 100));
    document.getElementById('energy-bar').style.width = `${energyPct}%`;
    document.getElementById('energy-text').textContent = `${Math.floor(g.energy)}/${g.maxEnergy}`;
    const ascBadge = g.ascensionCount > 0 ? ` ★${g.ascensionCount}` : '';
    document.getElementById('level-text').textContent = `${rankObj.icon} Lv.${g.level}${ascBadge}`;

    const smartBtn = document.getElementById('btn-smart-mode');
    if (smartBtn) {
      smartBtn.className = g.smartMode ? 'nav-icon-btn active-mode desktop-action-btn' : 'nav-icon-btn desktop-action-btn';
      smartBtn.textContent = g.smartMode ? '✨ 1-Chạm: BẬT' : '🛠️ 1-Chạm: TẮT';
    }

    const smartTopBtn = document.getElementById('btn-smart-top');
    if (smartTopBtn) {
      smartTopBtn.className = g.smartMode ? 'nav-icon-btn active-mode mobile-only-btn' : 'nav-icon-btn mobile-only-btn';
      smartTopBtn.textContent = g.smartMode ? '✨ 1-Chạm' : '🛠️ Thủ Công';
    }

    const zoomBtn = document.getElementById('btn-zoom');
    if (zoomBtn) {
      zoomBtn.textContent = g.cameraZoom > 1 ? '🔍 1.35x' : '🔍 1x';
      zoomBtn.classList.toggle('active-mode', g.cameraZoom > 1);
    }

    this.updateRealmSwitcherBar();
    this.updateStepGuidePill();
    this.updateNotificationDots();
    this.renderSeedStrip();
    this.renderHotbar();
  }

  updateRealmSwitcherBar() {
    const g = this.game;
    const mapBtns = [
      { id: 'valley', elId: 'btn-map-valley', label: '🏡 Thung Lũng' },
      { id: 'crystal_cavern', elId: 'btn-map-cavern', label: '⛏️ Động Pha Lê' },
      { id: 'sky_island', elId: 'btn-map-sky', label: '🌌 Thiên Không' },
      { id: 'dragon_sanctum', elId: 'btn-map-dragon', label: '🔥 Thần Long' },
      { id: 'astral_nexus', elId: 'btn-map-astral', label: '🪐 Tinh Tú' }
    ];
    mapBtns.forEach(m => {
      const btn = document.getElementById(m.elId);
      if (!btn) return;
      const isUnlocked = !!g.unlockedMaps[m.id];
      const isActive = g.world.currentMap === m.id;
      btn.className = 'realm-pill' + (isActive ? ' active' : '') + (!isUnlocked ? ' locked' : '');
      btn.textContent = isUnlocked ? m.label : `🔒 ${m.label.split(' ').slice(1).join(' ')}`;
    });
  }

  updateStepGuidePill() {
    const g = this.game;
    const pill = document.getElementById('step-guide-pill');
    if (!pill) return;

    if (g.feverTimer > 0) {
      pill.style.borderColor = '#ffea00';
      pill.style.background = 'linear-gradient(90deg, rgba(183,28,28,0.95), rgba(245,127,23,0.95))';
      pill.textContent = `🔥 CƠN SỐT HOÀNG KIM (${Math.ceil(g.feverTimer)}s): Cây lớn x3 tốc độ • Thu hoạch x2 Vàng • 0 tốn sức!`;
      return;
    }

    pill.style.borderColor = 'var(--gold)';
    pill.style.background = 'rgba(24, 16, 38, 0.92)';

    const readyMs = window.GAME_CONFIG.EMPIRE_MILESTONES.find(
      m => !g.claimedMilestones.includes(m.id) && g.empirePoints >= m.pointsNeeded
    );
    if (readyMs) {
      pill.textContent = `🏆 Đạt "${readyMs.title}"! Chạm vào đây để nhận ${readyMs.rewardText}!`;
      return;
    }

    if (g.stats.harvested < 2) {
      pill.textContent = '👆 Bước 1/3: Chạm vào 2 cây Củ Cải Đỏ chín & 🎁 Rương Báu trên đồng!';
    } else if ((g.stats.enhanceSuccesses || 1) < 2 && g.refineStones >= 2) {
      pill.textContent = `🔨 Bước 2/3: Bạn có ${g.refineStones} 🪨 Đá Cường Hóa! Chạm vào đây để Đập Đồ (+20), Thức Tỉnh ★ & Khảm Ngọc!`;
    } else if (g.unlockedMaps.crystal_cavern && g.world.currentMap === 'valley' && (g.stats.oresMined || 0) < 1) {
      pill.textContent = '⛏️ Đã mở ĐỘNG PHA LÊ! Chạm nút "⛏️ Động Pha Lê" trên thanh trên để sang map đào Đá Rèn & Ngọc Quý!';
    } else {
      const mapCfg = g.world.getCurrentMapConfig();
      const hotCrop = window.GAME_CONFIG.CROPS[g.hotCropId] || window.GAME_CONFIG.CROPS.radish;
      const maxPlus = g.getHighestToolPlus();
      const towerFl = g.starlightTowerFloor || 1;
      pill.textContent = `${mapCfg.shortName} • ⚡ Thần Khí +${maxPlus} • 🗼 Tháp Tầng ${towerFl} • 🔥 Sốt giá: ${hotCrop.emoji}${hotCrop.name} (x1.6G)`;
    }
  }

  updateNotificationDots() {
    const g = this.game;
    const chap = window.GAME_CONFIG.STORY_CHAPTERS.find(c => c.chapter === g.storyChapter);
    const chapReady = chap && chap.check(g);
    const questReady = g.quests.some(q => g.getQuestProgress(q) >= q.target);
    const msReady = window.GAME_CONFIG.EMPIRE_MILESTONES.some(
      m => !g.claimedMilestones.includes(m.id) && g.empirePoints >= m.pointsNeeded
    );
    const towerReady = g.empirePoints >= g.getTowerRequiredPoints();
    const showQ = !!(chapReady || questReady || g.skillPoints > 0 || g.wheelTickets > 0 || msReady || towerReady);

    ['dot-quests', 'dot-quests-mob'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('show', showQ);
    });

    const canForge = g.refineStones >= 2 && g.gold >= 120;
    ['dot-forge', 'dot-forge-mob'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('show', canForge);
    });

    const bundleReady = window.GAME_CONFIG.BUNDLES.some(b =>
      !g.completedBundles.includes(b.id) &&
      Object.entries(b.requirements).every(([k, q]) => (g.inventory[k] || 0) >= q)
    );
    ['dot-shrine', 'dot-shrine-mob'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('show', !!bundleReady);
    });
  }

  renderSeedStrip() {
    const g = this.game;
    const strip = document.getElementById('seed-strip');
    if (!strip) return;
    strip.innerHTML = '';

    Object.values(window.GAME_CONFIG.CROPS).forEach(crop => {
      const count = g.seeds[crop.id] || 0;
      const isHot = g.hotCropId === crop.id;
      const masteryInfo = g.getCropMasteryInfo(crop.id);
      const geneLvl = g.getCropGeneLevel(crop.id);
      const pill = document.createElement('div');
      pill.className = 'seed-pill' + (g.selectedSeed === crop.id ? ' active' : '');
      pill.title = `${crop.name} [Gen G${geneLvl}] ${masteryInfo.stars}${isHot ? ' [🔥 ĐANG SỐT GIÁ x1.6!]' : ''} — ${crop.specialEffectDesc} (Có: ${count} hạt)`;
      pill.onclick = () => {
        g.selectedSeed = crop.id;
        this.updateHUD();
      };
      pill.innerHTML = `
        ${this.pixelIconHtml(crop.id, crop.emoji, 18)}
        <span class="seed-pill-count">${count}</span>
      `;
      strip.appendChild(pill);
    });
  }

  renderHotbar() {
    const g = this.game;
    const tools = [
      { id: 'smart', key: '1', iconKey: 'tool_smart', emoji: '✨', label: 'Tự Động', count: '' },
      { id: 'hoe', key: '2', iconKey: 'tool_hoe', emoji: '⛏️', label: 'Cuốc', count: (g.upgrades.hoe_2 || g.getToolEnhanceState('hoe').plus >= 3) ? '3x3' : '' },
      { id: 'water', key: '3', iconKey: 'tool_water', emoji: '💧', label: 'Tưới', count: (g.upgrades.watering_can_2 || g.getToolEnhanceState('water').plus >= 3) ? '3x3' : '' },
      { id: 'seed', key: '4', iconKey: 'tool_seed', emoji: '🌱', label: 'Gieo', count: g.seeds[g.selectedSeed] || 0 },
      { id: 'scythe', key: '5', iconKey: 'tool_scythe', emoji: '🧺', label: 'Gặt', count: '' },
      { id: 'sprinkler', key: '6', iconKey: 'sprinkler', emoji: '💦', label: 'Vòi 3x3', count: g.devices.sprinkler || 0 },
      { id: 'lantern', key: '7', iconKey: 'lantern', emoji: '🏮', label: 'Đèn 3x3', count: g.devices.lantern || 0 },
      { id: 'rod', key: '8', iconKey: 'tool_rod', emoji: '🎣', label: 'Câu Cá', count: '' }
    ];

    const bar = document.getElementById('hotbar-slots');
    if (!bar) return;
    bar.innerHTML = '';
    tools.forEach(t => {
      const slot = document.createElement('div');
      let rarityClass = '';
      let plusBadgeHtml = '';
      let gemDotsHtml = '';

      if (['hoe', 'water', 'scythe', 'rod'].includes(t.id)) {
        const enh = g.getToolEnhanceState(t.id);
        if (enh.plus > 0) {
          const stepCfg = window.GAME_CONFIG.getEnhanceStepConfig(enh.plus);
          rarityClass = ' ' + stepCfg.cssClass;
          const awkStr = enh.awaken > 0 ? `★${enh.awaken}` : '';
          plusBadgeHtml = `<span class="slot-plus-badge" style="color:${stepCfg.color};">+${enh.plus}${awkStr}</span>`;
        }
        const filledSockets = enh.sockets.filter(Boolean);
        if (filledSockets.length > 0) {
          const dots = filledSockets.map(s => {
            const col = window.GAME_CONFIG.GEM_TYPES[s.type]?.color || '#ffd700';
            return `<span class="slot-gem-dot" style="background:${col}; color:${col};"></span>`;
          }).join('');
          gemDotsHtml = `<div class="slot-gems-row">${dots}</div>`;
        }
      }

      slot.className = 'hotbar-slot' + (g.selectedTool === t.id ? ' selected' : '') + rarityClass;
      slot.onclick = () => g.selectTool(t.id);
      slot.innerHTML = `
        <span class="slot-key">${t.key}</span>
        ${plusBadgeHtml}
        <span>${this.pixelIconHtml(t.iconKey, t.emoji, 19)}</span>
        <span class="slot-label">${t.label}</span>
        ${t.count !== '' ? `<span class="slot-count">${t.count}</span>` : ''}
        ${gemDotsHtml}
      `;
      bar.appendChild(slot);
    });
  }

  updateTileInspector(tile) {
    const pill = document.getElementById('hover-micro-pill');
    if (!pill) return;

    if (this.game.comboCount >= 2 && !tile) {
      pill.textContent = `🔥 CHUỖI COMBO x${this.game.comboCount}/8 — Đạt x8 để nổ Cơn Sốt Hoàng Kim!`;
      pill.classList.add('visible');
      return;
    }

    if (!tile) {
      pill.classList.remove('visible');
      return;
    }

    let text = '';
    if (tile.obstacle === 'chest') {
      text = `🎁 Rương Kho Báu Cổ Xưa — Chạm để mở Đá Cường Hóa, Ngọc Quý & Vàng!`;
    } else if (tile.obstacle === 'ore_astral') {
      text = `☄️ Mỏ Thiên Thạch Thái Cổ — Chạm để đào (+1 Ngọc Thần Châu Cấp 3 & +4~6 🪨 Đá Rèn)!`;
    } else if (tile.obstacle === 'ore_dragon') {
      text = `🔥 Mỏ Hỏa Ngọc Thần Long — Chạm để đào (+1 Ngọc Tinh Khiết Cấp 2 & +2~4 🪨 Đá Rèn)!`;
    } else if (tile.obstacle === 'ore_stone') {
      text = `🪨 Mỏ Tinh Thể Đá Cường Hóa — Chạm để khai thác (+1~3 Đá Rèn Thần Khí)!`;
    } else if (tile.obstacle === 'ore_gem') {
      text = `💎 Mỏ Bảo Thạch Tinh Tú — Chạm để khai thác (+1 Ngọc Khảm Nạm)!`;
    } else if (tile.obstacle === 'ore_gold') {
      text = `💰 Mạch Quặng Hoàng Kim — Chạm để khai thác (+120~260 Vàng ròng)!`;
    } else if (tile.type === 'realm_portal') {
      text = `🌀 Cổng Dịch Chuyển Đa Vũ Trụ — Chạm để chuyển giữa 5 Thế Giới!`;
    } else if (tile.type === 'cavern_anvil') {
      text = `🔨 Đe Rèn Cổ Đại — Chạm để Đập Đồ (+20), Thức Tỉnh ★, Phụ Ma & Khảm Ngọc!`;
    } else if (tile.type === 'ascension_altar') {
      text = `🌌 Đài Luân Hồi (★${this.game.ascensionCount || 0}) & 🗼 Tháp Tầng ${this.game.starlightTowerFloor || 1} — Chạm để Thăng Hoa & Vượt Tháp!`;
    } else if (tile.type === 'dragon_shrine') {
      text = `🐉 Đài Thần Long Ban Phước — Chạm để triệu hồi Phước Lành Thần Long (Làm chín cây & Cơn Sốt)!`;
    } else if (tile.type === 'astral_boss') {
      text = `👾 Boss Kỳ Lân Tinh Vân Lv.${this.game.astralBossLevel || 1} (${this.game.astralBossHp}/${this.game.astralBossMaxHp} HP) — Chạm để vung Thần Khí tấn công nhận Kho Báu!`;
    } else if (tile.type === 'sacred_tree') {
      text = `🏛️ Đền Thờ Đại Thụ Cấp ${this.game.treeLevel}/5 — Chạm để Hiến Tế`;
    } else if (tile.type === 'water') {
      text = `🎣 Thủy Vực Sao Băng — Chạm để câu Cá Chép Koi & Rương Long Cung`;
    } else if (tile.type === 'shipping_bin') {
      text = `📦 Thùng Giao Hàng — Chạm để bán nhanh toàn bộ nông sản`;
    } else if (tile.type === 'kitchen_oven') {
      text = `🍳 Nhà Bếp — Chạm để nấu 9 món đặc sản (giá trị x2.5)`;
    } else if (tile.type === 'artisan_workshop') {
      const gps = this.game.getPassiveGoldPerSec();
      text = `🏭 Xưởng Tinh Chế Tự Động (${gps > 0 ? `+${gps}G/giây` : 'Chạm để xây dựng'})`;
    } else if (tile.type === 'house_zone') {
      text = `🏡 ${this.game.upgrades.house_tier_2 ? 'Biệt Thự Hoàng Kim' : 'Nhà Chính'} — Chạm để ngủ qua đêm & nhận lãi vàng`;
    } else if (tile.crop) {
      const cCfg = window.GAME_CONFIG.CROPS[tile.crop.id];
      const mInfo = this.game.getCropMasteryInfo(tile.crop.id);
      const geneLvl = this.game.getCropGeneLevel(tile.crop.id);
      const pct = Math.min(100, Math.floor(tile.crop.progress * 100));
      const mutTag = tile.crop.isMutated ? ' [🌠 Ánh Sao x4]' : (tile.crop.isGiant ? ' [✨ Khổng Lồ x3]' : '');
      text = `${cCfg.emoji} ${cCfg.name} [G${geneLvl}] ${mInfo.stars} (${pct}%)${mutTag} — ${tile.crop.stage === 4 ? '✔ Chạm để thu hoạch!' : (tile.watered ? '💧 Đang lớn' : '⚠ Chạm để tưới nước')}`;
    } else if (tile.obstacle) {
      const names = { weed: '🌿 Cỏ Dại', rock: '🪨 Đá Cuội', stump: '🪵 Gốc Cây' };
      text = `${names[tile.obstacle]} — Chạm để dọn sạch (+6 XP & tỉ lệ rớt 🪨 Đá Cường Hóa)`;
    } else if (tile.device) {
      const dCfg = window.GAME_CONFIG.DEVICES[tile.device];
      text = `${dCfg.icon} ${dCfg.name} đang hoạt động`;
    }

    if (text) {
      pill.textContent = text;
      pill.classList.add('visible');
    } else {
      pill.classList.remove('visible');
    }
  }

  openModalGroup(groupKey, defaultTab = null) {
    const group = this.MODAL_GROUPS[groupKey] || this.MODAL_GROUPS.shop;
    this.currentGroup = groupKey;
    this.activeModalTab = defaultTab || group.tabs[0].id;

    document.getElementById('modal-title-text').textContent = group.title;
    const tabsBar = document.getElementById('modal-tabs-bar');
    tabsBar.innerHTML = '';
    group.tabs.forEach(t => {
      const btn = document.createElement('button');
      btn.className = 'tab-btn' + (t.id === this.activeModalTab ? ' active' : '');
      btn.textContent = t.label;
      btn.onclick = () => {
        this.activeModalTab = t.id;
        this.openModalGroup(groupKey, t.id);
      };
      tabsBar.appendChild(btn);
    });

    document.getElementById('main-modal').classList.add('open');
    this.renderModalContent();
  }

  openModal(tabId) {
    for (const [gKey, gVal] of Object.entries(this.MODAL_GROUPS)) {
      if (gVal.tabs.some(t => t.id === tabId)) {
        this.openModalGroup(gKey, tabId);
        return;
      }
    }
    this.openModalGroup('shop', 'forge');
  }

  closeModal() {
    document.getElementById('main-modal').classList.remove('open');
  }

  showDaySummaryModal(summaryData) {
    const modal = document.getElementById('day-summary-modal');
    const content = document.getElementById('day-summary-body');
    if (!modal || !content) return;

    const rankObj = this.game.getCurrentPrestigeRank();

    content.innerHTML = `
      <div style="text-align:center; margin-bottom:10px; font-weight:800; color:#4a2c18;">
        Khép lại Ngày ${summaryData.endedDay} → Bước sang Ngày ${summaryData.newDay} (${summaryData.seasonName})
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
        <div class="shop-card">
          <div class="shop-meta">💰 Vàng kiếm được</div>
          <div class="shop-title" style="font-size:15px; color:#b26a00;">+${summaryData.goldEarnedToday.toLocaleString('vi-VN')}G</div>
        </div>
        <div class="shop-card">
          <div class="shop-meta">👑 Danh hiệu & Lãi Đế Chế</div>
          <div class="shop-title" style="font-size:13px; color:#6a1b9a;">${rankObj.icon} ${rankObj.title} (+${summaryData.passiveGold}G)</div>
        </div>
        <div class="shop-card">
          <div class="shop-meta">📈 Nông sản sốt giá hôm nay</div>
          <div class="shop-title" style="color:#d84315;">🔥 ${summaryData.hotCropName} (x1.6G)</div>
        </div>
        <div class="shop-card">
          <div class="shop-meta">🎁 Quà điểm danh & Tái tạo Mỏ</div>
          <div class="shop-title" style="color:#2e7d32;">+2 🪨 Đá Rèn • +1 🎟️ Vé Quay</div>
        </div>
      </div>
    `;
    modal.classList.add('open');
  }

  closeDaySummaryModal() {
    const modal = document.getElementById('day-summary-modal');
    if (modal) modal.classList.remove('open');
  }

  renderModalContent() {
    const g = this.game;
    const body = document.getElementById('modal-body-content');
    body.innerHTML = '';

    // ========================================================================
    // TAB 🔨 LÒ RÈN ĐẬP ĐỒ (+1 -> +20), THỨC TỈNH ★1-★5, CỘNG HƯỞNG BỘ & PHỤ MA
    // ========================================================================
    if (this.activeModalTab === 'forge') {
      const selToolId = g.selectedForgeTool || 'scythe';
      const toolCfg = window.GAME_CONFIG.SACRED_TOOLS.find(t => t.id === selToolId) || window.GAME_CONFIG.SACRED_TOOLS[0];
      const enh = g.getToolEnhanceState(selToolId);
      const isMax = enh.plus >= 20;
      const curStepCfg = enh.plus > 0 ? window.GAME_CONFIG.getEnhanceStepConfig(enh.plus) : { tierName: 'Phổ Thông', color: '#fff8e7' };
      const nextStepCfg = !isMax ? window.GAME_CONFIG.getEnhanceStepConfig(enh.plus + 1) : curStepCfg;
      const effChancePct = Math.round(g.getEffectiveEnhanceChance(selToolId) * 100);
      const canHammer = !isMax && g.refineStones >= nextStepCfg.stoneCost && g.gold >= nextStepCfg.goldCost;

      const curAwk = enh.awaken || 0;
      const isMaxAwk = curAwk >= 5;
      const awkStoneCost = (curAwk + 1) * 4;
      const awkStarCost = curAwk + 1;
      const canAwaken = !isMaxAwk && g.refineStones >= awkStoneCost && g.starShards >= awkStarCost;

      const resonance = g.getCurrentSetResonance();
      const totalPlus = g.getTotalToolPlus();
      const curAffix = enh.affix ? window.GAME_CONFIG.TOOL_AFFIX_POOL.find(a => a.id === enh.affix) : null;
      const canRerollAffix = g.refineStones >= 1 && g.gold >= 120;

      const anvilBox = document.createElement('div');
      anvilBox.className = 'forge-anvil-box';

      const toolTabsHtml = window.GAME_CONFIG.SACRED_TOOLS.map(t => {
        const st = g.getToolEnhanceState(t.id);
        const stCol = st.plus > 0 ? window.GAME_CONFIG.getEnhanceStepConfig(st.plus).color : '#cbbdd9';
        const awkStars = st.awaken > 0 ? ` ★${st.awaken}` : '';
        const gemDots = st.sockets.filter(Boolean).map(s => window.GAME_CONFIG.GEM_TYPES[s.type]?.icon || '💎').join('');
        return `
          <button class="forge-tool-tab ${t.id === selToolId ? 'active' : ''}" data-tool="${t.id}">
            <span style="font-size:18px;">${this.pixelIconHtml(t.pixelKey, t.icon, 22)}</span>
            <span>${t.name.split(' ')[0]} <b style="color:${stCol};">+${st.plus}${awkStars}</b></span>
            <span style="font-size:9.5px;">${gemDots || '⚪⚪⚪'}</span>
          </button>
        `;
      }).join('');

      const socketsHtml = [0, 1, 2].map(idx => {
        const s = enh.sockets[idx];
        if (!s) {
          return `
            <div class="socket-slot-box">
              <div style="font-size:16px; opacity:0.6;">◯</div>
              <div style="font-size:10px; color:#cbbdd9; font-weight:700;">Ô Khảm #${idx + 1} (Trống)</div>
              <div style="font-size:9.5px; color:#ffd54f;">Chọn ngọc bên dưới để khảm</div>
            </div>
          `;
        }
        const gCfg = window.GAME_CONFIG.GEM_TYPES[s.type];
        const bonusPct = Math.round((gCfg.tierValues[s.tier] || 0) * 100);
        return `
          <div class="socket-slot-box filled" data-unsocket="${idx}" style="cursor:pointer;" title="Chạm để tháo ngọc về túi">
            <div style="font-size:18px;">${gCfg.icon}</div>
            <div style="font-size:10.5px; font-weight:800; color:${gCfg.color};">${gCfg.name} Cấp ${s.tier}</div>
            <div style="font-size:9.5px; color:#76ff03;">+${bonusPct}% • [Chạm để tháo]</div>
          </div>
        `;
      }).join('');

      anvilBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; margin-bottom:6px;">
          <div style="font-weight:900; font-size:13.5px; color:#ffd54f;">
            🔨 Lò Rèn Thần Khí (+20) — Đang có: <span style="color:#80d8ff;">🪨 ${g.refineStones} Đá Rèn</span> • <span style="color:#ea80fc;">🌠 ${g.starShards} Sao</span>
          </div>
          <div style="display:flex; gap:5px;">
            <button id="btn-buy-stones" class="nav-icon-btn gold-btn">+5 🪨 Đá (150G)</button>
            <button id="btn-buy-gembag" class="nav-icon-btn purple-btn">💎 Mở Túi Ngọc (240G)</button>
          </div>
        </div>

        <!-- THANH CỘNG HƯỞNG BỘ 4 THẦN KHÍ (SET RESONANCE + PIXEL WINGS) -->
        <div style="background:rgba(255,215,0,0.12); border:1.5px solid ${resonance.wingColor || '#ffd54f'}; border-radius:7px; padding:6px 10px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
          <div style="font-size:11.5px; font-weight:800; color:#fff8e7;">
            🪽 <b style="color:${resonance.wingColor || '#ffd54f'};">${resonance.name}</b> (Tổng cấp 4 món: <b>+${totalPlus}</b>)
            — Thưởng bộ: <span style="color:#76ff03;">+${Math.round(resonance.bonusGoldMult * 100)}% Vàng & +${Math.round(resonance.bonusSpeedMult * 100)}% Tốc độ</span>
          </div>
          <div style="font-size:10.5px; color:#ffd54f;">
            ${resonance.nextTier ? `Mốc kế (+${resonance.nextTier.minTotalPlus}): ${resonance.nextTier.name}` : '🪐 Đạt Đỉnh Cộng Hưởng Sáng Thế!'}
          </div>
        </div>

        <div class="forge-tool-selector">
          ${toolTabsHtml}
        </div>

        <div style="background:rgba(0,0,0,0.38); border:2px solid ${curStepCfg.color}; border-radius:8px; padding:10px; margin-bottom:8px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <div>
              <div style="font-size:15px; font-weight:900; color:${curStepCfg.color};">
                ${toolCfg.icon} ${toolCfg.name} <span style="background:rgba(255,255,255,0.12); padding:1px 7px; border-radius:6px;">+${enh.plus}</span>
                <span style="color:#ffea00;">${'★'.repeat(curAwk)}</span>
                <span style="font-size:11.5px; font-weight:700; color:#ffd54f; margin-left:4px;">[${curStepCfg.tierName}]</span>
              </div>
              <div style="font-size:11px; color:#e0d4f5; margin-top:3px;">${toolCfg.baseEffectDesc}</div>
              <div style="font-size:10.5px; color:#80d8ff; margin-top:2px;">✨ ${toolCfg.milestoneDesc}</div>
            </div>

            <div style="text-align:right; min-width:175px;">
              ${isMax ? `<div style="color:#76ff03; font-weight:900;">🪐 ĐÃ ĐẠT CẢNH GIỚI THÁI CỔ +20!</div>` : `
                <div style="font-size:12px; font-weight:900; color:#76ff03;">
                  🎯 Tỷ lệ lên +${enh.plus + 1}: <span style="font-size:15px; color:#ffea00;">${effChancePct}%</span>
                  ${enh.pity > 0 ? `<span style="color:#ff80ab; font-size:10.5px;">(Chúc Phúc +${Math.round(enh.pity * 0.35)}%)</span>` : ''}
                </div>
                <div style="font-size:10.5px; color:#ffd54f; margin-top:2px;">
                  Cần: <b>🪨 ${nextStepCfg.stoneCost} Đá</b> + <b>💰 ${nextStepCfg.goldCost}G</b> (Xịt không tụt cấp!)
                </div>
              `}
            </div>
          </div>

          <!-- KHỐI THỨC TỈNH THẦN KHÍ (WEAPON AWAKENING ★1 -> ★5) & TẨY LUYỆN PHỤ MA -->
          <div style="margin-top:8px; display:grid; grid-template-columns:repeat(auto-fit, minmax(230px, 1fr)); gap:6px;">
            <div style="background:rgba(255,255,255,0.06); border:1px dashed ${curAffix ? curAffix.color : '#ab6f40'}; border-radius:6px; padding:6px 8px; display:flex; justify-content:space-between; align-items:center; gap:6px;">
              <div style="font-size:10.5px;">
                🔮 <b>Phụ Ma:</b>
                ${curAffix
                  ? `<span style="color:${curAffix.color}; font-weight:900;">[${curAffix.rarity}] ${curAffix.name}</span> (${curAffix.desc})`
                  : `<span style="color:#cbbdd9;">Chưa đúc</span>`}
              </div>
              <button id="btn-reroll-affix" class="nav-icon-btn purple-btn" ${!canRerollAffix ? 'disabled' : ''}>
                🎲 Tẩy Luyện (1🪨+120G)
              </button>
            </div>

            <div style="background:rgba(255,215,0,0.08); border:1px dashed #ffd700; border-radius:6px; padding:6px 8px; display:flex; justify-content:space-between; align-items:center; gap:6px;">
              <div style="font-size:10.5px;">
                ⚡ <b>Thức Tỉnh:</b> <span style="color:#ffea00; font-weight:900;">★${curAwk}/5</span>
                <span style="color:#76ff03;">(+${curAwk * 35}% uy lực nông cụ & sát thương Boss)</span>
              </div>
              <button id="btn-awaken-tool" class="nav-icon-btn gold-btn" ${!canAwaken ? 'disabled' : ''}>
                ${isMaxAwk ? '✔ Đạt ★5' : `⚡ Thức Tỉnh ★${curAwk + 1} (${awkStoneCost}🪨+${awkStarCost}🌠)`}
              </button>
            </div>
          </div>

          <div style="margin-top:8px;">
            <div style="display:flex; justify-content:space-between; font-size:10.5px; font-weight:800; color:#ffb74d; margin-bottom:2px;">
              <span>🔥 Thanh Chúc Phúc Thợ Rèn (Đập xịt tự tích lũy • Đầy 100% = Chắc chắn 100% lên cấp!)</span>
              <span>${enh.pity}/100%</span>
            </div>
            <div class="bar-track" style="height:8px; border-color:#ff9800;">
              <div style="height:100%; width:${enh.pity}%; background:linear-gradient(90deg, #ff6d00, #ffea00); transition:width 0.2s;"></div>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-top:10px;">
            <label style="display:flex; align-items:center; gap:5px; font-size:11px; font-weight:800; color:#ea80fc; cursor:pointer;">
              <input type="checkbox" id="chk-star-charm" ${g.useStarCharm ? 'checked' : ''} ${g.starShards <= 0 ? 'disabled' : ''} />
              🌠 Dùng Bùa Hộ Mệnh Sao Băng (+35% Tỷ lệ thành công - Tốn 1 🌠 Sao)
            </label>

            <button id="btn-hammer-enhance" class="nav-icon-btn gold-btn" style="padding:8px 16px; font-size:13px;" ${!canHammer ? 'disabled' : ''}>
              🔨 ĐẬP ĐỒ LÊN +${enh.plus + 1} (${effChancePct}%)
            </button>
          </div>

          ${g.lastForgeResult ? `
            <div style="margin-top:8px; padding:5px 9px; border-radius:6px; font-size:11.5px; font-weight:800; background:${g.lastForgeResult.success ? 'rgba(46,125,50,0.45)' : 'rgba(230,81,0,0.45)'}; border:1px solid ${g.lastForgeResult.success ? '#76ff03' : '#ffb74d'};">
              ${g.lastForgeResult.msg}
            </div>
          ` : ''}
        </div>

        <div style="font-weight:800; font-size:12px; color:#ffd54f; margin-bottom:5px;">
          💎 3 Ô Khảm Bảo Thạch Của ${toolCfg.name} (Chạm vào ô đã khảm để tháo ngọc miễn phí):
        </div>
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          ${socketsHtml}
        </div>
      `;

      anvilBox.querySelector('#btn-buy-stones').onclick = () => g.buyRefineStonePack(5, 150);
      anvilBox.querySelector('#btn-buy-gembag').onclick = () => g.buyMysteryGemBag(240);

      anvilBox.querySelectorAll('.forge-tool-tab').forEach(btn => {
        btn.onclick = () => {
          g.selectedForgeTool = btn.dataset.tool;
          g.lastForgeResult = null;
          this.renderModalContent();
        };
      });

      const rerollBtn = anvilBox.querySelector('#btn-reroll-affix');
      if (rerollBtn && canRerollAffix) {
        rerollBtn.onclick = () => g.rerollToolAffix(selToolId);
      }

      const awkBtn = anvilBox.querySelector('#btn-awaken-tool');
      if (awkBtn && canAwaken) {
        awkBtn.onclick = () => g.awakenTool(selToolId);
      }

      const charmChk = anvilBox.querySelector('#chk-star-charm');
      if (charmChk) {
        charmChk.onchange = () => {
          g.useStarCharm = charmChk.checked;
          this.renderModalContent();
        };
      }

      const hammerBtn = anvilBox.querySelector('#btn-hammer-enhance');
      if (hammerBtn && canHammer) {
        hammerBtn.onclick = () => g.attemptEnhanceTool(selToolId);
      }

      anvilBox.querySelectorAll('[data-unsocket]').forEach(box => {
        box.onclick = () => g.unsocketGemFromTool(selToolId, parseInt(box.dataset.unsocket, 10));
      });

      body.appendChild(anvilBox);

      Object.values(window.GAME_CONFIG.GEM_TYPES).forEach(gCfg => {
        [1, 2, 3, 4].forEach(tier => {
          const key = `${gCfg.id}_${tier}`;
          const count = g.gemInventory[key] || 0;
          if (count === 0 && tier > 1) return;
          const bonusPct = Math.round((gCfg.tierValues[tier] || 0) * 100);
          const canSocket = count > 0 && enh.sockets.some(s => s === null);
          const canFuse = tier < 4 && count >= 3;

          const card = document.createElement('div');
          card.className = 'shop-card';
          card.style.borderColor = gCfg.color;
          card.innerHTML = `
            <div>
              <div class="shop-card-top">
                <div class="shop-icon" style="border-color:${gCfg.color};">${gCfg.icon}</div>
                <div style="flex:1;">
                  <div class="shop-title">${gCfg.name} — ${window.GAME_CONFIG.GEM_TIER_NAMES[tier]}</div>
                  <div class="shop-meta" style="color:${gCfg.color};">+${bonusPct}% ${gCfg.statLabel}</div>
                  <div class="shop-desc">Trong túi: <b>${count} viên</b> ${tier < 4 ? `(Đủ 3 viên ép lên Cấp ${tier + 1})` : '— Bậc Thái Cổ ★★!'}</div>
                </div>
              </div>
            </div>
            <div style="display:flex; gap:5px;">
              <button class="nav-icon-btn purple-btn" data-socket="${key}" style="flex:1;" ${!canSocket ? 'disabled' : ''}>
                💎 Khảm Vào ${toolCfg.name.split(' ')[0]}
              </button>
              ${tier < 4 ? `
                <button class="nav-icon-btn gold-btn" data-fuse-type="${gCfg.id}" data-fuse-tier="${tier}" ${!canFuse ? 'disabled' : ''}>
                  ⚗️ Hợp Nhất (3➔1)
                </button>
              ` : ''}
            </div>
          `;
          const sockBtn = card.querySelector('[data-socket]');
          if (sockBtn && canSocket) {
            sockBtn.onclick = () => g.socketGemIntoTool(selToolId, key);
          }
          const fuseBtn = card.querySelector('[data-fuse-type]');
          if (fuseBtn && canFuse) {
            fuseBtn.onclick = () => g.fuseGems(gCfg.id, tier);
          }
          body.appendChild(card);
        });
      });
      return;
    }

    // ========================================================================
    // TAB 🗺️ 5 BẢN ĐỒ ĐA KHÔNG GIAN, 👾 BOSS, 🗼 THÁP VÔ TẬN & 🌌 LUÂN HỒI
    // ========================================================================
    if (this.activeModalTab === 'empire') {
      const realmBox = document.createElement('div');
      realmBox.className = 'banner-box';
      realmBox.style.gridColumn = '1 / -1';

      const mapsHtml = Object.values(window.GAME_CONFIG.MAPS).map(m => {
        const isUnlocked = !!g.unlockedMaps[m.id];
        const isCurrent = g.world.currentMap === m.id;
        const meetsCond = m.checkUnlock(g);
        const canBuyEarly = !isUnlocked && g.gold >= m.unlockCostGold;

        return `
          <div class="shop-card" style="border-color:${isCurrent ? '#00838f' : (isUnlocked ? '#2e7d32' : '#9e6b40')}; background:${isCurrent ? '#e0f7fa' : 'var(--parchment-card)'};">
            <div>
              <div class="shop-card-top">
                <div class="shop-icon">${m.icon}</div>
                <div>
                  <div class="shop-title">${m.name} ${isCurrent ? '<span style="color:#00838f;">(Đang ở đây)</span>' : ''}</div>
                  <div class="shop-meta">${isUnlocked ? '✔ Đã Mở Khóa' : `🔒 Điều kiện: ${m.unlockDesc}`}</div>
                </div>
              </div>
              <div class="shop-desc" style="margin-top:5px;">${m.themeDesc}</div>
            </div>
            ${isUnlocked ? `
              <button class="nav-icon-btn ${isCurrent ? 'active-mode' : 'gold-btn'}" data-travel="${m.id}">
                ${isCurrent ? '📍 Đang Ở Bản Đồ Này' : `🌀 Dịch Chuyển Tới ${m.shortName}`}
              </button>
            ` : `
              <button class="nav-icon-btn ${meetsCond ? 'purple-btn' : 'gold-btn'}" data-unlock="${m.id}" ${(!meetsCond && !canBuyEarly) ? 'disabled' : ''}>
                ${meetsCond ? '🔓 Mở Khóa Miễn Phí Ngay!' : `🔓 Mở Khóa Sớm (${m.unlockCostGold}G)`}
              </button>
            `}
          </div>
        `;
      }).join('');

      const ascCount = g.ascensionCount || 0;
      const ascReqWealth = g.getAscensionRequiredWealth();
      const canAscend = g.totalWealthEarned >= ascReqWealth || g.level >= 5;

      const towerFloor = g.starlightTowerFloor || 1;
      const towerReqPts = g.getTowerRequiredPoints();
      const canClimbTower = g.empirePoints >= towerReqPts;

      const bossLv = g.astralBossLevel || 1;
      const bossHp = g.astralBossHp || 500;
      const bossMaxHp = g.astralBossMaxHp || 500;
      const bossDmg = g.getPlayerBossDamage();

      realmBox.innerHTML = `
        <div style="font-weight:900; font-size:14px; color:#006064; margin-bottom:8px;">
          🗺️ Hệ Thống 5 Thế Giới Đa Không Gian (Cây trồng & Xưởng ở cả 5 Map sinh trưởng đồng thời!)
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:8px; margin-bottom:10px;">
          ${mapsHtml}
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:8px;">
          <!-- SĂN BOSS KỲ LÂN TINH VÂN -->
          <div style="background:linear-gradient(135deg, #1a0033, #4a148c); color:#fff8e7; border:2px solid #ff4081; border-radius:8px; padding:10px; display:flex; flex-direction:column; justify-content:space-between; gap:8px;">
            <div>
              <div style="font-weight:900; font-size:13px; color:#ff80ab;">
                👾 Boss Kỳ Lân Tinh Vân — Lv.${bossLv} (HP: ${bossHp}/${bossMaxHp})
              </div>
              <div style="font-size:11px; color:#f8bbd0; margin-top:3px;">
                Sát thương mỗi đòn của bạn: <b>⚔️ ${bossDmg} DMG</b> (tăng theo cấp Thần Khí +20 & Thức Tỉnh ★). Hạ Boss nổ <b>+12 🪨 Đá Rèn, +1 Hạt Yggdrasil 👑 & Vàng Lớn</b>!
              </div>
            </div>
            <button id="btn-strike-boss-modal" class="nav-icon-btn purple-btn">
              ⚔️ TẤN CÔNG BOSS NGAY (-${bossDmg} HP)
            </button>
          </div>

          <!-- THÁP THỬ THÁCH TINH TÚ VÔ TẬN -->
          <div style="background:linear-gradient(135deg, #004d40, #006064); color:#fff8e7; border:2px solid #00e5ff; border-radius:8px; padding:10px; display:flex; flex-direction:column; justify-content:space-between; gap:8px;">
            <div>
              <div style="font-weight:900; font-size:13px; color:#00e5ff;">
                🗼 Tháp Thử Thách Tinh Tú — Tầng ${towerFloor} (+${(towerFloor - 1) * 20}% Vàng)
              </div>
              <div style="font-size:11px; color:#b2ebf2; margin-top:3px;">
                Vượt mỗi tầng nhận <b>+1 Hạt Yggdrasil 👑, +8 🪨 Đá Rèn, +2 🌠 Sao</b> và cộng vĩnh viễn <b>+20% Giá bán toàn cục</b>! (Điểm Đế Chế: <b>${g.empirePoints}/${towerReqPts}</b>)
              </div>
            </div>
            <button id="btn-climb-tower" class="nav-icon-btn gold-btn" ${!canClimbTower ? 'disabled' : ''}>
              ${canClimbTower ? `🗼 VƯỢT TẦNG ${towerFloor} ➔ LÊN TẦNG ${towerFloor + 1}!` : `Cần ${towerReqPts} Điểm Đế Chế`}
            </button>
          </div>

          <!-- ĐÀI LUÂN HỒI THĂNG HOA VÔ TẬN -->
          <div style="background:linear-gradient(135deg, #311b92, #4a148c); color:#fff8e7; border:2px solid #ffd54f; border-radius:8px; padding:10px; display:flex; flex-direction:column; justify-content:space-between; gap:8px;">
            <div>
              <div style="font-weight:900; font-size:13px; color:#ffd54f;">
                🌌 Đài Luân Hồi Thăng Hoa — ★${ascCount} (Lợi nhuận x${(1 + ascCount * 1.0).toFixed(1)})
              </div>
              <div style="font-size:11px; color:#e1bee7; margin-top:3px;">
                Mỗi lần Thăng Hoa cộng vĩnh viễn <b>+100% Lợi Nhuận</b>, tặng <b>+15 🪨 Đá, +5 🌠 Sao, +2 👑 Yggdrasil</b> và <b>GIỮ NGUYÊN 100% Thần Khí, Ngọc & 5 Map</b>!
              </div>
            </div>
            <button id="btn-ascend-now" class="nav-icon-btn gold-btn" ${!canAscend ? 'disabled' : ''}>
              ${canAscend ? `🌌 THĂNG HOA LÊN ★${ascCount + 1} NGAY!` : `Cần Cấp 5 hoặc ${ascReqWealth.toLocaleString('vi-VN')}G`}
            </button>
          </div>
        </div>
      `;

      realmBox.querySelectorAll('[data-travel]').forEach(btn => {
        btn.onclick = () => {
          g.travelToMap(btn.dataset.travel);
          this.closeModal();
        };
      });
      realmBox.querySelectorAll('[data-unlock]').forEach(btn => {
        btn.onclick = () => {
          g.unlockMap(btn.dataset.unlock);
          this.renderModalContent();
        };
      });
      const bossBtn = realmBox.querySelector('#btn-strike-boss-modal');
      if (bossBtn) {
        bossBtn.onclick = () => g.strikeAstralBoss();
      }
      const towerBtn = realmBox.querySelector('#btn-climb-tower');
      if (towerBtn && canClimbTower) {
        towerBtn.onclick = () => g.climbStarlightTower();
      }
      const ascBtn = realmBox.querySelector('#btn-ascend-now');
      if (ascBtn && canAscend) {
        ascBtn.onclick = () => g.performAscension();
      }
      body.appendChild(realmBox);

      // 2. KHỐI VÒNG QUAY SAO BĂNG MAY MẮN
      const wheelBox = document.createElement('div');
      wheelBox.className = 'banner-box';
      wheelBox.style.gridColumn = '1 / -1';
      const canSpin = !g.isWheelSpinning && (g.wheelTickets > 0 || g.gold >= 220);

      const prizeGridHtml = window.GAME_CONFIG.LUCKY_WHEEL_PRIZES.map((p, idx) => {
        const isLastWon = g.lastWheelPrize && g.lastWheelPrize.id === p.id;
        return `
          <div class="wheel-prize-slot ${isLastWon ? 'wheel-active' : ''}" data-idx="${idx}" style="background:#fffdf7; border:2px solid ${isLastWon ? '#ff6f00' : '#c4a772'}; border-radius:8px; padding:7px 8px; display:flex; align-items:center; gap:7px;">
            <span style="font-size:20px;">${p.icon}</span>
            <div>
              <div style="font-weight:800; font-size:11.5px; color:#3e2413;">${p.label}</div>
              <div style="font-size:10px; color:#6b3b06;">${p.desc}</div>
            </div>
          </div>
        `;
      }).join('');

      wheelBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
          <div>
            <div style="font-weight:900; font-size:14px; color:#b26a00;">
              🎰 Vòng Quay Sao Băng May Mắn (Nhận thêm 1 🎟️ mỗi 10 nông sản thu hoạch!)
            </div>
            <div style="font-size:11.5px; color:#5c3b20;">
              Đang có: <b style="color:#6a1b9a;">🎟️ ${g.wheelTickets} Vé Quay Miễn Phí</b> • Điểm Đế Chế tích lũy: <b style="color:#2e7d32;">🏆 ${g.empirePoints} Điểm</b>
            </div>
          </div>
          <button id="btn-spin-wheel" class="nav-icon-btn ${g.wheelTickets > 0 ? 'purple-btn' : 'gold-btn'}" style="padding:8px 14px; font-size:12.5px;" ${!canSpin ? 'disabled' : ''}>
            ${g.isWheelSpinning ? '🎰 Đang Quay...' : (g.wheelTickets > 0 ? `🎰 QUAY NGAY (Dùng 1 🎟️)` : '🎰 Quay Ngay (220G)')}
          </button>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(185px, 1fr)); gap:6px;">
          ${prizeGridHtml}
        </div>
      `;
      const spinBtn = wheelBox.querySelector('#btn-spin-wheel');
      if (spinBtn && canSpin) {
        spinBtn.onclick = () => g.spinLuckyWheel();
      }
      body.appendChild(wheelBox);

      // 3. NẤC THANG THÀNH TỰU ĐẾ CHẾ
      window.GAME_CONFIG.EMPIRE_MILESTONES.forEach(ms => {
        const isClaimed = g.claimedMilestones.includes(ms.id);
        const isReady = !isClaimed && g.empirePoints >= ms.pointsNeeded;
        const pct = Math.min(100, Math.round((g.empirePoints / ms.pointsNeeded) * 100));

        const card = document.createElement('div');
        card.className = 'shop-card';
        if (isReady) card.style.borderColor = '#2e7d32';
        card.innerHTML = `
          <div>
            <div class="shop-card-top">
              <div class="shop-icon">${isClaimed ? '✅' : (isReady ? '🎁' : '🏆')}</div>
              <div style="flex:1;">
                <div class="shop-title">${ms.title}</div>
                <div class="shop-meta">Phần thưởng: ${ms.rewardText}</div>
                <div class="bar-track" style="height:7px; margin-top:4px;">
                  <div class="bar-fill-energy" style="width:${pct}%;"></div>
                </div>
                <div class="shop-desc" style="margin-top:2px;">
                  Tiến độ Điểm Đế Chế: <b>${Math.min(ms.pointsNeeded, g.empirePoints)}/${ms.pointsNeeded}</b> (${pct}%)
                </div>
              </div>
            </div>
          </div>
          <button class="nav-icon-btn ${isReady ? 'gold-btn' : ''}" ${!isReady ? 'disabled' : ''}>
            ${isClaimed ? '✔ Đã Nhận Thưởng' : (isReady ? '🎁 NHẬN THƯỞNG NGAY!' : `Cần thêm ${ms.pointsNeeded - g.empirePoints} Điểm Đế Chế`)}
          </button>
        `;
        if (isReady) {
          card.querySelector('button').onclick = () => g.claimEmpireMilestone(ms.id);
        }
        body.appendChild(card);
      });
      return;
    }

    // TAB 2: CÂY KỸ NĂNG TINH THÔNG & ĐỘ THÔNG THẠO 14 GIỐNG CÂY
    if (this.activeModalTab === 'mastery') {
      const rankObj = g.getCurrentPrestigeRank();
      const nextRank = g.getNextPrestigeRank();
      const buyPtCost = 220 + g.totalMasterySpent * 140;

      const topBox = document.createElement('div');
      topBox.className = 'banner-box';
      topBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div>
            <div style="font-weight:900; font-size:14px; color:#4a148c;">
              ${rankObj.icon} Danh Hiệu: ${rankObj.title} (Giá bán nông sản +${Math.round((g.getPriceMultiplier() - 1) * 100)}%)
            </div>
            <div style="font-size:11.5px; color:#5c3b20; margin-top:2px;">
              ${nextRank
                ? `Tích lũy tài sản đạt <b>${nextRank.minWealth.toLocaleString('vi-VN')}G</b> để thăng hạng <b>${nextRank.icon} ${nextRank.title}</b> (Hiện tại: ${Math.floor(g.totalWealthEarned).toLocaleString('vi-VN')}G)`
                : `🌌 Bạn đã đạt danh hiệu Đấng Sáng Thế Yggdrasil!`}
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="background:#4a148c; color:#ffd54f; padding:5px 10px; border-radius:6px; font-weight:800; font-size:12px;">
              ⭐ Điểm Tinh Thông: ${g.skillPoints}
            </span>
            <button id="btn-buy-skill-pt" class="nav-icon-btn gold-btn" ${g.gold < buyPtCost ? 'disabled' : ''}>
              +1 ⭐ (${buyPtCost}G)
            </button>
          </div>
        </div>
      `;
      topBox.querySelector('#btn-buy-skill-pt').onclick = () => g.buyMasteryPoint(buyPtCost);
      body.appendChild(topBox);

      window.GAME_CONFIG.MASTERY_SKILLS.forEach(sk => {
        const curLvl = g.mastery[sk.id] || 0;
        const isMax = curLvl >= sk.maxLevel;
        const canUp = !isMax && g.skillPoints > 0;
        const pct = Math.round((curLvl / sk.maxLevel) * 100);

        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
          <div>
            <div class="shop-card-top">
              <div class="shop-icon">${sk.icon}</div>
              <div style="flex:1;">
                <div class="shop-title">${sk.name} (Cấp ${curLvl}/${sk.maxLevel})</div>
                <div class="shop-meta">${sk.effectPerLevel}</div>
              </div>
            </div>
            <div class="bar-track" style="height:7px; margin:6px 0;">
              <div class="bar-fill-energy" style="width:${pct}%;"></div>
            </div>
            <div class="shop-desc">${sk.desc}</div>
          </div>
          <button class="nav-icon-btn ${canUp ? 'purple-btn' : ''}" ${!canUp ? 'disabled' : ''}>
            ${isMax ? '✔ Đã Đạt Tối Đa' : '⭐ Nâng Cấp (1 Điểm Tinh Thông)'}
          </button>
        `;
        if (canUp) {
          card.querySelector('button').onclick = () => g.upgradeMasterySkill(sk.id);
        }
        body.appendChild(card);
      });

      const cropHeader = document.createElement('div');
      cropHeader.className = 'banner-box';
      cropHeader.style.gridColumn = '1 / -1';
      cropHeader.innerHTML = `
        <div style="font-weight:900; font-size:13.5px; color:#2e7d32;">
          🌟 Độ Thông Thạo & Cấp Gen 14 Giống Cây (Thu hoạch nhiều lên Sao ★★★ • Đột biến Gen G1➔G5 tăng vĩnh viễn giá bán & tốc độ!)
        </div>
      `;
      body.appendChild(cropHeader);

      Object.values(window.GAME_CONFIG.CROPS).forEach(crop => {
        const m = g.getCropMasteryInfo(crop.id);
        const geneLvl = g.getCropGeneLevel(crop.id);
        const nextGoal = m.nextTier ? m.nextTier.minHarvests : m.minHarvests;
        const pct = m.nextTier ? Math.min(100, Math.round((m.count / nextGoal) * 100)) : 100;

        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
          <div class="shop-card-top">
            <div class="shop-icon">${this.pixelIconHtml(crop.id, crop.emoji, 26)}</div>
            <div style="flex:1;">
              <div class="shop-title">${crop.name} <span style="color:#00838f;">[Gen G${geneLvl}]</span> <span style="color:#d84315;">${m.stars || ''}</span></div>
              <div class="shop-meta">Hạng: ${m.name} • Giá x${(m.priceMult * (1 + (geneLvl - 1) * 0.30)).toFixed(2)} • Tốc độ x${(m.speedMult * (1 + (geneLvl - 1) * 0.15)).toFixed(2)}</div>
              <div class="bar-track" style="height:6px; margin-top:4px;">
                <div class="bar-fill-energy" style="width:${pct}%;"></div>
              </div>
              <div class="shop-desc" style="margin-top:2px;">
                Đã thu hoạch: <b>${m.count}</b> cây ${m.nextTier ? `(Cần ${m.nextTier.minHarvests} cây để lên <b>${m.nextTier.name}</b>)` : '— ✔ Đạt Đỉnh Hoàng Kim ★★★!'}
              </div>
            </div>
          </div>
        `;
        body.appendChild(card);
      });
      return;
    }

    // TAB 6 XƯỞNG TINH CHẾ TỰ ĐỘNG SINH LỜI MỖI GIÂY (+G/s)
    if (this.activeModalTab === 'passive') {
      const gps = g.getPassiveGoldPerSec();
      const topBanner = document.createElement('div');
      topBanner.className = 'banner-box';
      topBanner.style.gridColumn = '1 / -1';
      topBanner.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div>
            <div style="font-weight:900; font-size:14px; color:#1b5e20;">
              🏭 Dây Chuyền 6 Xưởng Tinh Chế Tự Động: Đang thu về <span style="color:#d84315;">+${gps} Vàng / giây</span> (+${gps * 60}G/phút)
            </div>
            <div style="font-size:11.5px; color:#5c3b20;">
              Tiền vàng tự động cộng thẳng vào ví mỗi giây, nhân thêm theo Hồng Ngọc Phú Quý, Cộng Hưởng Bộ & Cảnh Giới Thăng Hoa!
            </div>
          </div>
        </div>
      `;
      body.appendChild(topBanner);

      window.GAME_CONFIG.PASSIVE_BUILDINGS.forEach(b => {
        const lvl = (g.passiveBuildings && g.passiveBuildings[b.id]) || 0;
        const isMax = lvl >= b.maxLevel;
        const cost = g.getPassiveBuildingCost(b.id);
        const canBuy = !isMax && g.gold >= cost;
        const pct = Math.round((lvl / b.maxLevel) * 100);

        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
          <div>
            <div class="shop-card-top">
              <div class="shop-icon">${b.icon}</div>
              <div style="flex:1;">
                <div class="shop-title">${b.name} (Cấp ${lvl}/${b.maxLevel})</div>
                <div class="shop-meta">Sinh lời: +${lvl * b.goldPerSec}G/s (Tăng thêm +${b.goldPerSec}G/s mỗi cấp)</div>
              </div>
            </div>
            <div class="bar-track" style="height:7px; margin:6px 0;">
              <div class="bar-fill-energy" style="width:${pct}%;"></div>
            </div>
            <div class="shop-desc">${b.desc}</div>
          </div>
          <button class="nav-icon-btn ${canBuy ? 'gold-btn' : ''}" ${!canBuy ? 'disabled' : ''}>
            ${isMax ? '✔ Đã Đạt Cấp Tối Đa' : `🔨 ${lvl === 0 ? 'Xây Dựng Ngay' : 'Nâng Cấp'} (${cost.toLocaleString('vi-VN')}G)`}
          </button>
        `;
        if (canBuy) {
          card.querySelector('button').onclick = () => g.upgradePassiveBuilding(b.id);
        }
        body.appendChild(card);
      });
      return;
    }

    // TAB STORY (15 CHƯƠNG)
    if (this.activeModalTab === 'story') {
      window.GAME_CONFIG.STORY_CHAPTERS.forEach(chap => {
        const isCurrent = chap.chapter === g.storyChapter;
        const isDone = chap.chapter < g.storyChapter;
        const canClaim = isCurrent && chap.check(g);
        const pct = isDone ? 100 : (isCurrent ? Math.round(chap.progressRatio(g) * 100) : 0);
        const npc = window.GAME_CONFIG.NPCS[chap.npc] || window.GAME_CONFIG.NPCS.lumia;

        const card = document.createElement('div');
        card.className = 'shop-card';
        card.style.gridColumn = '1 / -1';
        if (isCurrent) card.style.borderColor = '#6a1b9a';
        card.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap;">
            <div class="shop-card-top" style="flex:1;">
              <div class="shop-icon">${npc.icon}</div>
              <div style="flex:1;">
                <div class="shop-title">${chap.title}</div>
                <div class="shop-desc">${chap.goalDesc}</div>
                <div class="bar-track" style="height:7px; margin-top:4px; max-width:280px;">
                  <div class="bar-fill-energy" style="width:${pct}%;"></div>
                </div>
                <div class="shop-meta" style="margin-top:2px;">
                  ${isDone ? '✔ Đã hoàn thành' : (isCurrent ? `Tiến độ (${pct}%): ${chap.progressText(g)}` : '🔒 Mở khóa sau chương trước')}
                </div>
              </div>
            </div>
            <div>
              ${canClaim
                ? `<button class="nav-icon-btn gold-btn">🎁 Nhận Thưởng (+${chap.rewardGold}G, +5🪨 & +1⭐)</button>`
                : `<span style="font-size:11.5px; font-weight:800; color:#6a1b9a;">💰+${chap.rewardGold}G | 🪨+5 | ⭐+1</span>`}
            </div>
          </div>
        `;
        if (canClaim) {
          card.querySelector('button').onclick = () => {
            g.completeStoryChapter();
            this.renderModalContent();
          };
        }
        body.appendChild(card);
      });
      return;
    }

    // TAB COMMISSIONS
    if (this.activeModalTab === 'commissions') {
      g.quests.forEach(q => {
        const npc = window.GAME_CONFIG.NPCS[q.npc] || window.GAME_CONFIG.NPCS.bamai;
        const current = Math.min(q.target, g.getQuestProgress(q));
        const isDone = current >= q.target;
        const pct = Math.round((current / q.target) * 100);

        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
          <div>
            <div class="shop-card-top">
              <div class="shop-icon">${npc.icon}</div>
              <div style="flex:1;">
                <div class="shop-title">${q.title}</div>
                <div class="shop-meta">Tiến độ: ${current}/${q.target} (${pct}%)</div>
                <div class="bar-track" style="height:6px; margin-top:3px;">
                  <div class="bar-fill-energy" style="width:${pct}%;"></div>
                </div>
              </div>
            </div>
            <div class="shop-desc" style="margin-top:5px;">Thưởng: 💰${q.rewardGold}G + 🪨3 Đá Rèn + 🎟️1 Vé Quay</div>
          </div>
          <button class="nav-icon-btn ${isDone ? 'gold-btn' : ''}" ${!isDone ? 'disabled' : ''}>
            ${isDone ? '🎁 Nhận Phần Thưởng' : `Còn thiếu ${q.target - current} nữa!`}
          </button>
        `;
        if (isDone) {
          card.querySelector('button').onclick = () => {
            g.claimQuest(q.id);
            this.renderModalContent();
          };
        }
        body.appendChild(card);
      });
      return;
    }

    // ========================================================================
    // TAB 🧬 VIỆN LAI TẠO GIỐNG SÁNG THẾ & CỬA HÀNG 14 GIỐNG CÂY PIXEL
    // ========================================================================
    if (this.activeModalTab === 'seeds') {
      const labBox = document.createElement('div');
      labBox.className = 'banner-box';
      labBox.style.gridColumn = '1 / -1';

      const recipesHtml = window.GAME_CONFIG.HYBRID_RECIPES.map(r => {
        const resCrop = window.GAME_CONFIG.CROPS[r.resultCrop];
        const pACrop = window.GAME_CONFIG.CROPS[r.parentA.id];
        const pBCrop = window.GAME_CONFIG.CROPS[r.parentB.id];
        const haveA = (g.inventory[r.parentA.id] || 0) + (g.seeds[r.parentA.id] || 0);
        const haveB = (g.inventory[r.parentB.id] || 0) + (g.seeds[r.parentB.id] || 0);
        const canBreed = haveA >= r.parentA.qty && haveB >= r.parentB.qty && g.gold >= r.goldCost;

        return `
          <div class="shop-card" style="border-color:#00838f; background:#f0fdfa;">
            <div>
              <div class="shop-card-top">
                <div class="shop-icon">${this.pixelIconHtml(resCrop.id, resCrop.emoji, 28)}</div>
                <div>
                  <div class="shop-title">🧬 Lai Tạo: +${r.resultQty} Hạt ${resCrop.name}</div>
                  <div class="shop-meta">Cần: ${pACrop.emoji}${pACrop.name} (${haveA}/${r.parentA.qty}) + ${pBCrop.emoji}${pBCrop.name} (${haveB}/${r.parentB.qty})</div>
                </div>
              </div>
              <div class="shop-desc" style="margin-top:4px;">${r.desc}</div>
            </div>
            <button class="nav-icon-btn purple-btn" data-breed="${r.id}" ${!canBreed ? 'disabled' : ''}>
              🧬 Ghép Giống Ngay (${r.goldCost}G)
            </button>
          </div>
        `;
      }).join('');

      labBox.innerHTML = `
        <div style="font-weight:900; font-size:13.5px; color:#006064; margin-bottom:6px;">
          🧬 Viện Nghiên Cứu Lai Tạo Giống & Đột Biến Gen (Hoặc trồng 2 cây bố mẹ cạnh nhau trên đồng để tự lai tạo!)
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:8px;">
          ${recipesHtml}
        </div>
      `;
      labBox.querySelectorAll('[data-breed]').forEach(btn => {
        btn.onclick = () => g.breedHybridCrop(btn.dataset.breed);
      });
      body.appendChild(labBox);

      Object.values(window.GAME_CONFIG.CROPS).forEach(crop => {
        const owned = g.seeds[crop.id] || 0;
        const isHot = g.hotCropId === crop.id;
        const effPrice = g.getItemSellPrice(crop.id);
        const mInfo = g.getCropMasteryInfo(crop.id);
        const geneLvl = g.getCropGeneLevel(crop.id);
        const isMaxGene = geneLvl >= 5;
        const geneStoneCost = geneLvl;
        const geneGoldCost = 150 * geneLvl;
        const canUpGene = !isMaxGene && g.refineStones >= geneStoneCost && g.gold >= geneGoldCost;

        const card = document.createElement('div');
        card.className = 'shop-card';
        if (isHot) card.style.borderColor = '#d84315';
        else if (crop.isHybrid) card.style.borderColor = '#7c4dff';

        card.innerHTML = `
          <div>
            <div class="shop-card-top">
              <div class="shop-icon">${this.pixelIconHtml(crop.id, crop.emoji, 28)}</div>
              <div>
                <div class="shop-title">
                  ${crop.name} <span style="color:#00838f; font-size:11px;">[Gen G${geneLvl}]</span>
                  <span style="color:#ff8f00;">${mInfo.stars}</span>
                  ${isHot ? '<span style="color:#d84315;font-size:10.5px;">🔥x1.6</span>' : ''}
                </div>
                <div class="shop-meta">⏱ ${Math.max(4, Math.round(crop.growTime / (mInfo.speedMult * (1 + (geneLvl - 1) * 0.15))))}s • 💰 Bán ${effPrice}G</div>
                <div class="shop-desc">${crop.specialEffectDesc}</div>
              </div>
            </div>
          </div>
          <div style="display:flex; flex-direction:column; gap:5px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:11px; font-weight:800;">Có: ${owned} hạt</span>
              <div style="display:flex; gap:4px;">
                <button class="nav-icon-btn" data-buy="${crop.id}" data-qty="1">+1 (${crop.seedPrice}G)</button>
                <button class="nav-icon-btn gold-btn" data-buy="${crop.id}" data-qty="5">+5 (${crop.seedPrice * 5}G)</button>
              </div>
            </div>
            <button class="nav-icon-btn ${canUpGene ? 'purple-btn' : ''}" data-upgene="${crop.id}" ${!canUpGene ? 'disabled' : ''}>
              ${isMaxGene ? '🧬 Đã Đạt Đỉnh Gen G5 (+120% Giá)' : `🧬 Nâng Gen G${geneLvl + 1} (+30% Giá • ${geneStoneCost}🪨 + ${geneGoldCost}G)`}
            </button>
          </div>
        `;
        card.querySelectorAll('[data-buy]').forEach(btn => {
          btn.onclick = () => g.buySeed(btn.dataset.buy, parseInt(btn.dataset.qty, 10));
        });
        const geneBtn = card.querySelector('[data-upgene]');
        if (geneBtn && canUpGene) {
          geneBtn.onclick = () => g.upgradeCropGene(crop.id);
        }
        body.appendChild(card);
      });
      return;
    }

    // TAB ANIMALS & DEVICES
    if (this.activeModalTab === 'animals') {
      Object.values(window.GAME_CONFIG.ANIMALS).forEach(anim => {
        const count = g.animals.filter(a => a.typeId === anim.id).length;
        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
          <div class="shop-card-top">
            <div class="shop-icon">${anim.icon}</div>
            <div>
              <div class="shop-title">${anim.name}</div>
              <div class="shop-meta">Tạo ${anim.produceIcon} (${anim.produceValue}G) mỗi ${anim.produceInterval}s</div>
            </div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:11.5px; font-weight:800;">Đang nuôi: ${count}</span>
            <button class="nav-icon-btn gold-btn">Mua (${anim.price}G)</button>
          </div>
        `;
        card.querySelector('button').onclick = () => g.buyAnimal(anim.id);
        body.appendChild(card);
      });

      Object.values(window.GAME_CONFIG.DEVICES).forEach(dev => {
        const count = g.devices[dev.id] || 0;
        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
          <div class="shop-card-top">
            <div class="shop-icon">${this.pixelIconHtml(dev.id, dev.icon, 26)}</div>
            <div>
              <div class="shop-title">${dev.name}</div>
              <div class="shop-meta">${dev.id === 'sprinkler' ? 'Tự động tưới nước vùng 3x3' : 'Tăng x2 đột biến vùng 3x3'}</div>
            </div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:11.5px; font-weight:800;">Trong túi: ${count}</span>
            <button class="nav-icon-btn">Mua (${dev.price}G)</button>
          </div>
        `;
        card.querySelector('button').onclick = () => g.buyDevice(dev.id);
        body.appendChild(card);
      });
      return;
    }

    // TAB UPGRADES
    if (this.activeModalTab === 'upgrades') {
      window.GAME_CONFIG.UPGRADES.forEach(up => {
        const isOwned = !!g.upgrades[up.id];
        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
          <div class="shop-card-top">
            <div class="shop-icon">${up.icon}</div>
            <div>
              <div class="shop-title">${up.name}</div>
              <div class="shop-desc">${up.desc}</div>
            </div>
          </div>
          <button class="nav-icon-btn ${isOwned ? '' : 'gold-btn'}" ${isOwned ? 'disabled' : ''}>
            ${isOwned ? '✔ Đã Sở Hữu' : `Nâng Cấp (${up.price}G)`}
          </button>
        `;
        if (!isOwned) {
          card.querySelector('button').onclick = () => g.buyUpgrade(up.id);
        }
        body.appendChild(card);
      });
      return;
    }

    // TAB STAR SHOP
    if (this.activeModalTab === 'starshop') {
      window.GAME_CONFIG.STAR_SHOP_ITEMS.forEach(item => {
        const canBuy = g.starShards >= item.starCost;
        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
          <div class="shop-card-top">
            <div class="shop-icon">${item.icon}</div>
            <div>
              <div class="shop-title">${item.name}</div>
              <div class="shop-desc">${item.desc}</div>
            </div>
          </div>
          <button class="nav-icon-btn purple-btn" ${!canBuy ? 'disabled' : ''}>
            🌠 Dùng ${item.starCost} Mảnh Sao
          </button>
        `;
        if (canBuy) {
          card.querySelector('button').onclick = () => g.useStarShopItem(item.id);
        }
        body.appendChild(card);
      });
      return;
    }

    // TAB BUNDLES
    if (this.activeModalTab === 'bundles') {
      window.GAME_CONFIG.BUNDLES.forEach(b => {
        const isDone = g.completedBundles.includes(b.id);
        const reqListHtml = Object.entries(b.requirements).map(([itemKey, needQty]) => {
          const haveQty = g.inventory[itemKey] || 0;
          const ok = haveQty >= needQty;
          return `<span style="color:${ok ? '#2e7d32' : '#c62828'}; font-weight:700;">${this.pixelIconHtml(itemKey, g.getItemIcon(itemKey), 15)} ${g.getItemLabel(itemKey)}: ${haveQty}/${needQty}</span>`;
        }).join(' &nbsp;•&nbsp; ');

        const canComplete = !isDone && Object.entries(b.requirements).every(([k, q]) => (g.inventory[k] || 0) >= q);

        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
          <div>
            <div class="shop-card-top">
              <div class="shop-icon">${b.icon}</div>
              <div>
                <div class="shop-title">${b.name}</div>
                <div class="shop-meta">🎁 ${b.rewardText} + 🪨6 Đá Rèn</div>
              </div>
            </div>
            <div style="background:#f3e2b8; padding:6px 8px; border-radius:6px; font-size:11.5px; margin-top:6px;">
              ${reqListHtml}
            </div>
          </div>
          <button class="nav-icon-btn ${isDone ? '' : 'gold-btn'}" ${(!canComplete || isDone) ? 'disabled' : ''}>
            ${isDone ? '✔ Đã Hiến Tế' : '🏛️ Dâng Vật Phẩm'}
          </button>
        `;
        if (canComplete && !isDone) {
          card.querySelector('button').onclick = () => g.completeBundle(b.id);
        }
        body.appendChild(card);
      });
      return;
    }

    // TAB KITCHEN
    if (this.activeModalTab === 'kitchen') {
      window.GAME_CONFIG.RECIPES.forEach(rec => {
        const ingText = Object.entries(rec.ingredients)
          .map(([k, q]) => `${g.getItemLabel(k)} (${g.inventory[k] || 0}/${q})`)
          .join(' + ');
        const canCook = Object.entries(rec.ingredients).every(([k, q]) => (g.inventory[k] || 0) >= q);

        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
          <div>
            <div class="shop-card-top">
              <div class="shop-icon">${rec.icon}</div>
              <div>
                <div class="shop-title">${rec.name}</div>
                <div class="shop-meta">💰 Bán ${Math.round(rec.sellPrice * g.getPriceMultiplier())}G | ⚡ Hồi ${rec.energyRestore}</div>
              </div>
            </div>
            <div style="font-size:11px; font-weight:700; color:#6b3b06; margin-top:6px;">Cần: ${ingText}</div>
          </div>
          <div style="display:flex; gap:6px;">
            <button class="nav-icon-btn gold-btn" data-act="sell" ${!canCook ? 'disabled' : ''}>Bán (+${Math.round(rec.sellPrice * g.getPriceMultiplier())}G)</button>
            <button class="nav-icon-btn" data-act="eat" ${!canCook ? 'disabled' : ''}>Ăn (⚡+${rec.energyRestore})</button>
          </div>
        `;
        card.querySelector('[data-act="sell"]').onclick = () => g.cookRecipe(rec, false);
        card.querySelector('[data-act="eat"]').onclick = () => g.cookRecipe(rec, true);
        body.appendChild(card);
      });
      return;
    }

    // TAB INVENTORY
    if (this.activeModalTab === 'inventory') {
      const entries = Object.entries(g.inventory).filter(([, qty]) => qty > 0);
      if (entries.length === 0) {
        body.innerHTML = `<div class="banner-box" style="text-align:center; padding:24px;">
          <h3>🧺 Kho Nông Sản Đang Trống</h3>
          <p style="margin-top:4px; font-size:12px;">Hãy ra cánh đồng thu hoạch cây chín, nhặt trứng gà hoặc câu cá Koi nhé!</p>
        </div>`;
        return;
      }

      const sellAllBanner = document.createElement('div');
      sellAllBanner.className = 'banner-box';
      sellAllBanner.style.display = 'flex';
      sellAllBanner.style.justifyContent = 'space-between';
      sellAllBanner.style.alignItems = 'center';
      sellAllBanner.innerHTML = `
        <span style="font-weight:800;">🚚 Bán nhanh toàn bộ nông sản trong kho</span>
        <button id="btn-modal-sell-all" class="nav-icon-btn gold-btn">💰 Bán Tất Cả Ngay</button>
      `;
      sellAllBanner.querySelector('#btn-modal-sell-all').onclick = () => {
        g.sellAllInventory();
        this.renderModalContent();
      };
      body.appendChild(sellAllBanner);

      entries.forEach(([key, qty]) => {
        const unitPrice = g.getItemSellPrice(key);
        const isHot = g.hotCropId === key;
        const mInfo = window.GAME_CONFIG.CROPS[key] ? g.getCropMasteryInfo(key) : { stars: '' };
        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
          <div class="shop-card-top">
            <div class="shop-icon">${this.pixelIconHtml(key, g.getItemIcon(key), 26)}</div>
            <div>
              <div class="shop-title">${g.getItemLabel(key)} <span style="color:#ff8f00;">${mInfo.stars}</span> ${isHot ? '<span style="color:#d84315;font-size:10.5px;">🔥x1.6</span>' : ''}</div>
              <div class="shop-meta">Số lượng: ${qty} • Giá: ${unitPrice}G</div>
            </div>
          </div>
          <button class="nav-icon-btn gold-btn">Bán Hết (+${(qty * unitPrice).toLocaleString('vi-VN')}G)</button>
        `;
        card.querySelector('button').onclick = () => g.sellInventoryItem(key);
        body.appendChild(card);
      });
      return;
    }

    // TAB ALMANAC
    if (this.activeModalTab === 'almanac') {
      const allKeys = [
        ...Object.keys(window.GAME_CONFIG.CROPS),
        'egg', 'milk', 'honey', 'fish',
        ...window.GAME_CONFIG.RECIPES.map(r => r.id)
      ];
      const discoveredCount = allKeys.filter(k => (g.discovered[k] || 0) > 0).length;
      const pct = Math.round((discoveredCount / allKeys.length) * 100);

      const header = document.createElement('div');
      header.className = 'banner-box';
      header.innerHTML = `
        <div style="display:flex; justify-content:space-between; font-weight:800; margin-bottom:4px;">
          <span>📚 Tiến độ Bách Khoa Nông Trại</span>
          <span>${discoveredCount}/${allKeys.length} (${pct}%)</span>
        </div>
        <div class="bar-track" style="height:9px;">
          <div class="bar-fill-energy" style="width:${pct}%;"></div>
        </div>
      `;
      body.appendChild(header);

      allKeys.forEach(k => {
        const count = g.discovered[k] || 0;
        const isFound = count > 0;
        const recipeObj = window.GAME_CONFIG.RECIPES.find(r => r.id === k);
        const label = recipeObj ? recipeObj.name : g.getItemLabel(k);
        const iconHtml = recipeObj ? recipeObj.icon : this.pixelIconHtml(k, g.getItemIcon(k), 24);

        const card = document.createElement('div');
        card.className = 'shop-card';
        card.style.opacity = isFound ? '1' : '0.55';
        card.innerHTML = `
          <div class="shop-card-top">
            <div class="shop-icon">${iconHtml}</div>
            <div>
              <div class="shop-title">${isFound ? label : '???'}</div>
              <div class="shop-meta">${isFound ? `Đã thu thập: ${count}` : 'Chưa khám phá'}</div>
            </div>
          </div>
        `;
        body.appendChild(card);
      });
      return;
    }

    // TAB RULES & SAVE SYNCHRONIZATION
    if (this.activeModalTab === 'rules') {
      body.innerHTML = `
        <div class="shop-card">
          <div class="shop-title">🗺️ 1. 5 Thế Giới Đa Không Gian & Boss</div>
          <div class="shop-desc">Chuyển đổi tự do giữa <b>🏡 Thung Lũng</b>, <b>⛏️ Động Pha Lê</b>, <b>🌌 Thiên Không</b>, <b>🔥 Thần Long</b> và <b>🪐 Vương Quốc Tinh Tú</b> (Đất x3.8, Mỏ Thiên Thạch Ngọc Cấp 3 & Boss Kỳ Lân Tinh Vân)!</div>
        </div>
        <div class="shop-card">
          <div class="shop-title">🔨 2. Đập Đồ (+20), Thức Tỉnh ★ & Phụ Ma</div>
          <div class="shop-desc">Đập 4 Thần Khí lên <b>+20 Thái Cổ</b>, <b>Thức Tỉnh ★5</b>, đúc <b>Dòng Phụ Ma Thái Cổ ★★</b>, khảm <b>Ngọc Cấp 4</b> và kích hoạt <b>Đôi Cánh Sáng Thế</b>!</div>
        </div>
        <div class="shop-card">
          <div class="shop-title">🧬 3. 14 Cây Pixel 5 Giai Đoạn & Viện Lai Tạo</div>
          <div class="shop-desc">Lai tạo <b>⏳ Hoa Hồng Thời Gian</b>, <b>🐦‍🔥 Hoa Phượng Hoàng</b>, <b>🪐 Quả Thế Giới</b> & <b>👑 Trái Sáng Thế Yggdrasil</b>, nâng cấp <b>Gen G1➔G5</b>!</div>
        </div>
        <div class="shop-card">
          <div class="shop-title">🗼 4. 15 Chương Truyện, Tháp Tinh Tú & Luân Hồi</div>
          <div class="shop-desc">Chinh phục 15 Chương truyện, leo <b>Tháp Tinh Tú Vô Tận</b>, săn <b>Boss Kỳ Lân</b> và <b>Luân Hồi Thăng Hoa</b> nhân bội lợi nhuận vĩnh viễn!</div>
        </div>
        <div class="banner-box" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div>
            <div style="font-weight:800; font-size:12.5px; color:#2e7d32;">🔄 Đồng Bộ Tự Động Dữ Liệu Cũ (v4 / v5 / v6 / v7 / v8 / v9 / v10 ➔ v11.0)</div>
            <div style="font-size:11px; color:#5c3b20;">Mọi dữ liệu phiên bản cũ được tự động nâng cấp lên v11.0 mà không mất bất kỳ vật phẩm hay tiến độ nào.</div>
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            <button id="btn-export-save" class="nav-icon-btn gold-btn">⬇ Tải File Save (.json)</button>
            <label class="nav-icon-btn purple-btn" style="cursor:pointer;">
              📂 Nhập File Save (.json)
              <input type="file" id="inp-import-save" accept=".json" style="display:none;" />
            </label>
            <button id="btn-reset-save" class="nav-icon-btn" style="background:#b71c1c;">🔄 Chơi Lại</button>
          </div>
        </div>
      `;
      document.getElementById('btn-export-save').onclick = () => g.exportSaveJson();
      const imp = document.getElementById('inp-import-save');
      if (imp) {
        imp.onchange = (e) => {
          if (e.target.files && e.target.files[0]) {
            g.importSaveJson(e.target.files[0]);
          }
        };
      }
      document.getElementById('btn-reset-save').onclick = () => g.resetGameData();
    }
  }
}

window.GameUI = GameUI;
