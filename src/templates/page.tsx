import * as React from 'react'
import { graphql } from 'gatsby'

import SEO from 'components/Seo'
import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'

interface PageTemplateProps {
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
    markdownRemark: {
      html: string
      excerpt: string
      frontmatter: {
        title: string
        description: string
      }
    }
  }
}

const PageTemplate: React.SFC<PageTemplateProps> = ({ data }) => {
  const { markdownRemark: post } = data
  const { title, description } = post.frontmatter

  return (
    <IndexLayout>
      <SEO title={title} description={description} />
      <Page>
        <Container>
          <h1>{title}</h1>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default PageTemplate

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        description
      }
    }
  }
`
