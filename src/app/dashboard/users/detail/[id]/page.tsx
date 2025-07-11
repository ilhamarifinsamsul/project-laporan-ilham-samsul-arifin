import NotFound from "@/app/not-found";

interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
}

// Dummy users data
const users: User[] = [
  {
    id: "1",
    name: "Ilham Pratama",
    email: "ilham@example.com",
    bio: "Frontend Developer & UI Enthusiast.",
  },
  {
    id: "2",
    name: "Siti Aminah",
    email: "siti@example.com",
    bio: "Backend Developer & API Specialist.",
  },
  {
    id: "3",
    name: "Budi Santoso",
    email: "budi@example.com",
    bio: "Fullstack Developer & DevOps.",
  },
];

interface PageProps {
  params: { id: string };
}

export default function UserDetailPage({ params }: PageProps) {
  const user = users.find((u) => u.id === params.id);

  if (!user) {
    return <NotFound />;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Detail Pengguna</h1>
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-600 mb-2">{user.email}</p>
        <p className="text-gray-800">{user.bio}</p>
      </div>
    </main>
  );
}
