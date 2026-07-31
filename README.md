# MarketPulse – Multi-Vendor E-Commerce Platform

<p align="center">
  <img src="https://market-pulse-eosin.vercel.app/image/MarketPulse.png" alt="MarketPulse Banner" width="100%" style="border-radius: 12px; border: 1px solid #1e293b;" />
</p>

**MarketPulse** is a modern, high-performance multi-vendor e-commerce platform built with **Next.js**, **Tailwind CSS**, and **Node.js**.  
It features a futuristic dark-mode UI with glassmorphism aesthetics, secure authentication, role-based dashboards, and complete order & product management systems.

**Live  :** [https://market-pulse-eosin.vercel.app](https://market-pulse-eosin.vercel.app) <br>
**Server:** [https://market-pulse-server-five.vercel.app/](https://market-pulse-server-five.vercel.app/)

---


##  Features

-  **Multi-Vendor Marketplace** – Sellers can list & manage their own products
-  **Role-Based Access** – Admin, Seller, and Buyer dashboards
-  **Secure Authentication** – Powered by Better Auth + MongoDB
-  **Cart & Checkout** – Full shopping cart and order flow
-  **Order & Product Management** – Complete admin & seller controls
-  **Fully Responsive** – Looks great on mobile, tablet & desktop
-  **High Performance** – Built with Next.js App Router

---

## Tech Stack

| Category       | Technology                  |
|----------------|-----------------------------|
| Framework      | Next.js 16 (App Router)     |
| Styling        | Tailwind CSS 4              |
| Authentication | Better Auth                 |
| Database       | MongoDB                     |
| UI Icons       | Lucide React                |
| Notifications  | React Hot Toast             |
| Language       | JavaScript / React 19       |

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/mr-mizanur/MarketPulse.git
cd MarketPulse

# Install dependencies
npm install

# Create .env.local and add your MongoDB URI + Auth secrets
# Example:
# MONGODB_URI=your_mongodb_connection_string
# BETTER_AUTH_SECRET=your_secret_key

# Run the development server
npm run dev