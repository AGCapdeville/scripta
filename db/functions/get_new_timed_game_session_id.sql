CREATE OR REPLACE FUNCTION public.get_new_timed_game_session_id()
RETURNS TABLE (id int)
LANGUAGE sql
STABLE
AS $$
    INSERT INTO timed_game_sessions DEFAULT VALUES
    RETURNING timed_game_sessions.id;
$$;
