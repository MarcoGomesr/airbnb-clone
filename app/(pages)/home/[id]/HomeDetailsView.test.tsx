import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import HomeDetailsView from './HomeDetailsView'
import { HomeDetails, User, Country } from './homeDetailsType'

// Mock next/image
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
    <a href={href}>{children}</a>
  ),
}))

describe('HomeDetailsView', () => {
  const mockHome: HomeDetails = {
    title: 'Test Home',
    photo: 'test-photo.jpg',
    guests: '4',
    bedrooms: '2',
    bathrooms: '2',
    description: 'Test description',
    categoryName: 'House',
    price: 100,
    country: 'Test Country',
    User: {
      firstName: 'John',
      lastName: 'Doe',
      profilePicture: 'test-profile.jpg'
    },
    Reservation: []
  }

  const mockUser: User = {
    id: 'user123',
    email: 'john@example.com',
    given_name: 'John',
    family_name: 'Doe'
  }

  const mockCountry: Country = {
    flag: '🏠',
    label: 'Test Country',
    region: 'Test Region',
    value: 'test-country',
    latlng: [0, 0]
  }

  const mockId = 'home123'

  beforeEach(() => {
    render(
      <HomeDetailsView 
        home={mockHome} 
        user={mockUser} 
        country={mockCountry} 
        id={mockId} 
      />
    )
  })

  it('renders the home title', () => {
    expect(screen.getByText('Test Home')).toBeInTheDocument()
  })

  it('renders the home image with correct attributes', () => {
    const image = screen.getByAltText('Test Home')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', expect.stringContaining('test-photo.jpg'))
  })

  it('renders the location information', () => {
    expect(screen.getByText('🏠 Test Country / Test Region')).toBeInTheDocument()
  })

  it('renders the home details', () => {
    expect(screen.getByText('4 Guests')).toBeInTheDocument()
    expect(screen.getByText('2 Bedrooms')).toBeInTheDocument()
    expect(screen.getByText('2 Bathrooms')).toBeInTheDocument()
  })

  it('renders the host information', () => {
    expect(screen.getByText('By John Doe')).toBeInTheDocument()
    expect(screen.getByText('Hosted since 2015')).toBeInTheDocument()
  })

  it('renders the home description', () => {
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('renders the reservation form with hidden inputs', () => {
    const form = screen.getByTestId('reservation-form')
    expect(form).toBeInTheDocument()

    const userIdInput = screen.getByDisplayValue('user123')
    expect(userIdInput).toBeInTheDocument()
    expect(userIdInput).toHaveAttribute('name', 'userId')
    expect(userIdInput).toHaveAttribute('type', 'hidden')

    const homeIdInput = screen.getByDisplayValue('home123')
    expect(homeIdInput).toBeInTheDocument()
    expect(homeIdInput).toHaveAttribute('name', 'homeId')
    expect(homeIdInput).toHaveAttribute('type', 'hidden')
  })

  it('renders the reservation button for logged in users', () => {
    const button = screen.getByRole('button', { name: /make a reservation/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('renders the login link for non-logged in users', () => {
    render(
      <HomeDetailsView 
        home={mockHome} 
        user={{ id: '', email: '', given_name: '', family_name: '' }} 
        country={mockCountry} 
        id={mockId} 
      />
    )

    const loginLink = screen.getByRole('link', { name: /make a reservation/i })
    expect(loginLink).toBeInTheDocument()
    expect(loginLink).toHaveAttribute('href', '/api/auth/login')
  })
}) 