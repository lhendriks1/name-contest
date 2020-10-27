drop table if exists votes;
drop table if exists names;
drop table if exists contests;
drop table if exists users;

create table users (
  id serial primary key,
  email varchar(128) not null,
  first_name varchar(128),
  last_name varchar(128),
  api_key varchar(128) not null unique,
  created_at timestamp not null default current_timestamp
);

create table contests (
  id serial primary key,
  code varchar(255) not null unique,
  title varchar(255) not null,
  description text,
  status varchar(10) not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  created_at timestamp not null default current_timestamp,
  created_by integer references users not null
);

create table names (
  id serial primary key,
  contest_id integer references contests not null,
  label varchar(255) not null,
  normalized_label varchar(255) not null,
  description text,
  created_at timestamp not null default current_timestamp,
  created_by integer references users not null,
  constraint unique_contest_label
    unique(contest_id, normalized_label)
);

create table votes (
  id serial primary key,
  name_id integer references names not null,
  up boolean not null,
  created_at timestamp not null default current_timestamp,
  created_by integer references users not null,
  constraint user_can_vote_once_on_a_name
    unique(name_id, created_by)
);

INSERT INTO "users" ("email","first_name","last_name","api_key")
VALUES
(E'user1@test.com',E'User',E'One',E'4242'),
(E'usr2@test.com',E'User',E'Two',E'0000');

INSERT INTO "contests" ("code","title","description","status","created_by")
VALUES
(E'contest_1',E'A title',E'What a fantastic title',E'draft',1),
(E'contest_2',E'Another Title',E'A super funny title',E'published',1),
(E'contest_3',E'A really good title',NULL,E'archived',1);

INSERT INTO "names" ("contest_id","label","normalized_label","description","created_by")
VALUES
(1,E'Name submission',E'namesubmission',E'The Root Library',2),
(1,E'Another submission',E'anothersubmission',NULL,2),
(2,E'AVeryCreativeSubmission',E'averycreativesubmission',NULL,2),
(2,E'Not a great name',E'Notagreatname',NULL,2);

INSERT INTO "votes" ("name_id","up","created_by")
VALUES
(1,TRUE,1),
(1,TRUE,2),
(2,TRUE,1),
(2,FALSE,2),
(3,FALSE,1),
(3,FALSE,2),
(4,TRUE,1),
(4,TRUE,2);
