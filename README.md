# Metrik

![Metrik Logo](https://metrik-one.vercel.app/images/og.png)

Metrik is a powerful and easy-to-use website analytics tool that provides valuable insights into your website's traffic and user behavior.

## Key Features

-   **Event Tracking:** Capture and analyze specific user actions and conversions.
-   **Realtime Data:** Monitor website activity and metrics as they happen.
-   **Traffic Analysis:** Gain insights into user demographics, including country and region.
-   **User Behavior Analysis:** Visualize user journeys and understand their paths to conversion.

## Try It Out&excl;

Experience the power of Metrik and gain valuable insights into your website's performance. [Visit our website](https://metrik-one.vercel.app) to sign up for a free trial and see how Metrik can help you.

## Local Setup

To set up Metrik locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/bhuvanpddahal/metrik
    cd metrik
    ```

2. **Install dependencies:**

    ```bash
    npm install  # Or yarn install or pnpm install
    ```

3. **Set up environment variables:**

    - Create a `.env` file in the root directory.
    - Add your environment variables (e.g., database connection details, API keys).
    - Example `.env` file structure:

        ```bash
        # Public
        NEXT_PUBLIC_APP_URL="http://localhost:3000"

        # Database
        DATABASE_URL=

        # Auth.js
        AUTH_URL="http://localhost:3000/api/auth"
        AUTH_SECRET=
        AUTH_GOOGLE_ID=
        AUTH_GOOGLE_SECRET=

        # Nodemailer
        EMAIL_SERVER_USER=
        EMAIL_SERVER_PASSWORD=
        EMAIL_SERVER_HOST=
        EMAIL_SERVER_PORT=
        EMAIL_FROM=

        # Metrik (If you want to track this website itself)
        METRIK_WEBSITE_ID=
        ```

4. **Run the development server:**

    ```bash
    npm run dev # or yarn dev, or pnpm dev
    ```

5. **Access the application:**

    - Open your browser and navigate to `http://localhost:3000` (or the port specified by your development server).

## Contributing

We welcome contributions from the community! If you'd like to contribute to Metrik, please follow these guidelines:

1. **Fork the repository.**
2. **Create a new branch for your feature or bug fix:**

    ```bash
    git checkout -b feature/your-feature-name
    ```

3. **Make your changes and commit them:**

    ```bash
    git add .
    git commit -m "Add your commit message"
    ```

4. **Push your changes to your fork:**

    ```bash
    git push origin feature/your-feature-name
    ```

5. **Create a pull request.**

Please ensure that your code follows our coding style and make sure that you have tested it well before creating a pull request.

## Thanks&excl;

Hey! 👋

Thanks for checking out Metrik! If you like it, please give it a ⭐ star!

See my other projects: [github.com/bhuvanpddahal](https://github.com/bhuvanpddahal)

Feedback welcome! 🚀
