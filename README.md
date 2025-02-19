# Job Listing App  

A **Nuxt 3**-powered job listing application that fetches job listings from **The Muse API**. It allows users to browse jobs, filter by categories, locations, and companies.  

## Features  

- **Fetch job listings** from The Muse API  
- **Filter jobs** by **Company, Location, and Category** (**Case-sensitive, full-word matching**)  
- **Save favorite jobs** for later  
- **Fast & reactive UI** using Nuxt 3 & Vue.js  
- **Fully responsive** with Tailwind CSS  

---

## Tech Stack  

| Technology    | Description |
|--------------|------------|
| **Nuxt 3**   | Vue-based framework for SSR & SPA |
| **Vue 3**    | Reactive frontend framework |
| **Pinia**    | State management |
| **Tailwind CSS** | Utility-first CSS framework |
| **Vitest**   | Unit testing framework |
| **ESLint & Prettier** | Code formatting & linting |

---

## Getting Started  

### 1️ Clone the Repo  
```sh
git clone https://github.com/YOUR_USERNAME/job-listing-app.git
cd job-listing-app
```  

### 2️ Install Dependencies  
```sh
npm install
```  

### 3️ Set Up Environment Variables  
Create a `.env` file in the root and add:  

```ini
NUXT_PUBLIC_API_BASE=https://www.themuse.com/api/public
NUXT_PUBLIC_THEMUSE_API_KEY=your-api-key
```  

### 4️ Run the Development Server  
```sh
npm run dev
```  
Open `http://localhost:3000` in your browser.  

### 5️ Build for Production  
```sh
npm run build
```  
---

## API Integration  

### **Search & Filter Rules**  
- The **Muse API search is case-sensitive** (Enter whole word).  
- Filters are **only applied to**:
  - **Company**  
  - **Location**  
  - **Category**  

### **Fetching Jobs**  
- **Endpoint:** `https://www.themuse.com/api/public/jobs`  
- **Query Params:**  
  - `page` → Pagination, required  
  - `company` → Case-sensitive, full-word match  
  - `location` → Case-sensitive, full-word match  
  - `category` → Case-sensitive, full-word match  

### **Fetching Single Job**  
- **Endpoint:** `/jobs/:id`

### **Reference**  
Look at the [Themuse API](https://www.themuse.com/developers/api/v2) to learn more.  
---

## Running Tests  

### Run Unit Tests with Vitest  
```sh
npx vitest
``` 

---

## Deployment  

### Deployed to Netlify  
[Job Finderz](https://job-finderz.netlify.app/) to learn more.
---

# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
