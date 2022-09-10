-- Task database table
CREATE TABLE "tasks" (
  "id" SERIAL PRIMARY KEY,
  "task" VARCHAR(250) NOT NULL,
  "complete" BOOLEAN
  );
-- insert statement for tasks
INSERT INTO "tasks"
  ("task", "complete")
  VALUES
  ('Build ToDo App', FALSE)

-- create calendar table 
CREATE TABLE "calendar" (
  "id" SERIAL PRIMARY KEY,
  "calendar_date" VARCHAR,
  "year" INTEGER,
  "month"VARCHAR,
  "day"VARCHAR,
  "dayname"VARCHAR,
  "toDo"VARCHAR

);

-- recursively create and insert calendar table entries
INSERT INTO "calendar"
("calendar_date", "year", "month", "day", "dayname")
with recursive cte as (
	-- start date here
	select date(date_part('year', current_date) || '-09-10') as calendar_date
	union all
	select date(calendar_date + interval '1 day') as calendar_date from cte 
	-- end date here
	where date_part('year', calendar_date + interval '1 day') <= date_part('year', current_date + interval '1 year')
)
select
calendar_date,
date_part('year', calendar_date) as year,
to_char(calendar_date, 'Month') as month,
date_part('day', calendar_date) as day,
to_char(calendar_date, 'Day') as dayname
from cte;