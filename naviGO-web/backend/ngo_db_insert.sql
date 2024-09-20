-- Use the ngo_db database
USE ngo_db;

-- Insert 3 users, one for each role
INSERT INTO Users (name, email, password, role) VALUES
('Alice Johnson', 'alice@example.com', 'password123', 'admin'),
('Bob Smith', 'bob@example.com', 'password123', 'donor'),
('Catherine Lee', 'catherine@example.com', 'password123', 'community_manager');

-- Insert data into Communities table, assigning each to the community manager
INSERT INTO Communities (community_name, location, community_manager_id) VALUES
('Green Valley', 'California', 3),
('Sunrise Town', 'Texas', 3),
('Riverdale', 'New York', 3);

-- Insert data into CommunityManagers table
INSERT INTO CommunityManagers (user_id, community_id) VALUES
(3, 1),
(3, 2),
(3, 3);

-- Insert data into Donations table
INSERT INTO Donations (item_name, item_type, value, quantity, user_id, community_id, donation_date, remaining_quantity, status) VALUES
('Winter Jackets', 'in-kind', NULL, 50, 2, 1, '2024-08-01', 20, 'received'),
('School Supplies', 'in-kind', NULL, 100, 2, 2, '2024-08-02', 50, 'pending'),
('Books', 'in-kind', NULL, 200, 2, 3, '2024-08-03', 100, 'received'),
('Medical Supplies', 'monetary', 500.00, NULL, 2, 1, '2024-08-04', NULL, 'received'),
('Blankets', 'in-kind', NULL, 75, 2, 2, '2024-08-05', 25, 'not_received'),
('Food Packages', 'in-kind', NULL, 120, 2, 3, '2024-08-06', 60, 'pending'),
('Emergency Fund', 'monetary', 1000.00, NULL, 2, 1, '2024-08-07', NULL, 'received'),
('Water Filters', 'in-kind', NULL, 30, 2, 2, '2024-08-08', 15, 'received'),
('Solar Lanterns', 'in-kind', NULL, 40, 2, 3, '2024-08-09', 20, 'not_received'),
('Sanitation Kits', 'monetary', 750.00, NULL, 2, 1, '2024-08-10', NULL, 'pending');