INSERT INTO
    public.cpu (cpu_id, name, price, core_count, core_clock, boost_clock, tdp, graphics, smt, socket, img)
VALUES
    (1,'AMD Ryzen 7 7800X3D', 339, 8, 4.2, 5, 120, 'Radeon', true, 'AM5', null),
    (2, 'AMD Ryzen 5 7600X', 204.99, 6, 4.7, 5.3, 105, 'Radeon', true, 'AM5', null),
    (3, 'AMD Ryzen 5 5600X', 144.31, 6, 3.7, 4.6, 65, null, true, 'AM4', null),
    (4, 'AMD Ryzen 5 7600', 185, 6, 3.8, 5.1, 65, 'Radeon', true, 'AM5', null),
    (5, 'Intel Core i9-14900K', 544.99, 24, 3.2, 6, 125, 'Intel UHD Graphics 770', true, 'LGA1700', null),
    (6, 'Intel Core i7-14700K', 399.99, 20, 3.4, 5.6, 125, 'Intel UHD Graphics 770', true, 'LGA1700', null);

INSERT INTO 
    public.motherboard (motherboard_id, name, price, socket, form_factor, max_memory, memory_slots, color, img) 
VALUES
    (1, 'MSI B650 GAMING PLUS WIFI', 169.99, 'AM5', 'ATX', 192, 4, 'Black', null),
    (2, 'Asus ROG STRIX B650-A GAMING WIFI', 199.99, 'AM5', 'ATX', 192, 4, 'Black / Silver', null),
    (3, 'MSI B760 GAMING PLUS WIFI', 159.99, 'LGA1700', 'ATX', 192, 4, 'Black / Silver', null),
    (4, 'MSI PRO Z790-A MAX WIFI', 239.99, 'LGA1700', 'ATX', 192, 4, 'Silver / Black', null),
    (5, 'MSI B550 GAMING GEN3', 99.99, 'AM4', 'ATX', 128, 4, 'Black', null),
    (6, 'MSI B450M-A PRO MAX II', 69.98, 'AM4', 'Micro ATX', 64, 2, 'Black', null);
