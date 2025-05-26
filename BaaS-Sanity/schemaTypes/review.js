export default {
  name: 'review',
  title: 'Review',
  type: 'document',

  fields: [
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'text',
    },
    {
      name: 'reviewer',
      title: 'Reviewer',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'recipe',
      title: 'Recipe',
      type: 'reference',
      to: [{type: 'recipe'}],
      validation: (Rule) => Rule.required(),
    },
  ],
}
