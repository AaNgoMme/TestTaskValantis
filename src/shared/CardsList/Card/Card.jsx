import React from "react";
import './card.css'
export function Card({id, brand, product, price}) {



    return(
        <li className="card__item">
            <p className="card__item-text text_grey">ID: {id}</p>
            <p className="card__item-text">Brand: {brand ? brand : '-'}</p>
            <p className="card__item-text card__item-text_height">Product: {product}</p>
            <p className="card__item-text card__item-text_right">Price: {price}</p>
        </li>
    )

}