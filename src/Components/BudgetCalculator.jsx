import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './budgetCalculator.css';

const BudgetCalculator = () => {
  const [incomeInput, setIncomeInput] = useState('120000');
  const [income, setIncome] = useState(120000);
  const [error, setError] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  // Helper function to validate and update income
  const updateIncome = (inputValue) => {
    // Strip non-numeric characters except decimal points
    const sanitizedValue = inputValue.replace(/[^0-9.]/g, '');
    setIncomeInput(sanitizedValue);

    const numValue = parseFloat(sanitizedValue);

    if (inputValue.trim() === '') {
      setError('Please enter an amount.');
      setIncome(0);
    } else if (isNaN(numValue) || numValue <= 0) {
      setError('Please enter a valid positive amount.');
      setIncome(0);
    } else {
      setError('');
      setIncome(numValue);
    }
  };

  const handleInputChange = (e) => {
    updateIncome(e.target.value);
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    updateIncome(incomeInput);
  };

  // Calculation logic unchanged
  const needs = income * 0.50;
  const wants = income * 0.30;
  const savings = income * 0.20;

  const data = [
    {
      name: 'Needs',
      value: needs,
      percentage: 50,
      color: '#3B85DB'
    },
    {
      name: 'Wants',
      value: wants,
      percentage: 30,
      color: '#F6A07A'
    },
    {
      name: 'Savings',
      value: savings,
      percentage: 20,
      color: '#0EAE81'
    }
  ];

  // Guard activeIndex in case data/selection slips out of bounds
  const activeData = data[activeIndex] || data[0];

  return (
    <div className="budget_calculator_page" id='calculator'>
      
      {/* Header */}
      <div className="container budget_calculator_container">

        <div className="budget_calculator_header">
          <h1>The 50/30/20 Rule</h1>

          <p>
            A simple way to split your income for a balanced life.
          </p>
        </div>

        {/* Main Grid */}
        <div className="row g-4">

          {/* Left Column: Form Card */}
          <div className="col-12 col-lg-4">

            <div className="budget_calculator_card income-card">

              <form onSubmit={handleCalculate}>

                <label
                  htmlFor="monthly-income"
                  className="budget-label"
                >
                  Your Monthly Income
                </label>

                <div className="income-input-wrapper">

                  <span className="currency-symbol">
                    ₦
                  </span>

                  <input
                    id="monthly-income"
                    type="text"
                    inputMode="decimal"
                    value={incomeInput}
                    onChange={handleInputChange}
                    placeholder="0"
                    className={`form-control budget-input ${
                      error ? 'budget-input-error' : ''
                    }`}
                  />

                </div>

                <button
                  type="submit"
                  className="btn budget-button w-100"
                >
                  Calculate
                </button>

                {error && (
                  <p className="budget-error">
                    {error}
                  </p>
                )}

              </form>

            </div>

          </div>

          {/* Right Column: Chart & Breakdown */}
          <div className="col-12 col-lg-8">

            <div className="budget_calculator_card chart-card">

              <div className="row align-items-center g-4">

                {/* Donut Chart */}
                <div className="col-12 col-md-6">

                  <div className="chart-wrapper">

                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >
                      <PieChart>

                        <Pie
                          data={data}
                          cx="50%"
                          cy="50%"
                          innerRadius={65}
                          outerRadius={95}
                          paddingAngle={2}
                          dataKey="value"
                          onClick={(_, index) =>
                            setActiveIndex(index)
                          }
                        >

                          {data.map((entry) => (
                            <Cell
                              key={`cell-${entry.name}`}
                              fill={entry.color}
                              className="chart-cell"
                            />
                          ))}

                        </Pie>

                      </PieChart>
                    </ResponsiveContainer>

                    {/* Center Text */}
                    <div className="chart-center-text">

                      <span className="chart-percentage">
                        {activeData.percentage}%
                      </span>

                      <span className="chart-name">
                        {activeData.name}
                      </span>

                    </div>

                  </div>

                </div>

                {/* Breakdown List */}
                <div className="col-12 col-md-6">

                  <div className="breakdown-list">

                    {data.map((item, index) => (

                      <div
                        key={item.name}
                        onClick={() => setActiveIndex(index)}
                        className={`breakdown-item ${
                          activeIndex === index
                            ? 'breakdown-active'
                            : ''
                        }`}
                      >

                        <div className="breakdown-name">

                          <span
                            className="breakdown-dot"
                            style={{
                              backgroundColor: item.color
                            }}
                          />

                          <span>
                            {item.name}
                          </span>

                        </div>

                        <div className="breakdown-values">

                          <span className="breakdown-percentage">
                            {item.percentage}%
                          </span>

                          <span className="breakdown-amount">
                            ₦
                            {item.value.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2
                              }
                            )}
                          </span>

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

              {/* Footer Note */}
              <p className="budget-note">
                This is an educational estimate. Your actual
                percentages may vary.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default BudgetCalculator;