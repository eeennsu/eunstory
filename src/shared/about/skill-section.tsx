import { FC } from 'react'
import { Skill, SkillLevel } from '@/shared/constants'
import { Badge } from '@/lib/ui/badge'

interface Props {
    level: SkillLevel
    skills: Skill[]
}

const levelLabels: Record<SkillLevel, string> = {
    comfort: '익숙해요',
    usage: '어느정도 사용할 수 있어요',
    experience: '경험이 있어요',
}

export const SkillSection: FC<Props> = ({ level, skills }) => {
    return (
        <section className='flex max-lg:flex-col justify-between w-full max-lg:gap-3'>
            <h3 className='text-2xl lg:text-3xl font-semibold'>{levelLabels[level]}</h3>
            <ul className='flex flex-wrap gap-3 max-w-full items-center lg:max-w-[60%] w-full '>
                {skills.map((skill) => (
                    <Badge
                        key={skill.name}
                        className='px-3 py-1 h-fit rounded-sm text-sm text-foreground/90 font-medium'
                        style={{
                            backgroundColor: skill.color,
                        }}>
                        {skill.name}
                    </Badge>
                ))}
            </ul>
        </section>
    )
}
