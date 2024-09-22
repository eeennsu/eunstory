import { create } from 'zustand'

interface PostThumbnailState {
    thumbnail: string | null
    setThumbnail: (thumbnail: string | null) => void
}

export const usePostThumbnailStore = create<PostThumbnailState>((set) => ({
    thumbnail: null,
    setThumbnail: (thumbnail) => set({ thumbnail }),
}))

interface LocalImageState {
    isUploading: boolean
    setIsUploading: (isUploading: boolean) => void
}

export const useImageUploadStore = create<LocalImageState>((set) => ({
    isUploading: false,
    setIsUploading: (isUploading) => set({ isUploading }),
}))
