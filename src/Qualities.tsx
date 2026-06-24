import { useState } from "react";
import { renderShape, shapePositions } from "./Shapes";
import { qualityList, myQualityList, type Quality } from "./QualitiesConst";
import { type ShapeName } from "./QualitiesConst"

export function Qualities({ onComplete }: { onComplete: () => void }) {
    const [value, setValue] = useState<Quality[] | null>([...qualityList]);
    const [showNext, setShowNext] = useState(false);
    const [results, setResults] = useState<
                    {name: string, yours: number, mine: number | string}[]>([]); // 👈 новый стейт
    if (!value) return null

    const handleScore = (id: number, delta: number) => {
        setValue(value.map((el) => {
            if (el.id === id) {
                const newScore = el.score + delta;
                if (newScore < 0 || newScore > 10) return el;
                return { ...el, score: newScore }
            }
            return el
        }))
    }

    const handleCompare = () => {
        const compared = value
            .filter(el => el.score > 0)
            .map(el => {
                const mine = myQualityList.find(m => m.id === el.id);
                return {
                    name: el.name,
                    yours: el.score,
                    mine: mine ? mine.score : '—'
                }
            });
        setResults(compared); // 👈 сохраняем результат
        setShowNext(true)
    }

    function handleNextClick() {
        setValue(null)
        setResults([])
        setShowNext(false)
        onComplete()
    }
    
   return (
    <div>
        <h4>
            <span style={{display: 'block'}}>Choose 4 personal qualities you value most.</span>
            <span style={{display: 'block'}}>Rate each from 1 (not important) to 10 (very important)</span>
        </h4>

        {/* ✅ 1. Фигуры — летают по экрану, появляются только если score > 0 */}
        {value && value.map((item) => item.score > 0 && (
            <div key={item.id} style={{
                position: 'fixed',
                ...shapePositions[item.name as ShapeName],
                zIndex: 0,
                pointerEvents: 'none'  // 👈 чтобы не мешали кликам
            }}>
                {renderShape(item.name as ShapeName, item.score)}
            </div>
        ))}

        {/* ✅ 2. Список — обычный, кнопки на месте */}
        <div style={{display: 'flex', gap: '40px', justifyContent: 'center'}}>
            <div>
                {value && value.map((item) => (
                    <div key={item.id} className="qualities">
                        <span style={{ textAlign: 'right' }}>{item.name}</span>
                        <span style={{ textAlign: 'center' }}>{item.score}</span>
                        <span>
                            <button onClick={() => handleScore(item.id, 1)}>+</button>
                            <button onClick={() => handleScore(item.id, -1)}>-</button>
                        </span>
                    </div>
                ))}

                <button onClick={handleCompare}>Compare</button>
            </div>

            {/* Результаты */}
            {results.length > 0 && (
                <div>
                    <h3>Comparison results:</h3>
                    {results.map((r) => (
                        <div key={r.name}>
                            <span>{r.name} — You: {r.yours}, I: {r.mine}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
        {showNext && <button onClick={handleNextClick} className="next">Next</button>}
    </div>
)
}
