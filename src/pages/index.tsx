import React, { FC } from 'react'
import { graphql, Link } from 'gatsby'

import { faLinkedin, faTwitterSquare, faGithubSquare } from '@fortawesome/free-brands-svg-icons'

import SEO from 'components/Seo'
import Page from 'components/Page'
import Icon from 'components/Icon'
import Container from 'components/Container'
import IndexLayout from 'layouts'

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
  const { title } = data.site.siteMetadata
  const posts = data.allMarkdownRemark.edges

  return (
    <IndexLayout>
      <SEO title={title} />
      <Page>
        <Container>
          <h1>Welcome to {title}</h1>
          <Icon faIcon={faLinkedin} />
          <Icon faIcon={faGithubSquare} />
          <Icon faIcon={faTwitterSquare} />

          <div>
            {posts.map(({ node }) => {
              return (
                <div key={node.fields.slug} style={{ border: '1px solid', padding: '5px' }}>
                  <div> {node.frontmatter.title} </div>
                  <div> {node.frontmatter.description} </div>
                  <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                </div>
              )
            })}
          </div>
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default HomePage

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
