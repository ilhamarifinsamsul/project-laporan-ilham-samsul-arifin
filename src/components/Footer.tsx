export const Footer = () => {
  const currentYear: number = new Date().getFullYear();
  return (
    <footer className="bg-gray-300 text-gray-700 py-4 fixed bottom-0">
      <div className="container mx-auto text-center">
        <p>&copy; {currentYear} Laporan Bencana Tagana. All rights reserved.</p>
      </div>
    </footer>
  );
};
