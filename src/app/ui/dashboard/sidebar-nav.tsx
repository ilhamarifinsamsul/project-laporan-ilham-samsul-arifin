import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
// import icon
import { PowerIcon } from "@heroicons/react/24/outline";

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
        className="mb-2 flex items-end gap-2 py-2 px-4 rounded-md hover:bg-gray-200"
        href="/"
      >
        <span className="hidden md:block text-3xl font-bold font-sans">
          Laporan
        </span>
      </Link>
      <NavLinks />
      <div className="flex h-[48px] grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2 md:pb-4 justify-between">
        <div className="hidden h-auto w-full grow rounded-md bg-gray-200 md:block"></div>
        <form action="">
          <button
            // onClick={handleSignOut}
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium hover:bg-gray-100 hover:text-gray-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
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
