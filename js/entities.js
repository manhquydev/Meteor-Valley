/**
 * ============================================================================
 * THUNG LŨNG SAO BĂNG (STARLIGHT VALLEY v10.0 - SET RESONANCE WINGS & AURAS)
 * js/entities.js - Nhân vật Nông dân (Kèm Đôi Cánh Ánh Sao Cộng Hưởng Bộ Trang Bị,
 *                  Vòng Hào Quang Thần Khí + Bảo Thạch Xoay Quanh),
 *                  Mèo cưng AI, Vật nuôi & Tinh Linh Tự Động
 * ============================================================================
 */

class PlayerFarmer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.targetX = null;
    this.targetY = null;
    this.onArriveCallback = null;
    this.speed = 195;
    this.speedBoostTimer = 0;
    this.facing = 1;
    this.walkTimer = 0;
    this.actionAnimTimer = 0;
  }

  moveTo(tx, ty, callback = null) {
    this.targetX = tx;
    this.targetY = ty;
    this.onArriveCallback = callback;
  }

  update(dt, keys, maxWidth, maxHeight) {
    if (this.speedBoostTimer > 0) this.speedBoostTimer -= dt;
    if (this.actionAnimTimer > 0) this.actionAnimTimer -= dt;

    const currentSpeed = this.speed * (this.speedBoostTimer > 0 ? 1.45 : 1.0);
    let dx = 0;
    let dy = 0;

    if (keys['KeyW'] || keys['ArrowUp']) dy -= 1;
    if (keys['KeyS'] || keys['ArrowDown']) dy += 1;
    if (keys['KeyA'] || keys['ArrowLeft']) dx -= 1;
    if (keys['KeyD'] || keys['ArrowRight']) dx += 1;

    if (dx !== 0 || dy !== 0) {
      this.targetX = null;
      this.targetY = null;
      this.onArriveCallback = null;
      const len = Math.hypot(dx, dy);
      this.x += (dx / len) * currentSpeed * dt;
      this.y += (dy / len) * currentSpeed * dt;
      if (dx !== 0) this.facing = dx > 0 ? 1 : -1;
      this.walkTimer += dt * 10;
    } else if (this.targetX !== null && this.targetY !== null) {
      const distX = this.targetX - this.x;
      const distY = this.targetY - this.y;
      const dist = Math.hypot(distX, distY);
      if (dist <= 18) {
        this.targetX = null;
        this.targetY = null;
        if (this.onArriveCallback) {
          const cb = this.onArriveCallback;
          this.onArriveCallback = null;
          cb();
        }
      } else {
        this.x += (distX / dist) * currentSpeed * dt;
        this.y += (distY / dist) * currentSpeed * dt;
        if (Math.abs(distX) > 2) this.facing = distX > 0 ? 1 : -1;
        this.walkTimer += dt * 10;
      }
    } else {
      this.walkTimer = 0;
    }

    this.x = Math.max(24, Math.min(maxWidth - 24, this.x));
    this.y = Math.max(36, Math.min(maxHeight - 24, this.y));
  }

  render(ctx, time = 0, game = null) {
    ctx.save();
    const bob = Math.abs(Math.sin(this.walkTimer)) * 4;
    ctx.translate(this.x, this.y - bob);

    const maxPlus = game ? game.getHighestToolPlus() : 0;
    const resonance = game ? game.getCurrentSetResonance() : { tier: 0, wingColor: null };

    // 1. HIỆU ỨNG VÒNG HÀO QUANG THẦN KHÍ DƯỚI CHÂN NHÂN VẬT
    if (maxPlus >= 3 || resonance.tier >= 1) {
      const stepCfg = window.GAME_CONFIG.getEnhanceStepConfig(Math.max(3, maxPlus));
      const pulse = 1 + 0.14 * Math.sin(time * 6);
      ctx.save();
      ctx.translate(0, 16 + bob);
      ctx.scale(1.4 * pulse, 0.55 * pulse);
      ctx.strokeStyle = maxPlus >= 13
        ? `hsl(${(time * 140) % 360}, 100%, 65%)`
        : (resonance.wingColor || stepCfg.color);
      ctx.lineWidth = maxPlus >= 10 ? 3.5 : 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = stepCfg.glowColor;
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 2. ĐÔI CÁNH ÁNH SAO CỘNG HƯỞNG BỘ TRANG BỊ (SET RESONANCE PIXEL WINGS)
    if (resonance && resonance.tier >= 1 && resonance.wingColor) {
      const flap = Math.sin(time * 7) * 3;
      ctx.save();
      ctx.fillStyle = resonance.wingColor;
      // Cánh trái
      ctx.fillRect(-26, -16 + flap, 10, 6);
      ctx.fillRect(-30, -10 + flap, 12, 6);
      ctx.fillRect(-24, -4 + flap, 8, 5);
      // Cánh phải
      ctx.fillRect(16, -16 + flap, 10, 6);
      ctx.fillRect(18, -10 + flap, 12, 6);
      ctx.fillRect(16, -4 + flap, 8, 5);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-24, -14 + flap, 4, 3);
      ctx.fillRect(20, -14 + flap, 4, 3);
      ctx.restore();
    }

    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(-14, 16 + bob, 28, 6);

    if (this.facing < 0) {
      ctx.scale(-1, 1);
    }

    if (this.actionAnimTimer > 0) {
      ctx.rotate(Math.sin(this.actionAnimTimer * 25) * 0.25);
    }

    ctx.drawImage(window.SPRITES.cache.farmer, -22, -26, 44, 44);
    ctx.restore();

    // 3. HIỆU ỨNG BẢO THẠCH KHẢM NẠM XOAY QUANH NGƯỜI CHƠI
    if (game) {
      const activeGems = game.getActiveToolGems();
      if (activeGems.length > 0 || maxPlus >= 7) {
        ctx.save();
        const gemColors = activeGems.map(g => window.GAME_CONFIG.GEM_TYPES[g.type]?.color || '#ffd700');
        if (gemColors.length === 0 && maxPlus >= 7) {
          gemColors.push('#ce93d8', '#ffd700');
        }
        gemColors.forEach((col, idx) => {
          const angle = time * 3.2 + (idx * (Math.PI * 2)) / gemColors.length;
          const gx = this.x + Math.cos(angle) * 24;
          const gy = this.y - 6 + Math.sin(angle) * 11;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(gx - 4, gy - 4, 8, 8);
          ctx.fillStyle = col;
          ctx.fillRect(gx - 3, gy - 3, 6, 6);
        });
        ctx.restore();
      }

      if (maxPlus >= 7) {
        const badgeCol = maxPlus >= 13 ? '#ff4081' : (maxPlus >= 10 ? '#ffd700' : '#ce93d8');
        window.SPRITES.drawPixelBadgeLabel(
          ctx,
          this.x,
          this.y - 34,
          `⚡ THẦN KHÍ +${maxPlus}`,
          'rgba(20, 12, 36, 0.9)',
          badgeCol,
          badgeCol
        );
      }
    }
  }
}

