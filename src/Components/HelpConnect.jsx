import { useState, useEffect, useRef } from "react";
import "./HelpConnect.css";

// ---------- data ----------

const sections = [
  { id: "ai", label: "AI Assistant"},
  { id: "about", label: "About Us"},
  { id: "feedback", label: "Feedback"},
  { id: "contact", label: "Contact Us" },
];

const suggestedQuestions = [
  "How do I save money as a student?",
  "What is the 50/30/20 rule?",
  "Help me create a budget",
  "Needs vs wants?",
];

// The assistant checks the question against each pattern and sends back the first reply that matches
const cannedAnswers = [
  {
    match: /50.?30.?20|rule/,
    reply: "The 50/30/20 rule splits your income three ways: 50% for needs (food, transport, rent), 30% for wants, and 20% for savings. On ₦120,000 that is ₦60,000 / ₦36,000 / ₦24,000.",
  },
  {
    match: /save|saving|student/,
    reply: "Start small and automate it. Set aside a fixed amount the day money arrives (even ₦2,000), track spending for a week, and cut one 'want' you barely notice. Use the Savings Goals tool to see how many months you need.",
  },
  {
    match: /create|start|make.*budget|help me/,
    reply: "1) Write down your monthly income. 2) List fixed needs first. 3) Set a savings target. 4) Give what's left to wants. Try the 50/30/20 calculator to get your numbers in seconds.",
  },
  {
    match: /need|want/,
    reply: "A need keeps you safe and functioning (food, shelter, transport, health, education). A want is a nice extra (designer clothes, gaming, eating out). Ask yourself: 'What happens if I skip this?'",
  },
  {
    match: /emergency/,
    reply: "An emergency fund covers surprises like repairs or medical bills. Aim first for one month of needs, then build toward three.",
  },
  {
    match: /mistake|wrong/,
    reply: "The common ones: spending more than you earn, not saving early, ignoring small expenses, relying on one income source, and not planning for emergencies.",
  },
];

const fallbackReply =
  "Good question! I'm still learning that one. Try asking about budgeting, saving, needs vs wants, or the 50/30/20 rule, or send us a message on the Contact tab.";

// TODO: this is fake AI (just keyword matching).
// Replace it with a real request to the backend, something like POST /api/chat
async function getAnswer(question) {
  // small delay so the typing dots show up
  await new Promise((resolve) => setTimeout(resolve, 900 + Math.random() * 600));

  const found = cannedAnswers.find((item) => item.match.test(question.toLowerCase()));
  return found ? found.reply : fallbackReply;
}

// ---------- small helper hook ----------

// Counts from 0 up to `target` over about a second
function useCountUp(target, shouldRun) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldRun) return;

    let frameId;
    let startTime;

    const step = (timestamp) => {
      if (startTime === undefined) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 1200, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // slows down near the end
      setCount(Math.round(target * eased));
      if (progress < 1) frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [target, shouldRun]);

  return count;
}

// ---------- AI assistant tab ----------

