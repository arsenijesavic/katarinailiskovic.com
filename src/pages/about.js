import Markdown from 'react-markdown';

import { usePlugin } from 'tinacms';
import { InlineForm, InlineImage } from 'react-tinacms-inline';
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
    <InlineForm form={form}>
      <header className="container mx-auto min-h-screen py-24 px-4 sm:px-0">
        <div className="flex flex-wrap justify-between">
          <div className="w-full mt-8 sm:mt-0 sm:w-6/12 sm:pr-8">
            <div className="prose sm:prose-xl">
              <InlineWysiwyg name="body" format="markdown">
                <Markdown>{data?.body}</Markdown>
              </InlineWysiwyg>
            </div>
          </div>

          <div className="w-full sm:w-6/12 sm:min-h-screen sm:pb-32 order-first sm:order-last">
            <figure className="w-full h-full">
              <img
                className="w-full h-full object-cover"
                src="/hero-about.jpg"
                alt=""
              />
            </figure>
            {/* <InlineImage name="image" className="w-full h-full">
              {(props) => (
                <figure className="w-full h-full">
                  <img
                    className="w-full h-full object-cover"
                    src={props.src}
                    alt=""
                  />
                </figure>
              )}
            </InlineImage> */}
          </div>
        </div>
      </header>
    </InlineForm>
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
