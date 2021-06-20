import { useForm, usePlugin, useCMS } from 'tinacms';

const Services = () => {
  const cms = useCMS();

  const formConfig = {
    id: 10,
    label: 'Hero',
    initialValues: {
      title: 'Visuals form identity & speak \nfor your brand.',
      headline: `Services I offer:`,
      services: [
        {
          id: Math.random().toString(36).substr(2, 9),
          name: 'Brand strategy',
          description: `Helps you have a clear mind, set brand guides and eliminate problems with creating visual content for your website and social media. Together we define the characteristics of your brand, language and style that will be valuable for your brand in the future.`,
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          name: 'Styled product photography',
          description: `Having authentic & recognizeble images for digital and print that everybody will remember. With those you will attracts the desired customer and build a following.`,
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          name: 'Social media content',
          description: `Stress about your Instagram content? Don’t worry anymore! We can arrange a regular content delivery of fresh and good looking images. Get photos that that will differ from the competitors.`,
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          name: 'E-commerce images',
          description: `No more boring e-commerce images! It’s the last thing your customer will see before the purchase so let’s make them more appealing.`,
        },
      ],
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
        label: 'Service',
        name: 'services',
        component: 'group-list',
        description: 'Service List',
        itemProps: (item) => ({
          key: item.id,
          label: item.name,
        }),
        defaultItem: () => ({
          name: 'New Author',
          id: Math.random().toString(36).substr(2, 9),
        }),
        fields: [
          {
            label: 'Name',
            name: 'name',
            component: 'text',
          },
          {
            label: 'Description',
            name: 'description',
            component: 'textarea',
          },
        ],
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
      <header className="w-full min-h-screen max-h-screen relative flex flex-col justify-center text-white">
        <div className="container mx-auto relative z-10">
          <h2 className="text-6xl leading-normal whitespace-pre">
            {values?.title}
          </h2>
        </div>

        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="/hero-services.jpg"
            alt=""
          />
        </div>
      </header>

      <section className="container mx-auto py-24">
        <div className="prose prose prose-2xl">
          <h2 className="font-medium">Services I offer:</h2>

          <div>
            {values?.services?.map((service, index) => (
              <div key={index} className="my-4">
                <h4>{service.name}</h4>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center items-center mt-2">
          <button className="bg-accent-indigo hover:bg-opacity-80 text-white text-xl font-bold py-3 px-8 rounded-full mt-6">
            Let's work together
          </button>
        </div>
      </section>
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

export default Services;
