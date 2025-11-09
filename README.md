## Flowbit Internship Assignment — Analytics Dashboard & “Chat with Data”

This repository contains my submission for the Flowbit Full-Stack Internship Challenge.
It implements Task 1 (Interactive Analytics Dashboard) and provides the foundation for Task 2 (Chat with Data) integration.

### 🎯 Objective

Build a production-grade full-stack web application consisting of two primary modules:

Interactive Analytics Dashboard – Data-driven, pixel-accurate recreation of the provided Figma design.

“Chat with Data” Interface – (Work-in-progress / foundation implemented) enabling natural-language analytics on the same dataset via a self-hosted AI service.

This project demonstrates end-to-end ownership of:

Full-stack architecture & deployment

Database design & backend APIs

Frontend accuracy using Next.js + Tailwind + shadcn/ui

AI readiness for natural language reasoning with real data

Clean documentation, modular structure, and production-quality code

### 🧩 Dataset

📁 Analytics_Test_Data.json — provided as part of the assignment.
This JSON contains real-world invoice and vendor data with nested structures like:

Vendors

Customers

Line items

Payments

The dataset was normalized into structured relational tables in PostgreSQL, maintaining proper referential integrity and data types.

### 🧱 Architecture Overview

This project follows a monorepo architecture using Turborepo, containing:

/apps
   /web   → Next.js frontend (Dashboard UI)
   /api   → Node.js backend (APIs + DB layer)
/data
   Analytics_Test_Data.json

🖥️ Frontend (apps/web)
Stack

Framework: Next.js (App Router)

Language: TypeScript

UI Library: shadcn/ui + TailwindCSS

Charts: Recharts

State Management: React Hooks

Key Features

 ✅ Dashboard Overview Cards

Total Spend (YTD)

Total Invoices Processed

Documents Uploaded

Average Invoice Value

 ✅ Dynamic Charts

Invoice Volume & Value (Line Chart)

Spend by Vendor (Bar Chart)

Spend by Category (Pie Chart)

Cash Outflow Forecast (Bar Chart)

 ✅ Invoices Table

Searchable, sortable, scrollable

Displays vendor, date, invoice number, amount, and status

Connected to /invoices API endpoint

 ✅ Responsive Design

Fully responsive and pixel-perfect to the provided Figma design.

### ⚙️ Backend (apps/api)
Stack

Runtime: Node.js (TypeScript)

Framework: Express.js

Database: PostgreSQL

ORM: Prisma

APIs: REST Endpoints

Endpoints Implemented
Endpoint	Method	Description
/stats	GET	Returns totals for overview cards
/invoice-trends	GET	Returns monthly invoice count & spend
/vendors/top10	GET	Returns top 10 vendors by spend
/category-spend	GET	Returns spend grouped by category
/cash-outflow	GET	Returns expected cash outflow by date
/invoices	GET	Returns invoice list (filter/search supported)
🧠 AI Integration — “Chat with Data” (Planned)

This module enables natural-language analytics using Vanna AI and Groq LLM.

Goal:
Allow users to ask questions such as:

“What’s the total spend in the last 90 days?”
“List top 5 vendors by spend.”
“Show overdue invoices as of today.”

Architecture Flow:
Frontend → /chat-with-data API → Vanna AI (Python) → Groq (SQL generation) → PostgreSQL → Results → Frontend

The backend is designed to easily extend and integrate with this pipeline.

## 🗄️ Database Design

Normalized into the following tables:

vendors

customers

invoices

payments

line_items

Each table includes primary keys, foreign keys, and proper data types.
The Prisma schema is configured to enforce referential integrity and allow efficient queries.

## ☁️ Deployment

Frontend + Backend: Hosted on Vercel

Database: PostgreSQL (Local / Docker / Cloud)

AI Service (Planned): To be hosted on Render / Railway / DigitalOcean

Ensure CORS is enabled for Vercel domain access.

⚙️ Environment Variables
## Frontend
NEXT_PUBLIC_API_BASE=/api
NEXT_PUBLIC_APP_URL=https://<your-app>.vercel.app

## Backend
DATABASE_URL=postgresql://user:pass@host:5432/flowbit
VANNA_API_BASE_URL=https://<your-vanna-host>
VANNA_API_KEY=<if used>

## Vanna AI (Python)
DATABASE_URL=postgresql+psycopg://user:pass@host:5432/flowbit
GROQ_API_KEY=...
PORT=8000

📈 Future Enhancements

🔹 Integrate the “Chat with Data” interface with Vanna AI and Groq
🔹 Add user authentication and role-based data views
🔹 Implement persistent chat history
🔹 Add CSV / Excel export for analytics data
🔹 Dockerize for easier deployment

🧑‍💻 Author

Meetali Dangi
