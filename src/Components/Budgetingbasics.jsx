import { useState, useEffect, useMemo, useRef } from "react";
import "./Budgetingbasics.css";

// ---- Glossary content --------------------------------------------------

const TERMS = [
  {
    id: "income",
    label: "Income",
    hint: "Money you receive",
    detail:
      "Income is any money that comes in — a salary, allowance, side hustle, or gift. It's the starting point of every budget: you can only plan what you know you'll have.",
    tone: "income",
  },
  {
    id: "expenses",
    label: "Expenses",
    hint: "Money you spend",
    detail:
      "Expenses are what your income goes toward. Splitting them into needs and wants is what makes a budget useful instead of just a list of numbers.",
    tone: "expenses",
  },
  {
    id: "needs",
    label: "Needs",
    hint: "Essentials for living",
    detail:
      "Needs keep you fed, housed, and moving — rent, groceries, transport, healthcare. If skipping it would hurt you, it's a need.",
    tone: "needs",
  },
  {
    id: "wants",
    label: "Wants",
    hint: "Nice to have",
    detail:
      "Wants make life more enjoyable but aren't required — streaming, eating out, new clothes. There's nothing wrong with wants; a budget just makes room for them on purpose.",
    tone: "wants",
  },
  {
    id: "savings",
    label: "Savings",
    hint: "For your future",
    detail:
      "Savings is income you set aside instead of spending — for emergencies, a goal, or just breathing room later. Paying your future self first is the habit that makes budgets work.",
    tone: "savings",
  },
];

// ---- Quiz content (3 questions, options shuffled at runtime) ----------

const QUESTIONS = [
  {
    id: "q1",
    prompt: "What is the main purpose of a budget?",
    correct: "Plan how to use your money",
    distractors: ["Spend more", "Buy the latest phone", "Avoid saving"],
  },
  {
    id: "q2",
    prompt: "Which of these is a need rather than a want?",
    correct: "Rent",
    distractors: ["Concert tickets", "A new phone", "A video game"],
  },
  {
    id: "q3",
    prompt: "What should you do with money left over after needs and wants?",
    correct: "Save or invest it",
    distractors: ["Spend it immediately", "Ignore it", "Give it away at random"],
  },
];

function shuffled(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ---- Storage -----------------------------------------------------------

const KEYS = {
  income: "budgetbasics.income",
  rows: "budgetbasics.rows",
  lastScore: "budgetbasics.lastScore",
};

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
 
  }
}

const currency = (n) =>
  "₦" + Number(n || 0).toLocaleString("en-NG", { maximumFractionDigits: 0 });

let rowIdCounter = 0;
const makeRow = (category = "", amount = "") => ({
  id: `row-${Date.now()}-${rowIdCounter++}`,
  category,
  amount,
});

// ---- Component -----------------------------------------------------------

