

export default {
    name: 'recipe',
    title: 'Recipe',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image'
        },
        {
            name: 'categories',
            type: 'array',
            of:
                [
                    {
                        type: 'reference',
                        to: [{ type: 'category' }]
                    }
                ],
            title: 'Categories'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'timeToCook',
            title: 'TimeToCook',
            type: 'number'
        },
        {
            name: 'portions',
            title: 'Portions',
            type: 'number'
        },
        {
            name: 'ingredients',
            title: 'Ingredients',
            type: 'array',
            of: [
                {
                    type: 'string'
                }
            ]
        },
        {
            name: 'instructions',
            title: 'Instructions',
            type: 'array',
            of: [
                {
                    type: 'text'
                }
            ]
        },

        //betyg som refererar till review (string)(nice to have)
        //Vi har inte med reviews här, det ligger som en egen komponent
    ]
}