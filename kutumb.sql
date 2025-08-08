--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-08-09 01:24:12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16556)
-- Name: families; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.families (
    family_id integer NOT NULL,
    family_name character varying(100) NOT NULL,
    group_type character varying(50) DEFAULT 'general'::character varying,
    created_by integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.families OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16555)
-- Name: families_family_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.families_family_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.families_family_id_seq OWNER TO postgres;

--
-- TOC entry 4920 (class 0 OID 0)
-- Dependencies: 217
-- Name: families_family_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.families_family_id_seq OWNED BY public.families.family_id;


--
-- TOC entry 220 (class 1259 OID 16566)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50),
    email character varying(100) NOT NULL,
    mobile_number character varying(15) NOT NULL,
    password text NOT NULL,
    date_of_birth date,
    gender character varying(10),
    profile_picture_url text,
    user_type character varying(10) DEFAULT 'member'::character varying NOT NULL,
    family_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_gender_check CHECK (((gender)::text = ANY ((ARRAY['male'::character varying, 'female'::character varying, 'other'::character varying])::text[]))),
    CONSTRAINT users_user_type_check CHECK (((user_type)::text = ANY ((ARRAY['admin'::character varying, 'member'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16565)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 4921 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 4747 (class 2604 OID 16559)
-- Name: families family_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.families ALTER COLUMN family_id SET DEFAULT nextval('public.families_family_id_seq'::regclass);


--
-- TOC entry 4751 (class 2604 OID 16569)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 4912 (class 0 OID 16556)
-- Dependencies: 218
-- Data for Name: families; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.families (family_id, family_name, group_type, created_by, created_at, updated_at) FROM stdin;
1	Sharma Family	general	1	2025-08-09 01:17:42.304631	2025-08-09 01:17:42.304631
2	Khan Family	vip	2	2025-08-09 01:17:42.304631	2025-08-09 01:17:42.304631
3	Das Family	general	3	2025-08-09 01:17:42.304631	2025-08-09 01:17:42.304631
\.


--
-- TOC entry 4914 (class 0 OID 16566)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, first_name, last_name, email, mobile_number, password, date_of_birth, gender, profile_picture_url, user_type, family_id, created_at, updated_at) FROM stdin;
1	Amit	Sharma	amit.sharma@example.com	9876543210	pass123	1995-05-12	male	https://example.com/pic1.jpg	admin	1	2025-08-09 01:18:44.839993	2025-08-09 01:18:44.839993
2	Sana	Khan	sana.khan@example.com	9876501234	pass456	1998-09-25	female	https://example.com/pic2.jpg	member	2	2025-08-09 01:18:44.839993	2025-08-09 01:18:44.839993
3	Ravi	Das	ravi.das@example.com	9123456780	pass789	1992-01-08	male	https://example.com/pic3.jpg	member	3	2025-08-09 01:18:44.839993	2025-08-09 01:18:44.839993
\.


--
-- TOC entry 4922 (class 0 OID 0)
-- Dependencies: 217
-- Name: families_family_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.families_family_id_seq', 3, true);


--
-- TOC entry 4923 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 3, true);


--
-- TOC entry 4758 (class 2606 OID 16564)
-- Name: families families_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.families
    ADD CONSTRAINT families_pkey PRIMARY KEY (family_id);


--
-- TOC entry 4760 (class 2606 OID 16580)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4762 (class 2606 OID 16582)
-- Name: users users_mobile_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_mobile_number_key UNIQUE (mobile_number);


--
-- TOC entry 4764 (class 2606 OID 16578)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4765 (class 2606 OID 16583)
-- Name: users users_family_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_family_id_fkey FOREIGN KEY (family_id) REFERENCES public.families(family_id) ON DELETE SET NULL;


-- Completed on 2025-08-09 01:24:13

--
-- PostgreSQL database dump complete
--

