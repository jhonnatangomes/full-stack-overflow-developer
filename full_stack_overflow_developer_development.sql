--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    question text NOT NULL,
    student text NOT NULL,
    class text NOT NULL,
    tags text NOT NULL,
    answered boolean DEFAULT false NOT NULL,
    "submittedAt" timestamp without time zone NOT NULL,
    "answeredAt" timestamp without time zone,
    "answeredBy" text,
    answer text,
    score integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.questions_id_seq OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    class text NOT NULL,
    token uuid NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions (id, question, student, class, tags, answered, "submittedAt", "answeredAt", "answeredBy", answer, score) FROM stdin;
1	What's more interesting? Front-end or back-end?	Nodejs	V8	javascript, chrome, web	t	2021-12-13 10:58:03.037248	2021-12-13 11:01:57.243307	teste	back-end of course	1
2	Quem é mais legal?	Jhonn	t3	legal, vida, eu	t	2021-12-13 10:58:35.500494	2021-12-13 11:02:13.149419	teste	eu mesmo	1
3	Quem é mais legal? a	Jhonn	t3	legal, vida, eu	t	2021-12-13 10:58:38.81915	2021-12-13 11:02:26.372895	teste	eu mesmo	1
5	Quem é mais legal? a 2.0	Jhonn	t3	legal, vida, eu	t	2021-12-13 10:58:44.024254	2021-12-13 11:04:26.883988	jhonnzito	Nao sei po	1
4	Quem é mais legal? a 2.0	Jhonn	t3	legal, vida, eu	t	2021-12-13 10:58:43.564251	2021-12-13 11:04:23.691447	jhonnzito	Nao sei po	4
6	Uki ta contecendo?	Zoru	T3	typescript, vida, javascript, java?	f	2021-12-13 11:08:35.072359	\N	\N	\N	1
7	Uki ta contecendo?	Zoru	T3	typescript, vida, javascript, java?	f	2021-12-13 11:08:35.774253	\N	\N	\N	1
8	Uki ta contecendo?	Zoru	T3	typescript, vida, javascript, java?	f	2021-12-13 11:08:36.094177	\N	\N	\N	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, class, token) FROM stdin;
1	jhonn	T3	34f1c8ee-25d4-4958-825e-3271097d34b6
2	teste	T3	1ca25574-f865-4895-ac1c-1e865aa17d9d
3	teste2	T3	457c7a14-9029-4d61-9c72-a0fe11805925
4	teste3	T3	1d9cd9d1-18ee-44a4-af47-4eea0d5a0f24
5	Jhonn	T3	cb4d4653-e46d-4370-9318-6f58a99585f4
6	jhonn2	t5	4ccb4f5f-a907-4084-a7dd-1892665ad3e1
7	camarada	t5	698f6248-3e21-402b-ae51-90ce36b22d7d
8	jhonnzito	t5	f7d02f53-5b9c-46cb-ab0a-059f2c46838c
\.


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_id_seq', 8, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- Name: questions questions_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pk PRIMARY KEY (id);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

