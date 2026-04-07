import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Hostel Project</title>
        <meta name="description" content="Hostel Project frontend" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1>Hostel Project</h1>
        <p>Next.js is installed and ready in the frontend folder.</p>
        {/* <div>
          <Link href="/auth/login">Login</Link>
          <br />
          <Link href="/auth/register">Register</Link>
        </div> */}
      </main>
    </>
  );
}
