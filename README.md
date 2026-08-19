# GearUp Frontend 🏋️

**"Rent Sports & Outdoor Gear Instantly"**

GearUp is a modern, responsive frontend application built with Next.js for a sports and outdoor equipment rental service. The platform connects gear owners (providers) with renters (customers) while providing robust administrative controls.

## 🚀 Key Features

*   **Role-Based Dashboards:** Separate, intuitive dashboards for Customers, Providers, and Admins.
*   **Customer Experience:** Browse available gear, interactive date-pickers for rentals (with overlap prevention), secure checkout via Stripe, order tracking, and review submission.
*   **Provider Management:** Easily add new gear (with image URLs), edit existing listings, manage stock, and view incoming rental orders.
*   **Admin Moderation:** Comprehensive user management with pagination, platform-wide gear monitoring, and rental tracking.
*   **Modern UI/UX:** Responsive design using Tailwind CSS, loading skeletons, and graceful error boundaries.

## 🛠 Tech Stack

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **State Management / Data Fetching:** `@tanstack/react-query`, Axios
*   **Payments:** Stripe (`@stripe/react-stripe-js`)
*   **Icons:** `lucide-react`
*   **Notifications:** `react-hot-toast`

## 📦 Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine. You will also need the backend server running locally.

### Installation

1. Clone the repository and navigate to the frontend directory:
   ```bash
   cd gearup-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_STRIPES_PUBLIC_KEY=your_stripe_test_public_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit:
   [http://localhost:3000](http://localhost:3000)

## 📁 Folder Structure

*   `/src/app`: Next.js App Router pages (Home, Gear Listings, Dashboards).
*   `/src/components`: Reusable UI components (Buttons, Loaders, Modals).
*   `/src/services`: Axios API integration files organized by feature (Auth, Gear, Rental, Payment, Admin, Provider).
*   `/src/lib`: Core configurations like the global Axios instance setup.
*   `/src/types`: Global TypeScript interfaces.
