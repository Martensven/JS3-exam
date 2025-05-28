import { createClient } from '@sanity/client';

export const writeClient = createClient({
    projectId: 'ugclfvqj',
    dataset: 'production',
    apiVersion: '2023-03-01',
    token: process.env.SANITY_WRITE_TOKEN,
    useCdn: false
});