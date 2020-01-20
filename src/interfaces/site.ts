export interface SiteAuthor {
  github: string
  email: string
  name: string
  twitter: string
  linkedin: string
}

export interface SiteMetadata {
  title: string
  description: string
  keywords: string
  siteUrl: string
  author: SiteAuthor
}
