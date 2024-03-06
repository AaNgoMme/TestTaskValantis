import React, { useEffect, useState } from "react";
import './cardslist.css'
import { Card } from "./Card/Card";
import { useSelector } from "react-redux";
import { fetchGetItems, fetchGetId } from "../../store/action";

export function CardsList({ load, offset }) {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const product = useSelector(state => state.products.items)
    const error = useSelector(state=> state.products.error)

    useEffect(() => {
        if(load) return
        if (product.length > 0) return setItems(product)
        async function getItem() {
            setLoading(true)
            const getId = await fetchGetId(offset)
            setItems(await fetchGetItems(offset, getId))
            setLoading(false)
        }
        getItem()
    }, [offset, product, load]
    )

    return (
        <ul className="cardList__list">

            {!loading && !load && product.length > 0 && !error && items.slice(offset, offset + 50).map((el) => (
                <Card
                    key={el.id}
                    id={el.id}
                    brand={el.brand}
                    product={el.product}
                    price={el.price}
                />
            ))}

            {!loading && !load && !error && product.length <= 0 && items.map((el) => (
                <Card
                    key={el.id}
                    id={el.id}
                    brand={el.brand}
                    product={el.product}
                    price={el.price}
                />
            ))}

            {error && 
                <div className="list-loading">По данному фильтру ничего не найдено</div>
            }

            {(loading || load) && !error && (
                <div className="list-loading">Загрузка...</div>
            )}
        </ul>
    )

}