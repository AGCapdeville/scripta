DROP FUNCTION IF EXISTS public.log_completed_game(
  int,int,boolean,interval,smallint,timestamp
);

CREATE OR REPLACE FUNCTION public.log_completed_game(
  p_word_id        int,
  p_game_type_id   int,
  p_result         boolean,
  p_duration       interval,                           -- 👈 interval param
  p_guess_count    smallint,
  p_date_completed timestamp without time zone DEFAULT NULL
)
RETURNS TABLE (
  id              int,
  word_id         int,
  game_type_id    int,
  result          boolean,
  duration        interval,
  date_completed  timestamp without time zone,
  guess_count     smallint,
  user_id         uuid
)
LANGUAGE sql
VOLATILE
AS $$
  INSERT INTO public.user_completed_games
    (word_id, game_type_id, result, duration, date_completed, guess_count, user_id)
  VALUES
    (p_word_id, p_game_type_id, p_result, p_duration,
     COALESCE(p_date_completed, CURRENT_TIMESTAMP),
     p_guess_count, auth.uid())
  RETURNING id, word_id, game_type_id, result, duration, date_completed, guess_count, user_id;
$$;
