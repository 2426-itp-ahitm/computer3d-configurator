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
    public.motherboard (motherboard_id, name, price, socket, form_factor, max_memory, memory_slots, color, img) 
VALUES
    (1, 'MSI B650 GAMING PLUS WIFI', 169.99, 'AM5', 'ATX', 192, 4, 'Black', 'https://cdn-reichelt.de/bilder/web/xxl_ws/E910%2FMSI_7E26-001R_01.png?type=ProductXxl&'),
    (2, 'Asus ROG STRIX B650-A GAMING WIFI', 199.99, 'AM5', 'ATX', 192, 4, 'Black / Silver', 'https://www.alternate.at/p/600x600/8/7/ASUS_ROG_STRIX_B650_A_GAMING_WIFI__Mainboard@@1870278.jpg'),
    (3, 'MSI B760 GAMING PLUS WIFI', 159.99, 'LGA1700', 'ATX', 192, 4, 'Black / Silver', 'https://www.e-tec.at/xstorage/1/_cache/20240410/370142-etc-1_695141_1_0094c99430fbb30f6bf5cceefd894a84.jpg'),
    (4, 'MSI PRO Z790-A MAX WIFI', 239.99, 'LGA1700', 'ATX', 192, 4, 'Silver / Black', 'https://storage-asset.msi.com/global/picture/image/feature/mb/Z790/PRO-Z790-A-MAX-WIFI/images/kv-pd.png'),
    (5, 'MSI B550 GAMING GEN3', 99.99, 'AM4', 'ATX', 128, 4, 'Black', 'https://gzhls.at/i/28/48/2802848-n0.jpg'),
    (6, 'MSI B450M-A PRO MAX II', 69.98, 'AM4', 'Micro ATX', 64, 2, 'Black', 'https://gzhls.at/i/09/34/3300934-l0.webp');

INSERT INTO 
    public.GPU (name, price, chipset, memory, core_clock, boost_clock, color, length, img) 
VALUES
    ('Gigabyte EAGLE OC Rev 2.0', null, 'GeForce RTX 3080 10GB LHR', 10, 1440, 1755, 'Black', 320, null),
    ('MSI GAMING TRIO PLUS', null, 'GeForce RTX 3080 10GB LHR', 10, 1440, 1755, 'Black', 323, null),
    ('MSI TWIN FAN OC', null, 'GeForce RTX 3060 Ti LHR', 8, 1410, 1695, 'Black', 230, null),
    ('XFX THICC III Pro', null, 'Radeon RX 5600 XT', 6, 1247, 1750, 'Black', 326, null),
    ('Inno3D Gaming OC X3', null, 'GeForce RTX 2080 SUPER', 8, 1650, 1845, 'Black', 272, null),
    ('Gigabyte MINI ITX OC', null, 'GeForce RTX 2060', 6, 1680, 1695, 'Black / Silver', 170, null),
    ('PowerColor Red Devil OC', 519.99, 'Radeon RX 7800 XT', 16, 1295, 2565, 'Black', 332, null),
    ('MSI GeForce GTX 1060 6GT OCV1', null, 'GeForce GTX 1060 6GB', 6, 1544, 1759, 'Black / White', 243, null),
    ('Gigabyte GAMING', null, 'GeForce GTX 1080', 8, 1721, 1860, 'Black / Orange', 286, null),
    ('ASRock Challenger D', 219.99, 'Radeon RX 6600', 8, 1626, null, 'Black', 269, null),
    ('XFX Speedster SWFT 309', 299.99, 'Radeon RX 6700 XT', 12, 2321, 2581, 'Black', 304, null),
    ('Gigabyte EAGLE', 199.99, 'Radeon RX 6600', 8, 1626, 2491, 'Black / Silver', 282, null);

INSERT INTO 
    public.Memory (name, price, speed, modules, price_per_gb, color, first_word_latency, cas_latency, img) 
VALUES
    ('ADATA XPG LANCER RGB ROG CERTIFIED 32 GB', 159.99, ARRAY[5, 6600], ARRAY[2, 16], 5, 'Black', 9.697, 32, null),
    ('Kingston FURY Renegade Pro 32 GB', 174.54, ARRAY[5, 6000], ARRAY[1, 32], 5.454, 'Black', 10.667, 32, null),
    ('Mushkin MES4S240HF8G 8 GB', 27.99, ARRAY[4, 2400], ARRAY[1, 8], 3.499, null, 14.167, 17, null),
    ('GeIL EVO V RGB 16 GB', null, ARRAY[5, 6400], ARRAY[1, 16], null, 'Black', 11.875, 38, null),
    ('TEAMGROUP T-Force Vulcan 16 GB', null, ARRAY[5, 5600], ARRAY[1, 16], null, 'Red', 14.286, 40, null),
    ('ADATA XPG GAMMIX D10 8 GB', null, ARRAY[4, 3000], ARRAY[1, 8], null, 'Black / White', 10.667, 16, null),
    ('TEAMGROUP T-Force Delta RGB 16 GB', null, ARRAY[4, 2400], ARRAY[1, 16], null, 'White', 12.5, 15, null),
    ('Crucial CT7982449 16 GB', null, ARRAY[4, 2133], ARRAY[1, 16], null, 'Green', 14.065, 15, null),
    ('Corsair Vengeance LED 32 GB', null, ARRAY[4, 3000], ARRAY[2, 16], null, 'Black / Red', 10, 15, null),
    ('Corsair Vengeance 8 GB', null, ARRAY[3, 1600], ARRAY[2, 4], null, 'Black / Gold', 11.25, 9, null),
    ('Wintec AMPO 4 GB', null, ARRAY[3, 1333], ARRAY[1, 4], null, 'Green', 13.503, 9, null),
    ('G.Skill Ripjaws X 8 GB', 24.84, ARRAY[3, 1600], ARRAY[1, 8], 3.105, 'Black / Blue', 11.25, 9, null);