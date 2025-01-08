import Home from '@/app/(app)/page';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, ThemeProviderProps } from 'next-themes';

// Mock window.matchMedia
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

const customRender = (
  ui: React.JSX.Element,
  { providerProps, ...renderOptions }: { providerProps: ThemeProviderProps }
) => {
  return render(
    <ThemeProvider {...providerProps}>{ui}</ThemeProvider>,
    renderOptions
  );
};

describe('Home', () => {
  it('renders the heading', () => {
    customRender(<Home />, { providerProps: {} });

    const heading = screen.getByRole('heading', {
      level: 1,
      name: /PROJECT K/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the "Coming Soon" text', () => {
    customRender(<Home />, { providerProps: {} });

    const comingSoonText = screen.getByText(
      /Coming Soon: The Unofficial Home for/i
    );
    expect(comingSoonText).toBeInTheDocument();
  });

  it('renders the Discord link', () => {
    customRender(<Home />, { providerProps: {} });

    const discordLink = screen.getByRole('link', {
      name: /Join us on Discord/i,
    });
    expect(discordLink).toBeInTheDocument();
    expect(discordLink).toHaveAttribute(
      'href',
      'https://discord.com/invite/n7hgcgbvpG'
    );
  });

  it('renders the card maker link', () => {
    customRender(<Home />, { providerProps: {} });

    const cardMakerLink = screen.getByRole('link', {
      name: /Or Make Your Own Cards/i,
    });
    expect(cardMakerLink).toBeInTheDocument();
    expect(cardMakerLink).toHaveAttribute(
      'href',
      'https://project-k-cardmaker.vercel.app'
    );
  });
});
