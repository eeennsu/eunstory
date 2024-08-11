import { create } from 'zustand'

interface FetchLoadingStore {
    isLoading: boolean
    setIsLoading: (isLoading: boolean) => void
}

export const useFetchLoadingStore = create<FetchLoadingStore>((set) => ({
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading }),
}))

export const setFetchLoading = (isLoading: boolean) => {
    const setIsLoading = useFetchLoadingStore.getState().setIsLoading

    setIsLoading(isLoading)
}
