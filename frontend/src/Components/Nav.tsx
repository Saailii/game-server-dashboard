"use client";
import { useAuth } from "@/context/authContext";
import Link from "next/link";

export default function Nav() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <span className="loading loading-spinner loading-sm"></span>;
  }

  return (
    <nav>
      <ul>
        <li>
          <Link href="/" className="btn-primary">
            Home
          </Link>
        </li>
        {user ? (
          "Connecter"
        ) : (
          <>
            <li>
              <Link href="/register">register</Link>
            </li>
            <li>
              <Link href="/login">login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
