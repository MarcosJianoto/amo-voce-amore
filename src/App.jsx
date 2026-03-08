import { useEffect, useMemo, useState } from 'react'
import './App.css'

const TARGET_DATE = new Date('2026-07-08T00:00:00')

const surpriseMessages = {
  triste: 'Amo demais você, sempre quero saber o que você está sentindo.',
  sorrir: 'Quando você sorri, meu coração aquece! Quando te vejo na câmera, fico tão feliz, parece que o mundo para por um momento.',
  gostar: 'Penso em você em cada detalhe do meu dia, quero falar com você em todos os momentos, quero viver minha vida com você. É esse tantinho que eu gosto de você <3',
}

function getDiffParts(targetDate) {
  const now = new Date()
  let diff = Math.max(0, targetDate - now)

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24))
  diff -= dias * 1000 * 60 * 60 * 24

  const horas = Math.floor(diff / (1000 * 60 * 60))
  diff -= horas * 1000 * 60 * 60

  const minutos = Math.floor(diff / (1000 * 60))

  return { dias, horas, minutos }
}

function App() {
  const [counter, setCounter] = useState(() => getDiffParts(TARGET_DATE))
  const [activeMessage, setActiveMessage] = useState('')
  const [openLetter, setOpenLetter] = useState(false)
  const [accepted, setAccepted] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(getDiffParts(START_DATE))
    }, 30000)

    return () => clearInterval(timer)
  }, [])

  const storyBlocks = useMemo(
    () => [
      {
        title: 'Oi meu amor!',
        text: 'Fiz um site pra te contar um pouco do que eu sinto por voce e o quanto estou ansioso para poder te ver',
      },
      {
        title: 'Quando a gente se conheceu: 08/02/2025',
        text: 'Essa data ficará no meu coração pra sempre. Foi o dia que eu conheci a pessoa mais incrível do mundo.',
      },
      {
        title: 'Coisas que eu gosto em voce',
        list: ['seu jeito', 'suas risadas', 'conversar com voce', 'te ver feliz', 'te fazer sorrir', 'cuidar de você', 'te amar'],
      },
      {
        title: 'E sabe de uma coisa?',
        text: 'Mal posso esperar pra te ver pessoalmente.',
      },
    ],
    []
  )

  return (
    <main className="container">
      <section className="story">
        {storyBlocks.map((block, idx) => (
          <article className="card" key={block.title}>
            <h2>{block.title}</h2>
            {block.text && <p>{block.text}</p>}
            {block.list && (
              <ul>
                {block.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {idx < storyBlocks.length - 1 && <div className="arrow">↓</div>}
          </article>
        ))}
      </section>

      <section className="card">
        <h2>Clica nos botõezinhos</h2>
        <div className="btn-grid">
          <button type="button" onClick={() => setActiveMessage(surpriseMessages.triste)}>
            Clique aqui se voce estiver triste
          </button>
          <button type="button" onClick={() => setActiveMessage(surpriseMessages.sorrir)}>
            Clique aqui se quiser sorrir
          </button>
          <button type="button" onClick={() => setActiveMessage(surpriseMessages.gostar)}>
            Sabe quanto eu gosto de você? Clica aqui pra saber
          </button>
        </div>
        {activeMessage && <p className="surprise-msg">{activeMessage}</p>}
      </section>

      <section className="card">
        <h2>Ansioso para poder te ver (seu aniversário)! </h2>
        <div className="counter">
          <div>
            <strong>{counter.dias}</strong>
            <span>dias</span>
          </div>
          <div>
            <strong>{counter.horas}</strong>
            <span>horas</span>
          </div>
          <div>
            <strong>{counter.minutos}</strong>
            <span>minutos</span>
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Cartinha digital</h2>
        <button type="button" onClick={() => setOpenLetter((value) => !value)}>
          Abrir carta
        </button>

        <div className={`letter-wrap ${openLetter ? 'open' : ''}`}>
          <div className="envelope" />
          <div className="letter">
            <p>
              Obrigado por fazer parte da minha vida!
              <br />
              Amo você do fundo do meu coração!
            </p>
          </div>
        </div>
      </section>

      <section className="card final">
        <h2>Voce aceita continuar sendo minha namorada?</h2>
        <div className="btn-grid">
          <button type="button" onClick={() => setAccepted('Bom mesmo <3')}>
            Sim
          </button>
          <button type="button" onClick={() => setAccepted('Opção invalida, selecione sim')}>
            Não
          </button>
        </div>
        {accepted && <p className="accepted">{accepted}</p>}
      </section>
    </main>
  )
}

export default App
