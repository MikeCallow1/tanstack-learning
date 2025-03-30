import { EstablishmentsResponse } from '../types'
import { EstablishmentListItem } from './EstablishmentListItem'

export const EstablishmentsList = ({ data }: { data: EstablishmentsResponse | undefined }) => (
  <ul className="mt-4 space-y-2">
    {data?.establishments?.map((establishment) => (
      <EstablishmentListItem
        key={establishment.FHRSID}
        establishment={establishment}
      />
    ))}
  </ul>
)