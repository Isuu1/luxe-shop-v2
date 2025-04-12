# 🛒 Luxe - Lightweight E-commerce Platform

A modern, lightweight e-commerce application built with the Next.js App Router. This project leverages TypeScript for robust development, Supabase for authentication and database needs, Stripe for secure payments, and Sanity as a headless CMS for managing products and content.

## ✨ Features

- **Product Catalog:** Browse, search, and filter products fetched from Sanity CMS.
- **Shopping Cart:** Add/remove items, view cart details (potentially using local storage for guests).
- **User Authentication:** Secure sign-up, login, and profile management powered by Supabase Auth.
- **Database Integration:** User data, orders, and potentially other relational data stored in Supabase Database.
- **Secure Payments:** Integrated Stripe Checkout for seamless and secure payment processing.
- **Order History:** Logged-in users can view their past orders.
- **Content Management:** Products, categories, and potentially other site content easily managed via Sanity Studio.
- **TypeScript:** End-to-end type safety.
- **Next.js App Router:** Utilizing the latest features of Next.js for optimal performance and developer experience.
- **Responsive Design:** Adapts gracefully to different screen sizes.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Authentication & Database:** [Supabase](https://supabase.io/) (Auth, PostgreSQL Database)
- **Payments:** [Stripe](https://stripe.com/)
- **CMS:** [Sanity](https://www.sanity.io/) (Headless CMS)
- **Styling:** [Tailwind CSS / CSS Modules / Your Choice - Add Here]
- **Deployment:** [Vercel / Netlify / Other - Add Here]

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later recommended)
- npm, yarn, or pnpm
- A Supabase Account & Project ([supabase.io](https://supabase.io/))
- A Stripe Account ([stripe.com](https://stripe.com/))
- A Sanity Account & Project ([sanity.io](https://www.sanity.io/))

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/](https://github.com/)[your-username]/[your-repo-name].git
    cd [your-repo-name]
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**

    - Create a `.env.local` file in the root of the project.
    - Add the necessary environment variables (see `.env.example` or the section below).

4.  **Configure Supabase:**

    - Set up your database schema (you might need to run SQL migrations provided in the project or configure tables manually).
    - Ensure Authentication is configured in your Supabase project settings.

5.  **Configure Sanity:**

    - Set up your Sanity schema within the `/sanity` (or relevant) folder.
    - Deploy the Sanity Studio (`sanity deploy`) or run it locally (`sanity start`).
    - Populate your CMS with product data.

6.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ⚙️ Environment Variables

You will need to create a `.env.local` file in the root directory and add the following environment variables:

```plaintext
# Supabase
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY # If used for server-side operations

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET=YOUR_STRIPE_WEBHOOK_SECRET # Important for verifying webhook events

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=YOUR_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET=YOUR_SANITY_DATASET # e.g., 'production'
NEXT_PUBLIC_SANITY_API_VERSION=YYYY-MM-DD # e.g., '2023-05-03'
SANITY_API_READ_TOKEN=YOUR_SANITY_API_READ_TOKEN # Optional: If needed for previews or specific server fetches

# Other (Optional)
NEXT_PUBLIC_SITE_URL=http://localhost:3000 # Change for production
```
