import Image from 'next/image';

import Link from 'next/link';

import { usePlugin, useCMS } from 'tinacms';

import {
  BlocksControls,
  InlineBlocks,
  InlineForm,
  InlineImage,
} from 'react-tinacms-inline';

import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from 'react-tinacms-github';

import {
  getGithubPreviewProps,
  parseJson,
} from 'next-tinacms-github';

import DeleteAction from '../../../cms/actions/Delete';

const BlockImage = ({ data, index }) => {
  return (
    <div className="max-w-screen-lg mx-auto my-8">
      <BlocksControls index={index}>
        <figure className="w-full max-h-screen flex justify-center items-center">
          <img
            className="w-full h-screen object-contain"
            src={data?.src}
            alt=""
          />
        </figure>
      </BlocksControls>
    </div>
  );
};

const BlockGallery = ({ data, index }) => {
  return (
    <div className="my-16">
      <BlocksControls index={index}>
        <div className="flex container mx-auto sm:space-x-2 space-x-4">
          {data?.images?.map((image, index) => (
            <InlineImage key={index} name={`images[${index}].src`}>
              {(props) => (
                <figure className="aspect-w-1 aspect-h-1">
                  <img
                    className="w-full h-full object-cover"
                    src={props.src}
                    alt={data.alt}
                  />
                </figure>
              )}
            </InlineImage>
          ))}
        </div>
      </BlocksControls>
    </div>
  );
};

const PAGE_BLOCKS = {
  image: {
    Component: BlockImage,
    template: {
      label: 'Image',
      defaultItem: {
        src: '/project1.png',
      },
      fields: [
        //   {
        //     name: "style",
        //     label: "Type Style",
        //     description: "Select a type style for the hero copy",
        //     component: "select",
        //     options: ["Swiss-Style", "Art-Nouveau", "Command-Line"],
        //   },
      ],
    },
  },

  gallery: {
    Component: BlockGallery,
    template: {
      label: 'Gallery',
      defaultItem: {
        src: '/project1.png',
        images: [{ src: '/work1.png' }, { src: '/work2.png' }],
      },
      fields: [
        //   {
        //     name: "style",
        //     label: "Type Style",
        //     description: "Select a type style for the hero copy",
        //     component: "select",
        //     options: ["Swiss-Style", "Art-Nouveau", "Command-Line"],
        //   },
      ],
    },
  },
};

export const fields = [
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

  // price: Float
  // deposits: [Deposit]

  // legal: TripLegal
  // organisation: TripOrganisation
  // payment: TripPayment
  // informations: [TripInformation]
  // itinerary: [Itinerary]
  {
    name: 'title',
    label: 'Title',
    component: 'text',
  },
  {
    name: 'categories',
    label: 'Categories',
    component: 'tags',
  },
  {
    name: 'summary',
    label: 'Summary',
    component: 'textarea',
  },

  // {
  //   label: 'Blocks',
  //   name: 'blocks',
  //   component: 'blocks',
  //   templates: {
  //     image: {
  //       label: 'Content',
  //       key: 'content-block',
  //       defaultItem: {
  //         content: '',
  //       },
  //       fields: [{ name: 'src', label: 'Image', component: 'image' }],
  //     },
  //     // 'image-block': ImageBlock,
  //     // 'content-block': ContentBlock,
  //   },
  // },
];

const Project = ({ file, preview }) => {
  const formConfig = {
    actions: [DeleteAction],
    fields,
    label: 'Project',
  };

  const [data, form] = useGithubJsonForm(file, formConfig);

  usePlugin(form);

  const moreProjects = [
    { title: 'Soap', href: 'soap', image: { src: '/more1.png' } },
    {
      title: 'Viviana jewellery',
      href: 'viviana-jewellery',
      image: { src: '/more2.png' },
    },
    { title: 'Future', href: 'future', image: { src: '/more3.png' } },
  ];

  return (
    <>
      <header className="w-full min-h-screen max-h-screen relative flex flex-col justify-center text-white">
        <div className="relative z-10 container mx-auto">
          <h2 className="text-6xl leading-normal">{data?.title}</h2>
          <ul className="flex space-x-4">
            {data?.tags?.map((tag, index) => (
              <li key={index} className="tag">
                {tag}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-2xl leading-normal w-10/12">
            {data?.summary}
          </p>
        </div>

        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src={data?.image}
            alt=""
          />
        </div>
      </header>
      <style>{`
        .tag {
            position: relative;
        }
        .tag::after {
            content:'/';
            position: absolute;
            right: -10px;
        }
        .tag:last-child:after
        {
            content: '';
        }
    `}</style>

      <section className="py-24 px-6">
        <InlineForm form={form} initialStatus={'active'}>
          <InlineBlocks name="blocks" blocks={PAGE_BLOCKS} />
        </InlineForm>
      </section>

      <Banner />
      <MoreProjects data={moreProjects} />
    </>
  );
};

export async function getStaticPaths() {
  const projects = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);
    const data = keys.map((key, index) => {
      // Create slug from filename
      const slug = key
        .replace(/^.*[\\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.');
      const value = values[index];
      // Parse yaml metadata & markdownbody in document

      return { slug, ...value };
    });
    return data;
  })(require.context(`../../../../content/work`, true, /\.json$/));

  const paths = projects.map((_) => `/work/${_.slug}`);

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({
  params,
  preview,
  previewData,
}) {
  const fileRelativePath = `content/work/${params.slug}.json`;
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

  return {
    props: {
      preview: false,
      file: {
        fileRelativePath,
        // data: data?.default,
      },
    },
    // revalidate: 10,
  };
}

export default Project;

const Banner = () => {
  return (
    <section className="py-24 bg-accent-green text-white">
      <div className="container mx-auto ">
        <h2 className="text-4xl leading-relaxed text-center">
          Are you passionate and care about your brand and the way
          it’s presented out there?
        </h2>

        <div className="w-full flex justify-center items-center mt-2">
          <button className="bg-accent-indigo hover:bg-opacity-80 text-white text-xl font-bold py-3 px-8 rounded-full mt-6">
            Let's work together
          </button>
        </div>
      </div>
    </section>
  );
};

const MoreProjects = ({ data }) => {
  return (
    <section className="py-24 bg-accent-purple text-white min-h-screen">
      <div className="container mx-auto ">
        <h2 className="text-4xl leading-relaxed">
          View more projects
        </h2>

        <div className="grid grid-cols-3 gap-8 text-center mt-8">
          {data?.map((project, index) => (
            <Link href={project.href} key={index}>
              <a>
                <figure className="aspect-w-3 aspect-h-4">
                  <img
                    className="w-full h-full object-cover"
                    src={project.image.src}
                    alt=""
                  />
                </figure>
                <p className="leading-relaxed text-2xl mt-4">
                  {project.title}
                </p>
              </a>
            </Link>
          ))}
        </div>

        {/* <div className="w-full flex justify-center items-center mt-6">
        <button className="bg-accent-indigo hover:bg-blue-700 text-white text-xl font-bold py-3 px-8 rounded-full mt-6">
          Let's work together
        </button>
      </div> */}
      </div>
    </section>
  );
};
