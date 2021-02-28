import f from 'faker';
import user from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import { Locale } from 'i18n';
import { renderWithRoute } from 'tests/wrappers';
import Home, { Post, SOCIAL_MEDIAS } from 'pages/index';

import * as gtag from 'lib/gtag';

function mockPosts(): Post[] {
  const count = f.random.number({ min: 2, max: 10 });
  const posts = new Array(count).fill('').map(() => ({
    url: f.internet.url(),
    slug: f.lorem.slug(),
    title: f.name.title(),
    description: f.lorem.words(10),
  }));

  return posts;
}

const mockedEvent = jest.spyOn(gtag, 'event');

beforeEach(() => {
  mockedEvent.mockImplementation(jest.fn);
});

afterEach(() => {
  mockedEvent.mockClear();
});

afterAll(() => {
  mockedEvent.mockRestore();
});

describe('Takah.dev', () => {
  it('should render accordingly', () => {
    const locale = Locale.enUS;
    const posts = mockPosts();
    const { t } = renderWithRoute(<Home posts={posts} />, {
      routeOptions: { locale },
    });

    const welcomeHeading = screen.getByRole('heading', {
      name: t('welcome'),
      level: 1,
    });
    expect(welcomeHeading).toBeInTheDocument();

    const bioDescription = screen.getByText(t('bio'));
    expect(bioDescription).toBeInTheDocument();

    const authorImage = screen.getByAltText(t('authorImageAlt'));
    expect(authorImage).toBeInTheDocument();

    Object.values(SOCIAL_MEDIAS).forEach(({ alt, src, link }) => {
      const socialMediaLink = screen.getByRole('link', { name: alt });
      expect(socialMediaLink).toBeInTheDocument();
      expect(socialMediaLink).toHaveAttribute('href', link);

      const socialMediaImage = screen.getByAltText(`${alt} icon`);
      expect(socialMediaImage).toBeInTheDocument();
      expect(socialMediaImage).toHaveAttribute('src', src);
    });

    const blogPostsHeading = screen.getByRole('heading', {
      name: 'Blog posts',
      level: 2,
    });
    expect(blogPostsHeading).toBeInTheDocument();

    posts.forEach(({ title, url }) => {
      const postLink = screen.getByRole('link', { name: title });
      expect(postLink).toBeInTheDocument();
      expect(postLink).toHaveAttribute('href', url);
    });

    const footer = screen.getByText(t('footer'));
    expect(footer).toBeInTheDocument();
  });

  describe('Social Media', () => {
    it('should navigate and track accordingly', () => {
      const locale = Locale.enUS;
      const posts = mockPosts();
      renderWithRoute(<Home posts={posts} />, { routeOptions: { locale } });

      const socialMediaLabel = f.random.arrayElement(
        Object.keys(SOCIAL_MEDIAS)
      );

      const socialMedia = SOCIAL_MEDIAS[socialMediaLabel];

      const socialMediaLink = screen.getByRole('link', {
        name: socialMedia.alt,
      });
      expect(socialMediaLink).toBeInTheDocument();
      expect(socialMediaLink).toHaveAttribute('href', socialMedia.link);

      user.click(socialMediaLink);

      expect(mockedEvent).toHaveBeenCalledWith({
        action: 'social_click',
        category: 'Social media',
        label: socialMediaLabel,
      });
    });
  });
  describe('Blog Posts', () => {
    it('should navigate and track accordingly', () => {
      const locale = Locale.enUS;
      const posts = mockPosts();
      renderWithRoute(<Home posts={posts} />, { routeOptions: { locale } });

      const post = f.random.arrayElement(posts);

      const postLink = screen.getByRole('link', {
        name: post.title,
      });
      expect(postLink).toBeInTheDocument();
      expect(postLink).toHaveAttribute('href', post.url);

      user.click(postLink);

      expect(mockedEvent).toHaveBeenCalledWith({
        action: 'post_click',
        category: 'Post click',
        label: post.slug,
      });
    });
  });
});
