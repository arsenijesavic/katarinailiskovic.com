import Link from 'next/link';

// const PROJECTS = [
//   {
//     slug: 'weeding-celebration',
//     title: 'Weeding Celebration',
//     categories: ['stil life', 'editorial'],
//     image: '/work1.png',
//   },
//   {
//     slug: 'weeding-celebration',
//     title: 'Weeding Celebration',
//     categories: ['stil life', 'editorial'],
//     image: '/work2.png',
//   },
//   {
//     slug: 'weeding-celebration',
//     title: 'Weeding Celebration',
//     categories: ['stil life', 'editorial'],
//     image: '/work3.png',
//   },
//   {
//     slug: 'weeding-celebration',
//     title: 'Weeding Celebration',
//     categories: ['stil life', 'editorial'],
//     image: '/work4.png',
//   },
//   {
//     slug: 'weeding-celebration',
//     title: 'Weeding Celebration',
//     categories: ['stil life', 'editorial'],
//     image: '/work5.png',
//   },
//   {
//     slug: 'weeding-celebration',
//     title: 'Weeding Celebration',
//     categories: ['stil life', 'editorial'],
//     image: '/work6.png',
//   },
//   {
//     slug: 'weeding-celebration',
//     title: 'Weeding Celebration',
//     categories: ['stil life', 'editorial'],
//     image: '/work7.png',
//   },
// ];

const Work = ({ data, preview }) => {
  return (
    <>
      {/* <Hero /> */}
      <ProjectList data={data} />
    </>
  );
};

export async function getStaticProps({ preview = false }) {
  if (preview) {
    try {
      return getGithubPreviewProps({
        ...previewData,
        fileRelativePath: 'content/work/test.json',
        parse: parseJson,
      });
    } catch (error) {
      console.error(error);
    }
  }

  const data = ((context) => {
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
      // const document = matter(value.default)
      return {
        // document,
        slug,
        ...value,
      };
    });
    return data;
  })(require.context('../../../content/work', true, /\.json$/));

  return {
    props: {
      data,
      preview,
    },
  };
}

export default Work;

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
      {/* <style>{`
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
    `}</style> */}
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
