DROP TABLE IF EXISTS public.game_types CASCADE;

CREATE TABLE public.game_types (
  id serial not null,
  type text not null,
  constraint game_type_pkey primary key (id)
) TABLESPACE pg_default;