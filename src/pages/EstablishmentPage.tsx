import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { fetchEstablishment } from "../services/api";

export const EstablishmentPage = () => {

  const { fhrsId } = useParams({ from: "/establishment/$fhrsId" });
  const { data, error, isLoading } = useQuery({
    queryKey: ["establishment", fhrsId],
    queryFn: () => fetchEstablishment(Number(fhrsId)),
  });

  if (isLoading) return <p>Loading establishment...</p>;
  if (error) return <p>Error loading establishment.</p>;

  const position = {
    lat: parseFloat(data?.geocode.latitude),
    lng: parseFloat(data?.geocode.longitude),
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{data?.BusinessName}</h2>
      <p className="text-gray-700 mb-2"><strong>Type:</strong> {data?.BusinessType}</p>
      <p className="text-gray-700 mb-2"><strong>Address:</strong> {data?.AddressLine1}, {data?.AddressLine2}, {data?.AddressLine3}, {data?.AddressLine4}, {data?.PostCode}</p>
      <p className="text-gray-700 mb-2"><strong>Phone:</strong> {data?.Phone}</p>
      <p className="text-gray-700 mb-2"><strong>Rating:</strong> {data?.RatingValue} ({new Date(data?.RatingDate).toLocaleDateString('en-GB')})</p>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Scores</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Hygiene: {data?.scores.Hygiene}</li>
          <li>Structural: {data?.scores.Structural}</li>
          <li>Confidence in Management: {data?.scores.ConfidenceInManagement}</li>
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Location</h3>
        <iframe
          width="100%"
          height="400"
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD0TuG8TTUCzcN6U4V9-Cm9GA3nLhNroug&q=${position.lat},${position.lng}`}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}