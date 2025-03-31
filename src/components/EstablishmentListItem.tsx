import { Link } from "@tanstack/react-router";
import { Establishment } from "../types"

export const EstablishmentListItem = ({ establishment }: { establishment: Establishment }) => (
  <Link
    to={`/establishment/${establishment.FHRSID}`}
    className="block text-gray-800 no-underline hover:text-blue-600"
    prefetch="intent"
  >
    <li key={establishment.FHRSID} className="border p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="font-bold">{establishment.BusinessName}</h2>
      <p>
        Rating: {establishment.RatingValue}{" "}
        {(() => {
          switch (establishment.RatingValue) {
            case "Exempt":
              return "🤷";
            case "0":
              return "🤢";
            case "1":
              return "😞";
            case "2":
              return "😐";
            case "3":
              return "🙂";
            case "4":
              return "😃";
            case "5":
              return "🤩";
            case "AwaitingInspection":
              return "🔍";
            default:
              return "";
          }
        })()}
      </p>
      <p>Type: {establishment.BusinessType}</p>
      <p>Postcode: {establishment.PostCode}</p>
    </li>
  </Link>
)