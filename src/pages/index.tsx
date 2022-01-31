import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

import { getAllPosts, Post } from "../lib/api";

type HomeProps = {
  posts: Post[];
};

const HomePage: NextPage<HomeProps> = ({ posts }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <h1>Artigos</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          width: 1200,
        }}
      >
        {posts.map((post) => (
          <article
            key={post.slug}
            style={{
              width: 350,
              height: 450,
              display: "flex",
              flexDirection: "column",
              marginRight: 20,
              marginLeft: 20,
              marginBottom: 30,
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                borderRadius: "5px",
                overflow: "hidden",
                width: 350,
                height: 250,
                position: "relative",
              }}
            >
              <Image
                src={post.frontmatter.cover || "#"}
                alt={post.frontmatter.title}
                objectFit="cover"
                layout="fill"
                width={350}
                height={250}
              />
            </div>

            <h2
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              {post.frontmatter.title}
            </h2>
            <p
              style={{
                alignSelf: "center",
                color: "#858585",
                marginBottom: 10,
              }}
            >
              {post.timeToRead}
            </p>

            <div className="button">
              <Link href={`/articles/${post.slug}`}>
                <a>Ler mais</a>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <style global jsx>{`
        /* START:RESET */

        /* http://meyerweb.com/eric/tools/css/reset/ 
          v2.0 | 20110126
          License: none (public domain)
        */

        html,
        body,
        div,
        span,
        applet,
        object,
        iframe,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        blockquote,
        pre,
        a,
        abbr,
        acronym,
        address,
        big,
        cite,
        code,
        del,
        dfn,
        em,
        img,
        ins,
        kbd,
        q,
        s,
        samp,
        small,
        strike,
        strong,
        sub,
        sup,
        tt,
        var,
        b,
        u,
        i,
        center,
        dl,
        dt,
        dd,
        ol,
        ul,
        li,
        fieldset,
        form,
        label,
        legend,
        table,
        caption,
        tbody,
        tfoot,
        thead,
        tr,
        th,
        td,
        article,
        aside,
        canvas,
        details,
        embed,
        figure,
        figcaption,
        footer,
        header,
        hgroup,
        menu,
        nav,
        output,
        ruby,
        section,
        summary,
        time,
        mark,
        audio,
        video {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
        }
        /* HTML5 display-role reset for older browsers */
        article,
        aside,
        details,
        figcaption,
        figure,
        footer,
        header,
        hgroup,
        menu,
        nav,
        section {
          display: block;
        }
        body {
          line-height: 1;
        }
        ol,
        ul {
          list-style: none;
        }
        blockquote,
        q {
          quotes: none;
        }
        blockquote:before,
        blockquote:after,
        q:before,
        q:after {
          content: "";
          content: none;
        }
        table {
          border-collapse: collapse;
          border-spacing: 0;
        }

        /* END:RESET */

        @import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");

        * {
          font-family: "Inter", sans-serif !important;
        }

        body,
        html,
        div#__next {
          height: 100%;
        }

        a {
          text-decoration: none;
        }

        div.button {
          border: 1px solid blue;
          padding: 15px;
          text-align: center;
          border-radius: 5px;
          text-transform: uppercase;
          margin-top: 10px;
        }

        h1 {
          font-size: 32px;
          font-weight: bold;
          margin: 20px;
        }
      `}</style>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
};

export default HomePage;
