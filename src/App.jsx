import './App.css';
import './main.global.css'
import { CardsList } from './shared/CardsList/CardsList';
import Pagination from './shared/Pagination/Pagination';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from './store/action';
import Header from './shared/Header/Header';

function App() {
  const [offset, setOffset] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch()
  const totalPages = useSelector(state => state.products.totalPages);
  const loading = useSelector(state => state.products.loading);
  const error = useSelector(state => state.products.error);

  useEffect(() => {
    fetchData(dispatch, error)
  },[])

  function handlePageChange(page) {
    setCurrentPage(page);
    setOffset(--page * 50)
}

  return (
    <div className="app">
      <Header />
      <Pagination
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <CardsList
        offset={offset}
        load={loading}
      />
    </div>
  );
}

export default App;
