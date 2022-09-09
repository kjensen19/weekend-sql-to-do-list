CREATE TABLE "tasks" (
  "id" SERIAL PRIMARY KEY,
  "task" VARCHAR(250) NOT NULL,
  "complete" BOOLEAN
  );

INSERT INTO "tasks"
  ("task", "complete")
  VALUES
  ('Build ToDo App', FALSE)