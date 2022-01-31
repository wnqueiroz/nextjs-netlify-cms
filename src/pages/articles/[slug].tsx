import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import {
  getAllPosts,
  getPostBySlug,
  markdownToHtml,
  Post,
} from "../../lib/api";
import { useEffect } from "react";
import Prism from "prismjs";
import Image from "next/image";

type PostProps = {
  post: Post;
};

const PostPage: NextPage<PostProps> = ({ post }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [post]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 1000,
        }}
      >
        <div
          style={{
            marginBottom: 50,
          }}
        >
          <div
            style={{
              borderRadius: "5px",
              overflow: "hidden",
              width: "100%",
              height: 450,
              position: "relative",
            }}
          >
            <Image
              src={post.frontmatter.cover || "#"}
              alt={post.frontmatter.title}
              objectFit="cover"
              layout="fill"
            />
          </div>
          <h1>{post.frontmatter.title}</h1>
          <b>{post.timeToRead}</b>
        </div>
        <div
          className="line-numbers"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      <Head>
        <title>{post.frontmatter.title}</title>
      </Head>

      <style global jsx>{`
        img {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = String(params?.slug);
  const post = getPostBySlug(slug);

  if (post) post.content = await markdownToHtml(post?.content);

  return {
    props: { post },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const paths = posts?.map(({ slug }) => ({ params: { slug } }));

  return {
    paths: paths?.length ? paths : [],
    fallback: false,
  };
};

export default PostPage;
