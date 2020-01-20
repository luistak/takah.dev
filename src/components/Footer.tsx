import * as React from 'react'
import styled from '@emotion/styled'
import { faLinkedin, faTwitterSquare, faGithubSquare } from '@fortawesome/free-brands-svg-icons'

import { SiteAuthor } from 'interfaces/site'
import { colors, widths } from 'styles/variables'

import Icon from 'components/Icon'
import ContainerComponent from './Container'

const StyledFooter = styled.div`
  margin: 0.5rem;
`

const FooterContainer = styled(ContainerComponent)`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${widths.md}px) {
    flex-direction: column-reverse;
  }
`

const AnchorContainer = styled.span`
  color: ${colors.brand};
  &:not(:last-child) {
    &::after {
      content: '•';
      margin: 0 1rem;
      pointer-events: none;
    }
  }
`

const Anchor = styled.a`
  color: ${colors.brand};
`

const SocialMedia = styled.div``
const Description = styled.span``

interface FooterPRops {
  author: SiteAuthor
  description?: string
}

const Footer: React.FC<FooterPRops> = ({ author, description }) => {
  const { github, linkedin, twitter } = author

  return (
    <StyledFooter>
      <FooterContainer>
        <SocialMedia>
          <AnchorContainer>
            <Anchor href={twitter} target="_blank">
              <Icon faIcon={faLinkedin} />
              Twitter
            </Anchor>
          </AnchorContainer>
          <AnchorContainer>
            <Anchor href={github} target="_blank">
              <Icon faIcon={faGithubSquare} />
              Github
            </Anchor>
          </AnchorContainer>
          <AnchorContainer>
            <Anchor href={linkedin} target="_blank">
              <Icon faIcon={faTwitterSquare} />
              Linkedin
            </Anchor>
          </AnchorContainer>
        </SocialMedia>
        {description && <Description>{description}</Description>}
      </FooterContainer>
    </StyledFooter>
  )
}

export default Footer
