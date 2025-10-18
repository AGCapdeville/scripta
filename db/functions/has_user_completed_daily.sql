create or replace function public.has_user_completed_daily(
  p_user_id uuid,
  p_word_length int
)
returns boolean
language sql
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.user_completed_games ucg
    join public.words w on w.id = ucg.word_id
    where ucg.user_id = p_user_id
      and w.length = p_word_length
      and (ucg.date_completed at time zone 'UTC')::date
          = (now() at time zone 'UTC')::date
  );
$$;
