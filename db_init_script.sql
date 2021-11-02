
DROP DATABASE cea_lounge_db;
CREATE DATABASE cea_lounge_db;
\c cea_lounge_db

CREATE TABLE "users" (
  "id" serial,
  "email" varchar(100) not null,
  "first_name" varchar(50) not null,
  "last_name" varchar(50) not null,
  "password" varchar(255) not null,
  "course" varchar(50) not null,
  "created_at" date default now(),
  PRIMARY KEY ("id")
);

CREATE TABLE "questions" (
  "id" serial PRIMARY KEY,
  "author_id" int,
  "title" varchar(50) not null,
  "question" text not null,
  "answered" boolean default false,
  "created_at" date default now(),
  "author_name" varchar(100), 
  FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE TABLE "question_answers" (
  "id" serial,
  "user_id" int,
  "question_id" int,
  "answer" text not null,
  "created_at" date default now(),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
  FOREIGN KEY ("question_id") REFERENCES "questions"("id")ON DELETE CASCADE 
);

CREATE TABLE "question_likes" (
  "user_id" int,
  "question_id" int,
  "created_at" date default now(),
  PRIMARY KEY ("user_id", "question_id"),
  FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE,
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
);

