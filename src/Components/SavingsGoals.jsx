import React, { useState } from 'react';
import './savingGoals.css';

const SavingsGoals = () => {
  const [goalName, setGoalName] = useState('Laptop');
  const [targetAmount, setTargetAmount] = useState('500000');
  const [currentSavings, setCurrentSavings] = useState('100000');
  const [monthlyContribution, setMonthlyContribution] = useState('50000');

  const [monthsNeeded, setMonthsNeeded] = useState(8);
  const [progress, setProgress] = useState(20);

  const [error, setError] = useState('');

  const handleCalculate = (e) => {
    e.preventDefault();

    const target = parseFloat(targetAmount);
    const savings = parseFloat(currentSavings);
    const contribution = parseFloat(monthlyContribution);

    if (
      !goalName.trim() ||
      isNaN(target) ||
      isNaN(savings) ||
      isNaN(contribution)
    ) {
      setError('Please fill in all fields.');
      return;
    }

    if (target <= 0) {
      setError('Target amount must be greater than zero.');
      return;
    }

    if (savings < 0 || contribution < 0) {
      setError('Amounts cannot be negative.');
      return;
    }

    if (savings >= target) {
      setMonthsNeeded(0);
      setProgress(100);
      setError('');
      return;
    }

    if (contribution <= 0) {
      setError('Monthly contribution must be greater than zero.');
      return;
    }

    const remainingAmount = target - savings;

    const months = Math.ceil(
      remainingAmount / contribution
    );

    const progressPercentage = Math.min(
      (savings / target) * 100,
      100
    );

    setMonthsNeeded(months);
    setProgress(progressPercentage);
    setError('');
  };

  const formattedSavings = Number(
    currentSavings || 0
  ).toLocaleString();

  const formattedTarget = Number(
    targetAmount || 0
  ).toLocaleString();

  return (
    <div className="savings_page" id='savings-goals'>

      <div className="container savings_container">

        {/* Header */}
        <div className="savings_header">
          <h1>Savings Goals</h1>

          <p>
            Set a goal. Track your progress. Reach your dreams.
          </p>
        </div>


        <div className="row g-4">

          {/* Left side - form */}

          <div className="col-12 col-lg-6">

            <div className="savings_card">

              <form onSubmit={handleCalculate}>

                {/* Goal Name */}
                <div className="savings_field">

                  <label htmlFor="goal-name">
                    Goal Name
                  </label>

                  <input
                    id="goal-name"
                    type="text"
                    className="form-control savings-input"
                    value={goalName}
                    onChange={(e) =>
                      setGoalName(e.target.value)
                    }
                    placeholder="e.g. Laptop"
                  />

                </div>


                {/* Target Amount */}
                <div className="savings_field">

                  <label htmlFor="target-amount">
                    Target Amount (₦)
                  </label>

                  <input
                    id="target-amount"
                    type="number"
                    className="form-control savings-input"
                    value={targetAmount}
                    onChange={(e) =>
                      setTargetAmount(e.target.value)
                    }
                    placeholder="500000"
                  />

                </div>


                {/* Current Savings */}
                <div className="savings_field">

                  <label htmlFor="current-savings">
                    Current Savings (₦)
                  </label>

                  <input
                    id="current-savings"
                    type="number"
                    className="form-control savings-input"
                    value={currentSavings}
                    onChange={(e) =>
                      setCurrentSavings(e.target.value)
                    }
                    placeholder="100000"
                  />

                </div>


                {/* Monthly Contribution */}
                <div className="savings_field">

                  <label htmlFor="monthly-contribution">
                    Monthly Contribution (₦)
                  </label>

                  <input
                    id="monthly-contribution"
                    type="number"
                    className="form-control savings-input"
                    value={monthlyContribution}
                    onChange={(e) =>
                      setMonthlyContribution(e.target.value)
                    }
                    placeholder="50000"
                  />

                </div>


                {/* Calculate Button */}
                <button
                  type="submit"
                  className="btn savings-button w-100"
                >
                  Calculate
                </button>


                {/* Error */}
                {error && (
                  <p className="savings-error">
                    {error}
                  </p>
                )}

              </form>

            </div>

          </div>


          {/* Right side - result */}

          <div className="col-12 col-lg-6">

            <div className="savings_card result-card">

              {/* Months */}
              <div className="result-heading">
                <p>You'll need</p>

                <div className="months-result">

                  <strong>
                    {monthsNeeded}
                  </strong>

                  <span>
                    months
                  </span>

                </div>

                <p className="result-subtitle">
                  to reach your goal
                </p>

              </div>


              {/* Progress Bar */}
              <div className="progress-area">

                <div className="progress savings-progress">

                  <div
                    className="progress-bar savings-progress-bar"
                    role="progressbar"
                    style={{
                      width: `${progress}%`
                    }}
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                  </div>

                </div>

                <div className="progress-percentage">
                  {Math.round(progress)}%
                </div>

              </div>


              {/* Progress Heading */}
              <div className="progress-info">

                <strong>
                  Progress
                </strong>

                <span>
                  ₦{formattedSavings} / ₦{formattedTarget}
                </span>

              </div>


              {/* Encouragement */}
              <div className="encouragement">

                <div className="trophy">
                  🏆
                </div>

                <div>
                  <strong>
                    Keep going!
                  </strong>

                  <span>
                    You're closer than you think.
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SavingsGoals;