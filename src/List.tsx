import { useState, useRef, useEffect } from "react"
import confetti from 'canvas-confetti'

const pairs = [
    { id: 1, question: 'Name', answer: 'Aleksandr' },
    { id: 2, question: 'Age', answer: "27" },
    { id: 3, question: 'Profession', answer: 'Electrical engineer' },
    { id: 4, question: 'Hobby', answer: 'Programming' },
    { id: 5, question: "Goal", answer: "Become successful and remain human" },
    { id: 6, question: "Country of residence", answer: "Russia" },
    { id: 7, question: "Do I want to emigrate?", answer: "Of course" },
    { id: 8, question: "Marital status", answer: "Married" },
]

type Line = {
    id: number
    x1: number
    y1: number
    x2: number
    y2: number
    length: number
}

export function Lists({ onComplete }: { onComplete: () => void }) {
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const [matched, setMatched] = useState<number[]>([])
    const [currentSection, setCurrentSection] = useState<'game' | 'next'>('game')
    const [lines, setLines] = useState<Line[]>([])
    const [shuffledAnswers] = useState(() =>
        [...pairs].sort(() => Math.random() - 0.5)
    )

    const containerRef = useRef<HTMLDivElement>(null)
    const questionRefs = useRef<Record<number, HTMLDivElement>>({})
    const answerRefs = useRef<Record<number, HTMLDivElement>>({})

    useEffect(() => {
        const newLines = matched.map(id => {
            const questionEl = questionRefs.current[id]
            const answerEl = answerRefs.current[id]
            const containerEl = containerRef.current
            if (!questionEl || !answerEl || !containerEl) return null

            const containerRect = containerEl.getBoundingClientRect()
            const qRect = questionEl.getBoundingClientRect()
            const aRect = answerEl.getBoundingClientRect()

            const x1 = qRect.right - containerRect.left
            const y1 = qRect.top + qRect.height / 2 - containerRect.top
            const x2 = aRect.left - containerRect.left
            const y2 = aRect.top + aRect.height / 2 - containerRect.top
            const length = Math.hypot(x2 - x1, y2 - y1)

            return { id, x1, y1, x2, y2, length }
        }).filter(Boolean) as Line[]

        setLines(newLines)
    }, [matched])

    useEffect(() => {
        if (matched.length === pairs.length && matched.length > 0) {
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } })
        }
    }, [matched])

    function handleQuestionClick(id: number) {
        if (!matched.includes(id)) setSelectedId(id)  // ✅ нельзя кликнуть на уже совпавший
    }

    function handleAnswerClick(id: number) {
        if (selectedId === id) {
            setMatched(prev => [...prev, id])
            setSelectedId(null)
        } else {
            setSelectedId(null)
        }
    }

    function handleNextClick() {
        setSelectedId(null)
        setMatched([])
        setCurrentSection('next')
        onComplete()
    }

    return (
        <>
            {currentSection === 'game' && <h4>Match the facts about me</h4>}
            {currentSection === 'game' && (
                <div ref={containerRef} className="location">
                    <svg className="svg">
                        {lines.map((line) => (
                            <line
                                key={line.id}
                                x1={line.x1}
                                y1={line.y1}
                                x2={line.x2}
                                y2={line.y2}
                                stroke="blue"
                                strokeWidth={2}
                                strokeDasharray={line.length}
                                strokeDashoffset={line.length}
                                style={{ animation: 'drawLine 0.5s ease forwards' }}
                            />
                        ))}
                    </svg>

                    <div>
                        {pairs.map((item) => (
                            <div
                                key={item.id}
                                ref={(el) => { questionRefs.current[item.id] = el! }}
                                onClick={() => handleQuestionClick(item.id)}
                                className={`card-item ${
                                    matched.includes(item.id) ? 'matched' :
                                    selectedId === item.id ? 'selected' : ''
                                }`}
                            >
                                {item.question}
                            </div>
                        ))}
                    </div>

                    <div>
                        {shuffledAnswers.map((item) => (
                            <div
                                key={item.id}
                                ref={(el) => { answerRefs.current[item.id] = el! }}
                                onClick={() => handleAnswerClick(item.id)}
                                className={`card-item ${
                                    matched.includes(item.id) ? 'matched' : ''
                                }`}
                            >
                                {item.answer}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {currentSection === 'game' && matched.length === pairs.length &&
                <button onClick={handleNextClick} className="next">Next</button>}
        </>
    )
}