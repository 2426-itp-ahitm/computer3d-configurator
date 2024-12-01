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
