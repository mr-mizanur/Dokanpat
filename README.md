# Dokanpat – Multi-Vendor E-Commerce Platform


**Dokanpat** is a modern, high-performance multi-vendor e-commerce platform built with **Next.js**, **Tailwind CSS**, and **Node.js**.  
It features a futuristic dark-mode UI with glassmorphism aesthetics, secure authentication, role-based dashboards, and complete order & product management systems.

**Live Demo:** [https://dokanpat.vercel.app](https://dokanpat.vercel.app) <br>
**Sitemap:** [https://dokanpat.vercel.app/sitemap.xml](https://dokanpat.vercel.app/sitemap.xml) <br>
**API Server:** [https://market-pulse-server-five.vercel.app/](https://market-pulse-server-five.vercel.app/)

---

## Featured Stores

Explore some of the top vendor storefronts currently active on MarketPulse:
- **Hello Shop:** [https://dokanpat.vercel.app/shop/helloshop_603](https://dokanpat.vercel.app/shop/helloshop_603)
- **Tech Hub:** [https://dokanpat.vercel.app/shop/tack_hub_666](https://dokanpat.vercel.app/shop/tack_hub_666)
- **Screen Care:** [https://dokanpat.vercel.app/shop/screen_care_916](https://dokanpat.vercel.app/shop/screen_care_916)

---

## Key Features

- **Multi-Vendor Marketplace** – Empower independent sellers to launch, manage, and scale their custom storefronts.
- **Role-Based Access** – Dedicated dashboards for Admin, Sellers, and Buyers.
- **Secure Authentication** – Robust session handling and user verification powered by **Better Auth** & **MongoDB**.
- **Interactive UI/UX** – Futuristic dark mode aesthetic enhanced with **Glassmorphism** and **Tailwind CSS**.
- **Real-Time Feedback** – Integrated **React Hot Toast** notifications for seamless user actions.
- **Beta Updates & Feedback** – Dedicated testing track with a built-in Web3Forms bug reporting system.
- **Fully Responsive** – Optimized layout for mobile, tablet, and desktop viewports.
- **High Performance** – Built on **Next.js App Router** for lightning-fast page transitions and optimal SEO.

---

##  Tech Stack

| Category       | Technology                  |
|----------------|-----------------------------|
| Framework      | Next.js App Router          |
| Styling        | Tailwind CSS                |
| Authentication | Better Auth                 |
| Database       | MongoDB                     |
| UI Icons       | Lucide React                |
| Notifications  | React Hot Toast             |
| Form Handling  | Web3Forms API               |
| Language       | JavaScript / React          |

---

## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v18 or higher)
- **MongoDB** (Local instance or MongoDB Atlas cluster)

### Installation & Setup

```bash
# 1. Clone the repository
git clone [https://github.com/mr-mizanur/Dokanpat](https://github.com/mr-mizanur/Dokanpat)
cd Dokanpat

# 2. Install dependencies
npm install

# 3. Create .env.local file in the root directory and configure environment variables:
# MONGODB_URI=your_mongodb_connection_string
# BETTER_AUTH_SECRET=your_secret_key

# 4. Run the development server
npm run dev