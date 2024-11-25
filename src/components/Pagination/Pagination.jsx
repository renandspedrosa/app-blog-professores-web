import PaginationBtn from './PaginationBtn';
import PaginationIndex from './PaginationIndex';

const Pagination = ({
  goToPrevPage,
  isPrevDisabled,
  currentPage,
  isNextDisabled,
  goToNextPage,
}) => {
  return (
    <div className="flex justify-between items-center mt-10">
      <PaginationBtn onClick={goToPrevPage} disabled={isPrevDisabled}>Anterior</PaginationBtn>
        <PaginationIndex currentPage={currentPage} />
      <PaginationBtn onClick={goToNextPage} disabled={isNextDisabled}>Próxima</PaginationBtn>
    </div>
  );
};

export default Pagination;
