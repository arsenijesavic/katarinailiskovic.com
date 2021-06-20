const BlogPostCreatorPlugin = {
  __type: 'content-creator',
  fields: [
    {
      label: 'Title',
      name: 'title',
      component: 'text',
      validation(title) {
        if (!title) return 'Required.';
      },
    },
    {
      label: 'Date',
      name: 'date',
      component: 'date',
      description: 'The default will be today.',
    },
    {
      label: 'Author',
      name: 'author_name',
      component: 'text',
      description: 'Who wrote this, yo?',
    },
  ],
  onSubmit(values, cms) {
    // Call functions that create the new blog post. For example:
    //   cms.apis.someBackend.createPost(values)
    console.log(cms);
  },
};
