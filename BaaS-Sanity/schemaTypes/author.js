// Author är en dokumnettyp för att representera författare av posts
// Innehåller: Namn, biografi, bild

export default {

    name: 'author',
    title: 'Author',
    type: 'document',

    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Name'
        },
        {
            name: 'bio',
            type: 'text',
            title: 'Bio'
        },
        {
            name: 'image',
            type: 'image',
            title: 'Image'
        },
    ],
}

