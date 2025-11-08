export const ForbiddenPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-red-600">Forbidden access</h1>
      <p className="mt-4">you re logged in but no rights to be here</p>
    </div>
  );
};
