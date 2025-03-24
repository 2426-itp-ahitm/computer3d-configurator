INSERT INTO
    public.cpu (cpu_id, name, price, core_count, core_clock, boost_clock, tdp, graphics, smt, socket, img)
VALUES
    (1,'AMD Ryzen 7 7800X3D', 339, 8, 4.2, 5, 120, 'Radeon', true, 'AM5', 'https://m.media-amazon.com/images/I/51HqC0rU9HL._AC_SL1500_.jpg'),
    (2, 'AMD Ryzen 5 7600X', 204.99, 6, 4.7, 5.3, 105, 'Radeon', true, 'AM5', 'https://m.media-amazon.com/images/I/71J6BMoFiOL._AC_SL1500_.jpg'),
    (3, 'AMD Ryzen 5 5600X', 144.31, 6, 3.7, 4.6, 65, null, true, 'AM4', 'https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2505503-ryzen-5-5600x.jpg'),
    (4, 'AMD Ryzen 5 7600', 185, 6, 3.8, 5.1, 65, 'Radeon', true, 'AM5', 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQm-POIfaDcW4eLNvH1BsqvQsPBdyDfYGlyLgLiedzINwv3fS-FcKj7t9xW8XZjRsSbzgChXnyRddu-VY-2SACFC0PUVVki'),
    (5, 'Intel Core i9-14900K', 544.99, 24, 3.2, 6, 125, 'Intel UHD Graphics 770', true, 'LGA1700', 'https://im.cyberport.de/is/image/cyberport//231204120937700301900008R?$Zoom_1000$'),
    (6, 'Intel Core i7-14700K', 399.99, 20, 3.4, 5.6, 125, 'Intel UHD Graphics 770', true, 'LGA1700', 'https://im.cyberport.de/is/image/cyberport//231017150645300901900002S?$Zoom_1000$');

INSERT INTO 
    public.motherboard (motherboard_id, name, price, socket,ramType, form_factor, max_memory, memory_slots, color, img)
VALUES
    (1, 'MSI B650 GAMING PLUS WIFI', 169.99, 'AM5','DDR5', 'ATX', 192, 4, 'Black', 'https://cdn-reichelt.de/bilder/web/xxl_ws/E910%2FMSI_7E26-001R_01.png?type=ProductXxl&'),
    (2, 'Asus ROG STRIX B650-A GAMING WIFI', 199.99, 'AM5', 'DDR5','ATX', 192, 4, 'Black / Silver', 'https://www.alternate.at/p/600x600/8/7/ASUS_ROG_STRIX_B650_A_GAMING_WIFI__Mainboard@@1870278.jpg'),
    (3, 'MSI B760 GAMING PLUS WIFI', 159.99, 'LGA1700','DDR5', 'ATX', 192, 4, 'Black / Silver', 'https://www.e-tec.at/xstorage/1/_cache/20240410/370142-etc-1_695141_1_0094c99430fbb30f6bf5cceefd894a84.jpg'),
    (4, 'MSI PRO Z790-A MAX WIFI', 239.99, 'LGA1700','DDR5', 'ATX', 192, 4, 'Silver / Black', 'https://storage-asset.msi.com/global/picture/image/feature/mb/Z790/PRO-Z790-A-MAX-WIFI/images/kv-pd.png'),
    (5, 'MSI B550 GAMING GEN3', 99.99, 'AM4','DDR4', 'ATX', 128, 4, 'Black', 'https://gzhls.at/i/28/48/2802848-n0.jpg'),
    (6, 'MSI B450M-A PRO MAX II', 69.98, 'AM4','DDR4', 'Micro ATX', 64, 2, 'Black', 'https://gzhls.at/i/09/34/3300934-l0.webp');

INSERT INTO 
    public.gpu (gpu_id, name, price, chipset, memory, core_clock, boost_clock, color, length, img) 
VALUES
(1, 'Gigabyte EAGLE OC Rev 2.0', 799.99, 'GeForce RTX 3080 10GB LHR', 10, 1440, 1755, 'Black', 320, 'https://www.gigabyte.com/FileUpload/Global/KeyFeature/1903/innergigabyteimages/kf-img.png'),
(2, 'MSI GAMING TRIO PLUS', 849.99, 'GeForce RTX 3080 10GB LHR', 10, 1440, 1755, 'Black', 323, 'https://asset.msi.com/resize/image/global/product/product_1613530906255d52bb34d6967d4bc3da3d1fe802d5.png62405b38c58fe0f07fcef2367d8a9ba1/600.png'),
(3, 'MSI TWIN FAN OC', 499.99, 'GeForce RTX 3060 Ti LHR', 8, 1410, 1695, 'Black', 230, 'https://storage-asset.msi.com/global/picture/image/feature/vga/NVIDIA/RTX3060Ti/TWIN-FAN//kv-img.png'),
(4, 'XFX THICC III Pro', 329.99, 'Radeon RX 5600 XT', 6, 1247, 1750, 'Black', 326, 'https://image1280.macovi.de/images/product_images/1280/1346457_0__73840.jpg'),
(5, 'Inno3D Gaming OC X3', 699.99, 'GeForce RTX 2080 SUPER', 8, 1650, 1845, 'Black', 272, 'https://m.media-amazon.com/images/I/619UJ5Zvb2L._AC_UF1000,1000_QL80_.jpg'),
(6, 'Gigabyte MINI ITX OC', 299.99, 'GeForce RTX 2060', 6, 1680, 1695, 'Black / Silver', 170, 'https://images.versus.io/objects/gigabyte-geforce-rtx-2060-mini-itx-oc.front.variety.1576684641045.jpg'),
(7, 'PowerColor Red Devil OC', 519.99, 'Radeon RX 7800 XT', 16, 1295, 2565, 'Black/Rot', 332, 'https://gzhls.at/i/12/14/3011214-n0.webp'),
(8, 'MSI GeForce GTX 1060 6GT OCV1', 199.99, 'GeForce GTX 1060 6GB', 6, 1544, 1759, 'Black / White', 243, 'https://asset.msi.com/resize/image/global/product/product_5_20180411110310_5acd7aee3b188.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png'),
(9, 'Gigabyte GAMING', 349.99, 'GeForce GTX 1080', 8, 1721, 1860, 'Black / Orange', 286, 'https://static.gigabyte.com/StaticFile/Image/Global/5865dda2c8ac6d378e755169f1f0894b/Product/15095/Png'),
(10, 'ASRock Challenger D', 219.99, 'Radeon RX 6600', 8, 1626, null, 'Black', 269, 'https://m.media-amazon.com/images/I/61gK8Xih5kL._AC_SL1200_.jpg'),
(11, 'XFX Speedster SWFT 309', 299.99, 'Radeon RX 6700 XT', 12, 2321, 2581, 'Black', 304, 'https://m.media-amazon.com/images/I/613fmbK2EHL._AC_UF1000,1000_QL80_.jpg'),
(12, 'Gigabyte EAGLE', 199.99, 'Radeon RX 6600', 8, 1626, 2491, 'Black / Silver', 282, 'https://m.media-amazon.com/images/I/712yFYT8t+L._AC_SL1500_.jpg');

INSERT INTO 
    public.ram (ram_id, name, price, type, clock_speed, module_count, gb_per_module, price_per_gb, color, first_word_latency, cas_latency, img) 
VALUES
    (1, 'ADATA XPG LANCER RGB ROG CERTIFIED 32 GB', 159.99, 'DDR5', 6600, 2, 16, 5, 'Black', 9.697, 32, 'https://gzhls.at/i/45/16/3014516-n0.jpg'),
    (2, 'Kingston FURY Renegade Pro 32 GB', 174.54, 'DDR5', 6000, 1, 32, 5.454, 'Black', 10.667, 32, 'https://img-resizer.cyberport.de/cp/images/1368x1368/231124144736700301900042V'),
    (3, 'Mushkin MES4S240HF8G 8 GB', 27.99, 'DDR4', 2400, 1, 8, 3.499, null, 14.167, 17, 'https://m.media-amazon.com/images/I/51rmXelHnXS._AC_UF894,1000_QL80_.jpg'),
    (4, 'GeIL EVO V RGB 32 GB', null, 'DDR5', 8000, 2, 16, null, 'Black', 11.875, 38, 'https://www.hardwareluxx.de/images/cdn02/uploads/2022/May/quiet_oc_jp/geil-evo-v--ddr5-02_1920px.jpg'),
    (5, 'TEAMGROUP T-Force Vulcan 32 GB', 112.90, 'DDR5', 5600, 2, 16, null, 'Red', 14.286, 40, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkWLIe0X6pIvo2kTYMCUfUZVYnmNiyKGd5eg&s'),
    (6, 'ADATA XPG GAMMIX D10 8 GB', 23.77, 'DDR4', 3000, 1, 8, null, 'Black', 10.667, 16, 'https://imgproxy.0815.at/biTyYBJ_jrhQxEGMXlEWYPYMQ0F_CoE4rs6S8Qg1Fv8/aHR0cHM6Ly9tZWRpYS4wODE1LmF0L21lZGlhLzg0L2NiL2RkLzE2NzE1Mjg1NzUvMWZlMTdhNDMyNjI5NDBkY2IxMzk5YThiZGIyNzBlNWIuanBn'),
    (7, 'TEAMGROUP T-Force Delta RGB 32 GB', 121.50, 'DDR4', 3600, 2, 16, null, 'Black', 12.5, 15, 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS7uVRnBF4yVdPGr7U2ajnb3Fyu5EXZtDoSCA5LPANYmjkaTyw8zn4ORbHfQDNuysmWFm8arc5yUi_m-jH8yfWOwCVmg06NU_4YWkNq4Y6tP9EKTxJJuTVF'),
    (8, 'Crucial CT7982449 16 GB', 28.00, 'DDR4', 2133, 1, 16, null, 'Green', 14.065, 15, 'https://content.crucial.com/content/dam/crucial/dram-products/laptop/images/product/crucial-ddr4-sodimm-kit-2.psd.transform/medium-png/image.png'),
    (9, 'Corsair Vengeance LED 32 GB', 73.51, 'DDR4', 3000, 2, 16, null, 'Black', 10, 15, 'https://asset.conrad.com/media10/isa/160267/c1/-/de/002861707PI00/image.jpg?x=400&y=400&format=jpg&ex=400&ey=400&align=center'),
    (10, 'Corsair Vengeance 8 GB', 39.82, 'DDR3', 1600, 2, 4, null, 'Black / Gold', 11.25, 9, 'https://www.alternate.at/p/600x600/i/Corsair_DIMM_8_GB_DDR3_1600____Arbeitsspeicher@@idif57j2.jpg'),
    (11, 'YongXinSheng 8GB', 24.19, 'DDR3', 1600, 2, 8, null, 'Green', 13.503, 9, 'https://m.media-amazon.com/images/I/61WRsE1zlNL._AC_SL1500_.jpg'),
    (12, 'G.Skill Ripjaws X 8 GB', 24.84, 'DDR3', 1600, 1, 8, 3.105, 'Black / Blue', 11.25, 9, 'https://gzhls.at/i/44/50/694450-n0.jpg');

INSERT INTO 
    public.shopping_cart (cpu_id, motherboard_id, gpu_id, ram_id, totalPrice, createdAt, updatedAt)
VALUES 
    (NULL, NULL, NULL, NULL, NULL, NULL, NULL);

INSERT INTO
    public.powersupply (powersupply_id, name, price, type, efficiency, wattage, modular, color, img)
VALUES
    (1, 'SeaSonic FOCUS Plus 650 Gold', 126.47, 'ATX', 'gold', 650, true, NULL, NULL),
    (2, 'Corsair RM750', 109.99, 'ATX', 'gold', 750, true, 'White / Black', NULL),
    (3, 'be quiet! Pure Power 12 M', 89.9, 'ATX', 'gold', 750, true, 'Black', NULL),
    (4, 'be quiet! Pure Power 12 M', 99.9, 'ATX', 'gold', 850, true, 'Black', NULL),
    (5, 'Gigabyte UD750GM', 92.12, 'ATX', 'gold', 750, true, 'Black', NULL);
     
INSERT INTO
    public.Internal_Harddrive (internalHarddrive_id, name, price, capacity, pricePerGb, type, cache, formFactor, memoryInterface, image)
VALUES
    (1, 'Samsung 980 Pro', 169.99, 2000, 0.085, 'SSD', 2048, 'M.2-2280', 'M.2 PCIe 4.0 X4', 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTlqWVQZ0Gbux0qrCLmdCML6_AAQiFyRulFvItbDsfCTmVC6eTJJDKp2ZoLJ42WFX0o_i_anpi9U1T9mTWWWzUO_g1VAHmBC8wpIRaUzsGhQ01RZXvuTwatJ88'),
    (2, 'Kingston NV2', 60.99, 1000, 0.061, 'SSD', NULL, 'M.2-2280', 'M.2 PCIe 4.0 X4', 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_142006815?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402'),
    (3, 'Samsung 970 Evo Plus', 97.5, 1000, 0.098, 'SSD', 1024, 'M.2-2280', 'M.2 PCIe 3.0 X4', 'https://gfx3.senetic.com/akeneo-catalog/6/c/2/9/6c2920e458f09125ba39522d85506b1dd5687458_MZ_V7S1T0BW_1.jpg');

INSERT INTO
    public.casing (case_id, name, price, type, color, psu, side_panel, external_volume, internal_35_bays, img)
VALUES
    (1, 'Corsair 4000D Airflow', 104.99, 'ATX Mid Tower', 'Black', NULL, 'Tinted Tempered Glass', 48.6, 2, 'https://www.e-tec.at/xstorage/1/_cache/20250220/306721-1_1067254_1_4794ec45b941022584d4929699e6f3e3.jpg'),
    (2, 'NZXT H5 Flow', 94.99, 'ATX Mid Tower', 'Black', NULL, 'Tempered Glass', 47, 1, 'https://cdn-reichelt.de/resize/600%2F-/web/xxl_ws/E910%2FNZXT_CC-H51FW-R1_01.png?type=ProductXxl&resize=600%252F-&'),
    (3, 'NZXT H9 Flow', 159.99, 'ATX Mid Tower', 'White', NULL, 'Tempered Glass', 66.9, 2, 'https://www.alternate.at/p/1200x630/0/6/NZXT_H9_Flow_All_White__Tower_Geh_use@@1863960_11.jpg'),
    (4, 'Lian Li O11 Vision', 138.94, 'ATX Mid Tower', 'White', NULL, 'Tempered Glass', 67.8, 2, 'https://lian-li.com/wp-content/uploads/2023/11/O11_Vision_06.webp'),
    (5, 'Fractal Design North', 139.99, 'ATX Mid Tower', 'Black', NULL, 'Tempered Glass', 45.1, 2, 'https://www.alternate.at/p/600x600/4/6/Fractal_Design_North_Charcoal_Black__Tower_Geh_use@@1858064.jpg'),
    (6, 'Phanteks XT PRO', 49.99, 'ATX Mid Tower', 'Black', NULL, 'Tempered Glass', 51.8, 2, 'https://gzhls.at/i/72/61/3147261-l0.jpg');

INSERT INTO
    public.cpu_cooler (cpu_cooler_id, name, price, min_rpm, max_rpm, min_noise_level, max_noise_level, color, size, img)
VALUES
    (1, 'Thermalright Peerless Assassin 120 SE', 33.9, 1550, 1550, 25.6, 25.6, 'Black', NULL, 'https://gzhls.at/i/71/75/2647175-n0.jpg'),
    (2, 'NZXT Kraken Elite 360 RGB', 273.99, 500, 1800, 17.9, 30.6, 'White', 360, 'https://www.alternate.at/p/600x600/3/7/NZXT_Kraken_Elite_360_RGB_360_mm__Wasserk_hlung@@100074073.jpg'),
    (3, 'Deepcool GAMMAXX AG400 ARGB', 29.99, 500, 2000, 31.6, 31.6, 'Black', NULL, 'https://www.alternate.at/p/600x600/6/0/DeepCool_AG400_BK_ARGB__CPU_K_hler@@1861306.jpg'),
    (4, 'Corsair iCUE H150i ELITE CAPELLIX XT', 189.99, 550, 2100, 5, 34.1, 'Black', 360, 'https://gzhls.at/i/16/36/2891636-n0.jpg'),
    (5, 'Cooler Master MASTERLIQUID ML240L RGB V2', 99.99, 650, 1800, 6, 27, 'Black', 240, 'https://gzhls.at/i/27/06/2242706-n0.jpg'),
    (6, 'Noctua NH-D15 chromax.black', 119.95, 300, 1500, 19.2, 24.6, 'Black', NULL, 'https://www.ditech.at/xstorage/1/_cache/20240702/nh_d15_chromax_black_1_4_916599_1_9202ddddbf5a6f06ab81ac583f717959.webp'),
    (7, 'NZXT Kraken 240', 120.99, 500, 1800, 17.9, 30.6, 'Black', 240, 'https://www.ditech.at/xstorage/1/_cache/20240409/368250_840918_1_b00ccac86d6a595f31f8d18662c2b0a3.jpg');
