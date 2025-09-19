import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useSession } from 'next-auth/react'
import { Navbar } from '@/components/layout/navbar'

// Mock next-auth
jest.mock('next-auth/react')
const mockUseSession = useSession as jest.MockedFunction<typeof useSession>

// Mock siteConfig
jest.mock('@/config/site', () => ({
    siteConfig: {
        name: 'Danalyst',
    },
}))

describe('Navbar', () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks()
    })

    it('renders the logo and site name', () => {
        mockUseSession.mockReturnValue({
            data: null,
            status: 'unauthenticated',
            update: jest.fn(),
        })

        render(<Navbar />)

        expect(screen.getByText('Danalyst')).toBeInTheDocument()
        expect(screen.getByAltText('Danalyst')).toBeInTheDocument()
    })

    it('shows login button when user is not authenticated', () => {
        mockUseSession.mockReturnValue({
            data: null,
            status: 'unauthenticated',
            update: jest.fn(),
        })

        render(<Navbar />)

        expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument()
    })

    it('shows user profile and logout when authenticated', () => {
        mockUseSession.mockReturnValue({
            data: {
                user: {
                    id: 'test-user-id',
                    name: 'Test User',
                    email: 'test@example.com',
                },
                expires: '2024-01-01',
            },
            status: 'authenticated',
            update: jest.fn(),
        })

        render(<Navbar />)

        expect(screen.getByText('Mi Perfil')).toBeInTheDocument()
        expect(screen.getByText('Cerrar Sesión')).toBeInTheDocument()
    })

    it('shows loading state', () => {
        mockUseSession.mockReturnValue({
            data: null,
            status: 'loading',
            update: jest.fn(),
        })

        render(<Navbar />)

        expect(screen.getByText('Cargando...')).toBeInTheDocument()
    })

    it('toggles mobile menu when button is clicked', () => {
        mockUseSession.mockReturnValue({
            data: null,
            status: 'unauthenticated',
            update: jest.fn(),
        })

        render(<Navbar />)

        const mobileMenuButton = screen.getByLabelText('Abrir menú')
        fireEvent.click(mobileMenuButton)

        // Check if mobile menu items are visible
        expect(screen.getAllByText('Cursos')).toHaveLength(2) // One in desktop nav, one in mobile
    })

    it('renders all navigation links', () => {
        mockUseSession.mockReturnValue({
            data: null,
            status: 'unauthenticated',
            update: jest.fn(),
        })

        render(<Navbar />)

        expect(screen.getByText('Cursos')).toBeInTheDocument()
        expect(screen.getByText('Membresía')).toBeInTheDocument()
        expect(screen.getByText('Generador')).toBeInTheDocument()
        expect(screen.getByText('Blog')).toBeInTheDocument()
        expect(screen.getByText('Contacto')).toBeInTheDocument()
    })
})
