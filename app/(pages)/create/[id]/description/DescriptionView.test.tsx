import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DescriptionView } from './DescriptionView'

describe('DescriptionView', () => {
  const mockId = 'abc123'

  beforeEach(() => {
    render(<DescriptionView id={mockId} />)
  })

  it('renders the title header', () => {
    expect(
      screen.getByText('Please describe your home as good as you can!')
    ).toBeInTheDocument()
  })

  it('renders the form with the hidden id input', () => {
    const form = screen.getByTestId('description-form')
    const hiddenInput = screen.getByDisplayValue(mockId)
    expect(form).toBeInTheDocument()
    expect(hiddenInput).toHaveAttribute('type', 'hidden')
    expect(hiddenInput).toHaveAttribute('name', 'id')
  })

  it('renders all required input fields', () => {
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Image/i)).toBeInTheDocument()
  })

  it('renders all three Counter components', () => {
  const headings = screen.getAllByRole('heading', { level: 3 })
  expect(headings[0]).toHaveTextContent('Guest')
  expect(headings[1]).toHaveTextContent('Rooms')
  expect(headings[2]).toHaveTextContent('Bathrooms')

  })
})
