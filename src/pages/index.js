import {
  getGithubPreviewProps,
  parseJson,
} from 'next-tinacms-github';

import { useGithubJsonForm } from 'react-tinacms-github';
import { usePlugin } from 'tinacms';

const Index = ({ file, preview }) => {
  const formOptions = {
    label: 'Home Page',
    fields: [
      {
        label: 'Hero Image',
        name: 'image',
        component: 'image',
        parse: (media) => media.previewSrc,
        // Decide the file upload directory for the post
        // uploadDir: () => '/public/static/',

        // Generate the src attribute for the preview image.
        previewSrc: (src) => src,
      },
      { label: 'Title', name: 'title', component: 'textarea' },
      { label: 'Subtitle', name: 'subtitle', component: 'textarea' },
    ],
  };

  const [data, form] = useGithubJsonForm(file, formOptions);
  usePlugin(form);

  const { image, title, subtitle } = data;

  return (
    <>
      <Hero {...{ image, title, subtitle }} />
      <Work />
      <Services />
      <About />
      <Licence />
    </>
  );
};

export async function getStaticProps({ preview, previewData }) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/home.json',
      parse: parseJson,
    });
  }

  const data = await import('../../content/home.json');

  return {
    props: {
      preview: false,
      file: {
        fileRelativePath: 'content/home.json',
        data: data.default,
      },
    },
  };
}

export default Index;

const Hero = ({ image, title, subtitle }) => {
  return (
    <header className="w-full min-h-screen max-h-screen relative flex flex-col justify-center text-white">
      <div className="relative z-10 container mx-auto">
        <h2 className="text-6xl leading-normal whitespace-pre">
          {title}
        </h2>

        <p className="mt-4 text-2xl leading-normal whitespace-pre">
          {subtitle}
        </p>

        <button className="bg-accent-indigo hover:bg-blue-700 text-white text-xl font-bold py-3 px-8 rounded-full mt-6">
          Let's work together
        </button>
      </div>

      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src={image}
          alt=""
        />
      </div>
    </header>
  );
};

const Work = () => {
  return (
    <section className="min-h-screen pt-24 bg-accent-green">
      <div className="container mx-auto">
        <h2 className="text-4xl leading-relaxed">Work</h2>
        <button className="text-accent-indigo text-xl font-bold w-full mt-6 text-center">
          See more work
        </button>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section className="min-h-screen py-24 bg-accent-cream">
      <div className="container mx-auto">
        <h2 className="text-4xl leading-relaxed text-accent-indigo">
          Thoutful direction brings
          <br />
          personality to you brand
          <br />
          and drives ravenue.
        </h2>

        <div className="mt-16">
          <div className="flex justify-between items-center mt-16">
            <div className="w-6/12 pr-10 flex flex-col space-y-20">
              <div>
                <h3 className="text-4xl leading-tight text-accent-indigo uppercase">
                  Brand Strategy
                </h3>
                <p className="mt-2">
                  is the core of a successfull brand. Set the guides
                  for the visual identity of your website and social
                  media. Don’t ever think about what to post.
                </p>
              </div>

              <div>
                <h3 className="text-4xl leading-tight text-accent-indigo uppercase">
                  Styled product photography
                </h3>
                <p className="mt-2">
                  is build on a strategy that tells the story of your
                  brand and attracts the desired customer with
                  thoughtful art direction.
                </p>
              </div>
            </div>
            <div className="w-6/12 bg-blue-500">
              <img
                className="w-full h-full object-contain"
                src="/service-1.jpg"
                alt=""
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-16">
            <div className="w-6/12 bg-blue-500">
              <img
                className="w-full h-full object-contain"
                src="/service-2.jpg"
                alt=""
              />
            </div>
            <div className="w-6/12 pl-10 flex flex-col space-y-20">
              <div>
                <h3 className="text-4xl leading-tight text-accent-indigo uppercase">
                  Social media content
                </h3>
                <p className="mt-2">
                  that emphasizes your characteristics, catches
                  attention and engages with your following.
                </p>
              </div>

              <div>
                <h3 className="text-4xl leading-tight text-accent-indigo uppercase">
                  E-commerce images
                </h3>
                <p className="mt-2">
                  don’t need to look boring. Let’s make them stand out
                  from the rest.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center items-center mt-6">
          <button className="bg-accent-indigo hover:bg-blue-700 text-white text-xl font-bold py-3 px-8 rounded-full mt-6">
            Let's work together
          </button>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex-1 relative bg-red-500">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="/about-1.jpg"
            alt=""
          />
        </div>
      </div>

      <div className="flex-1 bg-accent-purple"></div>
      {/* <div className="bg-accent-purple flex-1 flex justify-center items-center border-2 border-red-500">
        <div className="container mx-auto ">
          <h2 className="text-4xl leading-relaxed text-accent-indigo">
            Meet me
          </h2>
          <p className="text-base w-8/12 text-white mt-4">
            I’m fasinated with objects and photograph all kinds of
            props in different combinations and setups. I explore how
            they can replace human presents telling a story that will
            emotionaly bound with the audience.
          </p>
          <button className="bg-accent-indigo hover:bg-blue-700 text-white text-xl font-bold py-3 px-8 rounded-full mt-6">
            Learn more
          </button>
        </div>
      </div> */}
    </section>
  );
};

const Licence = () => {
  return (
    <section className="min-h-screen pt-24 bg-accent-green text-white">
      <div className="container mx-auto ">
        <h2 className="text-4xl leading-relaxed text-center">
          Would you love to hang a still life on the wall or licence
          some of my images?
        </h2>
        {/* <button className="text-accent-indigo text-xl font-bold w-full mt-6 text-center">
          See more work
        </button> */}
      </div>
    </section>
  );
};
