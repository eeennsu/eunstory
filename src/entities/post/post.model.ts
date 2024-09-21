import { create } from 'zustand'

interface PostThumbnailState {
    thumbnail: string | null
    setThumbnail: (thumbnail: string | null) => void
}

export const usePostThumbnailStore = create<PostThumbnailState>((set) => ({
    thumbnail: null,
    setThumbnail: (thumbnail) => set({ thumbnail }),
}))
