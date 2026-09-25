import React, { useState } from 'react';
import './NeedsVsWants.css';

const INITIAL_ITEMS = [
  { id: 1, name: 'Laptop', correctCategory: 'Needs', explanation: 'Essential for school/work productivity.' },
  { id: 2, name: 'School supplies', correctCategory: 'Needs', explanation: 'Directly needed for education.' },
  { id: 3, name: 'Netflix', correctCategory: 'Wants', explanation: 'Entertainment subscriptions are optional.' },
  { id: 4, name: 'Groceries', correctCategory: 'Needs', explanation: 'Basic nutrition is a vital requirement.' },
  { id: 5, name: 'Designer bag', correctCategory: 'Wants', explanation: 'A luxury version of a functional item.' },
  { id: 6, name: 'Bus fare', correctCategory: 'Needs', explanation: 'Necessary for daily transit.' }
];

export default function NeedsVsWants() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [needs, setNeeds] = useState([]);
  const [wants, setWants] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const [guideStep, setGuideStep] = useState(1);

  const handleItemClick = (item) => {
    if (activeItem?.id === item.id) {
      setActiveItem(null);
    } else {
      setActiveItem(item);
    }
  };

  const handleClassify = (targetCategory) => {
    if (!activeItem) return;

    const isCorrect = activeItem.correctCategory === targetCategory;

    setFeedback({
      name: activeItem.name,
      category: targetCategory,
      isCorrect,
      explanation: activeItem.explanation
    });

    if (targetCategory === 'Needs') {
      setNeeds((prev) => [...prev, activeItem]);
    } else {
      setWants((prev) => [...prev, activeItem]);
    }

    setItems((prev) => prev.filter((i) => i.id !== activeItem.id));
    setActiveItem(null);
  };

  const handleReset = () => {
    setItems(INITIAL_ITEMS);
    setNeeds([]);
    setWants([]);
    setFeedback(null);
    setActiveItem(null);
  };

  const totalClassified = needs.length + wants.length;
  const correctCount =
    needs.filter((i) => i.correctCategory === 'Needs').length +
    wants.filter((i) => i.correctCategory === 'Wants').length;

  return (
    <div className="container-fluid min-vh-100 p-4 p-md-5 bg-light-blue" id='needs-vs-wants'>
      <div className="max-w-6xl mx-auto">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fw-bold text-navy mb-1 fs-2">Needs vs. Wants</h1>
            <p className="text-secondary mb-0 fs-6">
              Learn to tell the difference and make smarter choices.
            </p>
          </div>
          <button
            className="btn btn-outline-primary px-3 py-2 rounded-3 fw-semibold shadow-sm"
            onClick={() => {
              setShowGuide(true);
              setGuideStep(1);
            }}
          >
            💡 Delay Purchase Guide
          </button>
        </div>

        <div className="row g-4 align-items-start">
          <div className="col-12 col-lg-8">
            <div className="bg-white rounded-4 p-4 shadow-sm">
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <div className="bg-green-light rounded-4 p-3 border border-green-subtle h-100">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <span className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center icon-badge">
                        🌱
                      </span>
                      <h2 className="fs-5 fw-bold text-success m-0">Needs</h2>
                    </div>
                    <ul className="list-unstyled mb-0 d-flex flex-column gap-2 text-dark fs-6">
                      <li className="d-flex align-items-center gap-2"><span className="check-icon text-success">✓</span> Food</li>
                      <li className="d-flex align-items-center gap-2"><span className="check-icon text-success">✓</span> Shelter</li>
                      <li className="d-flex align-items-center gap-2"><span className="check-icon text-success">✓</span> Transportation</li>
                      <li className="d-flex align-items-center gap-2"><span className="check-icon text-success">✓</span> Healthcare</li>
                      <li className="d-flex align-items-center gap-2"><span className="check-icon text-success">✓</span> Education</li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="bg-red-light rounded-4 p-3 border border-red-subtle h-100">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <span className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center icon-badge">
                        🌸
                      </span>
                      <h2 className="fs-5 fw-bold text-danger m-0">Wants</h2>
                    </div>
                    <ul className="list-unstyled mb-0 d-flex flex-column gap-2 text-dark fs-6">
                      <li className="d-flex align-items-center gap-2"><span className="check-icon text-danger">✓</span> New phone</li>
                      <li className="d-flex align-items-center gap-2"><span className="check-icon text-danger">✓</span> Brand clothes</li>
                      <li className="d-flex align-items-center gap-2"><span className="check-icon text-danger">✓</span> Eating out</li>
                      <li className="d-flex align-items-center gap-2"><span className="check-icon text-danger">✓</span> Gaming</li>
                      <li className="d-flex align-items-center gap-2"><span className="check-icon text-danger">✓</span> Travel</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="fs-6 fw-bold text-navy mb-2">Classify the items below:</h3>
              <p className="text-muted small mb-3">Click an item below, then click either Needs or Wants box.</p>

              <div className="d-flex flex-wrap gap-2 mb-4">
                {items.length === 0 ? (
                  <span className="text-muted small">All items classified!</span>
                ) : (
                  items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleItemClick(item)}
                      className={`btn ${
                        activeItem?.id === item.id ? 'btn-primary' : 'btn-outline-secondary'
                      } rounded-3 px-3 py-2 fs-6`}
                    >
                      {item.name}
                    </button>
                  ))
                )}
              </div>

              {feedback && (
                <div
                  className={`alert ${
                    feedback.isCorrect ? 'alert-success' : 'alert-warning'
                  } rounded-3 mb-4 p-3`}
                >
                  <strong>{feedback.name}</strong> -&gt; <strong>{feedback.category}</strong>:{' '}
                  {feedback.explanation}
                </div>
              )}

              <div className="row g-3">
                <div className="col-md-6">
                  <div
                    onClick={() => handleClassify('Needs')}
                    className={`drop-zone border-dashed-green bg-green-light rounded-4 p-4 text-center d-flex flex-column justify-content-between min-h-180 cursor-pointer ${
                      activeItem ? 'active-zone' : ''
                    }`}
                  >
                    <div className="d-flex align-items-center gap-2 text-success fw-bold fs-6">
                      <span>🌱</span> Needs
                    </div>
                    <div className="d-flex flex-wrap gap-2 justify-content-center my-auto">
                      {needs.length === 0 ? (
                        <span className="badge bg-light text-muted border border-light-subtle px-3 py-2 fw-normal fs-6">
                          Click item then click here
                        </span>
                      ) : (
                        needs.map((i) => (
                          <span
                            key={i.id}
                            className={`badge px-3 py-2 rounded-3 fs-6 ${
                              i.correctCategory === 'Needs' ? 'bg-success' : 'bg-danger'
                            }`}
                          >
                            {i.name}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div
                    onClick={() => handleClassify('Wants')}
                    className={`drop-zone border-dashed-red bg-red-light rounded-4 p-4 text-center d-flex flex-column justify-content-between min-h-180 cursor-pointer ${
                      activeItem ? 'active-zone' : ''
                    }`}
                  >
                    <div className="d-flex align-items-center gap-2 text-danger fw-bold fs-6">
                      <span>🌸</span> Wants
                    </div>
                    <div className="d-flex flex-wrap gap-2 justify-content-center my-auto">
                      {wants.length === 0 ? (
                        <span className="badge bg-light text-muted border border-light-subtle px-3 py-2 fw-normal fs-6">
                          Click item then click here
                        </span>
                      ) : (
                        wants.map((i) => (
                          <span
                            key={i.id}
                            className={`badge px-3 py-2 rounded-3 fs-6 ${
                              i.correctCategory === 'Wants' ? 'bg-success' : 'bg-danger'
                            }`}
                          >
                            {i.name}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="bg-teal-light border border-teal-subtle rounded-4 p-4 text-center d-flex flex-column align-items-center justify-content-center min-h-300 shadow-sm">
              <div className="success-icon-wrapper bg-emerald text-white rounded-circle d-flex align-items-center justify-content-center mb-3">
                ✓
              </div>
              <h2 className="fs-3 fw-bold text-navy mb-2">Great job!</h2>
              <p className="text-secondary fs-6 mb-4">
                You classified{' '}
                <strong className="text-dark">
                  {correctCount} out of {totalClassified > 0 ? totalClassified : INITIAL_ITEMS.length}
                </strong>{' '}
                correctly.
              </p>
              <button
                onClick={handleReset}
                className="btn btn-outline-primary px-4 py-2 rounded-3 fw-semibold btn-try-again"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>

        {showGuide && (
          <div className="modal-backdrop-custom d-flex align-items-center justify-content-center">
            <div className="bg-white rounded-4 p-4 max-w-lg w-100 shadow-lg mx-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="fs-5 fw-bold text-navy m-0">🧭 Delay Purchase Decision Guide</h3>
                <button className="btn-close" onClick={() => setShowGuide(false)}></button>
              </div>

              <div className="p-3 bg-light rounded-3 mb-4">
                {guideStep === 1 && (
                  <div>
                    <h4 className="fs-6 fw-bold text-primary">Step 1: Is this a Need or a Want?</h4>
                    <p className="small text-secondary mb-3">
                      Is this essential for survival, basic health, work, or safety?
                    </p>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-success flex-fill" onClick={() => setGuideStep(4)}>
                        It's a Need
                      </button>
                      <button className="btn btn-sm btn-outline-danger flex-fill" onClick={() => setGuideStep(2)}>
                        It's a Want
                      </button>
                    </div>
                  </div>
                )}

                {guideStep === 2 && (
                  <div>
                    <h4 className="fs-6 fw-bold text-primary">Step 2: Apply the 48-Hour Rule</h4>
                    <p className="small text-secondary mb-3">
                      Wait 48 hours before purchasing. Do you still feel you urgently need it?
                    </p>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-secondary flex-fill" onClick={() => setGuideStep(3)}>
                        Yes, still want it
                      </button>
                      <button className="btn btn-sm btn-success flex-fill" onClick={() => setGuideStep(5)}>
                        No, impulse passed
                      </button>
                    </div>
                  </div>
                )}

                {guideStep === 3 && (
                  <div>
                    <h4 className="fs-6 fw-bold text-primary">
                      Step 3: Can you pay cash without sacrificing savings?
                    </h4>
                    <p className="small text-secondary mb-3">
                      Will buying this compromise your emergency fund or monthly budget?
                    </p>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-success flex-fill" onClick={() => setGuideStep(4)}>
                        Fits Budget Comfortably
                      </button>
                      <button className="btn btn-sm btn-danger flex-fill" onClick={() => setGuideStep(5)}>
                        Compromises Budget
                      </button>
                    </div>
                  </div>
                )}

                {guideStep === 4 && (
                  <div className="text-center py-2">
                    <span className="fs-1">🛍️</span>
                    <h4 className="fs-6 fw-bold text-success mt-2">Approved Purchase</h4>
                    <p className="small text-secondary m-0">This purchase aligns with your financial priorities.</p>
                  </div>
                )}

                {guideStep === 5 && (
                  <div className="text-center py-2">
                    <span className="fs-1">🛑</span>
                    <h4 className="fs-6 fw-bold text-danger mt-2">Delay or Skip Purchase</h4>
                    <p className="small text-secondary m-0">Skipping non-essentials builds your emergency fund faster!</p>
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-between">
                <button className="btn btn-sm btn-secondary" onClick={() => setGuideStep(1)}>
                  Start Over
                </button>
                <button className="btn btn-sm btn-primary" onClick={() => setShowGuide(false)}>
                  Close Guide
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}