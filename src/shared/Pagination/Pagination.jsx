import React, { useEffect } from 'react';
import './pagination.css'

export function Pagination({ loading, currentPage, totalPages, onPageChange }) {

  useEffect(()=> {
    if(loading) onPageChange(1)
  })

  function handlePrevPage() {
    onPageChange(currentPage - 1);
  }

  function handleNextPage() {
    onPageChange(currentPage + 1);
  }

  function handleClickTFirstPage() {
    onPageChange(currentPage = 1)
  }

  function handleClickPage(page) {
    onPageChange(currentPage = page)
  }

  function handleClickTLastPage(totalPages) {
    onPageChange(currentPage = totalPages)
  }


  let pages = []

  if (currentPage >= totalPages - 2 & totalPages > 5) {
    for (let i = totalPages - 4; i <= totalPages; i++) {
      pages.push(i)
      if (i === totalPages) break
    }
  }
  if (currentPage >= 5 & currentPage < totalPages - 2) {
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      pages.push(i)
    }
  }
  if (currentPage <= 5 & totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } if (currentPage < 5 & totalPages > 5) {
    for (let i = 1; i <= 5; i++) {
      pages.push(i)
    }
  }
 
  return (
    <div className='pagination'>
      {!loading &&
        <div className='pagination__buttons'>
          <button className='pagination__btn' onClick={handlePrevPage} disabled={currentPage === 1}>Назад</button>
          <button className={(currentPage <= 5) & (totalPages <= 5) || (currentPage < 5) & (totalPages > 5) ? 'none' : 'pagination__btn-page'} onClick={handleClickTFirstPage} disabled={currentPage === 1}>1</button>
          <span className={(currentPage <= 5) & (totalPages <= 5) || (currentPage < 5) & (totalPages > 5) ? 'none' : 'pagination__ellipsis'}>...</span>
          {pages.map((el) => (
            <span key={el} className={currentPage === el ? 'active pagination__btn-page' : 'pagination__btn-page'} onClick={() => handleClickPage(el)}>{el}</span>
          ))}
          <span className={totalPages <= 5 || currentPage >= totalPages - 2 ? 'none' : 'pagination__ellipsis'}>...</span>
          <span className={totalPages <= 5 || currentPage >= totalPages - 2 ? 'none' : 'pagination__btn-page'} onClick={() => handleClickTLastPage(totalPages)}>{totalPages}</span>
          <button className='pagination__btn' onClick={handleNextPage} disabled={currentPage === totalPages}>Вперед</button>
        </div>
      }
    </div>
  );
}


export default Pagination;