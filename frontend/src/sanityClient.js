import { createClient } from '@sanity/client'


export const client = createClient({
    projectId: 'ugclfvqj',
    dataset: 'production',
    apiVersion: '2023-01-01',
    token: "skg9Kqx3bfn0n0yyfsBmyaAMtuXfiziYWCV86AogAf6Fti9feNSC9xVBcv7AAZODuoxghbTFBcrgoeXhf4OTht6mnGTAG0NOJvMjI8K4XPMw0LR1oVnHPMNzV8STjxjTVdcSj9ZxFhRQu4WHqDpO0v7IdYRR0JH4l7QTudRfSfIKIZkTtkc0",
    useCdn: false,
})

export default client

