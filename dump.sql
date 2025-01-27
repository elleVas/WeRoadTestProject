--
-- PostgreSQL database dump
--

-- Dumped from database version 14.15 (Homebrew)
-- Dumped by pg_dump version 14.15 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: booking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.booking (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying NOT NULL,
    seats integer NOT NULL,
    "isConfirmed" boolean DEFAULT false NOT NULL,
    "expiresAt" timestamp without time zone,
    "travelId" uuid
);


ALTER TABLE public.booking OWNER TO postgres;

--
-- Name: travel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.travel (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    slug character varying NOT NULL,
    name character varying NOT NULL,
    description text NOT NULL,
    "startingDate" date,
    price integer NOT NULL,
    moods json,
    "maxCapacity" integer NOT NULL,
    iata character varying NOT NULL,
    description_extended character varying,
    "endingDate" date
);


ALTER TABLE public.travel OWNER TO postgres;

--
-- Data for Name: booking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.booking (id, email, seats, "isConfirmed", "expiresAt", "travelId") FROM stdin;
\.


--
-- Data for Name: travel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.travel (id, slug, name, description, "startingDate", price, moods, "maxCapacity", iata, description_extended, "endingDate") FROM stdin;
8b65e10e-b52f-4291-8f0a-6e5e6d145e2f	united-arab-emirates	United Arab Emirates: from Dubai to Abu Dhabi	At Dubai and Abu Dhabi everything is huge and majestic...	2025-12-05	149900	{"nature":30,"relax":40,"history":20,"culture":80,"party":70}	5	DXB	Experience the grandeur of Dubai and Abu Dhabi, where everything is larger-than-life. Marvel at iconic skyscrapers, luxurious resorts, and world-class shopping. Explore cultural treasures like the Sheikh Zayed Grand Mosque and enjoy thrilling desert adventures. Indulge in the unmatched opulence and innovation these cities are renowned for, blending modern marvels with timeless Arabian charm.	2025-11-18
7b5e7a1f-b7de-4f74-918d-68e77b9280fe	Thailand-Border	Thailand-Border	Thailand-Border: from Cambodia to beautiful island border...	2025-11-02	199900	{"nature":80,"relax":20,"history":90,"culture":30,"party":40}	5	BKK	Discover the stunning journey from Cambodia to Thailand's tropical islands. Experience vibrant border markets, immerse yourself in local culture, and unwind on pristine beaches surrounded by turquoise waters. This adventure blends relaxation and exploration, offering breathtaking landscapes, island hopping, and unforgettable sunsets. Perfect for travelers seeking both tranquility and cultural immersion in Southeast Asia's hidden gems.	2025-11-23
d85dba24-2a1d-4f7e-8194-df84c12f777b	iceland-hunting-northern-lights	Iceland: hunting for the Northern Lights	Why visit Iceland in winter? Because it is between October and March...	2025-11-04	199900	{"nature":100,"relax":30,"history":10,"culture":20,"party":10}	5	RKV	Discover the magic of Iceland in winter, from October to March, when the Northern Lights dance across the sky. Explore icy glaciers, stunning waterfalls, and relax in steaming geothermal lagoons. This season offers a unique blend of adventure and tranquility, making it the perfect time to experience Iceland's breathtaking natural beauty.	2025-11-20
6b1a4320-abe7-44d5-b1d5-9148d25e5ed9	Vietnam-South	Vietnam South	Vietnam South: from Ho-Chi-Min city (Saigon) to Phu Quoc island...	2025-11-01	199900	{"nature":80,"relax":60,"history":30,"culture":30,"party":50}	3	SGN	Embark on an unforgettable journey through Vietnam's vibrant south, starting in the bustling streets of Ho Chi Minh City. Explore cultural landmarks and savor local cuisine before heading to the paradise of Phu Quoc Island. Relax on white-sand beaches, swim in crystal-clear waters, and discover the island's lush landscapes and charming villages.	2025-11-30
d408be33-aa6a-4c73-a2c8-58a70ab2ba4d	jordan-360	Jordan 360°	Jordan 360°: the perfect tour to discover the suggestive Wadi Rum desert...	2025-11-03	199900	{"nature":80,"relax":20,"history":90,"culture":30,"party":10}	5	AMM	Embark on a complete journey through Jordan, exploring the enchanting Wadi Rum desert, the ancient city of Petra, and the serene Dead Sea. This immersive tour offers breathtaking landscapes, rich history, and unforgettable cultural experiences, providing the perfect way to discover the heart of this captivating destination.	2025-11-12
\.


--
-- Name: booking PK_49171efc69702ed84c812f33540; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY (id);


--
-- Name: travel PK_657b63ec7adcf2ecf757a490a67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.travel
    ADD CONSTRAINT "PK_657b63ec7adcf2ecf757a490a67" PRIMARY KEY (id);


--
-- Name: travel UQ_07a7b0c3f52ff8f1cf79e1f14a2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.travel
    ADD CONSTRAINT "UQ_07a7b0c3f52ff8f1cf79e1f14a2" UNIQUE (slug);


--
-- Name: booking FK_78838cd890d05484000f7dbf9eb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT "FK_78838cd890d05484000f7dbf9eb" FOREIGN KEY ("travelId") REFERENCES public.travel(id);


--
-- PostgreSQL database dump complete
--

