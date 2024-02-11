DROP DATABASE IF EXISTS testblog;

CREATE DATABASE testblog;

\c testblog;


DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id VARCHAR PRIMARY KEY,
    email VARCHAR NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    admin BOOLEAN NOT NULL
);

INSERT INTO users (id, email, first_name, last_name, admin) VALUES
('123456789012345', 'user1@example.com', 'John', 'Doe', false),
('987654321012345', 'user2@example.com', 'Jane', 'Smith', false),
('567890123456789', 'user3@example.com', 'Bob', 'Smith', false),
('345678901234567', 'user4@example.com', 'Alice', 'Johnson', false),
('109932373019997923401', 'guy.nahon@grunitech.com', 'Guy', 'Nahon', true);

DROP TABLE IF EXISTS post;

CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    body VARCHAR NOT NULL,
    subject VARCHAR NOT NULL,
    date DATE NOT NULL,
    image_url VARCHAR NOT NULL,
    posted_by VARCHAR NOT NULL
);

INSERT INTO post (title, body, subject, date, image_url, posted_by) VALUES
  ('Daily Digest Post 1', 'Body of the first daily digest post.', 'dailydigest', '2024-02-10', 'https://example.com/image1.jpg', '123456789012345'),
  ('Tutorial Post 1', 'Body of the first tutorial post.', 'tutorials', '2024-02-09', 'https://example.com/image2.jpg', '109932373019997923401'),
  ('Design Tools Post 1', 'Body of the first design tools post.', 'designtools', '2024-02-08', 'https://example.com/image3.jpg', '567890123456789'),
  ('Daily Digest Post 2', 'Body of the second daily digest post.', 'dailydigest', '2024-02-07', 'https://example.com/image4.jpg', '109932373019997923401'),
  ('Tutorial Post 2', 'Body of the second tutorial post.', 'tutorials', '2024-02-06', 'https://example.com/image5.jpg', '234567890123456'),
  ('Design Tools Post 2', 'Body of the second design tools post.', 'designtools', '2024-02-05', 'https://example.com/image6.jpg', '456789012345678'),
  ('Daily Digest Post 3', 'Body of the third daily digest post.', 'dailydigest', '2024-02-04', 'https://example.com/image7.jpg', '789012345678901'),
  ('Tutorial Post 3', 'Body of the third tutorial post.', 'tutorials', '2024-02-03', 'https://example.com/image8.jpg', '109932373019997923401'),
  ('Design Tools Post 3', 'Body of the third design tools post.', 'designtools', '2024-02-02', 'https://example.com/image9.jpg', '109932373019997923401'),
  ('Daily Digest Post 4', 'Body of the fourth daily digest post.', 'dailydigest', '2024-02-01', 'https://example.com/image10.jpg', '109932373019997923401'),
  ('Tutorial Post 4', 'Body of the fourth daily digest post.', 'tutorials', '2024-02-01', 'https://example.com/image10.jpg', '109932373019997923401'),
  ('Design Tools Post 4', 'Body of the fourth daily digest post.', 'designtools', '2024-02-01', 'https://example.com/image10.jpg', '109932373019997923401'),
  ('Daily Digest Post 5', 'Body of the fourth daily digest post.', 'dailydigest', '2024-02-01', 'https://example.com/image10.jpg', '987654321012345'),
  ('Tutorial Post 5', 'Body of the fourth daily digest post.', 'tutorials', '2024-02-01', 'https://example.com/image10.jpg', '987654321012345'),
  ('Design Tools Post 5', 'Body of the fourth daily digest post.', 'designtools', '2024-02-01', 'https://example.com/image10.jpg', '567890123456789');

