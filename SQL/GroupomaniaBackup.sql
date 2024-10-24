PGDMP  %    6            	    |           postgres    16.3 (Postgres.app)    16.3 *    L           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            M           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            N           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            O           1262    5    postgres    DATABASE     t   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE postgres;
                postgres    false            P           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3663            �            1255    81973 &   decrement_likes_count_on_user_delete()    FUNCTION     �   CREATE FUNCTION public.decrement_likes_count_on_user_delete() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  
    UPDATE public.posts
    SET likes_count = likes_count - 1
    WHERE post_id = OLD.post_id;

    RETURN NULL;
END;
$$;
 =   DROP FUNCTION public.decrement_likes_count_on_user_delete();
       public          postgres    false            �            1259    49194    comments    TABLE     �   CREATE TABLE public.comments (
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    comment_text text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    comment_id integer NOT NULL
);
    DROP TABLE public.comments;
       public         heap    postgres    false            �            1259    90135    comments_comment_id_seq    SEQUENCE     �   CREATE SEQUENCE public.comments_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.comments_comment_id_seq;
       public          postgres    false    219            Q           0    0    comments_comment_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.comments_comment_id_seq OWNED BY public.comments.comment_id;
          public          postgres    false    222            �            1259    65567    likes    TABLE     �   CREATE TABLE public.likes (
    like_id integer NOT NULL,
    post_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.likes;
       public         heap    postgres    false            �            1259    65566    likes_like_id_seq    SEQUENCE     �   CREATE SEQUENCE public.likes_like_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.likes_like_id_seq;
       public          postgres    false    221            R           0    0    likes_like_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.likes_like_id_seq OWNED BY public.likes.like_id;
          public          postgres    false    220            �            1259    41020    posts    TABLE     >  CREATE TABLE public.posts (
    post_id integer NOT NULL,
    content character varying(500),
    media_upload character varying(255),
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    likes_count integer DEFAULT 0
);
    DROP TABLE public.posts;
       public         heap    postgres    false            �            1259    41019    posts_post_id_seq    SEQUENCE     �   CREATE SEQUENCE public.posts_post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.posts_post_id_seq;
       public          postgres    false    218            S           0    0    posts_post_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.posts_post_id_seq OWNED BY public.posts.post_id;
          public          postgres    false    217            �            1259    32778    users    TABLE     F  CREATE TABLE public.users (
    _id integer NOT NULL,
    family_name character varying(100) NOT NULL,
    given_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    profile_picture character varying(255),
    title_role text,
    about_me text
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    32777    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216            T           0    0    users_id_seq    SEQUENCE OWNED BY     >   ALTER SEQUENCE public.users_id_seq OWNED BY public.users._id;
          public          postgres    false    215            �           2604    90136    comments comment_id    DEFAULT     z   ALTER TABLE ONLY public.comments ALTER COLUMN comment_id SET DEFAULT nextval('public.comments_comment_id_seq'::regclass);
 B   ALTER TABLE public.comments ALTER COLUMN comment_id DROP DEFAULT;
       public          postgres    false    222    219            �           2604    65570    likes like_id    DEFAULT     n   ALTER TABLE ONLY public.likes ALTER COLUMN like_id SET DEFAULT nextval('public.likes_like_id_seq'::regclass);
 <   ALTER TABLE public.likes ALTER COLUMN like_id DROP DEFAULT;
       public          postgres    false    221    220    221            �           2604    41023    posts post_id    DEFAULT     n   ALTER TABLE ONLY public.posts ALTER COLUMN post_id SET DEFAULT nextval('public.posts_post_id_seq'::regclass);
 <   ALTER TABLE public.posts ALTER COLUMN post_id DROP DEFAULT;
       public          postgres    false    218    217    218            �           2604    32781 	   users _id    DEFAULT     e   ALTER TABLE ONLY public.users ALTER COLUMN _id SET DEFAULT nextval('public.users_id_seq'::regclass);
 8   ALTER TABLE public.users ALTER COLUMN _id DROP DEFAULT;
       public          postgres    false    215    216    216            F          0    49194    comments 
   TABLE DATA           Z   COPY public.comments (user_id, post_id, comment_text, created_at, comment_id) FROM stdin;
    public          postgres    false    219   \1       H          0    65567    likes 
   TABLE DATA           F   COPY public.likes (like_id, post_id, user_id, created_at) FROM stdin;
    public          postgres    false    221   �1       E          0    41020    posts 
   TABLE DATA           m   COPY public.posts (post_id, content, media_upload, user_id, created_at, updated_at, likes_count) FROM stdin;
    public          postgres    false    218   �1       C          0    32778    users 
   TABLE DATA           u   COPY public.users (_id, family_name, given_name, email, password, profile_picture, title_role, about_me) FROM stdin;
    public          postgres    false    216   92       U           0    0    comments_comment_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.comments_comment_id_seq', 163, true);
          public          postgres    false    222            V           0    0    likes_like_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.likes_like_id_seq', 312, true);
          public          postgres    false    220            W           0    0    posts_post_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.posts_post_id_seq', 414, true);
          public          postgres    false    217            X           0    0    users_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.users_id_seq', 118, true);
          public          postgres    false    215            �           2606    90138    comments comments_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (comment_id);
 @   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_pkey;
       public            postgres    false    219            �           2606    65573    likes likes_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (like_id);
 :   ALTER TABLE ONLY public.likes DROP CONSTRAINT likes_pkey;
       public            postgres    false    221            �           2606    41030    posts posts_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (post_id);
 :   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_pkey;
       public            postgres    false    218            �           2606    32786    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    216            �           2606    32784    users users_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            �           2620    81974    likes after_user_likes_delete    TRIGGER     �   CREATE TRIGGER after_user_likes_delete AFTER DELETE ON public.likes FOR EACH ROW EXECUTE FUNCTION public.decrement_likes_count_on_user_delete();
 6   DROP TRIGGER after_user_likes_delete ON public.likes;
       public          postgres    false    223    221            �           2606    49207    comments comments_post_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(post_id);
 H   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_post_id_fkey;
       public          postgres    false    219    218    3495            �           2606    49202    comments comments_user_id_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(_id);
 H   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_user_id_fkey;
       public          postgres    false    216    219    3493            �           2606    81943    posts fk_user    FK CONSTRAINT        ALTER TABLE ONLY public.posts
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(_id) ON DELETE CASCADE;
 7   ALTER TABLE ONLY public.posts DROP CONSTRAINT fk_user;
       public          postgres    false    218    216    3493            �           2606    81968    likes likes_post_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(post_id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.likes DROP CONSTRAINT likes_post_id_fkey;
       public          postgres    false    218    3495    221            �           2606    81963    likes likes_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(_id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.likes DROP CONSTRAINT likes_user_id_fkey;
       public          postgres    false    216    221    3493            �           2606    81958    posts posts_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(_id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_user_id_fkey;
       public          postgres    false    218    216    3493            F   <   x�34��414�,I-.��K�4202�54�52V0��22�24�326270�443����� 8}
�      H      x������ � �      E   d   x�}�[
�  �o=EHwWIw�DD��P���]���^�\�:[+bm�ۚ�� �^�z�Ֆ���� =�'
1*�#�Hn�(�ظ�#���h�_{~       C   �   x���
�0@�u��c�Ow���
�	$5O1h[�t���p9�+DBJԆT���[�xt�u���L�N�;.1������h�g��ߢ�m�f��t�Na�\XT�g=����>qh�x\�u�9�цQJ�%�(d     