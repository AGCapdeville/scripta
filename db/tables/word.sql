CREATE OR REPLACE TABLE public.word (
  id serial not null,
  word text not null,
  length integer null,
  constraint word_pkey primary key (id)
) TABLESPACE pg_default;