export type MyHistory = {
    title: string
    sub: string
    icon: 'code-xml' | 'id-card' | 'graduation-cap'
    date: string
    description?: string[]
}

export const MY_HISTORY: MyHistory[] = [
    {
        title: 'Flunti 고도화 및 유지보수',
        sub: '플랫폼 성능 및 기능 개선을 통한 사용자 경험 향상',
        icon: 'code-xml',
        date: '2024.05.24 ~ 현재',
        description: ['각 커리큘럼에 맞는 로드맵 페이지 개발', 'chart 등을 활용한 관리자 전용 대시보드 페이지 개발'],
    },
    {
        title: 'Flunti의 코딩테스트 전용 사이트 개발',
        sub: '사용자 중심의 인터랙티브 코딩 테스트 솔루션',
        icon: 'code-xml',
        date: '2024.09.02 ~ 2024.09.30',
        description: [
            'code mirror를 커스터마이징하여 문제풀이가 가능한 코딩 에디터 개발',
            'React Hook Form과 Zod를 활용해 각 문제의 테스트케이스를 동적으로 생성 및 수정하는 관리자 페이지 개발',
            '유저가 자유롭게 관리할 수 있는 커스텀 테스트 케이스 기능 개발',
            '코딩 문제 입력 후 실행 및 기능 / 이에 대한 결과 확인 기능 개발',
        ],
    },
    {
        title: '타사의 소개 및 지원서 사이트 개발',
        sub: '기업 특장점 소개 및 맞춤형 지원서 제출 플랫폼',
        icon: 'code-xml',
        date: '2024.07.15 ~ 2024.08.02',
        description: [
            '타사의 특장점을 소개하는 정적 페이지 제작',
            '네임스페이스 패턴을 기반으로 직접 만든 폼을 통해 지원서 양식 개발',
        ],
    },
    {
        title: 'LMS 개발',
        sub: '효율적인 학습 관리와 학습자 지원을 위한 시스템 구축',
        icon: 'code-xml',
        date: '2024.05.27 ~ 2024.06.28',
        description: [
            '프로젝트 설계, 공통 레이아웃과 컴포넌트 구조화',
            '생산성과 확장성을 고려한 FSD 아키텍쳐 도입 시작',
            '시험 평가 & 과제 제출 & 설문 조사 등 주요 기능 개발',
            '회원가입 폼 & 게시판 페이지 제작',
        ],
    },
    {
        title: 'Flunti 개발',
        sub: 'IT 기술 학습을 위한 맞춤형 온라인 강의 플랫폼',
        icon: 'code-xml',
        date: '2024.03.11 ~ 2024.05.24',
        description: [
            '프로젝트 설계, 공통 레이아웃과 컴포넌트 구조화',
            '강의 리스트, 마이페이지, 게시판, 퀴즈 페이지 개발',
            '페이지 테스트를 위한 jest 도입',
            'tiptap을 이용한 텍스트 에디터 커스터마이징',
            '증명서 등의 문서를 pdf로 발급할 수 있는 기능 개발',
            '토스 페이먼츠와 연동한 결제 기능 도입',
        ],
    },
    {
        title: '한국글로벌널리지네트웍(주) 입사',
        sub: '前 코딩허브, 인수 합병 (2024.06)',
        icon: 'id-card',
        date: '2024.03.11 ~',
        description: ['IT 교육 사이트의 기능 및 컨텐츠를 자체 개발', '매일 아침 스크럼을 진행하는 애자일 방식으로 운영'],
    },
    {
        title: '명지전문대 졸업',
        sub: '소프트웨어콘텐츠과',
        icon: 'graduation-cap',
        date: '2022.03.02 ~ 2024.02.29',
        description: [
            '평균 학점 4.26',
            '웹 개발 동아리 운영 및 프로젝트 개발 주도 (2022.06 ~ 2024.02)',
            '기자재 대여 시스템 사이트 / 주변 맛집 등 명소를 찾는 사이트 / 2D 로그라이크 앱 게임 등 개발',
        ],
    },
]

export type SkillLevel = 'comfort' | 'usage' | 'experience'
export type Skill = {
    name: string
    color: string
}
export type MySkill = {
    [key in SkillLevel]?: Skill[]
}

export const MY_SKILLS: MySkill = {
    comfort: [
        {
            name: 'JavaScript (ES6+)',
            color: '#F7DF1E', // 노란색 (JavaScript 공식 색상)
        },
        {
            name: 'TypeScript',
            color: '#3178C6', // 파란색 (TypeScript 공식 색상)
        },
        {
            name: 'React.js',
            color: '#61DAFB', // 청록색 (React 공식 색상)
        },
        {
            name: 'Next.js',
            color: '#000000', // 검정색 (Next.js 공식 색상)
        },
        {
            name: 'Tailwind CSS',
            color: '#38B2AC', // 청록색 (Tailwind CSS 공식 색상)
        },
        {
            name: 'Express',
            color: '#000000', // 검정색 (Express 공식 색상)
        },
        {
            name: 'Prisma',
            color: '#0C344B', // 진한 파란색 (Prisma 공식 색상)
        },
        {
            name: 'Figma',
            color: '#F24E1E', // 빨간색 (Figma 공식 색상)
        },
        {
            name: 'Notion',
            color: '#000000', // 검정색 (Notion 공식 색상)
        },
        {
            name: 'Slack',
            color: '#4A154B', // 보라색 (Slack 공식 색상)
        },
        {
            name: 'Swagger',
            color: '#85EA2D', // 연두색 (Swagger 공식 색상)
        },
    ],
    usage: [
        {
            name: 'Styled Component',
            color: '#DB7093', // 핑크색 (Styled Components 공식 색상)
        },
        {
            name: 'MongoDB',
            color: '#47A248', // 녹색 (MongoDB 공식 색상)
        },
        {
            name: 'Postgresql',
            color: '#336791', // 파란색 (PostgreSQL 공식 색상)
        },
        {
            name: 'AWS S3',
            color: '#FF9900', // 주황색 (AWS 공식 색상)
        },
        {
            name: 'Vercel',
            color: '#000000', // 검정색 (Vercel 공식 색상)
        },
    ],
    experience: [
        {
            name: 'Java',
            color: '#007396', // 청록색 (Java 공식 색상)
        },
        {
            name: 'C#',
            color: '#239120', // 녹색 (C# 공식 색상)
        },
        {
            name: 'React Native',
            color: '#61DAFB', // 청록색 (React Native는 React와 같은 색상)
        },
        {
            name: 'Android (Java)',
            color: '#3DDC84', // 녹색 (Android 공식 색상)
        },
        {
            name: 'JSP',
            color: '#F44336', // 빨간색 (JSP 색상)
        },
        {
            name: 'Spring Boot',
            color: '#6DB33F', // 녹색 (Spring 공식 색상)
        },
        {
            name: 'GraphQL',
            color: '#E10098', // 핑크색 (GraphQL 공식 색상)
        },
    ],
}

export type MyCertification = {
    name: string
    date?: string
    sub?: string
}

export const MY_CERTIFICATIONS: MyCertification[] = [
    {
        name: 'TOEIC (815 점)',
        date: '2023.07.09',
    },
    {
        name: '워드프로세서',
        date: '2021.09.24',
    },
    {
        name: '컴퓨터 활용능력 1급',
        date: '2021.08.20',
    },
    {
        name: '정보처리산업기사',
        sub: '필기 합격, 실기 준비 중',
    },
]
