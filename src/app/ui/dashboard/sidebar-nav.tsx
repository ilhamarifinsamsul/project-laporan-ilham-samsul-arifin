import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";

// import { useRouter } from "next/navigation";

export default function SidebarNav() {
  //   const router = useRouter();

  //   const handleSignOut = () => {
  //     // Implement sign out logic here
  //     // For example, clear auth tokens and redirect to login
  //     // localStorage.removeItem('token');
  //     // router.push("/login");
  //   };

  return (
    <div className="w-full h-full flex flex-col px-3 py-4 md:px-2 bg-gray-200">
      <Link
        className="flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-500"
        href="/"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 12l8.954 8.955c.44.439 1.152.439 1.591 0L21.75 12"
          />
        </svg>
        <span>Home</span>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />

        <form action="">
          <button
            // onClick={handleSignOut}
            className="mt-auto py-2 px-4 rounded bg-red-600 hover:bg-red-700 w-full text-white"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
    // <nav className="h-full bg-gray-800 text-white flex flex-col py-4 px-3 md:px-2">
    //   <ul className="flex-1 space-y-4">
    //     {navLinks.map((link) => (
    //       <li key={link.href}>
    //         <Link
    //           href={link.href}
    //           className="block py-2 px-4 rounded hover:bg-gray-700"
    //         >
    //           {link.label}
    //         </Link>
    //       </li>
    //     ))}
    //   </ul>
    //   <button
    //     // onClick={handleSignOut}
    //     className="mt-auto py-2 px-4 rounded bg-red-600 hover:bg-red-700"
    //   >
    //     Sign Out
    //   </button>
    // </nav>
  );
}