class PetCat {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.upgraded = false;
    this.harvestTimer = 0;
  }

  update(dt, player, game) {
    const dist = Math.hypot(player.x - 36 - this.x, player.y + 10 - this.y);
    const speed = this.upgraded ? 185 : 135;

    if (dist > 42) {
      this.x += ((player.x - 36 - this.x) / dist) * speed * dt;
      this.y += ((player.y + 10 - this.y) / dist) * speed * dt;
    }

    if (this.upgraded) {
      this.harvestTimer += dt;
      if (this.harvestTimer >= 2.0) {
        this.harvestTimer = 0;
        const c = Math.floor(this.x / game.world.tileSize);
        const r = Math.floor(this.y / game.world.tileSize);
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const tile = game.world.getTile(r + dr, c + dc);
            if (tile && tile.crop && tile.crop.stage === 4) {
              game.harvestTile(tile, true);
              return;
            }
          }
        }
      }
    }
  }

  render(ctx, time) {
    const bob = Math.abs(Math.sin(time * 5)) * 2;
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    ctx.fillRect(this.x - 10, this.y + 12, 20, 4);
    ctx.drawImage(window.SPRITES.cache.cat, this.x - 16, this.y - 18 - bob, 32, 32);
    if (this.upgraded) {
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(this.x - 2, this.y - 2, 4, 4);
    }
    ctx.restore();
  }
}

class FairyHelper {
  constructor(index = 0) {
    this.index = index;
    this.x = 180 + index * 60;
    this.y = 220 + index * 40;
    this.targetX = this.x;
    this.targetY = this.y;
    this.workTimer = 0;
  }

