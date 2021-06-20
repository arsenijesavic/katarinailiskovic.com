import { useEffect, useMemo } from 'react';
import Head from 'next/head';

import Layout from 'components/Layout';
// import { DefaultSeo } from "next-seo";
// import SEO from "../../seo.config";
// import { AnimatePresence } from "framer-motion";

import { TinaCMS, TinaProvider, useCMS } from 'tinacms';
import {
  HtmlFieldPlugin,
  MarkdownFieldPlugin,
} from 'react-tinacms-editor';
import {
  GithubClient,
  TinacmsGithubProvider,
} from 'react-tinacms-github';

import { NextGithubMediaStore } from 'next-tinacms-github';

import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

const github = new GithubClient({
  proxy: '/api/proxy-github',
  authCallbackRoute: '/api/create-github-access-token',
  clientId: process.env.GITHUB_CLIENT_ID,
  baseRepoFullName: process.env.REPO_FULL_NAME, // e.g: tinacms/tinacms.org,
});

function MyApp({ Component, pageProps }) {
  const cms = useMemo(
    () =>
      new TinaCMS({
        enabled: pageProps.preview,
        sidebar: pageProps.preview,
        toolbar: pageProps.preview,

        apis: {
          github,
        },
        media: new NextGithubMediaStore(github),
      }),
    [],
  );

  useEffect(() => {
    cms.plugins.add(HtmlFieldPlugin);
    cms.plugins.add(MarkdownFieldPlugin);
  }, [cms]);

  const onLogin = async () => {
    const token =
      localStorage.getItem('tinacms-github-token') || null;
    const headers = new Headers();

    if (token) {
      headers.append('Authorization', 'Bearer ' + token);
    }

    const resp = await fetch(`/api/preview`, { headers: headers });
    const data = await resp.json();

    if (resp.status == 200)
      window.location.href = window.location.pathname;
    else throw new Error(data.message);
  };

  const onLogout = () => {
    return fetch(`/api/reset-preview`).then(() => {
      window.location.reload();
    });
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* <DefaultSeo {...SEO} /> */}
      <Layout>
        <TinaProvider cms={cms}>
          <TinacmsGithubProvider {...{ onLogin, onLogout }}>
            <Component {...pageProps} />
            <EditButton cms={cms} />
          </TinacmsGithubProvider>
        </TinaProvider>
      </Layout>

      <style global jsx>{`
        @font-face {
          font-family: 'Coconat';
          font-style: normal;
          font-weight: 500;
          src: url('/fonts/Coconat-Regular.woff') format('woff');
        }

        @font-face {
          font-family: 'Coconat';
          font-style: normal;
          font-weight: 600;
          src: url('/fonts/Coconat-Regular.woff') format('woff');
        }

        @font-face {
          font-family: 'Coconat';
          font-style: normal;
          font-weight: 700;
          src: url('/fonts/Coconat-Regular.woff') format('woff');
        }

        @font-face {
          font-family: 'Coconat';
          font-style: normal;
          font-weight: 800;
          src: url('/fonts/Coconat-Regular.woff') format('woff');
        }

        @font-face {
          font-family: 'Coconat';
          font-style: normal;
          font-weight: 900;
          src: url('/fonts/Coconat-Regular.woff') format('woff');
        }

        * {
          font-family: 'Montserrat', sans-serif;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: 'Coconat', sans-serif;
          font-weight: 500;
          font-size: 100%;
        }
      `}</style>
    </>
  );
}

export default MyApp;

export const EditButton = ({ cms }) => {
  return (
    <button
      className="tina-cms-button"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: '9999999',
        backgroundColor: 'blue',
        color: 'white',
      }}
      onClick={() => (cms.enabled ? cms.disable() : cms.enable())}
    >
      {cms.enabled ? 'Stop edit' : 'edit the blog'}
    </button>
  );
};
