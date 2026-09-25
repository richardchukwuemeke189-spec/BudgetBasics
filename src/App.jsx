import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import ExpensePlanner from "./Components/Expenseplanner";
import BackToTop from "./Components/Backtotop";
import BudgetingBasics from "./Components/Budgetingbasics";
import NeedsVsWants from "./Components/NeedsVSWants";
import BudgetCalculator from "./Components/BudgetCalculator";
import SavingsGoals from "./Components/SavingsGoals";
import MoneyMistakes from "./Components/MoneyMistakes";
import Gallery from "./Components/Infographicsgallery";
import HelpConnect from "./Components/helpConnect";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
        <BudgetingBasics />
        <NeedsVsWants />
        <BudgetCalculator />
        <SavingsGoals />
        <ExpensePlanner monthlyIncome={100000} />
        <MoneyMistakes />
        <Gallery />
        <HelpConnect />
      </main>
      <BackToTop />
    </>
  );
}