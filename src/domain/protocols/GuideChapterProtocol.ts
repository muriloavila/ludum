import { GuideChapter } from '@/domain/entities/GuideChapter'

export interface GuideChapterProtocol {
    add: (guideChapter: GuideChapter) => Promise<void>
}
