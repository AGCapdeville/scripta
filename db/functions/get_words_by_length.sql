CREATE OR REPLACE FUNCTION public.get_words_by_length(p_length int)
RETURNS TABLE (id int, word text, length int)
LANGUAGE sql
STABLE
AS $$
  SELECT w.id, w.word, w.length
  FROM public.words AS w
  WHERE w.length = p_length
  ORDER BY w.id;
$$;
