import React from 'react';
import './header.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData, fetchFilter } from '../../store/action';
import { updateError, updateItems, updateLoading } from '../../store/reducer';

export function Header() {

    const [filter, setFilter] = useState({ field: 'product', value: '' });
    const [empty, setEmpty] = useState(false);
  

    const dispatch = useDispatch()

    function handleFilterChange(field, value) {
        setFilter({ field: field, value: value })
        setEmpty(false)
    }

    function handleResetFilters() {
        dispatch(updateItems([]))
        dispatch(updateError(false))
        setFilter({ field: 'product', value: '' })
        setEmpty(false)
        dispatch(updateLoading(true))
        fetchData(dispatch)
    }

    async function load() {

        let parseValue

        if ((filter.field && filter.value !== undefined) &&  filter.value !== "") {
        if (filter.field === "price" & filter.value == +filter.value) parseValue = +filter.value
        else parseValue = filter.value
      
        fetchFilter(filter, parseValue, dispatch)
        dispatch(updateLoading(true))
        setFilter({ field: filter.field, value: '' })
        } else setEmpty(true)
    }

    return (
        <div className='header'>
            <h1 className='header__title'>Список товаров</h1>
            <label className='header__filter'>
                <p className='header__filter-title'>Фильтровать по:</p>
                <select className='header__filter-select' value={filter.field} onChange={(e) => handleFilterChange(e.target.value, filter.value)}>
                    <option value='product'>Названию</option>
                    <option value='price'>Цене</option>
                    <option value='brand'>Бренду</option>
                </select>
                {empty &&
                    <span className='header__filter-valid'>заполните поле</span>
                }
                <input className='header__input'
                    type='text'
                    onChange={(e) => handleFilterChange(filter.field, e.target.value)}
                    value={filter.value}
                />
                <button className='filter-btn filter-btn_apply' disabled={empty} onClick={load}>Приминить фильтры</button>
                <button onClick={handleResetFilters} className='filter-btn filter-btn_reset'>Сбросить фильтры</button>
            </label>
        </div>
    );
}


export default Header;