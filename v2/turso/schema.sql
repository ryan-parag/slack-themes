create table if not exists themes (
  id          text primary key,
  user_id     text,
  name        text not null,
  colors      text not null,             -- JSON.stringify(ThemeSeeds)
  groups      text not null default '[]', -- JSON.stringify(string[])
  is_public   integer not null default 1,
  likes       integer not null default 0,
  created_at  text not null default (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

create index if not exists themes_is_public_likes_idx on themes (is_public, likes desc);
create index if not exists themes_user_id_idx on themes (user_id);
