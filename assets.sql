DROP DATABASE IF EXISTS library;
CREATE DATABASE library;

\c library;

CREATE TABLE assets (
	ID SERIAL PRIMARY KEY,
	media VARCHAR,
	type VARCHAR,
	title TEXT,
	author TEXT[],
	source TEXT,
	category TEXT[]
);

INSERT INTO assets (media, type, title, author, source, category)
	VALUES (
		'book',
		'tutorial',
		'Ruby on Rails Tutorial: Learn Web Development with Rails',
		'{"Michael Hartl"}',
		'https://www.railstutorial.org/book',
		'{"Rails", "Web Development", "Ruby"}'
	);

INSERT INTO assets (media, type, title, author, source, category)
	VALUES (
		'book',
		'tutorial',
		'Node: Up and Running',
		'{"Tom Hughes-Croucher", "Mike Wilson"}',
		'http://chimera.labs.oreilly.com/books/1234000001808/index.html',
		'{"Node", "NodeJS", "Web Development", "JavaScript"}'
	);