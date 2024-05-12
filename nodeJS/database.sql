/* Create the database */
CREATE DATABASE  IF NOT EXISTS X;

/* Switch to the classicmodels database */
USE X;

/* Drop the foreign key constraints */
ALTER TABLE comments DROP FOREIGN KEY comments_ibfk_1;
ALTER TABLE passwords DROP FOREIGN KEY passwords_ibfk_1;
ALTER TABLE posts DROP FOREIGN KEY posts_ibfk_1;
ALTER TABLE photos DROP FOREIGN KEY photos_ibfk_1;
ALTER TABLE albums DROP FOREIGN KEY albums_ibfk_1;
ALTER TABLE todos DROP FOREIGN KEY todos_ibfk_1;

/* Drop existing tables  */
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS passwords;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS albums;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS todos;

/* Create the tables */
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username varchar(50),
  email varchar(50),
  phone varchar(11)
);

CREATE TABLE addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  street VARCHAR(100),
  city VARCHAR(50),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE passwords (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  password1 VARCHAR(12),
  FOREIGN KEY (userId) REFERENCES users (id)
);

CREATE TABLE posts (
	id INT AUTO_INCREMENT PRIMARY KEY,
	userId INT,
    title VARCHAR(255),
    body TEXT,
    FOREIGN KEY (userId) REFERENCES users (id)
);

CREATE TABLE comments (
	id INT AUTO_INCREMENT PRIMARY KEY,
	postId INT,
    name VARCHAR(255),
    email VARCHAR(255),
    body TEXT,
	FOREIGN KEY (postId) REFERENCES posts (id)
);

CREATE TABLE albums (
	id INT AUTO_INCREMENT PRIMARY KEY,
	userId INT,
    title VARCHAR(255),
	FOREIGN KEY (userId) REFERENCES users (id)
);

CREATE TABLE photos (
	id INT AUTO_INCREMENT PRIMARY KEY,
	albumId INT,
    title VARCHAR(255),
    url VARCHAR(255),
    thumbnailUrl VARCHAR(255),
	FOREIGN KEY (albumId) REFERENCES albums (id)
);

CREATE TABLE todos (
	id INT AUTO_INCREMENT PRIMARY KEY,
	userId INT,
    title VARCHAR(255),
    completed BOOLEAN,
	FOREIGN KEY (userId) REFERENCES users (id)
);

/* Inserting data */
INSERT INTO users (username, email, phone) VALUES
('Shira', 'shira@gmail.com', '123456789'),
('Esti', 'esti@gmail.com', '987654321'),
('Debbie', 'debbie@gmail.com', '555555555');

INSERT INTO passwords (userId, password1) VALUES
(1, 'password1'),
(2, 'password2'),
(3, 'password3');

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
(1, 'Photo Title 1', 'http://example.com/photo1.jpg', 'http://example.com/thumb1.jpg'),
(1, 'Photo Title 2', 'http://example.com/photo2.jpg', 'http://example.com/thumb2.jpg'),
(1, 'Photo Title 3', 'http://example.com/photo3.jpg', 'http://example.com/thumb3.jpg'),
(1, 'Photo Title 4', 'http://example.com/photo4.jpg', 'http://example.com/thumb4.jpg'),
(1, 'Photo Title 5', 'http://example.com/photo5.jpg', 'http://example.com/thumb5.jpg'),
(2, 'Photo Title 6', 'http://example.com/photo6.jpg', 'http://example.com/thumb6.jpg'),
(2, 'Photo Title 7', 'http://example.com/photo7.jpg', 'http://example.com/thumb7.jpg'),
(2, 'Photo Title 8', 'http://example.com/photo8.jpg', 'http://example.com/thumb8.jpg'),
(2, 'Photo Title 9', 'http://example.com/photo9.jpg', 'http://example.com/thumb9.jpg'),
(2, 'Photo Title 10', 'http://example.com/photo10.jpg', 'http://example.com/thumb10.jpg'),
(3, 'Photo Title 11', 'http://example.com/photo11.jpg', 'http://example.com/thumb11.jpg'),
(3, 'Photo Title 12', 'http://example.com/photo12.jpg', 'http://example.com/thumb12.jpg'),
(3, 'Photo Title 13', 'http://example.com/photo13.jpg', 'http://example.com/thumb13.jpg'),
(3, 'Photo Title 14', 'http://example.com/photo14.jpg', 'http://example.com/thumb14.jpg'),
(3, 'Photo Title 15', 'http://example.com/photo15.jpg', 'http://example.com/thumb15.jpg');

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