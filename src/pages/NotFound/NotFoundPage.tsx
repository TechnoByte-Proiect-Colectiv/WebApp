import { Link } from "react-router-dom";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">404 - Page not found</h1>
      <p className="mt-4">Wrong</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Go home
      </Link>
    </div>
  );
};
