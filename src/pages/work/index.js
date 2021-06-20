import { useEffect } from 'react';
import Link from 'next/link';

import {
  getGithubPreviewProps,
  parseJson,
} from 'next-tinacms-github';
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from 'react-tinacms-github';

import { useCMS, usePlugin, withPlugin } from 'tinacms';
import ProjectCreatorPlugin from 'cms/plugins/ProjectCreatorPlugin';

const PROJECTS = [
  {
    slug: 'weeding-celebration',
    title: 'Weeding Celebration',
    categories: ['stil life', 'editorial'],
    image: '/work1.png',
  },
  {
    slug: 'weeding-celebration',
    title: 'Weeding Celebration',
    categories: ['stil life', 'editorial'],
    image: '/work2.png',
  },
  {
    slug: 'weeding-celebration',
    title: 'Weeding Celebration',
    categories: ['stil life', 'editorial'],
    image: '/work3.png',
  },
  {
    slug: 'weeding-celebration',
    title: 'Weeding Celebration',
    categories: ['stil life', 'editorial'],
    image: '/work4.png',
  },
  {
    slug: 'weeding-celebration',
    title: 'Weeding Celebration',
    categories: ['stil life', 'editorial'],
    image: '/work5.png',
  },
  {
    slug: 'weeding-celebration',
    title: 'Weeding Celebration',
    categories: ['stil life', 'editorial'],
    image: '/work6.png',
  },
  {
    slug: 'weeding-celebration',
    title: 'Weeding Celebration',
    categories: ['stil life', 'editorial'],
    image: '/work7.png',
  },
];

const Work = ({ file, preview }) => {
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
  // usePlugin(ProjectCreatorPlugin);

  useGithubToolbarPlugins();

  const cms = useCMS();

  return (
    <>
      {/* <Hero /> */}
      <ProjectList data={PROJECTS} />
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

  const data = await import('../../../content/home.json');

  console.log(data.default);
  return {
    props: {
      preview: false,
      file: {
        fileRelativePath: 'content/home.json',
        data: data?.default,
      },
    },
  };
}

export default withPlugin(Work, ProjectCreatorPlugin);

const Hero = () => {
  return (
    <header className="w-full min-h-screen max-h-screen relative flex flex-col justify-center text-white">
      <div className="relative z-10 container mx-auto">
        <h2 className="text-6xl leading-normal">
          Still life’s that will make <br /> your product feel alive.
        </h2>
        <p className="mt-4 text-2xl leading-normal">
          I’m a product photographer helping brands communicate
          <br />
          their values in a candid, subtile and sophisticated
          language.
        </p>

        <button className="bg-accent-indigo hover:bg-blue-700 text-white text-xl font-bold py-3 px-8 rounded-full mt-6">
          Let's work together
        </button>
      </div>

      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="/hero-index.jpg"
          alt=""
        />
      </div>
    </header>
  );
};

const ProjectList = ({ data }) => {
  return (
    <>
      <style>{`
        .project:nth-of-type(5n) {
            grid-column: 1 / -1;
        }

        .project:nth-of-type(3){
        }

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
      <section className="min-h-screen pt-24 bg-white">
        <div className="sm:px-4 container mx-auto">
          <ul className="grid sm:gap-4 gap-8 grid-cols-2">
            {data?.map((project, index) => (
              <li key={index} className="project">
                <Link href={`/work/${project.slug}`}>
                  <a>
                    <img src={project.image} alt="" />
                    <div className="mt-6">
                      <h3 className="text-2xl leading-normal">
                        {project.title}
                      </h3>
                      <ul className="flex space-x-4 text-purple-800 ">
                        {project?.categories?.map((tag, idx) => (
                          <li className="tag font-bold" key={idx}>
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};
