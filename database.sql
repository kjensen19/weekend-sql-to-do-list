CREATE TABLE "tasks" (
  "id" SERIAL PRIMARY KEY,
  "task" VARCHAR(250) NOT NULL,
  "complete" BOOLEAN DEFAULT FALSE,
  "target" DATE
  );

  CREATE TABLE "calendar" (
  "id" SERIAL PRIMARY KEY,
  "year" VARCHAR,
  "month"VARCHAR,
  "week"VARCHAR,
  "day"VARCHAR,
  "dayname"VARCHAR,
  "calendar_date" VARCHAR
);



INSERT INTO "calendar"
  ("calendar_date", "year", "month", "week", "day", "dayname")
  with recursive cte as (
	-- customize start date here
	select date(date_part('year', current_date) || '-09-01') as calendar_date
	union all
	select date(calendar_date + interval '1 day') as calendar_date from cte 
	-- customize end date here
	where date_part('year', calendar_date + interval '1 day') <= date_part('year', current_date + interval '1 year')
)
select
  to_char(calendar_date, 'MM-DD-YYYY') as calendar_date,
  date_part('year', calendar_date) as year,
  to_char(calendar_date, 'Month') as month,
  to_char(calendar_date, 'w') as week,
  date_part('day', calendar_date) as day,
  to_char(calendar_date, 'Day') as dayname
from cte;

update "calendar" set "month" = RTRIM("month");