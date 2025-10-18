-- One-per-day word selection, same globally (uses UTC date)
create or replace function public.get_daily_word(
  p_word_length int,
  p_date date default (now() at time zone 'UTC')::date
)
returns public.words
language plpgsql
stable
set search_path = public
as $$
declare
  v_count      bigint;
  v_idx        bigint;   -- 0-based index into the list for that length
  v_day_index  bigint;   -- days since epoch
  v_row        public.words%rowtype;
begin
  -- how many candidates of this length?
  select count(*) into v_count
  from public.words
  where length = p_word_length;

  if v_count = 0 then
    return null; -- no words of that length
  end if;

  -- stable day index (UTC)
  v_day_index := (p_date - date '1970-01-01');

  -- wrap into [0, v_count-1]
  v_idx := ((v_day_index % v_count) + v_count) % v_count;

  -- pick the v_idx-th word by id for this length
  select w.* into v_row
  from public.words w
  where w.length = p_word_length
  order by w.id
  offset v_idx limit 1;

  return v_row;
end;
$$;

