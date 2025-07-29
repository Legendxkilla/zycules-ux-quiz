import { useState } from 'react'

const quizData = [
  {
    question: `Zycules stands before the Hydra of Slippage. Each head shows a different execution price.
What does he need to fight it?`,
    options: ['Blind courage', 'A DEX with real-time slippage info', 'An extra MetaMask popup'],
    answer: 1,
  },
  {
    question: `The Oracle shows you your PnL: '+0.000043 ETH'. No USD, no context.
What wisdom is missing?`,
    options: ['Real-time PnL in USD', 'A better prophecy scroll', 'Meme charts'],
    answer: 0,
  },
  {
    question: `Zycules draws his sword to trade… but must complete 4 wallet confirmations.
What curse is this?`,
    options: ['Slippage trap', 'Modal Hell', 'Bridge of Approvals'],
    answer: 1,
  },
  {
    question: `Zycules sees a perfect entry. But when he clicks 'Confirm', gas fees hit like a Minotaur.
What betrayed him?`,
    options: ['Unseen gas & taker fees', 'Hidden scrolls', 'Fee monster behind him'],
    answer: 0,
  },
  {
    question: `Three apples lie before Zycules: flashy, complicated, and clean.
Which holds the true UX treasure?`,
    options: ['The shiniest one with 3 modals', 'The one with clean layout, fast fills & clear data', 'The one behind 2 bridge layers'],
    answer: 1,
  }
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (i: number) => {
    const next = [...answers, i];
    setAnswers(next);
    if (step + 1 < quizData.length) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  };

  const score = answers.filter((a, i) => a === quizData[i].answer).length;
  const passed = score >= 4;

  return (
    <main style={{ minHeight: '100vh', padding: '2rem', background: '#fffbe6', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', borderRadius: '0.5rem', padding: '2rem', maxWidth: '500px', width: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        {!finished ? (
          <>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Trial {step + 1} of 5</h2>
            <p style={{ whiteSpace: 'pre-wrap', margin: '1rem 0' }}>{quizData[step].question}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {quizData[step].options.map((opt, i) => (
                <button
                  key={i}
                  style={{ background: '#ffe599', padding: '0.75rem', border: 'none', borderRadius: '0.375rem', textAlign: 'left', cursor: 'pointer' }}
                  onClick={() => handleAnswer(i)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
              {passed ? '🍏 Victory!' : '💀 You’ve Fallen in the UX Labyrinth'}
            </h2>
            <p style={{ margin: '1rem 0' }}>You scored {score}/5</p>
            <a
              href={`https://twitter.com/intent/tweet?text=I%20completed%20Zycules'%20UX%20Trial%20with%20${score}%2F5%20🍏%20Time%20to%20clean%20up%20perpDEXs.%20%23Zycules%20%23Mission3`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', padding: '0.75rem 1.5rem', background: '#1DA1F2', color: 'white', borderRadius: '0.375rem', textDecoration: 'none' }}
            >
              Share on Twitter
            </a>
            <button onClick={() => { setStep(0); setAnswers([]); setFinished(false);}}
              style={{ display: 'block', margin: '1rem auto 0', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>
              Retry Quiz
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
