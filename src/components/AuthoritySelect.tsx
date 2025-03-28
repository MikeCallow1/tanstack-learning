interface Props {
  onSelect: (id: number) => void;
}

export const AuthoritySelect: React.FC<Props> = ({ onSelect }) => {

  return (
    <select onChange={(e) => onSelect(Number(e.target.value))} className="p-2 border rounded">
      <option value="">Select an Authority</option>
    </select>
  );
};