CALL complete_game(
  '123e4567-e89b-12d3-a456-426614174000', -- p_user_id
  42,                                     -- p_word_id
  5,                                      -- p_guess_count
  1,                                      -- p_game_type_id
  true,                                   -- p_result
  INTERVAL '00:03:25',                    -- p_duration
);

DROP FUNCTION public.complete_game_session;
CREATE FUNCTION public.complete_game_session(
  p_user_id         uuid,
  p_word_id         int,
  p_guess_count     int,
  p_game_type_id    int,
  p_result          boolean,
  p_duration        interval,
  p_date_completed  timestamp without time zone DEFAULT NOW(),
  p_game_session_id bigint DEFAULT NULL
)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog, pg_temp
AS $$
DECLARE
  v_completed_game_id bigint;
  v_game_session_id bigint;
BEGIN

  INSERT INTO public.completed_games (
    user_id, word_id, guess_count, result, duration, game_type_id, date_completed
  )
  VALUES (
    p_user_id, p_word_id, p_guess_count, p_result, p_duration, p_game_type_id, p_date_completed
  )
  RETURNING id INTO v_completed_game_id;


  IF p_game_session_id IS NULL THEN
    INSERT INTO public.game_sessions (user_id, game_type_id)
    VALUES (p_user_id, p_game_type_id)
    RETURNING id INTO v_game_session_id;
  ELSE
    v_game_session_id := p_game_session_id;
  END IF;

  INSERT INTO public.completed_game_sessions (completed_game_id, game_session_id)
  VALUES (v_completed_game_id, v_game_session_id);

  RETURN v_game_session_id;
END;
$$;
