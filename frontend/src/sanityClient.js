import { createClient } from '@sanity/client'
import { sanityWriteToken } from './env.js'


export const client = createClient({
    projectId: 'ugclfvqj',
    dataset: 'production',
    apiVersion: '2023-01-01',
    token: sanityWriteToken,
    useCdn: true,
})
