import NextImage from 'next/image';
import { Translate } from 'i18n';
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

const socialMedias = {
  github: {
    alt: 'luistak',
    src: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/github.svg',
    link: 'https://github.com/luistak',
  },
  devto: {
    alt: 'luistak',
    src: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/dev-dot-to.svg',
    link: 'https://dev.to/luistak',
  },
  twitter: {
    alt: '_luistak',
    src: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/twitter.svg',
    link: 'https://twitter.com/_luistak',
  },
  linkedin: {
    alt: 'luis-takahashi',
    src: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/linkedin.svg',
    link: 'https://linkedin.com/in/luis-takahashi',
  },
};
type SocialMedia = {
  alt: string;
  src: string;
  link: string;
};
type SocialMediaKey = keyof typeof socialMedias;

const handleSocialMediaClick = (socialMedia: SocialMediaKey) => () => {
  gtag.event({
    action: 'social_click',
    category: 'Social media',
    label: socialMedia,
  });
};

const handlePostClock = (slug: string) => () => {
  gtag.event({
    action: 'post_click',
    category: 'Post click',
    label: slug,
  });
};

type Post = {
  url: string;
  slug: string;
  title: string;
  description: string;
};
type HomeProps = {
  t: Translate;
  posts: Post[];
};
function Home({ t, posts }: HomeProps) {
  return (
    <PageTemplate t={t} title={t('author')}>
      <h1>{t('welcome')}</h1>
      <p>{t('bio')}</p>
      <Image
        src="/takah.jpg"
        alt="Picture of the author"
        width={100}
        height={100}
        style={{ margin: 'auto' }}
      />
      <ImageContainer>
        {Object.entries(socialMedias).map(
          ([socialMedia, { alt, src, link }]: [
            SocialMediaKey,
            SocialMedia
          ]) => (
            <a
              key={socialMedia}
              href={link}
              target="_blank"
              rel="noreferrer noreferrer"
              onClick={handleSocialMediaClick(socialMedia)}
            >
              <img src={src} alt={alt} width={20} height={20} />
            </a>
          )
        )}
      </ImageContainer>
      <PostSection>
        <h3>Blog posts</h3>
        {posts.map(({ slug, title, description, url }) => (
          <a
            key={slug}
            href={url}
            target="_blank"
            rel="noreferrer noreferrer"
            onClick={handlePostClock(slug)}
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
