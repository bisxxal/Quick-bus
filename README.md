# Bus Booking Web App

This is a full-stack bus booking application built with **Next.js 15**, **Prisma**, **TypeScript**, **PostgreSQL**, and other modern web technologies. The app allows users to book bus tickets, view their bookings, and manage bus schedules. Additionally, there is an **Admin Panel** that enables the creation of bus schedules, buses, and seat management.

## Features

### User Features:
- **User Registration and Login**: Users can sign up and log in to their accounts.
- **Bus Booking**: Users can browse available buses, view their schedule, and book tickets.
- **Booking Management**: Users can view their past bookings, see details of each booking (bus name, bus number, seats booked, etc.).
- **Profile Management**: Users can update their profile information and check their booking history.

### Admin Features:
- **Bus Management**: Admin can create new buses and define their schedules.
- **Seat Management**: Admin can manually configure seat arrangements for each bus.
- **Booking Overview**: Admin has access to an overview of all bookings made by users.

## Tech Stack

- **Frontend**: 
  - **Next.js 15**: React-based framework for building the user interface.
  - **TypeScript**: For static typing and ensuring a robust codebase.
  - **Tailwind CSS**: Utility-first CSS framework for fast UI development.

- **Backend**:
  - **Prisma ORM**: To interact with the PostgreSQL database.
  - **Node.js**: JavaScript runtime for the server-side logic.

- **Database**:
  - **PostgreSQL**: A relational database for storing user data, booking details, buses, and schedules.

- **Authentication**:
  - **JWT**: JSON Web Tokens for user authentication and authorization.

## Getting Started

### Prerequisites

- **Node.js**: Ensure that you have Node.js installed (v14 or later).
- **PostgreSQL**: You need a PostgreSQL instance running locally or remotely.
- **Prisma**: Prisma is used for interacting with the database. Make sure you have Prisma CLI installed.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/bus-booking-app.git
   cd bus-booking-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up the environment variables**:
   
   Create a `.env` file in the root directory of the project with the following variables:

   ```env
    
        DATABASE_URL=" "

        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= 
        CLERK_SECRET_KEY= 

        NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
        NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up


        WEBHOOK_SECRET= 
        NEXT_PUBLIC_SERVER_URL= 
        SIGNING_SECRET= 

        NEXT_PUBLIC_RAZORPAY_KEY_ID= 
        RAZORPAY_SECRET_KEY= 
   ```

   Replace `USER`, `PASSWORD`, and `bus_booking_db` with your actual PostgreSQL user, password, and database name.

4. **Set up the database with Prisma**:
   
   Run the following commands to generate the Prisma client and apply the migrations:

   ```bash
   npx prisma migrate dev
   ```

   This will create the necessary tables in your PostgreSQL database.

5. **Run the development server**:

   ```bash
   npm run dev
   ```

   The app will now be running at `http://localhost:3000`.
## How It Works

### User Flow

1. **Sign Up / Login**:
   - Users can sign up and log in using their email and password.
   - Authentication is handled with **JWT**.

2. **Bus Booking**:
   - Once logged in, users can view available buses and their schedules.
   - Users can select a bus, choose the number of seats, and book tickets.
   
3. **Viewing Bookings**:
   - After booking, users can view their upcoming and past bookings on their profile page.

### Admin Flow

1. **Bus Creation**:
   - Admin users can create buses by specifying their name, number, and route (starting and ending points).
   - They can also configure bus schedules (e.g., daily, weekly) for each bus.

2. **Seat Management**:
   - Admins can manually define the seats for each bus, including seat numbers and availability.

3. **Booking Overview**:
   - Admins can view all user bookings, with the ability to see detailed information about each booking (user, bus, seats).

### Prisma Migration and Database Setup

You can run the following Prisma commands to manage your database schema and migrations:

- **Create a migration**:

  ```bash
  npx prisma migrate dev --name init
  ```

- **Generate the Prisma client**:

  ```bash
  npx prisma generate
  ```

- **Apply migrations**:

  ```bash
  npx prisma migrate deploy
  ```

## Testing

You can test the app locally by running the development server with:

```bash
npm run dev
```

For production, make sure to set the `NODE_ENV` environment variable to `production` and deploy your app to your preferred hosting platform.

## Deployment

### Vercel

1. Push your code to a GitHub repository.
2. Deploy it on **Vercel** using the GitHub integration.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
