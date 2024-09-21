import { create } from 'zustand'

interface UserLoginModalState {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

export const useLoginModalStore = create<UserLoginModalState>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
}))

export const triggerUserLoginModal = (isOpen: boolean) => {
    useLoginModalStore.setState({ isOpen })
}
