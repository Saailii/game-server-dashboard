"use client";
import { useAuth } from "@/context/authContext";
import Link from "next/link";

export default function Nav() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <span className="loading loading-spinner loading-sm"></span>;
  }

  return (
    <nav className="bg-base-300  p-5">
      <ul className="flex gap-2 justify-center items-center">
        <li>
          <Link href="/" className="btn-primary ">
            Home
          </Link>
        </li>
        {user ? (
          "Connecter"
        ) : (
          <>
            <li>
              <Link href="/register" className="text-primary-content">
                register
              </Link>
            </li>
            <li>
              <Link href="/login" className="text-primary-content">
                login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