  update(dt, game, skillLevel) {
    this.workTimer += dt;
    const interval = Math.max(1.2, 3.8 - skillLevel * 0.5);

    if (this.workTimer >= interval) {
      this.workTimer = 0;
      for (let r = 0; r < game.world.rows; r++) {
        for (let c = 0; c < game.world.cols; c++) {
          const t = game.world.tiles[r][c];
          if (t.crop && t.crop.stage === 4) {
            this.targetX = (c + 0.5) * game.world.tileSize;
            this.targetY = (r + 0.5) * game.world.tileSize;
            game.harvestTile(t, true);
            return;
          }
          if (t.crop && !t.watered) {
            this.targetX = (c + 0.5) * game.world.tileSize;
            this.targetY = (r + 0.5) * game.world.tileSize;
            t.watered = true;
            game.world.spawnParticles(this.targetX, this.targetY, '#80d8ff', 6);
            return;
          }
        }
      }
      this.targetX = game.player.x + Math.cos(performance.now() * 0.002 + this.index * 2) * 70;
      this.targetY = game.player.y + Math.sin(performance.now() * 0.002 + this.index * 2) * 50;
    }

    this.x += (this.targetX - this.x) * Math.min(1, dt * 4.5);
    this.y += (this.targetY - this.y) * Math.min(1, dt * 4.5);
  }

  render(ctx, time) {
    const floatY = Math.sin(time * 6 + this.index) * 5;
    ctx.save();
    ctx.fillStyle = 'rgba(128, 216, 255, 0.32)';
    ctx.beginPath();
    ctx.arc(this.x, this.y + floatY, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.drawImage(window.SPRITES.cache.fairy, this.x - 16, this.y - 16 + floatY, 32, 32);
    ctx.restore();
  }
}

class FarmAnimal {
  constructor(typeId, x, y) {
    this.typeId = typeId;
    this.cfg = window.GAME_CONFIG.ANIMALS[typeId];
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 24;
    this.vy = (Math.random() - 0.5) * 24;
    this.changeDirTimer = 2 + Math.random() * 3;
    this.produceTimer = this.cfg.produceInterval * 0.5;
    this.hasProductReady = false;
    this.affection = 0;
  }

  update(dt) {
    this.changeDirTimer -= dt;
    if (this.changeDirTimer <= 0) {
      this.changeDirTimer = 2.5 + Math.random() * 4;
      if (Math.random() < 0.35) {
        this.vx = 0;
        this.vy = 0;
      } else {
        this.vx = (Math.random() - 0.5) * 28;
        this.vy = (Math.random() - 0.5) * 28;
      }
    }

    this.x = Math.max(290, Math.min(475, this.x + this.vx * dt));
    this.y = Math.max(185, Math.min(325, this.y + this.vy * dt));

    if (!this.hasProductReady) {
      this.produceTimer += dt;
      if (this.produceTimer >= this.cfg.produceInterval) {
        this.produceTimer = 0;
        this.hasProductReady = true;
      }
    }
  }

  render(ctx, time) {
    const sprite = window.SPRITES.cache[this.typeId];
    const bob = (this.vx !== 0 || this.vy !== 0) ? Math.abs(Math.sin(time * 7)) * 3 : 0;

    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    ctx.fillRect(this.x - 14, this.y + 14, 28, 5);

    if (this.vx < 0) {
      ctx.translate(this.x, this.y - bob);
      ctx.scale(-1, 1);
      ctx.drawImage(sprite, -20, -20, 40, 40);
    } else {
      ctx.drawImage(sprite, this.x - 20, this.y - 20 - bob, 40, 40);
    }

    if (this.hasProductReady) {
      const floatY = Math.sin(time * 5) * 3;
      const bx = this.x - 13;
      const by = this.y - 44 + floatY;
      ctx.fillStyle = '#fff8e7';
      ctx.fillRect(bx, by, 26, 22);
      ctx.strokeStyle = '#4a2c18';
      ctx.lineWidth = 2;
      ctx.strokeRect(bx, by, 26, 22);

      const prodSprite = window.SPRITES.cache[`prod_${this.cfg.produceId}`];
      if (prodSprite) {
        ctx.drawImage(prodSprite, bx + 3, by + 2, 20, 20);
      }
    }
    ctx.restore();
  }
}

window.PlayerFarmer = PlayerFarmer;
window.PetCat = PetCat;
window.FairyHelper = FairyHelper;
window.FarmAnimal = FarmAnimal;
