# DuniaPetCare

This guide will help you set up and run the DuniaPetCare project.

## Prerequisites
Make sure you have the following installed on your system:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (if required for backend)

---

## Steps to Run the Project

### 1. Clone the Repository
```bash
git clone https://github.com/naylafauziah/project-duniapetcare.git
cd duniapetcare
```

### 2. Run the Backend
1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the backend server:
    ```bash
    node server.js
    ```
    The backend server should now be running on `http://localhost:3000` (or the configured port).

---

### 3. Run the Frontend
1. Open a new terminal and navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the frontend development server:
    ```bash
    npm run dev
    ```
    The frontend should now be running on `http://localhost:5173`.

---

## Notes
- Ensure the backend is running before starting the frontend.
- Update `.env` files in both `backend` and `frontend` directories with the required configurations.

Enjoy using DuniaPetCare!
