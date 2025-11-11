import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Layout: React.FC = () => {
  return (
    <div className="flex flex-col bg-neutral-50 dark:bg-neutral-900">
      {/* Header with Navigation */}
      <Header cartItemCount={0} />

      <main className="flex-1 w-full mx-auto min-h-screen">
        <Outlet />
      </main>

      {/* Footer */}

      <footer className="bg-neutral-100 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 py-6">
        <div className="container mx-auto px-4 text-neutral-600 dark:text-neutral-400">
          Footer
        </div>
      </footer>
    </div>
  );
};
