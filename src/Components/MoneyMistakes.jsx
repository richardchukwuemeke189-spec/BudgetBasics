import React, { useState } from 'react';
import mistakes from './moneyMistakesData.json';
import './moneyMistakes.css';

const MoneyMistakes = () => {

  const [activeId, setActiveId] = useState(null);

  const handleToggle = (id) => {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
    }
  };

  return (
    <section className="money-mistakes" id='money-mistakes'>

      <div className="container">

        {/* Header */}
        <div className="money-mistakes-header">

          <h2>Money Mistakes</h2>

          <p>
            Learn about common money mistakes and how to avoid them.
          </p>

        </div>


        {/* Money Mistakes List */}
        <div className="mistakes-list">

          {mistakes.map((mistake) => {

            const isOpen = activeId === mistake.id;

            return (
              <div
                className={`mistake-card ${
                  isOpen ? 'mistake-card-active' : ''
                }`}
                key={mistake.id}
              >

                {/* Card Header */}
                <button
                  type="button"
                  className="mistake-header"
                  onClick={() => handleToggle(mistake.id)}
                  aria-expanded={isOpen}
                >

                  <div className="mistake-title-area">

                    <div className="mistake-icon">
                      {mistake.icon}
                    </div>

                    <div className="mistake-heading">

                      <h4>
                        {mistake.title}
                      </h4>

                      <p>
                        {mistake.description}
                      </p>

                    </div>

                  </div>


                  <span className="mistake-arrow">
                    {isOpen ? '−' : '+'}
                  </span>

                </button>


                {/* Expandable Content */}
                {isOpen && (

                  <div className="mistake-content">

                    <div className="mistake-section">

                      <h4>
                        Student Scenario
                      </h4>

                      <p>
                        {mistake.scenario}
                      </p>

                    </div>


                    <div className="mistake-action">

                      <h2>
                        What to do instead
                      </h2>

                      <p>
                        {mistake.action}
                      </p>

                    </div>

                  </div>

                )}

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default MoneyMistakes;