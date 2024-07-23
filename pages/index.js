import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

export default function Home() {
  const { user } = useUser();
  console.log(user);
  return (
    <div>
      <h1>From index js</h1>
      <div>
        {!!user ? (
          <>
            <div>
              <Image
                src={user.picture}
                width={50}
                height={50}
                alt={user.name}
              />
              <p>{user.email}</p>
            </div>
            <Link href="/api/auth/logout">Logout</Link>
          </>
        ) : (
          <Link href="/api/auth/login">Login</Link>
        )}
      </div>
    </div>
  );
}
