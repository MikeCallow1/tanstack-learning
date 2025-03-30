import { Establishment } from "../types"

export const EstablishmentListItem = ({ establishment }: { establishment: Establishment }) => (
  <li key={establishment.FHRSID} className="border p-4 rounded shadow hover:shadow-lg transition">
    <h2 className="font-bold">{establishment.BusinessName}</h2>
    <p>Rating: {establishment.RatingValue}</p>
    <p>Type: {establishment.BusinessType}</p>
    <p>Postcode: {establishment.PostCode}</p>
  </li>
)