# Báo Cáo Kiến Trúc Tâm Lý Học Hành Vi & Hệ Thống Game (v11.0 — Mythic Astral Genesis Edition)

## 1. Ứng Dụng Tâm Lý Học Con Người & Học Tập Từ Các Tựa Game Hàng Đầu Thế Giới
Dựa trên việc tích hợp bộ kỹ năng chuyên sâu (`ak-marketing-psychology`, `ak-creativity`, `ak-ui-ux-pro-max`, `ak-motion-design`), phiên bản **v11.0 Mythic Astral Genesis** được thiết kế xoay quanh **6 vòng lặp tâm lý học hành vi** giúp người chơi càng đầu tư thời gian càng nhận lại thành quả bùng nổ tương xứng:

| Mô hình tâm lý học & Nguồn cảm hứng | Cơ chế triển khai trong **Thung Lũng Sao Băng v11.0** | Cảm giác "Cuốn hút không dứt ra được" |
| :--- | :--- | :--- |
| **1. Variable-Ratio Reinforcement & Loss Aversion Relief** *(MapleStory Star-Force, MU Online, Lost Ark)* | **Đập Đồ Thần Khí `+1 → +20` + Bảo Hiểm Pity 100% + Không Tụt Cấp**: Mỗi nhát búa có tỷ lệ nổ sáng tạo hồi hộp cực độ; nếu trượt sẽ không bao giờ mất cấp mà tự cộng dồn **Thanh Chúc Phúc (0% → 100%)** để nhát sau chắc chắn thành công. | Xóa bỏ hoàn toàn cảm giác ức chế vì "xịt mất đồ", biến cả lần đập trượt thành bước đệm chắc chắn lên cấp. |
| **2. Weapon Awakening (`★1 → ★5`), Enchanting Affix & Gem Synthesis** *(Diablo IV, Path of Exile)* | **Thức Tỉnh Thần Khí (`★1 → ★5`)**, **Tẩy Luyện Dòng Phụ Ma (`Hiếm → Sử Thi → Huyền Thoại → Thần Thoại ★ → Thái Cổ ★★`)** và **Khảm/Hợp Nhất Bảo Thạch 4 Bậc (`3 ➔ 1`)**. | Tạo chiều sâu tùy biến vô hạn: mỗi nông cụ đều có thể trở thành "cực phẩm độc nhất vô nhị". |
| **3. Visual Status Signaling & Set Resonance** *(MU Online Wings, Terraria)* | **Cộng Hưởng Bộ 4 Thần Khí (`Tổng +4 / +12 / +24 / +36 / +48 / +60`)**: Kích hoạt vòng hào quang dưới chân, ngọc xoay quanh người và **Đôi Cánh Ánh Sao Pixel** vỗ nhịp nhàng sau lưng nhân vật. | Mọi giờ phút cày cuốc đều hiện hữu trực tiếp trên ngoại hình nhân vật rực rỡ. |
| **4. Spatial Progression & Conditional World Unlocks** *(Forager, Stardew Valley, Core Keeper)* | **5 Thế Giới Đa Không Gian (`5 Realms`)** mở khóa tuần tự theo Cấp độ / Cấp Thần Khí / Tầng Tháp / Luân Hồi. Cây trồng và xưởng ở cả 5 bản đồ đều sinh trưởng song song. | Luôn kích thích trí tò mò: *"Sang bản đồ tiếp theo sẽ có khoáng sản gì, giống cây gì và Boss nào?"* |
| **5. Active Combat Loop & Boss Jackpot** *(Tap Titans, Archero)* | **👾 Boss Kỳ Lân Tinh Vân (`Astral Boss Lv.1 → ∞`)** ngay trên Map 5 có thanh máu trực tiếp: chạm vào Boss để vung Thần Khí chém rớt Vàng mỗi nhát và nổ Mưa Kho Báu khi hạ gục. | Cho phép người chơi kiểm chứng ngay sức mạnh của bộ Thần Khí `+20 ★5` vừa đập được! |
| **6. Zeigarnik Open Loops & Endless Endgame** *(Cookie Clicker, Hades)* | **15 Chương Cốt Truyện** nối tiếp với **🗼 Tháp Thử Thách Tinh Tú Vô Tận (`Tầng 1 → ∞`)** và **🌌 Đài Luân Hồi Thăng Hoa (`★1 → ∞`)** giữ nguyên 100% trang bị & bản đồ. | Không bao giờ có "điểm dừng cuối cùng" khiến người chơi bỏ game. |

## 2. Chi Tiết Hệ Thống 5 Thế Giới Đa Không Gian Có Điều Kiện Mở Khóa (`5 Realms`)

