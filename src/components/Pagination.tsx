import { Link } from "@tanstack/react-router";

export const PaginationControls = ({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) => (
  <div className="flex items-center justify-center space-x-4 p-4">
    <Link
      className={`px-3 py-1 rounded ${pageNumber === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
      disabled={pageNumber === 1}
      search={(prev) => ({ ...prev, page: 1 })}
    >
      First
    </Link>
    <Link
      className={`px-3 py-1 rounded ${pageNumber === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
      disabled={pageNumber === 1}
      search={(prev) => ({ ...prev, page: Number(pageNumber - 1) })}
    >
      Prev
    </Link>
    <span className="px-3 py-1 text-gray-700">
      Page {pageNumber} of {totalPages}
    </span>
    <Link
      className={`px-3 py-1 rounded ${pageNumber === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
      disabled={pageNumber === totalPages}
      search={(prev) => ({ ...prev, page: Number(pageNumber + 1) })}
    >
      Next
    </Link>
    <Link
      className={`px-3 py-1 rounded ${pageNumber === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
      disabled={pageNumber === totalPages}
      search={(prev) => ({ ...prev, page: totalPages })}
    >
      Last
    </Link>
  </div>
);