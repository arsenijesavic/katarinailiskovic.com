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
  const fileRelativePath = 'content/home.json';
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath,
      parse: parseJson,
    });
  }

  const data = await import('../../content/home.json');

  return {
    props: {
      preview: false,
      file: {
        fileRelativePath,
        data: data.default,
      },
    },
  };
}

export default Index;

const Hero = ({ image, title, subtitle }) => {
  return (
    <header className="w-full min-h-screen max-h-screen relative flex flex-col justify-center text-white">
      <div className="relative z-10 container mx-auto p-4 sm:p-0">
        <h2 className="text-4xl sm:text-6xl sm:leading-normal sm:whitespace-pre whitespace-normal">
          {title}
        </h2>

        <p className="text-base sm:text-2xl mt-10 sm:leading-relaxed sm:whitespace-pre whitespace-normal">
          {subtitle}
        </p>

        <button className="text-base sm:text-xl bg-accent-indigo hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-full mt-6">
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
    <section className="min-h-screen py-12 sm:py-24 bg-accent-green">
      <div className="container mx-auto p-4 sm:p-0">
        <h2 className=" text-3xl sm:text-4xl leading-relaxed">
          Work
        </h2>
        <button className="text-white text-xl font-bold w-full mt-6 text-center">
          See more work
        </button>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section className="min-h-screen py-12 sm:py-24 bg-accent-cream">
      <div className="container mx-auto p-4 sm:p-0">
        <h2 className="text-3xl sm:text-4xl leading-normal text-accent-indigo">
          Thoutful direction brings
          <br />
          personality to you brand
          <br />
          and drives ravenue.
        </h2>

        <div className="mt-16">
          <div className="flex justify-between items-center flex-wrap mt-16">
            <div className="w-full sm:w-6/12 pr-10 flex flex-col space-y-8 sm:space-y-20 mt-8 sm:mt-0 order-last sm:order-first">
              <div>
                <h3 className="text-2xl sm:text-3xl leading-tight text-accent-indigo">
                  Brand Strategy
                </h3>
                <p className="mt-2 text-base sm:text-xl">
                  is the core of a successfull brand. Set the guides
                  for the visual identity of your website and social
                  media. Don’t ever think about what to post.
                </p>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl leading-tight text-accent-indigo">
                  Styled product photography
                </h3>
                <p className="mt-2 text-base sm:text-xl">
                  is build on a strategy that tells the story of your
                  brand and attracts the desired customer with
                  thoughtful art direction.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-6/12 bg-blue-500">
              <img
                className="w-full h-full object-contain"
                src="/service-1.jpg"
                alt=""
              />
            </div>
          </div>

          <div className="flex justify-between items-center flex-wrap mt-16">
            <div className="w-full sm:w-6/12 bg-blue-500 order-last sm:order-first">
              <img
                className="w-full h-full object-contain"
                src="/service-2.jpg"
                alt=""
              />
            </div>
            <div className="w-full sm:w-6/12 pl-10 flex flex-col space-y-8 sm:space-y-20 mt-8 sm:mt-0">
              <div>
                <h3 className="text-2xl sm:text-3xl leading-tight text-accent-indigo">
                  Social media content
                </h3>
                <p className="mt-2 text-base sm:text-xl">
                  that emphasizes your characteristics, catches
                  attention and engages with your following.
                </p>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl leading-tight text-accent-indigo">
                  E-commerce images
                </h3>
                <p className="mt-2 text-base sm:text-xl">
                  don’t need to look boring. Let’s make them stand out
                  from the rest.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center items-center mt-16">
          <button className="bg-accent-indigo hover:bg-blue-700 text-white text-base sm:text-xl font-bold py-3 px-8 rounded-full mt-6">
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
    <section className="py-12 sm:py-24 bg-accent-green text-white">
      <div className="container mx-auto p-4 sm:p-0">
        <h2 className="text-3xl sm:text-4xl leading-normal sm:leading-relaxed">
          Would you love to hang a still life on the wall or licence
          some of my images?
        </h2>

        <div className="flex flex-wrap justify-between mt-16 sm:mt-32">
          <figure className="w-6/12 sm:w-3/12  transform -rotate-12 relative z-40">
            <img
              className="w-full h-full object-cover"
              src="/shop1.jpg"
              alt=""
            />
          </figure>
          <figure className="w-6/12 sm:w-3/12 transform rotate-6 relative z-30">
            <img
              className="w-full h-full object-cover"
              src="/shop2.jpg"
              alt=""
            />
          </figure>
          <figure className="w-6/12 sm:w-3/12 transform rotate-12 sm:-rotate-12 relative z-20">
            <img
              className="w-full h-full object-cover"
              src="/shop3.jpg"
              alt=""
            />
          </figure>
          <figure className="w-6/12 sm:w-3/12 transform -rotate-6 sm:rotate-6 relative z-10">
            <img
              className="w-full h-full object-cover"
              src="/shop4.jpg"
              alt=""
            />
          </figure>
        </div>

        <button className="text-white text-xl font-bold w-full mt-32 text-center">
          Shop now
        </button>
      </div>
    </section>
  );
};
