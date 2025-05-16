
export default {
    name: 'review',
    title: 'Review',
    type: 'document',

    fields: [
        {
            name: 'rating',
            title: 'Rating',
            type: 'number'
        },
        {
            name: 'comment',
            title: 'Comment',
            type: 'text'
        },
        {
            name: 'reviewer',
            title: 'Reviewer',
            type: 'string'
        }
    ]
}