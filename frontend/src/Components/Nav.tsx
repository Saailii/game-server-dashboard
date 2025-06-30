import Link from "next/link";

export default function Nav() {
    return (
        <nav >
            <ul>
                <li>
                    <Link href="/" className="btn-primary">Home</Link>
                </li> 
                <li>
                    <Link href="/register">register</Link>
                </li>
                <li>
                    <Link href="/login">login</Link>
                </li>
            </ul>
        </nav>
    )
}