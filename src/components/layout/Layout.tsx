import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
  return (
    <div>
      <nav>Navigation/Header</nav>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
};
