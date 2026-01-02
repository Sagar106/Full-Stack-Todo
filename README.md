🧠 AI Todo App — Full-Stack MERN Application

An intelligent Full-Stack Todo Management App built with React + Redux Toolkit, Node.js + Express, and MongoDB Atlas, enhanced with AI-powered input parsing using the Perplexity API.
Deployed on Azure App Service (backend) and Azure Static Web App (frontend).

🚀 Features

✅ Authentication System – Secure login & registration using JWT
✅ Smart Todo Management – Create, update, delete, and search todos
✅ AI-Powered Todo Creation – Type natural language like

“Remind me to call John tomorrow at 5 PM”
and the AI converts it into structured title & due date
✅ Search & Filter Todos – Includes debounce + memoization for smooth search
✅ Responsive UI – Built with modern React design & smooth shimmer loading
✅ Role-Based Protected Routes – Users only access their own data
✅ Clean Architecture – Separate controllers, routes, and services
✅ Deployed on Azure – End-to-end CI/CD with GitHub Actions

🧩 Tech Stack
🖥️ Frontend

- React 19 with Vite
- Redux Toolkit for state management
- React Router DOM for navigation
- React Icons for UI elements
- CSS Modules for styling
- Axios for API calls
- Debounced Search + useMemo Optimization
- Deployed on Azure Static Web Apps

⚙️ Backend

- Node.js + Express.js (ES Modules)
- MongoDB Atlas with Mongoose ORM
- JWT Authentication
- Bcrypt.js for password hashing
- Helmet, Cors, Rate Limiting for security

Perplexity AI Integration via API for natural language todo creation

Deployed on Azure App Service

🧠 AI Integration (Perplexity API)

AI parses natural text into structured todo data.

Example Input:
"Doctor appointment next Monday at 5 PM"

AI Output:
{
  "title": "Doctor appointment",
  "dueDate": "2025-11-10",
}

🧠 Security & Best Practices

- JWT Authentication stored client-side (not in cookies)
- Rate limiting to prevent brute-force attacks
- CORS restrictions allow only frontend origin
- Helmet & CSP headers to prevent XSS attacks
- Environment variables hidden via Azure configuration