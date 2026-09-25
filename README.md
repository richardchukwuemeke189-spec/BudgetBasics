# BUDGETBASICS

### Personal Budgeting Education and Planning Platform

**Aptech TechWiz7 Competition**
**Category: Web Innovation Unleashed**

---

## 1. Project Overview

BudgetBasics is a web-based educational platform created to help students understand basic personal budgeting.

The project focuses on simple and practical topics such as budgeting, needs and wants, saving, expenses, and common money mistakes. It combines learning materials with interactive tools so users can learn a concept and practice it immediately.

BudgetBasics is strictly an **educational platform**. It does not connect to bank accounts, process payments, store financial transactions, or provide professional financial advice.

---

## 2. Problem Statement

Many students receive allowances or other forms of income but may not know how to properly plan their money.

Some common problems include:

* Not knowing the difference between needs and wants.
* Spending without a plan.
* Difficulty setting savings goals.
* Not knowing how to divide income.
* Losing track of expenses.
* Making common budgeting mistakes.

BudgetBasics was created to provide students with a simple way to learn and practice these basic skills.

---

## 3. Proposed Solution

BudgetBasics provides educational content and interactive tools in one platform.

The main areas of the website are:

* **Learn** — budgeting lessons and explanations.
* **Practice** — interactive budgeting and savings tools.
* **Explore** — infographics and educational resources.
* **Get Help** — a rule-based budgeting assistant and project information.

The application works entirely on the client side, so no backend or database is required.

---

## 4. Project Objectives

The project was developed to:

* Teach students the basics of personal budgeting.
* Help users understand needs versus wants.
* Demonstrate the 50/30/20 budgeting method.
* Help users understand how savings goals work.
* Allow users to plan sample expenses.
* Explain common money mistakes.
* Provide simple visual learning materials.
* Make budgeting easier to understand through interactive features.
* Provide a responsive experience across desktop, tablet, and mobile devices.

---

## 5. Requirements Implemented

The following requirements from the SRS were implemented in the project.

### Budgeting Basics

Users can learn about:

* Income
* Expenses
* Needs
* Wants
* Savings
* Basic budgeting

The section uses simple explanations, cards, examples, and learning content.

### Needs vs. Wants

Users can classify different items as either a need or a want and receive feedback based on their selection.

### 50/30/20 Calculator

Users can enter an income amount and see an educational breakdown of:

* 50% Needs
* 30% Wants
* 20% Savings

The results are presented visually using charts/progress indicators.

### Savings Goals

Users can enter:

* Savings target
* Current savings
* Monthly contribution

The system calculates the estimated time required to reach the target and displays progress toward the goal.

### Expense Planner

Users can add, edit, and remove sample expenses.

Each expense can contain:

* Date
* Category
* Description
* Amount

The system calculates the total expenses and remaining balance.

The expense information is temporary and is not permanently stored.

### Money Mistakes

Common budgeting mistakes are presented with explanations, examples, and suggested ways to avoid them.

### Infographics and Resources

The website contains visual educational resources that can be explored by topic.

### Search and Filtering

Users can search for learning content and filter information based on available categories.

A message is shown when no matching content is found.

### Budgeting Assistant

The website includes a simple rule-based assistant that responds to predefined budgeting questions.

It does not connect to an external AI service. Responses are based on predefined content and keyword matching.

### Feedback and Contact

Feedback and contact forms include client-side validation. No information is sent to or permanently stored in a backend.

### Responsive Design

The website was designed to work across:

* Desktop
* Tablet
* Mobile

---

## 6. Technology Used

The project was developed using:

* **HTML5** — page structure
* **CSS3** — styling and responsive design
* **JavaScript** — application logic and calculations
* **React** — frontend and component structure
* **Recharts** — charts and data visualization
* **Lucide React** — interface icons
* **JSON data** — static educational content where required

### Development Tools

* Visual Studio Code
* Figma
* Google Lighthouse
* Modern web browsers

No backend, database, Firebase, authentication system, or payment service was used.

---

## 7. UI/UX Design

The BudgetBasics interface was designed in Figma before implementation. The design focused on:

* Simple navigation
* Clear typography
* Consistent colors
* Easy-to-understand layouts
* Responsive design
* Accessible interactive elements
* Clear visual hierarchy

### Figma UI/UX Design

**Figma Design Link:**
**[PASTE YOUR FIGMA LINK HERE]**

The Figma file contains the main UI/UX designs and visual references used during development.

---

## 8. System Flowchart

The system flowchart shows how users move through the main areas of BudgetBasics, from the landing page to the learning, practice, resources, and assistant sections.

### Flowchart Design

**Flowchart Link:**
**https://www.figma.com/board/q5yaOmm9WbRpiJCRywgK9X/BudgetBasics-Sitemap?node-id=0-1&t=ECB4ncmT2f1uelT9-1
**

---

## 9. System Architecture

BudgetBasics uses a client-side architecture:

**User → React Interface → Components → JavaScript Logic → Browser**

The application does not require a backend server or database.

Calculations and interactive features are processed directly in the user's browser.

---

## 10. Privacy and Safety

BudgetBasics is an educational application and not a financial service.

The project does not:

* Connect to bank accounts.
* Process payments.
* Store transaction records.
* Request banking credentials.
* Provide investment services.
* Permanently store users' financial information.

All calculators and planning tools are intended for educational purposes.

---

## 11. Testing

The main functionality was tested using normal and invalid inputs.

Testing covered:

* Navigation
* Calculators
* Savings goals
* Expense planning
* Needs vs. Wants
* Search and filtering
* Assistant responses
* Form validation
* Responsive layouts
* Invalid input handling

Google Lighthouse can also be used to check the website's:

* Performance
* Accessibility
* Best Practices
* SEO

---

## 12. AI Usage

AI tools were used during development as assistants for brainstorming, design ideas, debugging, understanding technical concepts, and documentation.

The final project was reviewed and adapted by the development team. AI-generated code was not submitted as unmodified project work.

The team is responsible for understanding and explaining the final implementation.

---

## 13. Project Deliverables

The project submission includes:

* Working BudgetBasics website
* Project documentation
* ReadMe document
* JSON/TXT data files where required
* Project UI/UX design
* System flowchart
* Demonstration video

### Project Links

**Live Website:**
[PASTE LINK HERE]

**Figma UI/UX Design:**
[PASTE LINK HERE]

**Flowchart:**
[PASTE LINK HERE]

**Demo Video:**
[PASTE LINK HERE]

**GitHub/Project Repository:**
[PASTE LINK HERE]

---

## 14. Conclusion

BudgetBasics was created to make personal budgeting easier for students to understand and practice.

The project combines educational content with interactive tools such as the 50/30/20 calculator, savings goal planner, expense planner, needs-versus-wants activity, educational resources, and budgeting assistant.

The application meets the main requirements defined in the SRS while keeping the system simple, responsive, and focused on financial education rather than real financial transactions.