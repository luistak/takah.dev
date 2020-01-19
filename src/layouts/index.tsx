import * as React from 'react'

import { useStaticQuery, graphql } from 'gatsby'

import Header from '../components/Header'
import LayoutRoot from '../components/LayoutRoot'
import LayoutMain from '../components/LayoutMain'

import 'modern-normalize'
import '../styles/normalize'

const IndexLayout: React.FC = ({ children }) => {
  const { site } = useStaticQuery(
    graphql`
      query IndexLayoutQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  return (
    <LayoutRoot>
      <Header title={site.siteMetadata.title} />
      <LayoutMain>{children}</LayoutMain>
    </LayoutRoot>
  )
}

export default IndexLayout
