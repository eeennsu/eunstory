import { mainPath } from '@/lib/route'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

const HomePage: FC = async () => {
    return (
        <main className='page-container pt-32 pb-10 max-w-2xl flex  items-center justify-center flex-col gap-6 mx-auto text-gray-200'>
            <figure className='relative w-40 h-40 mb-6 rounded-full overflow-hidden shadow-lg'>
                <Image
                    src='/images/main-me.jpeg' // 사진의 올바른 경로로 수정
                    alt='Eunsu Bang'
                    layout='fill'
                    objectFit='cover'
                    className='rounded-full'
                />
            </figure>

            <h1 className='text-4xl font-bold mb-4 text-gray-50'>👋 안녕하세요, 방은수입니다</h1>
            <p className=' text-gray-400 mb-6'>
                안녕하세요, 26세 1년차 주니어 프론트엔드 개발자 방은수입니다.
                <br /> <br />
                저는 사용자 경험을 개선하고, 직관적인 웹 애플리케이션을 만드는 데 열정을 가지고 있습니다. 현재 React와
                Next.js를 기반으로 프로젝트를 진행하고 있으며, 공용 컴포넌트 개발, 백엔드와의 API 연동, 사이트 구조 설계
                및 구현을 맡고 있습니다.
                <br /> <br />
                이러한 경험을 바탕으로 협업의 중요성을 이해하고, 백앤드 개발자, 디자이너 등 다른 동료들과 함께 더욱 나은
                사용자 경험을 제공하는 프로젝트를 만들어나가고 있습니다. 개인적인 개발자로서의 목표는, 현재 내가 가지고
                있는 기술을 어떻게하면 더 응용하고, 발전시킬 수 있을지 고민하며 스스로를 성장시키는 것입니다.
                <br /> <br />
                저에 대한 자세한 이력은{' '}
                <Link
                    href={mainPath.about()}
                    className='underline underline-offset-4 text-blue-500'>
                    이곳
                </Link>
                에서 확인하실 수 있습니다!
            </p>

            <section className='flex flex-col gap-4 text-center'>
                <p>
                    <strong className='text-gray-300'>이메일:</strong>{' '}
                    <Link
                        href='mailto:xxx592@naver.com'
                        className='text-blue-400 hover:underline'>
                        xxx592@naver.com
                    </Link>
                </p>
                <p>
                    <strong className='text-gray-300'>Velog:</strong>{' '}
                    <Link
                        href='https://velog.io/@diso592/posts'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-400 hover:underline'>
                        https://velog.io/@diso592/posts
                    </Link>
                </p>
                <p>
                    <strong className='text-gray-300'>GitHub:</strong>{' '}
                    <Link
                        href='https://github.com/eeennsu'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-400 hover:underline'>
                        https://github.com/eeennsu
                    </Link>
                </p>
            </section>
        </main>
    )
}

export default HomePage
