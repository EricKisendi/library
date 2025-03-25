This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Implementation of shadcn for integration and usage of UI components.

installation :

```bash
npx shadcn@canary init
```
- The canary option is well suited for Reaction version 19.0 and Tailwindcss version 4 and the rest is just installation of the Ui components.

- For the theme in global.css, remember to put a semi colon after each description of the colors. Visit [https://tailwindcss.com/docs/theme#theme-variable-namespaces] for the theme-variables names that you will use to make the custom themes. Use {@theme{}}

- The [!important] handle is not handled very well in tailwind v4,,, you can use [!(input your content here)]

### Authenticatipon
- For the authentication functionality, we use Authjs the steps of installation are followed from the Authjs installation documentation for Nextjs.
- At the end, for the providers, we use CredentialProviders for our emails and password.

## Drizzle
- Drizzle is a tools that is used to perform various functions. The two main functions is the proces of migration using drizzle-kit and as an ORM for our DataBase.

```bash
npx drizzle-kit generate
```
-This code is used to generate an SQL file for our database

```bash
npx drizzle-kit migrate
```
- And this command runs the migrations that updates our schema

```bash
npx drizzle-kit studio
```
- Finally, this command open the drizzle interface where you can view the database and even make modifications where necessary.

### Upstash Redis

- Upstash Redis is a serverless database more like Neon Postgres, its main functionalities is rate-limiting which prevents website from attacks of Denial of Service (DDoS) attacks and caching data.
- Step followed in the setup is jus logging in in the official website,,, copy the Redis_URL and TOKEN and put them in the env.local file and implement them in the /lib/config file 
- Rate-limiting setup is followed through the documentation in Upstash
- Changes have been made in the auth file in the actions folder , this is to implement the functionality of rate-limiting. The rate-limiting is that the IP address of a user is captured and monitoring the activity to avoid repetitive logging in of the user in the app.

## Upstash Workflows

- We also implement the use of workflows. Just like how Netflix implements workflows and sends users notifications to pay subscriptions on time.
- I have created aan onboarding workflow for new and returning users in the api folder. More on the setup is in the examples folders in the upstash documentation.

## Vercel
- Deployment is done via vercel where the repository being made public in github, is imported and the environment variables are configured and the project is deployed.
- An additional environment variable is added (NEXT_PUBLIC_PROD_API_ENDPOINT)

## Imagekit

## React-colorful
