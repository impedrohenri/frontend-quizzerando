import Pagination from 'react-bootstrap/Pagination';

export default function NavPagination({ postsPerPage, totalPosts, currentPage, setCurrentPage, className }) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <Pagination className={`${className}`}>
      <Pagination.First
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      />

      {pageNumbers.map(nums => (
        <Pagination.Item
          key={nums}
          active={nums === currentPage}
          onClick={() => setCurrentPage(nums)}
        >
          {nums}
        </Pagination.Item>
      ))}

      <Pagination.Next
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}
