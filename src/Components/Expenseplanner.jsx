import React, { useMemo, useState } from "react";
import "./tokens.css";
import "./animations.css";
import "./ExpensePlanner.css";
import { IconEdit, IconTrash, IconPlus } from "./Icons.jsx";
import { useLocalStorageState } from "./Uselocalstoragestate.js";
import { useScrollReveal } from "./Usescrollreveal.js";

const CATEGORIES = [
  "Food",
  "Transport",
  "School",
  "Entertainment",
  "Other",
];

const EMPTY_DRAFT = {
  date: "",
  category: CATEGORIES[0],
  description: "",
  amount: "",
};

function formatNaira(amount) {
  return `₦${Number(amount || 0).toLocaleString()}`;
}

export default function ExpensePlanner() {
  // Initialize expenses as an empty array to prevent undefined errors.
  const [expenses, setExpenses] = useLocalStorageState(
    "bb_expenses",
    []
  );

  const [monthlyIncome, setMonthlyIncome] = useLocalStorageState(
    "bb_monthly_income",
    ""
  );

  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [editingId, setEditingId] = useState(null);

  const formRef = React.useRef(null);
  const [sectionRef, sectionVisible] = useScrollReveal();

  // Ensure expenses is always treated as an array.
  const safeExpenses = Array.isArray(expenses) ? expenses : [];

  // Calculate total expenses.
  const totalExpenses = useMemo(
    () =>
      safeExpenses.reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0
      ),
    [safeExpenses]
  );

  // Calculate remaining balance.
  const remainingBalance =
    Number(monthlyIncome || 0) - totalExpenses;

  // Reset the form.
  const resetDraft = () => {
    setDraft({ ...EMPTY_DRAFT });
    setEditingId(null);
  };

  // Handle Add Expense button.
  const handleAddClick = () => {
    resetDraft();

    formRef.current
      ?.querySelector("input")
      ?.focus();

    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  // Save a new expense or update an existing one.
  const handleSave = () => {
    if (
      !draft.date ||
      !draft.description.trim() ||
      draft.amount === "" ||
      Number(draft.amount) <= 0
    ) {
      alert("Please fill in all fields with a valid amount.");
      return;
    }

    if (editingId !== null) {
      setExpenses((prev) =>
        (Array.isArray(prev) ? prev : []).map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...draft,
                description: draft.description.trim(),
                amount: Number(draft.amount),
              }
            : item
        )
      );
    } else {
      setExpenses((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        {
          id: Date.now(),
          ...draft,
          description: draft.description.trim(),
          amount: Number(draft.amount),
        },
      ]);
    }

    resetDraft();
  };

  // Load an expense into the form for editing.
  const handleEdit = (expense) => {
    setEditingId(expense.id);

    setDraft({
      date: expense.date,
      category: expense.category,
      description: expense.description,
      amount: String(expense.amount),
    });

    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  // Delete an expense.
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmed) return;

    setExpenses((prev) =>
      (Array.isArray(prev) ? prev : []).filter(
        (item) => item.id !== id
      )
    );

    if (editingId === id) {
      resetDraft();
    }
  };

  return (
    <section
      id="expense-planner"
      ref={sectionRef}
      className={`expense-planner bb-reveal ${
        sectionVisible ? "is-visible" : ""
      }`}
    >
      {/* Header */}
      <div className="expense-planner-header">
        <div>
          <h2>Expense Planner</h2>
          <p>
            Add, edit or remove your expenses. Everything here is
            saved to this device.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddClick}
        >
          <IconPlus width={16} height={16} />
          Add Expense
        </button>
      </div>

      {/* Monthly Income */}
      <div className="expense-planner-income-card">
        <label>
          <span>Your Monthly Income (₦)</span>

          <input
            type="number"
            placeholder="Enter your monthly income"
            value={monthlyIncome}
            min="0"
            onChange={(e) => {
              const value = e.target.value;

              if (value === "" || Number(value) >= 0) {
                setMonthlyIncome(value);
              }
            }}
            style={{
              borderRadius: 5,
              border: "none",
            }}
          />
        </label>

        <p className="expense-planner-income-hint">
          Used to work out your remaining balance below. Saved to
          this device.
        </p>
      </div>

      {/* Expense Form */}
      <div
        className="expense-planner-form-card"
        ref={formRef}
      >
        {editingId !== null && (
          <p className="expense-planner-editing-tag">
            Editing expense
          </p>
        )}

        <div className="expense-planner-form">
          {/* Date */}
          <label>
            <span>Date</span>

            <input
              type="date"
              value={draft.date}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  date: e.target.value,
                })
              }
            />
          </label>

          {/* Category */}
          <label>
            <span>Category</span>

            <select
              value={draft.category}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  category: e.target.value,
                })
              }
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          {/* Description */}
          <label className="expense-planner-field-wide">
            <span>Description</span>

            <input
              type="text"
              placeholder="e.g. Lunch, bus fare, textbooks"
              value={draft.description}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  description: e.target.value,
                })
              }
            />
          </label>

          {/* Amount */}
          <label>
            <span>Amount (₦)</span>

            <input
              type="number"
              placeholder="0"
              min="0"
              value={draft.amount}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  amount: e.target.value,
                })
              }
            />
          </label>

          {/* Form Actions */}
          <div className="expense-planner-form-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              {editingId !== null ? "Update" : "Add"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetDraft}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="expense-planner-table-wrap">
        <table className="expense-planner-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount (₦)</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {safeExpenses.map((expense) => (
              <tr
                key={expense.id}
                className={`expense-row ${
                  editingId === expense.id ? "is-editing" : ""
                }`}
              >
                <td>{expense.date}</td>

                <td>
                  <span className="expense-planner-category-tag">
                    {expense.category}
                  </span>
                </td>

                <td>{expense.description}</td>

                <td className="expense-planner-amount">
                  {formatNaira(expense.amount)}
                </td>

                <td className="expense-planner-actions">
                  <button
                    type="button"
                    aria-label="Edit expense"
                    onClick={() => handleEdit(expense)}
                  >
                    <IconEdit width={16} height={16} />
                  </button>

                  <button
                    type="button"
                    aria-label="Delete expense"
                    className="is-danger"
                    onClick={() => handleDelete(expense.id)}
                  >
                    <IconTrash width={16} height={16} />
                  </button>
                </td>
              </tr>
            ))}

            {safeExpenses.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="expense-planner-empty"
                >
                  No expenses yet — add one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="expense-planner-summary">
        <div className="summary-card summary-card-expenses">
          <span>Total Expenses</span>

          <strong key={totalExpenses}>
            {formatNaira(totalExpenses)}
          </strong>
        </div>

        <div className="summary-card summary-card-balance">
          <span>Remaining Balance</span>

          <strong key={remainingBalance}>
            {formatNaira(remainingBalance)}
          </strong>
        </div>
      </div>
    </section>
  );
}