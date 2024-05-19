DROP DATABASE X;
/* Create the database */
CREATE DATABASE X;

/* Switch to the classicmodels database */
USE X;

/* Create the tables */

CREATE TABLE addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  street VARCHAR(100),
  city VARCHAR(50)
);

CREATE TABLE passwords (
  id INT AUTO_INCREMENT PRIMARY KEY,
  password1 VARCHAR(255)
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(50),
  phone VARCHAR(11),
  address_id INT,
  password_id INT,
  FOREIGN KEY (address_id) REFERENCES addresses(id),
  FOREIGN KEY (password_id) REFERENCES passwords(id)
);

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  title VARCHAR(255),
  body TEXT,
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  postId INT,
  name VARCHAR(255),
  email VARCHAR(255),
  body TEXT,
  FOREIGN KEY (postId) REFERENCES posts(id)
);

CREATE TABLE albums (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  title VARCHAR(255),
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  albumId INT,
  title VARCHAR(255),
  url VARCHAR(255),
  thumbnailUrl VARCHAR(255),
  FOREIGN KEY (albumId) REFERENCES albums(id)
);

CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  title VARCHAR(255),
  completed BOOLEAN,
  FOREIGN KEY (userId) REFERENCES users(id)
);

/* Inserting data into addresses and passwords first */
INSERT INTO addresses (street, city) VALUES
('רחוב הרצל', 'תל אביב'),
('רחוב הציונות', 'ירושלים'),
('רחוב המשה', 'חיפה');

INSERT INTO passwords (password1) VALUES
('$2a$10$iQAgClvATWGirdX.l64ufOVhyDGkN2LX0cBOZ/DzCm6FoiWsyd.q2'),
('$2a$10$N4v5.qSkDw.GoNmLPFVVde7h48LOg75zXSFeL3NN4tuitGooZATDa'),
('$2a$10$2xMf5ssvURXXsOYfaIRY2OAFEosJw3EsVspHtDz1GpmcEf.II2F4y');

/* Now inserting data into users table with foreign keys */
INSERT INTO users (username, email, phone, address_id, password_id) VALUES
('Shira', 'shira@gmail.com', '123456789', 1, 1),
('Esti', 'esti@gmail.com', '987654321', 2, 2),
('Debbie', 'debbie@gmail.com', '555555555', 3, 3);

/* Inserting data into other tables */
INSERT INTO posts (userId, title, body) VALUES
(1, 'Post Title 1', 'This is the body of post 1.'),
(1, 'Post Title 2', 'This is the body of post 2.'),
(1, 'Post Title 3', 'This is the body of post 3.'),
(2, 'Post Title 4', 'This is the body of post 4.'),
(2, 'Post Title 5', 'This is the body of post 5.'),
(2, 'Post Title 6', 'This is the body of post 6.'),
(3, 'Post Title 7', 'This is the body of post 7.'),
(3, 'Post Title 8', 'This is the body of post 8.'),
(3, 'Post Title 9', 'This is the body of post 9.');

INSERT INTO comments (postId, name, email, body) VALUES
(1, 'Commenter 1', 'commenter1@example.com', 'This is comment 1 on post 1.'),
(1, 'Commenter 2', 'commenter2@example.com', 'This is comment 2 on post 1.'),
(1, 'Commenter 3', 'commenter3@example.com', 'This is comment 3 on post 1.'),
(2, 'Commenter 4', 'commenter4@example.com', 'This is comment 1 on post 2.'),
(2, 'Commenter 5', 'commenter5@example.com', 'This is comment 2 on post 2.'),
(2, 'Commenter 6', 'commenter6@example.com', 'This is comment 3 on post 2.'),
(3, 'Commenter 7', 'commenter7@example.com', 'This is comment 1 on post 3.'),
(3, 'Commenter 8', 'commenter8@example.com', 'This is comment 2 on post 3.'),
(3, 'Commenter 9', 'commenter9@example.com', 'This is comment 3 on post 3.');

INSERT INTO albums (userId, title) VALUES
(1, 'Album Title 1'),
(1, 'Album Title 2'),
(1, 'Album Title 3'),
(2, 'Album Title 4'),
(2, 'Album Title 5'),
(2, 'Album Title 6'),
(3, 'Album Title 7'),
(3, 'Album Title 8'),
(3, 'Album Title 9');

INSERT INTO photos (albumId, title, url, thumbnailUrl) VALUES
(1, 'Mountain View', 'https://images.unsplash.com/photo-1593642634367-d91a135587b5', 'https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=150&h=150&fit=crop'),
(1, 'Forest Path', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=150&h=150&fit=crop'),
(1, 'Sunset Beach', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfYjytwITwY7DVgpwCBBdigVgegbdppsIcxXCGz23dvg&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfYjytwITwY7DVgpwCBBdigVgegbdppsIcxXCGz23dvg&s'),
(1, 'Lake Reflection', 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0', 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=150&h=150&fit=crop'),
(1, 'Desert Dunes', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=150&h=150&fit=crop'),
(2, 'Snowy Mountains', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=150&h=150&fit=crop'),
(2, 'Autumn Forest', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=150&h=150&fit=crop'),
(2, 'Rural Field', 'https://cdn.stips.co.il/photos/w400/7340654132.jpg', 'https://cdn.stips.co.il/photos/w400/7340654132.jpg'),
(2, 'Tropical Beach', 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0', 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=150&h=150&fit=crop'),
(2, 'City Park', 'https://img.lovepik.com/png/20231029/Smiling-blushing-cute-star-emoji-expression-cute-smile-Lovely-smiling_403775_wh860.png', 'https://img.lovepik.com/png/20231029/Smiling-blushing-cute-star-emoji-expression-cute-smile-Lovely-smiling_403775_wh860.png'),
(3, 'Lush Meadow', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=150&h=150&fit=crop'),
(3, 'Mountain Lake', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=150&h=150&fit=crop'),
(3, 'Rocky Coast', 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0', 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=150&h=150&fit=crop'),
(3, 'River Valley', 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0', 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=150&h=150&fit=crop'),
(3, 'Seaside Cliffs', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=150&h=150&fit=crop');


INSERT INTO todos (userId, title, completed) VALUES
(1, 'Task 1', false),
(1, 'Task 2', true),
(1, 'Task 3', false),
(1, 'Task 4', true),
(1, 'Task 5', false),
(1, 'Task 6', true),
(1, 'Task 7', false),
(1, 'Task 8', true),
(1, 'Task 9', false),
(1, 'Task 10', true),
(2, 'Task 1', false),
(2, 'Task 2', true),
(2, 'Task 3', false),
(2, 'Task 4', true),
(2, 'Task 5', false),
(2, 'Task 6', true),
(2, 'Task 7', false),
(2, 'Task 8', true),
(2, 'Task 9', false),
(2, 'Task 10', true),
(3, 'Task 1', false),
(3, 'Task 2', true),
(3, 'Task 3', false),
(3, 'Task 4', true),
(3, 'Task 5', false),
(3, 'Task 6', true),
(3, 'Task 7', false),
(3, 'Task 8', true),
(3, 'Task 9', false),
(3, 'Task 10', true);