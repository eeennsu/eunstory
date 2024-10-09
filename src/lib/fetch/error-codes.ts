import { toast, ToastPosition, ToastVariant } from '../ui/use-toast'

export const ERROR_CODES = {
    NEED_AUTHENTICATE: {
        code: 'NEED_AUTHENTICATE',
        title: '로그인이 필요합니다.',
        description: null,
    },
    MISSING_ID_OR_PASSWORD: {
        code: 'MISSING_ID_OR_PASSWORD',
        title: 'ID 또는 비밀번호를 입력해주세요.',
        description: '모두 입력해주세요.',
    },
    INVALID_ID_FORMAT: {
        code: 'INVALID_ID_FORMAT',
        title: 'ID 형식이 유효하지 않습니다.',
        description: 'ID를 다시 확인해주세요.',
    },
    INVALID_PASSWORD_FORMAT: {
        code: 'INVALID_PASSWORD_FORMAT',
        title: '비밀번호 형식이 유효하지 않습니다.',
        description: '비밀번호를 다시 확인해주세요.',
    },
    USER_NOT_FOUND: {
        code: 'USER_NOT_FOUND',
        title: '사용자를 찾을 수 없습니다.',
        description: 'ID와 비밀번호를 다시 확인해주세요.',
    },
    INCORRECT_ID_OR_PASSWORD: {
        code: 'INCORRECT_ID_OR_PASSWORD',
        title: '아이디 혹은 비밀번호가 일치하지 않습니다.',
        description: '다시 확인해주세요.',
    },
    FORBIDDEN: {
        code: 'FORBIDDEN',
        title: '접근 권한이 없습니다.',
        description: '관리자 권한이 필요합니다.',
    },
    UNAUTHORIZED: {
        code: 'UNAUTHORIZED',
        title: '인증이 필요합니다.',
        description: '인증 후 이용해주세요.',
    },
    TOKEN_EXPIRED: {
        code: 'TOKEN_EXPIRED',
        title: '세션이 만료되었습니다.',
        description: '다시 로그인해주세요.',
    },
    TOKEN_INVALID: {
        code: 'TOKEN_INVALID',
        title: '세션이 유효하지 않습니다.',
        description: '다시 로그인해주세요.',
    },
    DATABASE_CONNECTION_ERROR: {
        code: 'DATABASE_CONNECTION_ERROR',
        title: '서버와 연결할 수 없습니다.',
        description: '잠시 후 다시 시도해주세요.',
    },
    INTERNAL_SERVER: {
        code: 'INTERNAL_SERVER',
        title: '서버 오류가 발생하였습니다.',
        description: '잠시 후 다시 시도해주세요.',
    },
    UNKNOWN: {
        code: 'UNKNOWN',
        title: '알 수 없는 오류가 발생하였습니다.',
        description: '관리자에게 문의하거나 다시 시도해주세요.',
    },
} as const
