import { render, screen } from '@testing-library/react'
import Navbar from '../Navbar'

// Mock next/image since it's not supported in jest environment
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="home-link">
      {children}
    </a>
  ),
}))

describe('Navbar', () => {
  it('should render home link with correct href', () => {
    render(<Navbar />)
    
    const homeLink = screen.getByTestId('home-link')
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('should render desktop logo with correct attributes', () => {
    render(<Navbar />)
    
    const desktopLogo = screen.getByTestId('desktop-logo')
    expect(desktopLogo).toBeInTheDocument()
    expect(desktopLogo).toHaveAttribute('alt', 'Airbnb')
    expect(desktopLogo).toHaveClass('w-32', 'hidden', 'lg:block')
  })

  it('should render mobile logo with correct attributes', () => {
    render(<Navbar />)
    
    const mobileLogo = screen.getByTestId('mobile-logo')
    expect(mobileLogo).toBeInTheDocument()
    expect(mobileLogo).toHaveAttribute('alt', 'Airbnb')
    expect(mobileLogo).toHaveClass('w-12', 'lg:hidden')
  })
}) 