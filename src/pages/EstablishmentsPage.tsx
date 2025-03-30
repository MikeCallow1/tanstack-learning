import { useQuery } from "@tanstack/react-query";
import { useParams, useSearch } from "@tanstack/react-router";
import { useForm, AnyFieldApi } from "@tanstack/react-form";
import { fetchEstablishments, getSortOptions } from "../services/api";
import { EstablishmentsList } from "../components/EstablishmentsList";
import { PaginationControls } from "../components/Pagination";

const PAGE_SIZE = 10;

export const EstablishmentsPage = () => {
  const { localAuthorityId } = useParams({ from: "/establishments/$localAuthorityId" });

  const search = useSearch({ strict: false }) as { page?: string };
  const pageNumber = Number(search.page) || 1;

  // Sort values are fetched from the API
  const { data: sortValues, isLoading: isSortValuesLoading } = useQuery({
    queryKey: ["sortValues"],
    queryFn: () => getSortOptions(),
  });

  const form = useForm({
    defaultValues: {
      rating: '',
      sortBy: sortValues?.sortOptions
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["establishments", localAuthorityId, pageNumber],
    queryFn: () => fetchEstablishments({ localAuthorityId: Number(localAuthorityId), pageSize: PAGE_SIZE, pageNumber }),
  });

  if (isLoading) return <p>Loading establishments...</p>;
  if (error) return <p>Error loading establishments.</p>;

  const FieldInfo = ({ field }: { field: AnyFieldApi }): React.ReactNode => {
    return (
      <div className="flex items-center space-x-2 relative">
        <span className="text-sm text-red-500 min-h-[1em] absolute top-0">
          {field.state.meta.isTouched && field.state.meta.errors.length ? (
            field.state.meta.errors.join(', ')
          ) : null}

          {/* This is used for async validation */}
          {field.state.meta.isValidating ? 'Validating...' : null}
        </span>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Filter and Sort Form */}
      <form onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
        className="mt-4 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 bg-gray-100 p-4 rounded-lg shadow-md">
          <form.Field
            name="rating"
            validators={{
              onChange: ({ value }) => !value ? 'Rating is required' : undefined,
            }}
            children={(field) => (
              <div className="flex flex-col w-full md:w-auto">
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white px-3 py-1"
                />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <form.Field
            name="sortBy"
            children={(field) => (
              <div className="flex flex-col w-full md:w-auto">
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                  Sort By
                </label>
                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white px-3 py-1"
                >
                  <option value="">Select an option</option>
                  {sortValues?.sortOptions?.map((option) => (
                    <option key={option.sortOptionId} value={option.sortOptionKey}>
                      {option.sortOptionName}
                    </option>
                  ))}
                </select>
                <FieldInfo field={field} />
              </div>
            )}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <div className="flex justify-end w-full md:w-auto">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`px-4 py-2 text-white rounded-md shadow-sm ${canSubmit ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Apply Filters'}
                </button>
              </div>
            )}
          />
        </div>
      </form>
      <EstablishmentsList data={data} />

      <PaginationControls pageNumber={pageNumber} totalPages={data?.meta.totalPages || 1} />
    </div>
  );
};