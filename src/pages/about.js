import Markdown from 'react-markdown';
import { useCMS, useForm, usePlugin } from 'tinacms';
import { InlineForm } from 'react-tinacms-inline';
import { InlineWysiwyg } from 'react-tinacms-editor';

const About = () => {
  const cms = useCMS();

  const formConfig = {
    id: 10,
    label: 'Hero',
    initialValues: {
      title: 'Visuals form identity & speak \nfor your brand.',
      headline: '',
      body: `# Meet me\n\nFirst of all I’m a big admirer and collector of everyday object with the beliefe that they can envoke emotions in the viewer’s eyes. \n\nA still life and product photographer working solo or in the asisstence of my two dogs. My practise focuses on setting direction in your content through sensibility, colors and set design. \n\nInternational availablilty gives me opportunity to meet and work with passionate product owners all around the world. You are a product owner? I love to hear your story.`,
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
      <header className="container mx-auto min-h-screen py-24 flex justify-between">
        <div className="w-6/12 pr-8 ">
          <div className="prose prose-xl">
            <InlineForm form={form}>
              <InlineWysiwyg name="body" format="markdown">
                <Markdown>{values.body}</Markdown>
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

export async function getStaticProps({ params, preview = false }) {
  return {
    props: {
      preview: true,
    },
    // revalidate: 10,
  };
}

export default About;