1. **🏡 Map 1 — Thung Lũng Khởi Nguyên (`valley`)**: Mở sẵn từ đầu; có Nông trại 4 mùa, Biệt Thự Hoàng Kim, Đền Đại Thụ 5 Cấp, Nhà Bếp (9 công thức), 6 Xưởng Tự Động (`+G/s`) và Hồ Cá Koi.
2. **⛏️ Map 2 — Động Pha Lê Cổ Đại (`crystal_cavern`)**: Mở khóa ở **Cấp 2** (hoặc thu hoạch 4 cây); có **Đất Pha Lê tự ẩm 100%**, tốc độ lớn `x1.35`, **Bãi Quặng Đá Cường Hóa 🪨, Mỏ Bảo Thạch 💎 & Quặng Vàng 💰** tự mọc lại và **Đe Rèn Cổ Đại**.
3. **🌌 Map 3 — Đảo Thiên Không Ngân Hà (`sky_island`)**: Mở khóa ở **Cấp 4** hoặc **Thần Khí +3**; có **Đất Linh Khí tự ẩm 100%**, cây lớn nhanh `x2.0`, đột biến `x3.0`, Hồ Thiên Trì, **Tháp Tinh Tú** và **Đài Luân Hồi**.
4. **🔥 Map 4 — Thánh Địa Thần Long Hoả Diệm (`dragon_sanctum`)**: Mở khóa ở **Cấp 6**, **Thần Khí +6** hoặc **Luân Hồi ★1**; có **Đất Dung Nham tự ẩm 100%**, lớn nhanh `x2.8`, đột biến `x4.0`, **nhân đôi (`x2`) sản lượng thu hoạch**, **Mỏ Hỏa Ngọc (`ore_dragon` rớt Ngọc Cấp 2)** và **Đài Thần Long Ban Phước**.
5. **🪐 Map 5 — Vương Quốc Tinh Tú Vô Cực (`astral_nexus`)**: Mở khóa ở **Cấp 8**, **Thần Khí +10**, **Tháp Tầng 3** hoặc **Luân Hồi ★2**; có **Đất Sáng Thế tự ẩm 100%**, lớn siêu tốc `x3.8`, đột biến `x5.0`, **nhân ba (`x3`) sản lượng thu hoạch**, **Mỏ Thiên Thạch Thái Cổ (`ore_astral` rớt thẳng Ngọc Cấp 3 ★ & 4~6 Đá Rèn)** và **👾 Boss Kỳ Lân Tinh Vân**.

## 3. Đại Tu Hệ Thống Cây Trồng: Đồ Họa Pixel Art 5 Giai Đoạn, 14 Chủng Loại & Viện Lai Tạo Gen
* **Đồ họa Pixel Art 16×16 riêng cho từng giai đoạn (`Stage 0 → Stage 4`)**: Từ hạt giống 3D, mầm non đẫm sương, bụi lá xum xuê, nụ hoa kết trái cho tới quả chín rực rỡ kèm huy hiệu `[Gen G1→G5]` và Sao Thông Thạo `★→★★★`.
* **14 Chủng loại cây trồng & 4 Siêu Giống Lai Tạo**:
  * **⏳ Hoa Hồng Thời Gian (`chrono_rose`)**: Lai từ *Sen Pha Lê + Khế Sao* — Tăng **+35% tốc độ lớn cho toàn bản đồ** & 45% rớt Vé Quay/Đá Rèn.
  * **🐦‍🔥 Hoa Phượng Hoàng Lửa (`phoenix_blossom`)**: Lai từ *Táo Vàng + Hoa Hồng Thời Gian* — Bán 2.100G, nổ +280G và **55% phóng Lửa Phượng Hoàng làm chín tức thì 1 cây đang lớn khác trên bản đồ**!
  * **🪐 Quả Thế Giới Vũ Trụ (`cosmic_worldfruit`)**: Lai từ *Táo Vàng + Thanh Long* — Bán 2.400G, nổ +350G kèm mưa Đá Rèn, Ngọc Quý & Mảnh Sao.
  * **👑 Trái Sáng Thế Yggdrasil (`yggdrasil_fruit`)**: Lai từ *Quả Thế Giới + Sen Pha Lê* — Bán **4.200G**, tái sinh vĩnh cửu, mỗi lần gặt **nổ +650G, chắc chắn rớt +2 🪨 Đá Rèn, 75% rớt 💎 Ngọc và 25% rớt +1 ⭐ Điểm Kỹ Năng Tinh Thông**!

## 4. Đồng Bộ Tự Động 100% Dữ Liệu Người Chơi Cũ (`v4 → v10 → v11`)
Bộ chuyển đổi `applySavePayload()` tự động phát hiện và nâng cấp dữ liệu từ mọi phiên bản trước (`starlight_valley_save_v4` đến `v10`) lên `v11.0`, bảo toàn tuyệt đối Vàng, Cấp độ, Thần Khí, Ngọc Khảm, Xưởng Tự Động, Cây trồng trên cả 5 Bản đồ và tặng kèm hạt giống mới để trải nghiệm ngay.
