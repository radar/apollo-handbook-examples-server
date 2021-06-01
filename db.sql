CREATE TABLE books (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   title text NOT NULL
);


CREATE TABLE users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   username text NOT NULL,
   suspension_reason text
);
