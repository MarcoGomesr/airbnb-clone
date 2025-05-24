import { render, screen } from '@testing-library/react'
import NoItems from '../NoItems'

describe('NoItems', () => {
  it('renders with provided title and description', () => {
    const title = 'No Items Found'
    const description = 'There are no items to display at this time.'
    
    render(<NoItems title={title} description={description} />)
    
    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it('renders with FileQuestion icon', () => {
    render(<NoItems title="Test" description="Test" />)
    
    const icon = screen.getByTestId('file-question-icon')
    expect(icon).toBeInTheDocument()
  })

  it('should not render if title and description are empty', () => {
    const { container } = render(<NoItems title="" description="" />)
    
    expect(container.firstChild).toBeNull()
  })
}) 