import React, { FC } from 'react'
import { Link, graphql } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'

interface PostNode {
  node: {
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
      description: string
    }
  }
}

interface HomePageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: {
          name: string
          url: string
        }
      }
    }
    allMarkdownRemark: {
      edges: PostNode[]
    }
  }
}


const HomePage: FC<HomePageProps> = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  console.log({ posts })

  return (
    <IndexLayout>
      <Page>
        <Container>
          <h1>Welcome to {siteTitle}</h1>
          <div>
            {posts.map(({ node }) => {

              return (
                <div key={node.fields.slug} style={{ border: '1px solid', padding: '5px' }}>
                  <div> {node.frontmatter.title} </div>
                  <div> {node.frontmatter.description} </div>
                </div>
              )
            })}
          </div>
          {/* <Link to="/page-2/">Go to page 2</Link>
          <Link to="/bla/">Go to page Bla</Link> */}
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default HomePage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      edges {
        node {
          fields {
            layout
            slug
          }
          frontmatter {
            title
            description
          }
        }
      }
    }
  }
`
