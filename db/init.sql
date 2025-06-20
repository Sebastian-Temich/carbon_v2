CREATE SCHEMA IF NOT EXISTS carbon;
ALTER DATABASE postgres SET search_path TO carbon,public;
GRANT ALL PRIVILEGES ON SCHEMA carbon TO postgres;

