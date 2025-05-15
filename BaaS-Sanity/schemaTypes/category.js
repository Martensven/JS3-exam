// Category är en dokumnettyp för att gruppera blogginlägg
// Innehåller: namn (title) och beskrivning (description)

export default {

    name: 'category',
    title: 'Category',
    type: 'document',

    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title'
        },
        {
            name: 'description',
            type: 'text',
            title: 'Description'
        },
    ],
}