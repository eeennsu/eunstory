import { useSession } from 'next-auth/react';

export const useAdminAuth = () => {
    const { data, status } = useSession()

    
    const isAdminAuthed = status === 'authenticated' && data?.user?.isAdmin === true && data.expires

    return {  }
}