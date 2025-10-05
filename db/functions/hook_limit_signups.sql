-- 1) Function
create or replace function public.hook_limit_signups(payload jsonb)
returns jsonb
language plpgsql
security definer
as $$
declare
  max_users integer;
  current_users integer;
begin
  select int_value into max_users
  from public.app_settings
  where key = 'max_users';

  if max_users is null then
    return '{}'::jsonb;
  end if;

  select count(*) into current_users
  from auth.users
  where deleted_at is null;

  if current_users >= max_users then
    return jsonb_build_object(
      'error', jsonb_build_object(
        'http_code', 429,
        'message', format('Signups closed: user limit of %s reached.', max_users)
      )
    );
  end if;

  return '{}'::jsonb;
end;
$$;

-- Optional but recommended to keep SECURITY DEFINER:
alter function public.hook_limit_signups(jsonb)
  set search_path = public, auth;
