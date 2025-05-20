import { createClient } from '@sanity/client'

export const client = createClient({
    projectId: 'ugclfvqj',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: true,
})

export default client
