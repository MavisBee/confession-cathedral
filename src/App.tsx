import { useState } from 'react'
import './App.css'

interface Confession {
  id: number
  text: string
  timestamp: number
}

const MAX_CHARS = 280

function App() {
  const [confessions, setConfessions] = useState<Confession[]>([])
  const [text, setText] = useState('')

  const charCount = text.length
  const isOverLimit = charCount > MAX_CHARS
  const isEmptyOrWhitespace = text.trim().length === 0

  const handleSubmit = () => {
    if (isOverLimit) return

    const newConfession: Confession = {
      id: Date.now(),
      text: text.trim(),
      timestamp: Date.now(),
    }

    setConfessions(prev => [newConfession, ...prev])
    setText('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit()
    }
  }

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return 'just now'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Confession Cathedral</h1>
        <p className="subtitle">An anonymous wall where people drop their truth.</p>
      </header>

      <form
        className="form"
        onSubmit={e => { e.preventDefault(); handleSubmit() }}
      >
        <textarea
          className={`textarea${isOverLimit ? ' over-limit' : ''}`}
          placeholder="What weighs on your soul?"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={4}
          maxLength={MAX_CHARS + 50}
        />
        <div className="form-footer">
          <span className={`char-counter${isOverLimit ? ' over-limit' : ''}`}>
            {charCount}/{MAX_CHARS}
          </span>
          <button
            type="submit"
            className="submit-btn"
            disabled={isOverLimit}
          >
            Confess
          </button>
        </div>
      </form>

      <div className="feed">
        {confessions.length === 0 ? (
          <p className="empty-state">No confessions yet. The floor is yours.</p>
        ) : (
          confessions.map(confession => (
            <div key={confession.id} className="confession-card">
              <p className="confession-text">{confession.text}</p>
              <span className="confession-time">{getTimeAgo(confession.timestamp)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
