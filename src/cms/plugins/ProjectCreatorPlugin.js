// const BlogPostCreatorPlugin = {
//   __type: 'content-creator',
//   label: 'New Blog Post',
//   filename: (form) => {
//     // const slug = slugify(form.title)
//     const slug = form.title;
//     return `content/blog/${slug}.md`;
//   },
//   fields: [
//     {
//       label: 'Title',
//       name: 'title',
//       component: 'text',
//       validation(title) {
//         if (!title) return 'Required.';
//       },
//     },
//     {
//       label: 'Date',
//       name: 'date',
//       component: 'date',
//       description: 'The default will be today.',
//     },
//     {
//       label: 'Author',
//       name: 'author_name',
//       component: 'text',
//       description: 'Who wrote this, yo?',
//     },
//   ],
//   frontmatter: (postInfo) => ({
//     // title: postInfo.title,
//     // date: moment(postInfo.date ? postInfo.date : new Date()).format(),
//     // author: postInfo.author ? postInfo.author : `Jane Doe`,
//   }),
//   body: () => `New post, who dis?`,
//   afterCreate: (response) => {
//     // let url = fileToUrl(response.content.path.split('content')[1], 'blog')
//     // window.location.href = `/blog/${url}`
//   },
//   onSubmit(values, cms) {
//     // Call functions that create the new blog post. For example:
//     //   cms.apis.someBackend.createPost(values)
//   },
// };

import { fields } from '../../pages/work/[slug]';

import slugify from 'slugify';

export const getCachedFormData = (id) => {
  if (typeof localStorage === 'undefined') {
    return {};
  }
  return JSON.parse(localStorage.getItem(id) || '{}');
};

export const setCachedFormData = (id, data) => {
  if (typeof localStorage === 'undefined') {
    return;
  }
  localStorage.setItem(id, JSON.stringify(data));
};

export class MarkdownCreatorPlugin {
  __type = 'content-creator';
  name;

  fields;

  afterCreate;

  // Markdown Specific
  filename;
  frontmatter;
  body;

  constructor(options) {
    if (!options.filename) {
      console.error(MISSING_FILENAME_MESSAGE);
      throw new Error(MISSING_FILENAME_MESSAGE);
    }

    if (!options.fields || options.fields.length === 0) {
      console.error(MISSING_FIELDS_MESSAGE);
      throw new Error(MISSING_FIELDS_MESSAGE);
    }

    this.name = options.label;
    this.fields = options.fields;
    this.filename = options.filename;
    this.frontmatter = options.frontmatter || (() => ({}));
    this.body = options.body || (() => '');
    this.afterCreate = options.afterCreate || null;
  }

  async onSubmit(form, cms) {
    const fileRelativePath = await this.filename(form);
    const content = await this.body(form);
    try {
      // await cms.api.github?.onChange({
      //   fileRelativePath,
      //   content: JSON.stringify(content, null, 2),
      // });

      const response = await cms.api.github.commit(
        fileRelativePath,
        getCachedFormData(fileRelativePath).sha,
        JSON.stringify(content, null, 2),
        'Update from TinaCMS',
      );

      setCachedFormData(fileRelativePath, {
        sha: response.content.sha,
      });

      if (this.afterCreate) {
        this.afterCreate(response);
      }
    } catch (error) {
      console.error(error);
    }

    // cms.api.github
    //   .commit(
    //     fileRelativePath,
    //     getCachedFormData(fileRelativePath).sha,
    //     toMarkdownString({
    //       fileRelativePath,
    //       frontmatter,
    //       markdownBody,
    //     }),
    //     'Update from TinaCMS',
    //   )
    //   .then((response) => {
    //     setCachedFormData(fileRelativePath, {
    //       sha: response.content.sha,
    //     });
    //     if (this.afterCreate) {
    //       this.afterCreate(response);
    //     }
    //   })
    //   .catch((e) => {
    //     return { [FORM_ERROR]: e };
    //   });
  }
}

const BlogPostCreatorPlugin = new MarkdownCreatorPlugin({
  label: 'New Project',
  filename: (form) => {
    const slug = slugify(form.title);
    return `content/work/${slug}.json`;
  },
  fields,
  frontmatter: (postInfo) => ({
    // title: postInfo.title,
    // date: moment(postInfo.date ? postInfo.date : new Date()).format(),
    // author: postInfo.author ? postInfo.author : `Jane Doe`,
  }),
  body: (_) => _,
  afterCreate: (response) => {
    const { name } = response.content;
    // let url = fileToUrl(response.content.path.split('content')[1], 'blog')
    window.location.href = `/work/${name}`;
  },
});

export default BlogPostCreatorPlugin;
