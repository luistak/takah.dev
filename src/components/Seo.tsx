import React, { FC } from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

interface SEOProps {
  description?: string
  lang?: string
  meta?: any[]
  title: string
}

interface StaticQueryProps {
  site: {
    siteMetadata: {
      author: {
        name: string
        url: string
        email: string
      }
      title: string
      description: string
      keywords: string
    }
  }
}

const SEO: FC<SEOProps> = ({ description = '', lang = 'pt-br', meta = [], title }) => {
  const { site }: StaticQueryProps = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            author {
              name
            }
            description
            keywords
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={`%s | ${metaDescription}`}
      link={[{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }]}
      meta={[
        ...meta,
        {
          name: 'keywords',
          content: site.siteMetadata.keywords
        },
        {
          name: `description`,
          content: metaDescription
        },
        {
          property: `og:title`,
          content: title
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author.name
        },
        {
          name: `twitter:title`,
          content: title
        },
        {
          name: `twitter:description`,
          content: metaDescription
        }
      ]}
    />
  )
}

export default SEO
