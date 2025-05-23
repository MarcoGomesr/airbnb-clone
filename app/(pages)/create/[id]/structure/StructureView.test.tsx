import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { StructureView } from './StructureView'

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    }
  },
}))

describe('StructureView', () => {
  it('renders the structure form', () => {
    render(<StructureView id="test-id" />)
    
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Which of these best describes your home?'
    )

    // Check if the form is rendered with correct attributes
    const form = screen.getByTestId('structure-form')
    expect(form).toBeInTheDocument()
    
  })

  it('should have hidden input with correct value', () => {
    render(<StructureView id="test-id" />)
    const hiddenInput = screen.getByDisplayValue('test-id')
    expect(hiddenInput).toBeInTheDocument()
    expect(hiddenInput).toHaveAttribute('name', 'id')
    expect(hiddenInput).toHaveAttribute('type', 'hidden')
    expect(hiddenInput).toHaveValue('test-id')
  })
}) 