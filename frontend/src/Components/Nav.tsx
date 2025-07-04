"use client";
import { useAuth } from "@/context/authContext";
import cookie from "cookiejs";
import Link from "next/link";

async function handleLogout() {
  const token = cookie.get("token");
  if (!token) {
    return "No user found";
  }

  const response = await fetch("http://localhost:3333/logout", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  await response.json().then(() => (window.location.href = "/"));
}

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
          <button
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <li>
              <Link href="/register" className="">
                Register
              </Link>
            </li>
            <li>
              <Link href="/login" className="">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
