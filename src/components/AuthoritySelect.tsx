import { useNavigate, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchAuthorities } from "../services/api";

interface AuthoritySelectProps {
  localAuthorityId?: string;
}

export const AuthoritySelect: React.FC<AuthoritySelectProps> = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["authorities"],
    queryFn: fetchAuthorities,
  });

  // const { localAuthorityId } = useParams({ from: "/establishments/$localAuthorityId" });
  // gotcha: to make this reusable outside of /establishments, we need to pass shouldThrow: false to suppress the error - it won't fail gracefully
  const params = useParams({ from: "/establishments/$localAuthorityId", shouldThrow: false });
  const localAuthorityId = params?.localAuthorityId;

  const navigate = useNavigate();

  if (isLoading) return <p>Loading authorities...</p>;
  if (error) return <p>Error loading authorities.</p>;

  return (
    <div className="p-6 pb-0">
      <select
        value={localAuthorityId || ""}
        onChange={(e) => navigate({ to: `/establishments/${e.target.value}` })}
        className="p-2 border rounded"
      >
        <option value="">Select an Authority</option>
        {data?.authorities.map((authority) => (
          <option key={authority.LocalAuthorityId} value={authority.LocalAuthorityId}>
            {authority.Name}
          </option>
        ))}
      </select>
    </div>
  );
};