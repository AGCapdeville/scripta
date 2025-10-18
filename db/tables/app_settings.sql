DROP TABLE IF EXISTS public.app_settings CASCADE;

CREATE TABLE public.app_settings (
  key text not null,
  int_value integer null,
  constraint app_settings_pkey primary key (key)
) TABLESPACE pg_default;

