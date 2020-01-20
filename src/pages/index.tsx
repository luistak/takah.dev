import React, { FC } from 'react'
import { graphql, Link } from 'gatsby'
import styled from '@emotion/styled'

import SEO from 'components/Seo'
import Page from 'components/Page'
import ContainerComponent from 'components/Container'
import IndexLayout from 'layouts'
import { SiteMetadata } from 'interfaces/site'
import { colors } from 'styles/variables'

const Article = styled.article`
  h3 a {
    color: ${colors.brand};
  }

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`

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
      siteMetadata: SiteMetadata
    }
    allMarkdownRemark: {
      edges: PostNode[]
    }
  }
}

const HomePage: FC<HomePageProps> = ({ data }) => {
  const { site, allMarkdownRemark } = data
  const { title } = site.siteMetadata
  const posts = allMarkdownRemark.edges

  return (
    <IndexLayout>
      <SEO title={title} />
      <Page>
        <ContainerComponent>
          {posts.map(({ node }) => (
            <Article key={node.fields.slug} style={{ padding: '5px' }}>
              <h3>
                <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
              </h3>
              <p> {node.frontmatter.description} </p>
            </Article>
          ))}
        </ContainerComponent>
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
