import { useState, useRef, useEffect } from 'react'
import './App.css'
import { Lists } from './List'
import { Qualities } from './Qualities'
import { useTheme } from './ThemeToggle/useTheme'
import { ThemeToggle } from './ThemeToggle/ThemeToggle'
import { MyProjects } from './MyProjects'

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isOpen, setIsOpen] = useState(false)
  const [showQualities, setShowQualities] = useState(false)
  const [showMyProjects, setShowMyProjects] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const yesButtonRef = useRef<HTMLButtonElement>(null)  // 👈 ref на кнопку «Да»
  const { theme } = useTheme()
  // После монтирования ставим кнопку «Нет» рядом с «Да»
  useEffect(() => {
    const container = containerRef.current
    const yesBtn = yesButtonRef.current
    if (!container || !yesBtn) return  // ← ранний выход

    const containerRect = container.getBoundingClientRect()
    const yesRect = yesBtn.getBoundingClientRect()

    const x = yesRect.left - containerRect.left + yesRect.width + 8
    const y = yesRect.top - containerRect.top

  setPosition({ x, y })
  }, [])

  function handleNoHover() {
  const container = containerRef.current
  if (!container) return

  const rect = container.getBoundingClientRect()
  const newX = Math.random() * (rect.width - 80)
  const newY = Math.random() * (rect.height - 40)
  setPosition({ x: newX, y: newY })
}

  return (
    <div
      ref={containerRef}
      className={theme}
      style={{
        position: 'relative',
        minHeight: '200px'
      }}
    >
      <ThemeToggle />
      <h2 style={{color:'currentColor'}}>Let's get acquainted</h2>

      <button
        ref={yesButtonRef}  // 👈 вешаем ref
        onClick={() => {setIsOpen(!isOpen)
                        setShowQualities(false)    
                        setShowMyProjects(false)   
        }}
        style={{
          fontSize: '16px',
          padding: '5px',
          backgroundColor: 'rgb(227, 22, 22)'
        }}
      >
        Yes
      </button>

      {isOpen && <> <Lists onComplete={() => setShowQualities(true)}/>
                    {showQualities && <Qualities onComplete={() => setShowMyProjects(true)}/>}
                      {showMyProjects && <MyProjects />} 
                  </>}

      {!isOpen && (
      <button
        onMouseEnter={handleNoHover}
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          transition: 'all 0.2s ease',
          fontSize: '16px',
          padding: '5px',
          backgroundColor: '#26d05fc7'
        }}
      >
        No
      </button>
      )
    }
    </div>
  )
}

export default App