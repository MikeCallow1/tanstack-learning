import { useState } from "react";
import { AuthoritySelect } from "./components/AuthoritySelect";
import { EstablishmentsList } from "./components/EstablishmentsList";

export const App = () => {
  const [authorityId, setAuthorityId] = useState<number | null>(null);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">🍔 Food Hygiene Ratings 🍔</h1>
      <AuthoritySelect onSelect={setAuthorityId} />
      {authorityId && <EstablishmentsList authorityId={authorityId} />}
    </div>
  );
};
