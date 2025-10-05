CREATE OR REPLACE TABLE public.game_type (
  id serial not null,
  type text not null,
  constraint game_type_pkey primary key (id)
) TABLESPACE pg_default;