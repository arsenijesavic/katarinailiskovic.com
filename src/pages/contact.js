import Markdown from 'react-markdown';
import { useCMS, useForm, usePlugin } from 'tinacms';
import { InlineForm } from 'react-tinacms-inline';
import { InlineWysiwyg } from 'react-tinacms-editor';

const Services = () => {
  const cms = useCMS();

  const formConfig = {
    id: 10,
    label: 'Hero',
    initialValues: {
      title: 'Visuals form identity & speak \nfor your brand.',
      headline: `Meet me`,
      body: `For work inquiries, collaborations or licensing an image, please fill the application or email me directly at [iliskovickatarina@gmail.com](mailto:iliskovickatarina@gmail.com) and I’ll get back to you within one business day.`,
    },
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
    onSubmit: async (values) => {
      try {
        cms.alerts.success('Changes Saved!');
      } catch (error) {
        cms.alerts.error('Uh oh something went wrong!');
      }

      return Promise.resolve();
    },
  };

  const [values, form] = useForm(formConfig);
  usePlugin(form);

  return (
    <>
      {/* <header className="w-full min-h-screen max-h-screen relative flex flex-col justify-center text-white">
        <div className="container mx-auto relative z-10">
          <h2 className="text-6xl leading-normal whitespace-pre">
            {values?.title}
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
                <Markdown>{values.body}</Markdown>
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

export async function getStaticProps({ params, preview = false }) {
  return {
    props: {
      preview: false,
    },
    // revalidate: 10,
  };
}

export default Services;
