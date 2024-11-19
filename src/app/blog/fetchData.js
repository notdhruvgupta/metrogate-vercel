import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const NEXT_HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT

const client = new ApolloClient({
    uri: NEXT_HYGRAPH_ENDPOINT,
    cache: new InMemoryCache(),
})

const GET_BLOG = gql`
    query MyQuery {
        metroGateBlogs {
            blogUrl
            blogImage {
                url
            }
            id
            createdAt
            title
            summary
            content {
                html
                text
            }
        }
    }
`

export async function getBlogData() {
    const {data} = await client.query({
        query: GET_BLOG,
    })

    return data.metroGateBlogs
}