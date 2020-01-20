import * as React from 'react'

import { useStaticQuery, graphql } from 'gatsby'

import Footer from 'components/Footer'
import Header from 'components/Header'
import LayoutRoot from 'components/LayoutRoot'
import LayoutMain from 'components/LayoutMain'

import { SiteMetadata } from 'interfaces/site'

import 'modern-normalize'
import 'styles/normalize'

interface StaticQueryResult {
  site: {
    siteMetadata: SiteMetadata
  }
}

const IndexLayout: React.FC = ({ children }) => {
  const { site }: StaticQueryResult = useStaticQuery(
    graphql`
      query IndexLayoutQuery {
        site {
          siteMetadata {
            title
            description
            author {
              name
              github
              email
              name
              twitter
              linkedin
            }
          }
        }
      }
    `
  )

  return (
    <LayoutRoot>
      <Header title={site.siteMetadata.title} profilePic="/me.jpeg" />
      <LayoutMain>{children}</LayoutMain>
      <Footer author={site.siteMetadata.author} description={site.siteMetadata.description} />
    </LayoutRoot>
  )
}

export default IndexLayout
