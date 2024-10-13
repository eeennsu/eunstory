import { Comment } from '@prisma/client'
import { UserProfile } from '../user'

export type PostComment = Comment & { author: UserProfile; parent?: PostComment | null; replies?: PostComment[] | null }
