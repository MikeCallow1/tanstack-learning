import { AuthoritySelect } from "./components/AuthoritySelect"
import { Outlet } from "@tanstack/react-router";

export const App = () => {

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">🍔 Food Hygiene Ratings 🍔</h1>
      <AuthoritySelect />
      <Outlet />
    </div>
  );
};
