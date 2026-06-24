import { type ShapeName } from "./QualitiesConst"

const shapeMap: Record<ShapeName, string> = {
    'Reliability':  'cube',
    'Kindness':     'circle',
    'Honesty':      'line',
    'Loyalty':      'ring',
    'Industriousness': 'spiral',
    'Courage':      'triangle',
    'Modesty':      'dot',
    'Prudence':     'hexagon',
    'Naturalness':  'wave',
    'Tolerance':    'rect',
}

 export const shapePositions: Record<ShapeName, { top: string; left: string }> = {
    'Reliability':     { top: '10%',  left: '5%'  },
    'Kindness':        { top: '70%',  left: '80%' },
    'Honesty':         { top: '30%',  left: '90%' },
    'Loyalty':         { top: '85%',  left: '20%' },
    'Industriousness': { top: '65%',  left: '45%' },
    'Courage':         { top: '15%',  left: '70%' },
    'Modesty':         { top: '60%',  left: '10%' },
    'Prudence':        { top: '40%',  left: '30%' },
    'Naturalness':     { top: '80%',  left: '60%' },
    'Tolerance':       { top: '3%',  left: '22%' },
}

export const renderShape = (name: ShapeName, score: number) => {
    const shape = shapeMap[name];
    const size = score * 4;

    if (shape === 'circle') {
        return (
            <svg width="60" height="60" style={{overflow: 'visible'}}>
                <circle cx="30" cy="30" r={size || 2} fill="pink" />
            </svg>
        )
    }

    if (shape === 'cube') {
    const s = size + 20;
    const svgSize = s * 3;
    const cx = svgSize / 2;
    const cy = svgSize / 2;

    // Изометрический куб
    const w = s;        // ширина грани
    const h = s * 0.6;  // высота (перспектива)

    // Три грани куба (изометрия)
    const top = [
        `${cx},${cy - h}`,           // верх центр
        `${cx + w},${cy}`,           // право
        `${cx},${cy + h}`,           // низ центр
        `${cx - w},${cy}`,           // лево
    ].join(' ');

    const left = [
        `${cx - w},${cy}`,           // лево верх
        `${cx},${cy + h}`,           // центр верх
        `${cx},${cy + h + s}`,       // центр низ
        `${cx - w},${cy + s * 0.6}`, // лево низ
    ].join(' ');

    const right = [
        `${cx},${cy + h}`,           // центр верх
        `${cx + w},${cy}`,           // право верх
        `${cx + w},${cy + s * 0.6}`, // право низ
        `${cx},${cy + h + s}`,       // центр низ
    ].join(' ');

    return (
        <svg width={svgSize} height={svgSize} style={{overflow: 'visible'}}>
            <defs>
                {/* Градиенты для каждой грани */}
                <linearGradient id="topGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#74b9ff"/>
                    <stop offset="100%" stopColor="#0984e3"/>
                </linearGradient>
                <linearGradient id="leftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0984e3"/>
                    <stop offset="100%" stopColor="#074f8a"/>
                </linearGradient>
                <linearGradient id="rightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2d9cdb"/>
                    <stop offset="100%" stopColor="#1a6fa3"/>
                </linearGradient>
            </defs>

            {/* Грани куба */}
            <polygon points={left}  fill="url(#leftGrad)"  stroke="#063d6b" strokeWidth="1"/>
            <polygon points={right} fill="url(#rightGrad)" stroke="#063d6b" strokeWidth="1"/>
            <polygon points={top}   fill="url(#topGrad)"   stroke="#063d6b" strokeWidth="1"/>

            {/* Блик на верхней грани */}
            <polygon
                points={`${cx},${cy - h + 6} ${cx + w * 0.4},${cy - h * 0.2} ${cx},${cy + h * 0.3} ${cx - w * 0.4},${cy - h * 0.2}`}
                fill="rgba(255,255,255,0.15)"
            />
        </svg>
    )
}

    if (shape === 'line') {
        return (
            <svg width="90" height="30">  {/* ✅ фиксированный размер */}
                <line 
                    x1="5" y1="30" 
                    x2={5 + size * 2} y2="30" 
                    strokeWidth={Math.max(1, score)} 
                    stroke="currentColor"  
                />
            </svg>
        )
    }

    if (shape === 'ring') {
        return (
            <svg width="60" height="60">
                <circle 
                    cx="30" cy="30"
                    r={Math.min(size, 25)}  
                    fill="none"
                    stroke="purple"
                    strokeWidth={Math.max(1, score / 2)}
                />
            </svg>
        )
    }

    if (shape === 'spiral') {
        const getSpiral = (score: number) => {
            let d = "";
            const x = 30, y = 30;
            for (let i = 0; i < score * 10; i++) {
                const angle = i * 0.3;
                const radius = i * 0.3;
                const nx = x + radius * Math.cos(angle);
                const ny = y + radius * Math.sin(angle);
                d += i === 0 ? `M ${nx} ${ny}` : ` L ${nx} ${ny}`;
            }
            return d;
        }
        return (
            <svg width="60" height="60">
                <path 
                    d={getSpiral(score)}
                    fill="none"
                    stroke="green"
                    strokeWidth="1.5"
                />
            </svg>
        )
    }  

    if (shape === 'triangle') {  
        const svgSize = size * 2 + 20;
        return (
            <svg width={svgSize} height={svgSize} style={{overflow: 'visible'}}>
            <polygon 
                points={`
                    ${svgSize/2},${svgSize/2 - size}  
                    ${svgSize/2 + size},${svgSize/2 + size}  
                    ${svgSize/2 - size},${svgSize/2 + size}
                `}
                fill="orange"
            />
        </svg>
        )
    }

    if (shape === 'dot') {
    const cx = 30, cy = 30;
    const points = Array.from({length: 5}, (_, i) => {
        const outer = size + 5;
        const inner = outer / 2;
        const angleOuter = (i * 72 - 90) * Math.PI / 180;
        const angleInner = (i * 72 - 90 + 36) * Math.PI / 180;
        return `${cx + outer * Math.cos(angleOuter)},${cy + outer * Math.sin(angleOuter)}
                ${cx + inner * Math.cos(angleInner)},${cy + inner * Math.sin(angleInner)}`;
    }).join(' ');

    return (
        <svg width="60" height="60" style={{overflow: 'visible'}}>
            <polygon points={points} fill="gold" stroke="orange" strokeWidth="1"/>
        </svg>
    )
}

    if (shape === 'hexagon') {
    const s = size + 10;
    const svgSize = s * 2 + 20;
    const cx = svgSize / 2;
    const cy = svgSize / 2;

    // 6 точек шестиугольника
    const points = Array.from({length: 6}, (_, i) => {
        const angle = (i * 60 - 30) * Math.PI / 180; // -30 чтобы плоская сторона была сверху
        return `${cx + s * Math.cos(angle)},${cy + s * Math.sin(angle)}`;
    }).join(' ');

    return (
        <svg width={svgSize} height={svgSize} style={{overflow: 'visible'}}>
            <polygon
                points={points}
                fill="#9b59b6"
                stroke="#6c3483"
                strokeWidth="2"
            />
        </svg>
    )
}

    if (shape === 'wave') {
    const svgSize = size * 4 + 40;
    const cy = svgSize / 2;
    const amplitude = size;        // высота волны
    const frequency = svgSize / 4; // ширина одной волны

    // path с кривыми Безье
    const path = `
        M ${0},${cy}
        C ${frequency * 0.5},${cy - amplitude}
          ${frequency * 0.5},${cy - amplitude}
          ${frequency},${cy}
        C ${frequency * 1.5},${cy + amplitude}
          ${frequency * 1.5},${cy + amplitude}
          ${frequency * 2},${cy}
        C ${frequency * 2.5},${cy - amplitude}
          ${frequency * 2.5},${cy - amplitude}
          ${frequency * 3},${cy}
    `;

    return (
        <svg width={svgSize} height={svgSize} style={{overflow: 'visible'}}>
            <path
                d={path}
                fill="none"
                stroke="#1abc9c"
                strokeWidth={size / 3 + 2}  // толщина линии растёт с size
                strokeLinecap="round"
            />
        </svg>
    )
}

    if (shape === 'rect') {
    const w = (size + 10) * 2;  // ширина
    const h = (size + 10);      // высота (в 2 раза меньше ширины)
    const svgSize = w + 20;

    return (
        <svg width={svgSize} height={svgSize} style={{overflow: 'visible'}}>
            <rect
                x={(svgSize - w) / 2}
                y={(svgSize - h) / 2}
                width={w}
                height={h}
                fill="#e74c3c"
                stroke="#c0392b"
                strokeWidth="2"
                rx="0.5"//кругление углов
            />
        </svg>
    )
}

    return (
        <svg width="60" height="60">
            <rect x="5" y="5" width="50" height="50" fill="lightgray"/>
        </svg>
    )
}