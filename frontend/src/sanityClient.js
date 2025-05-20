import { createClient } from '@sanity/client'

export const client = createClient({
    projectId: 'ugclfvqj',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: false,
    token: 'skU4LyPhtLAxKG78x5J4xBOKMR1JFuOZcwdKMIjeatJKZYuPII381zcCWPLOEL0YraNYLyfxMtouXO4GBKU3E8ea9RWm5PoMb68nE3nVyk4hqTk3qGWUoJeNZvkR1UmDUea2wV77JUVHU7ESZ79AxQHQPbUdWDd0iKDY8RKwGAU4vvl7yD1J',
})
