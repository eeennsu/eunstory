import { FC } from 'react'
import { Skill, SkillLevel } from '@/shared/constants'
import { Badge } from '@/lib/ui/badge'
import { cn } from '@/lib/shadcn/shadcn-utils'
import { isBrightColor } from '@/lib/utils'

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
        <section className={cn('flex max-lg:flex-col justify-between w-full max-lg:gap-3')}>
            <h3 className='text-xl lg:text-2xl font-semibold text-gray-100 flex items-center'>{levelLabels[level]}</h3>
            <ul className='flex flex-wrap gap-3 max-w-full items-center lg:max-w-[60%] w-full '>
                {skills.map((skill) => (
                    <Badge
                        key={skill.name}
                        className={cn(
                            'px-3 py-1 h-fit rounded-sm text-sm text-foreground/90 font-medium',
                            isBrightColor(skill.color)
                                ? 'text-gray-800'
                                : 'text-foreground/90 border border-foreground/40'
                        )}
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
