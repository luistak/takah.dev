import NextImage from 'next/image';
import { useI18n } from 'i18n';
import { PageTemplate } from 'components/template';
import styled from 'styled-components';

import * as gtag from 'lib/gtag';

const Image = styled(NextImage)`
  border-radius: 50%;
  box-shadow: 4px 4px 5px 0px rgba(0, 0, 0, 0.5);
`;

const PostSection = styled.section`
  margin-top: 4rem;
  margin-bottom: 2rem;
`;

const ImageContainer = styled.section`
  margin-top: 1rem;

  img {
    filter: invert(1);
  }

  * + * {
    margin-left: 1rem;
  }
`;

export const SOCIAL_MEDIAS = {
  github: {
    alt: 'Github',
    src: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/github.svg',
    link: 'https://github.com/luistak',
  },
  devto: {
    alt: 'Dev To',
    src: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/dev-dot-to.svg',
    link: 'https://dev.to/luistak',
  },
  twitter: {
    alt: 'Twitter link',
    src: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/twitter.svg',
    link: 'https://twitter.com/_luistak',
  },
  linkedin: {
    alt: 'Linkedin',
    src: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/linkedin.svg',
    link: 'https://linkedin.com/in/luis-takahashi',
  },
};

type SocialMedia = {
  alt: string;
  src: string;
  link: string;
};
type SocialMediaKey = keyof typeof SOCIAL_MEDIAS;

const handleSocialMediaClick = (socialMedia: SocialMediaKey) => () => {
  gtag.event({
    action: 'social_click',
    category: 'Social media',
    label: socialMedia,
  });
};

const handlePostClick = (slug: string) => () => {
  gtag.event({
    action: 'post_click',
    category: 'Post click',
    label: slug,
  });
};

export type Post = {
  url: string;
  slug: string;
  title: string;
  description: string;
};

type HomeProps = {
  posts: Post[];
};

function Home({ posts }: HomeProps) {
  const { t } = useI18n();

  return (
    <PageTemplate t={t} title={t('author')} meta={{ description: t('bio') }}>
      <h1>{t('welcome')}</h1>
      <p>{t('bio')}</p>
      <Image
        src="/takah.jpg"
        alt={t('authorImageAlt')}
        width={100}
        height={100}
        style={{ margin: 'auto' }}
      />
      <ImageContainer>
        {Object.entries(SOCIAL_MEDIAS).map(
          ([socialMedia, { alt, src, link }]: [
            SocialMediaKey,
            SocialMedia
          ]) => (
            <a
              key={socialMedia}
              href={link}
              target="_blank"
              rel="noreferrer noreferrer"
              aria-label={alt}
              onClick={handleSocialMediaClick(socialMedia)}
            >
              <img src={src} alt={`${alt} icon`} width={20} height={20} />
            </a>
          )
        )}
      </ImageContainer>
      <PostSection>
        <h2>Blog posts</h2>
        {posts.map(({ slug, title, url }) => (
          <a
            key={slug}
            href={url}
            target="_blank"
            rel="noreferrer noreferrer"
            onClick={handlePostClick(slug)}
          >
            <p>{title}</p>
          </a>
        ))}
      </PostSection>
    </PageTemplate>
  );
}

Home.getInitialProps = async function getStaticPaths() {
  const result = await fetch('https://dev.to/api/articles?username=luistak');
  const posts = await result.json();

  return {
    posts,
  };
};

export default Home;
