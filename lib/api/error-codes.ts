export const ERROR_CODES = {
    MISSING_ID_OR_PASSWORD: 'E001', // ID 또는 비밀번호가 제공되지 않음
    INVALID_ID_FORMAT: 'E002', // ID 형식이 유효하지 않음
    INVALID_PASSWORD_FORMAT: 'E003', // 비밀번호 형식이 유효하지 않음
    USER_NOT_FOUND: 'E004', // 사용자 찾을 수 없음
    INCORRECT_PASSWORD: 'E005', // 비밀번호가 틀림
    ACCOUNT_LOCKED: 'E006', // 계정이 잠김
    UNAUTHORIZED_ACCESS: 'E007', // 권한 없는 접근 시도
    TOKEN_EXPIRED: 'E008', // 인증 토큰 만료
    TOKEN_INVALID: 'E009', // 인증 토큰 유효하지 않음
    DATABASE_CONNECTION_ERROR: 'E010', // 데이터베이스 연결 오류
    EMAIL_ALREADY_IN_USE: 'E011', // 이메일이 이미 사용 중임
    ID_ALREADY_IN_USE: 'E012', // ID가 이미 사용 중임
    PASSWORD_TOO_WEAK: 'E013', // 비밀번호가 너무 약함
    PASSWORD_MISMATCH: 'E014', // 비밀번호가 일치하지 않음
    UNKNOWN_ERROR: 'E999', // 알 수 없는 오류
}
