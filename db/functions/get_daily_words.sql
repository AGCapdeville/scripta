DROP FUNCTION  IF EXISTS get_daily_words(INT);
CREATE OR REPLACE FUNCTION public.get_daily_words(p_word_length INT)
RETURNS TABLE (id INT, word TEXT)
LANGUAGE sql
STABLE
AS $$
  SELECT id, word
  FROM public.words
  WHERE "length" = p_word_length
  ORDER BY md5(current_date::text || ':' || id::text);
$$;
