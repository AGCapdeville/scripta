CREATE OR REPLACE TABLE public.user_completed_games (
  id serial not null,
  word_id integer not null,
  game_type_id integer not null,
  result boolean not null,
  duration interval not null,
  date_completed timestamp without time zone null default CURRENT_TIMESTAMP,
  guess_count smallint not null,
  user_id uuid not null,
  constraint user_completed_games_pkey primary key (id),
  constraint user_completed_games_game_type_id_fkey foreign KEY (game_type_id) references game_type (id),
  constraint user_completed_games_user_id_fkey foreign KEY (user_id) references auth.users (id),
  constraint user_completed_games_word_id_fkey foreign KEY (word_id) references word (id)
) TABLESPACE pg_default;