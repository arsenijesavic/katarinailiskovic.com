import Markdown from 'react-markdown';
import { usePlugin } from 'tinacms';
import { InlineForm } from 'react-tinacms-inline';
import { InlineWysiwyg } from 'react-tinacms-editor';

import { useGithubJsonForm } from 'react-tinacms-github';
import {
  getGithubPreviewProps,
  parseJson,
} from 'next-tinacms-github';

const ContactPage = ({ file }) => {
  const formConfig = {
    fields: [
      {
        label: 'Hero Image',
        name: 'image',
        component: 'image',
        parse: (media) => {
          return media.previewSrc;
        },

        // Decide the file upload directory for the post
        // uploadDir: () => '/public/static/',

        // Generate the src attribute for the preview image.
        previewSrc: (src) => src,
      },

      {
        name: 'title',
        label: 'Title',
        component: 'textarea',
      },

      {
        name: 'headline',
        label: 'Headline',
        component: 'text',
      },

      {
        name: 'body',
        label: 'Body',
        component: 'markdown',
      },
    ],
    label: 'Contact',
  };

  const [data, form] = useGithubJsonForm(file, formConfig);

  usePlugin(form);

  return (
    <>
      {/* <header className="w-full min-h-screen max-h-screen relative flex flex-col justify-center text-white">
        <div className="container mx-auto relative z-10">
          <h2 className="text-6xl leading-normal whitespace-pre">
            {data?.?.title}
          </h2>
        </div>

        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="/hero-contact.jpg"
            alt=""
          />
        </div>
      </header> */}

      <section className="container mx-auto py-24 flex justify-between items-start">
        <div className="flex-1 pr-8">
          <div className="prose prose-2xl">
            <InlineForm form={form}>
              <InlineWysiwyg name="body" format="markdown">
                <Markdown>{data?.body}</Markdown>
              </InlineWysiwyg>
            </InlineForm>
          </div>
        </div>

        <div className="w-6/12">
          <form className="">
            <div className="mt-8 max-w-md">
              <div className="grid grid-cols-1 gap-6">
                <label className="block">
                  <span className="text-gray-700">Full name</span>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder=""
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Email address</span>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder="john@example.com"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">
                    I’m interested in
                  </span>
                  <select className="block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0">
                    <option>Corporate event</option>
                    <option>Wedding</option>
                    <option>Birthday</option>
                    <option>Other</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-gray-700">Message</span>
                  <textarea
                    className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    rows="6"
                  ></textarea>
                </label>

                <button className="bg-accent-indigo hover:bg-opacity-80 text-white text-xl font-bold py-3 px-8 rounded-full mt-6">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export async function getStaticProps({ preview, previewData }) {
  const fileRelativePath = `content/contact.json`;

  if (preview) {
    try {
      return getGithubPreviewProps({
        ...previewData,
        fileRelativePath,
        parse: parseJson,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const data = await import('../../content/contact.json');

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

export default ContactPage;
