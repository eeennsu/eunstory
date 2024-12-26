import Link from 'next/link'
import { mainPath } from '@/lib/route'
import { FC } from 'react'

export const IntroductionSection: FC = () => {
    return (
        <section className='text-gray-400 flex flex-col gap-3.5'>
            <p>안녕하세요, 26세 1년차 주니어 프론트엔드 개발자 방은수입니다.</p>
            <p>
                저는 사용자 경험을 개선하고, 직관적인 웹 애플리케이션을 만드는 데 열정을 가지고 있습니다. 현재 React와
                Next.js를 기반으로 프로젝트를 진행하고 있으며, 공용 컴포넌트 개발, 백엔드와의 API 연동, 사이트 구조 설계
                및 구현을 맡고 있습니다.
            </p>
            <p>
                이러한 경험을 바탕으로 협업의 중요성을 이해하고, 백앤드 개발자, 디자이너 등 다른 동료들과 함께 더욱 나은
                사용자 경험을 제공하는 프로젝트를 만들어나가고 있습니다. 개인적인 개발자로서의 목표는, 현재 내가 가지고
                있는 기술을 어떻게하면 더 응용하고, 발전시킬 수 있을지 고민하며 스스로를 성장시키는 것입니다.
            </p>
            <p>
                저에 대한 자세한 이력은{' '}
                <Link
                    href={mainPath.about()}
                    className='underline underline-offset-4 text-blue-500'>
                    이곳
                </Link>
                에서 확인하실 수 있습니다!
            </p>
        </section>
    )
}
