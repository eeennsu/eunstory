import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

describe('홈페이지 렌더링 테스트', () => {
    it('홈 페이지 렌더링되는지 확인', () => {
        render(<HomePage />)
        expect(screen.getByText('👋 안녕하세요, 방은수입니다')).toBeInTheDocument()
    })
})
