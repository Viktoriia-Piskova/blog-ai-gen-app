import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "../Logo";

export const AppLayout = ({ children }) => {
  const { user } = useUser();
  return (
    <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
      <div className="flex flex-col text-white overflow-hidden">
        <div className="bg-slate-800 px-2">
          <Logo />
          <Link className="btn" href="/post/new">
            <span className="pl-1">New post</span>
          </Link>
          <Link className="block mt-2 text-center" href="/token-topup">
            <FontAwesomeIcon icon={faCoins} className="text-yellow-500" />
            <span className="pl-1">tokens available</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-800 to-cyan-800">
          List of post
        </div>
        <div className="bg-cyan-800 flex items-center gap-2 border-t border-t-black/50 h-20 px-2 ">
          {" "}
          {!!user ? (
            <>
              <div className="min-w-50">
                <Image
                  className="rounded-full"
                  src={user.picture}
                  width={50}
                  height={50}
                  alt={user.name}
                />
              </div>
              <div className="flex-1">
                <p className="font-bold"> {user.email} </p>
                <Link className="text-sm" href="/api/auth/logout">
                  Logout
                </Link>
              </div>
            </>
          ) : (
            <Link href="/api/auth/login">Login</Link>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
