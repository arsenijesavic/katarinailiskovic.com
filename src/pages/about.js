import Markdown from 'react-markdown';

import { usePlugin } from 'tinacms';
import { InlineForm } from 'react-tinacms-inline';
import { InlineWysiwyg } from 'react-tinacms-editor';
import { useGithubJsonForm } from 'react-tinacms-github';
import {
  getGithubPreviewProps,
  parseJson,
} from 'next-tinacms-github';

const About = ({ file }) => {
  const [data, form] = useGithubJsonForm(file, {
    fields: [],
    label: 'About',
  });

  usePlugin(form);

  return (
    <>
      <header className="container mx-auto min-h-screen py-24 flex justify-between">
        <div className="w-6/12 pr-8 ">
          <div className="prose prose-xl">
            <InlineForm form={form}>
              <InlineWysiwyg name="body" format="markdown">
                <Markdown>{data?.body}</Markdown>
              </InlineWysiwyg>
            </InlineForm>
          </div>
        </div>

        <div className="w-6/12 min-h-screen pb-32">
          <figure className="w-full h-full">
            <img
              className="w-full h-full object-cover"
              src="/hero-about.jpg"
              alt=""
            />
          </figure>
        </div>
      </header>
    </>
  );
};

export async function getStaticProps({ preview, previewData }) {
  const fileRelativePath = `content/about.json`;

  if (preview) {
    try {
      return getGithubPreviewProps({
        ...previewData,
        fileRelativePath,
        parse: parseJson,
      });
    } catch (error) {
      console.error(error);
    }
  }

  const data = await import('../../content/about.json');

  return {
    props: {
      preview: false,
      file: {
        fileRelativePath,
        data: data?.default,
      },
    },
    revalidate: 10,
  };
}

export default About;