function AssistantPanel() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm your BudgetBasics assistant 👋 Ask me anything about budgeting, saving, or managing money.",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBoxRef = useRef(null);

  // keep the newest message in view
  useEffect(() => {
    const box = chatBoxRef.current;
    if (box) box.scrollTo({ top: box.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  // works for typed questions and for the suggestion chips
  async function sendQuestion(text) {
    const question = (text ?? inputText).trim();
    if (!question || isTyping) return;

    setInputText("");
    setMessages((prev) => [...prev, { sender: "user", text: question }]);
    setIsTyping(true);

    const reply = await getAnswer(question);

    setIsTyping(false);
    setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
  }

  return (
    <div className="hc-ai" id="ai-assistant">
      <div className="hc-ai-head">
        <span className="hc-orb" />
        <div>
          <strong>BudgetBasics AI</strong>
          <small>{isTyping ? "typing…" : "Online · replies in seconds"}</small>
        </div>
      </div>

      <div className="hc-chat" ref={chatBoxRef} aria-live="polite">
        {messages.map((message, index) => (
          <div key={index} className={`hc-msg ${message.sender}`}>
            {message.text}
          </div>
        ))}

        {isTyping && (
          <div className="hc-msg bot hc-dots">
            <i /><i /><i />
          </div>
        )}
      </div>

      <div className="hc-chips">
        {suggestedQuestions.map((question) => (
          <button key={question} onClick={() => sendQuestion(question)}>
            {question}
          </button>
        ))}
      </div>

      <div className="hc-composer">
        <input
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && sendQuestion()}
          placeholder="Type your question…"
          aria-label="Ask a budgeting question"
        />
        <button
          className="hc-btn"
          onClick={() => sendQuestion()}
          disabled={!inputText.trim() || isTyping}
        >
          Ask
        </button>
      </div>

      <p className="hc-note">This is an educational assistant, not a financial advisor.</p>
    </div>
  );
}

// ---------- About Us tab ----------

function StatCard({ value, suffix, label, shouldRun }) {
  const count = useCountUp(value, shouldRun);

  return (
    <div className="hc-stat">
      <b>
        {count.toLocaleString()}
        {suffix}
      </b>
      <span>{label}</span>
    </div>
  );
}

function AboutPanel() {
  const [startCounting, setStartCounting] = useState(false);

  // tiny delay so the numbers start after the tab finishes sliding in
  useEffect(() => {
    const timer = setTimeout(() => setStartCounting(true), 250);
    return () => clearTimeout(timer);
  }, []);

  const values = ["Simple first", "Free to learn", "Built for students", "Honest advice"];

  return (
    <div className="hc-about">
      <div className="hc-two">
        <article className="hc-card hc-lift">
          <span className="hc-emoji"><i class="bi bi-bullseye"></i></span>
          <h3>Our mission</h3>
          <p>
            Financial literacy for every student. We turn money basics into simple steps you can
            use today.
          </p>
        </article>

        <article className="hc-card hc-lift">
          <span className="hc-emoji"><i class="bi bi-globe-americas-fill"></i></span>
          <h3>Our vision</h3>
          <p>
            A generation that plans, saves and spends with confidence, so big dreams stay within
            reach.
          </p>
        </article>
      </div>

    
      <div className="hc-stats">
        <StatCard value={5000} suffix="+" label="learners helped" shouldRun={startCounting} />
        <StatCard value={40} suffix="+" label="free lessons and tools" shouldRun={startCounting} />
        <StatCard value={98} suffix="%" label="found it useful" shouldRun={startCounting} />
      </div>

      <div className="hc-values">
        {values.map((value, index) => (
          <span key={value} style={{ animationDelay: `${index * 90}ms` }}>
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------- Feedback tab ----------

const moodLabels = [
  "",
  "😞 We can do better",
  "😕 Not quite there",
  "🙂 Pretty good",
  "😃 Really helpful",
  "🤩 Loved it!",
];

const feedbackCategories = ["Lessons", "Tools", "Design", "AI Assistant", "Other"];

function FeedbackPanel() {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  
  const starsToShow = hoveredStar || rating;

  function handleSubmit() {
    
    setSubmitted(true);
  }

  function resetForm() {
    setSubmitted(false);
    setRating(0);
    setCategory("");
    setComment("");
  }

  if (submitted) {
    return (
      <div className="hc-success">
        <svg viewBox="0 0 52 52">
          <circle cx="26" cy="26" r="24" />
          <path d="M14 27l8 8 16-17" />
        </svg>
        <h3>Thank you!</h3>
        <p>Your feedback helps us build better lessons.</p>
        <button className="hc-btn" onClick={resetForm}>
          Send more feedback
        </button>
      </div>
    );
  }

  return (
    <div className="hc-form">
      <h3>How was your experience?</h3>

      <div className="hc-stars" onMouseLeave={() => setHoveredStar(0)}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={star <= starsToShow ? "on" : ""}
            onMouseEnter={() => setHoveredStar(star)}
            onClick={() => setRating(star)}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
          >
            ★
          </button>
        ))}
        {/* key makes the label re-animate every time the rating changes */}
        <span className="hc-mood" key={starsToShow}>
          {moodLabels[starsToShow]}
        </span>
      </div>

      <div className="hc-chips left">
        {feedbackCategories.map((item) => (
          <button
            key={item}
            className={category === item ? "sel" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="hc-field">
        <textarea
          id="feedback-comment"
          rows={4}
          maxLength={300}
          placeholder=" "
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <label htmlFor="feedback-comment">Tell us more (optional)</label>
        <small>{comment.length}/300</small>
      </div>

      <button className="hc-btn wide" disabled={!rating} onClick={handleSubmit}>
        Send feedback
      </button>
    </div>
  );
}

// ---------- Contact tab ----------

const contactDetails = [
  { icon: "bi bi-envelope", title: "Email", value: "infinitycoders@gmail.com" },
  { icon: "bi bi-phone", title: "Phone", value: "+234 70 821 29744" },
  { icon: "bi bi-geo-alt", title: "Location", value: "Lagos, Nigeria" }, 
  { icon: "bi bi-stopwatch", title: "Hours", value: "Mon to Fri, 9am to 5pm" },
];

const emptyForm = { name: "", email: "", message: "" };

function ContactPanel() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  // one handler for all three fields, we pick the field by name
  const handleChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value });
  };

  function handleSubmit() {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Enter your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Enter a valid email address";
    if (form.message.trim().length < 10) newErrors.message = "Write at least 10 characters";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
    
      setSent(true);
    }
  }

  function sendAnother() {
    setSent(false);
    setForm(emptyForm);
  }

  const firstName = form.name.trim().split(" ")[0];

  return (
    <div className="hc-two contact">
      {sent ? (
        <div className="hc-success">
          <svg viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="24" />
            <path d="M14 27l8 8 16-17" />
          </svg>
          <h3>Message sent</h3>
          <p>Thanks {firstName}, we'll reply within 24 hours.</p>
          <button className="hc-btn" onClick={sendAnother}>
            Send another
          </button>
        </div>
      ) : (
        <div className="hc-form">
          <h3>Send us a message</h3>

          <div className={`hc-field ${errors.name ? "bad" : ""}`}>
            <input id="contact-name" placeholder=" " value={form.name} onChange={handleChange("name")} />
            <label htmlFor="contact-name">Your name</label>
            {errors.name && <em>{errors.name}</em>}
          </div>

          <div className={`hc-field ${errors.email ? "bad" : ""}`}>
            <input id="contact-email" placeholder=" " value={form.email} onChange={handleChange("email")} />
            <label htmlFor="contact-email">Email address</label>
            {errors.email && <em>{errors.email}</em>}
          </div>

          <div className={`hc-field ${errors.message ? "bad" : ""}`}>
            <textarea
              id="contact-message"
              rows={4}
              placeholder=" "
              value={form.message}
              onChange={handleChange("message")}
            />
            <label htmlFor="contact-message">Message</label>
            {errors.message && <em>{errors.message}</em>}
          </div>

          <button className="hc-btn wide" onClick={handleSubmit}>
            Send message
          </button>
        </div>
      )}

      <div className="hc-info">
        {contactDetails.map((detail, index) => (
          <div
            key={detail.title}
            className="hc-card hc-lift row"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span className="hc-emoji sm">
              <i className={detail?.icon}></i>
            </span>
            <div>
              <small>{detail.title}</small>
              <strong>{detail.value}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- main component ----------

export default function HelpConnect() {
  const [activeTab, setActiveTab] = useState("ai");
  const activeIndex = sections.findIndex((section) => section.id === activeTab);

  return (
    <section className="hc" id="help-connect">
      <header className="hc-hero">
        <h2>Help &amp; Connect</h2>
        <p>Ask a question, learn about us, or tell us how we're doing. We're here to help.</p>
      </header>

      <nav className="hc-tabs" role="tablist">
        {/* the green pill slides under whichever tab is active */}
        <span className="hc-pill" style={{ transform: `translateX(${activeIndex * 100}%)` }} />

        {sections.map((section) => (
          <button
            key={section.id}
            role="tab"
            aria-selected={activeTab === section.id}
            className={activeTab === section.id ? "active" : ""}
            onClick={() => setActiveTab(section.id)}
          >
            <span>{section.icon}</span> <b>{section.label}</b>
          </button>
        ))}
      </nav>

      {/* key={activeTab} remounts the panel so the fade-in plays on every switch */}
      <div className={`hc-panel ${activeTab === "ai" ? "dark" : ""}`} key={activeTab}>
        {activeTab === "ai" && <AssistantPanel />}
        {activeTab === "about" && <AboutPanel />}
        {activeTab === "feedback" && <FeedbackPanel />}
        {activeTab === "contact" && <ContactPanel />}
      </div>
    </section>
  );
}