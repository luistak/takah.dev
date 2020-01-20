import * as React from 'react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import { Link } from 'gatsby'

import { heights, dimensions, colors } from '../styles/variables'
import ContainerComponent from './Container'

const StyledHeader = styled.header`
  height: ${heights.header}px;
  padding: 0 ${dimensions.containerPadding}rem;
  background-color: ${colors.darkPurple};
  color: ${transparentize(0.5, colors.white)};
`

const HeaderInner = styled(ContainerComponent)`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`

const HomepageLink = styled(Link)`
  color: ${colors.white};
  font-size: 1.5rem;
  font-weight: 600;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`

const ProfilePicture = styled.img`
  max-width: ${heights.profilePic}px;
  height: auto;

  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
`

interface HeaderProps {
  title: string
  profilePic?: string
}

const Header: React.FC<HeaderProps> = ({ title, profilePic }) => (
  <StyledHeader>
    <HeaderInner>
      {profilePic && <ProfilePicture src={profilePic} alt="Profile Picture" />}
      <HomepageLink to="/">{title}</HomepageLink>
    </HeaderInner>
  </StyledHeader>
)

export default Header