export default function BudgetingBasics() {
  const [openTerm, setOpenTerm] = useState(null);

  const [income, setIncome] = useState(() => readStorage(KEYS.income, ""));
  const [rows, setRows] = useState(() => {
    const saved = readStorage(KEYS.rows, null);
    return saved && saved.length ? saved : [makeRow()];
  });

  useEffect(() => writeStorage(KEYS.income, income), [income]);
  useEffect(() => writeStorage(KEYS.rows, rows), [rows]);

  const totalSpent = useMemo(
    () => rows.reduce((sum, r) => sum + (Number(r.amount) || 0), 0),
    [rows]
  );
  const incomeValue = Number(income) || 0;
  const remaining = incomeValue - totalSpent;

  const updateRow = (id, field, value) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const addRow = () => setRows((prev) => [...prev, makeRow()]);
  const removeRow = (id) =>
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));

  // ---- quiz state ----
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [lastScore, setLastScore] = useState(() => readStorage(KEYS.lastScore, null));
  const shuffleSeed = useRef(0);

  const currentQuestion = QUESTIONS[qIndex];
  const options = useMemo(() => {
    return shuffled([currentQuestion.correct, ...currentQuestion.distractors]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIndex, shuffleSeed.current]);

  const selectOption = (opt) => {
    if (submitted) return;
    setSelected(opt);
  };

  const submitAnswer = () => {
    if (!selected) return;
    setSubmitted(true);
    if (selected === currentQuestion.correct) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    if (qIndex + 1 < QUESTIONS.length) {
      setQIndex((i) => i + 1);
      setSelected(null);
      setSubmitted(false);
    } else {
      writeStorage(KEYS.lastScore, score);
      setLastScore(score);
      setFinished(true);
    }
  };

  const restartQuiz = () => {
    shuffleSeed.current += 1;
    setQIndex(0);
    setSelected(null);
    setSubmitted(false);
    setScore(0);
    setFinished(false);
  };

  const isCorrect = submitted && selected === currentQuestion.correct;

  return (
    <div className="bb-page" id="budgeting-basics">
      <header className="bb-hero">
        <h1>Budgeting Basics</h1>
        <p className="bb-sub">Understand the fundamentals of money management.</p>
      </header>

      <section className="bb-glossary" aria-label="Budgeting terms">
        {TERMS.map((t) => {
          const open = openTerm === t.id;
          return (
            <div key={t.id} className={`bb-term bb-tone-${t.tone}`}>
              <button
                type="button"
                className="bb-term-row"
                onClick={() => setOpenTerm(open ? null : t.id)}
                aria-expanded={open}
              >
                <span className="bb-term-name">{t.label}</span>
                <span className="bb-term-hint">{t.hint}</span>
                <span className="bb-term-chevron">{open ? "−" : "+"}</span>
              </button>
              {open && <p className="bb-term-detail">{t.detail}</p>}
            </div>
          );
        })}
      </section>

      <section className="bb-planner">
        <div className="bb-planner-head">
          <h2>Build your budget</h2>
          <p className="bb-planner-note">
            Enter your monthly income, then list where the money goes.
            <br />
            this is your own budget, saved on this device.
          </p>
        </div>

        <label className="bb-income-field">
          <span>Monthly income (₦)</span>
          <input
            type="number"
            min="0"
            placeholder="e.g. 120000"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
        </label>

        <table className="bb-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount (₦)</th>
              <th>% of income</th>
              <th aria-hidden="true"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const amt = Number(r.amount) || 0;
              const pct = incomeValue > 0 ? Math.round((amt / incomeValue) * 100) : 0;
              return (
                <tr key={r.id}>
                  <td>
                    <input
                      type="text"
                      className="bb-text-input"
                      placeholder="e.g. Transport"
                      value={r.category}
                      onChange={(e) => updateRow(r.id, "category", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      className="bb-amount-input"
                      placeholder="0"
                      value={r.amount}
                      onChange={(e) => updateRow(r.id, "amount", e.target.value)}
                    />
                  </td>
                  <td>{pct}%</td>
                  <td>
                    <button
                      type="button"
                      className="bb-row-remove"
                      onClick={() => removeRow(r.id)}
                      aria-label="Remove category"
                      disabled={rows.length === 1}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>Total spent</td>
              <td>{currency(totalSpent)}</td>
              <td>{incomeValue > 0 ? Math.round((totalSpent / incomeValue) * 100) : 0}%</td>
              <td></td>
            </tr>
            <tr className={remaining < 0 ? "bb-remaining-negative" : ""}>
              <td>Remaining</td>
              <td>{currency(remaining)}</td>
              <td colSpan="2">{remaining < 0 ? "over budget" : "unspent"}</td>
            </tr>
          </tfoot>
        </table>

        <button type="button" className="bb-btn bb-btn-outline bb-add-row" onClick={addRow}>
          + Add category
        </button>
      </section>

      <section className="bb-quiz">
        <div className="bb-quiz-head">
          <h2>Quick Knowledge Check</h2>
          {!finished && (
            <span className="bb-quiz-progress">
              Question {qIndex + 1} of {QUESTIONS.length}
            </span>
          )}
        </div>

        {!finished ? (
          <>
            <p className="bb-quiz-question">{currentQuestion.prompt}</p>

            <div className="bb-quiz-options" role="radiogroup" aria-label={currentQuestion.prompt}>
              {options.map((opt) => {
                const isSelected = selected === opt;
                const showCorrect = submitted && opt === currentQuestion.correct;
                const showWrong = submitted && isSelected && opt !== currentQuestion.correct;
                return (
                  <label
                    key={opt}
                    className={[
                      "bb-quiz-option",
                      isSelected ? "bb-quiz-option-selected" : "",
                      showCorrect ? "bb-quiz-option-correct" : "",
                      showWrong ? "bb-quiz-option-wrong" : "",
                    ].join(" ")}
                  >
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      checked={isSelected}
                      disabled={submitted}
                      onChange={() => selectOption(opt)}
                    />
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>

            {!submitted ? (
              <button type="button" className="bb-btn" onClick={submitAnswer} disabled={!selected}>
                Check Answer
              </button>
            ) : (
              <div className="bb-quiz-result">
                <p className={isCorrect ? "bb-result-correct" : "bb-result-wrong"}>
                  {isCorrect ? "Correct." : `Not quite — the answer is "${currentQuestion.correct}".`}
                </p>
                <button type="button" className="bb-btn" onClick={nextQuestion}>
                  {qIndex + 1 < QUESTIONS.length ? "Next question" : "See score"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bb-quiz-finished">
            <p className="bb-quiz-score">
              You scored {score} out of {QUESTIONS.length}
            </p>
            {lastScore !== null && (
              <p className="bb-quiz-lastscore">Best on this device: {lastScore}/{QUESTIONS.length}</p>
            )}
            <button type="button" className="bb-btn bb-btn-outline" onClick={restartQuiz}>
              Try Again
            </button>
          </div>
        )}
      </section>
    </div>
  );
}