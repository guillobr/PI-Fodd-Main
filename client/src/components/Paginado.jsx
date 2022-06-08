import React from "react";
import './Paginado.css';

export default function Paginado({recipesPerPage , allRecipes , paginado}){
    const pageNumbers = []

    for (let i=1; i<=Math.ceil(allRecipes/recipesPerPage);i++){
        pageNumbers.push(i)
    }

    return(
        <nav className="pagination">
            <ul className="pages">
                { pageNumbers &&
                pageNumbers.map(pagNumber =>(
                    <li className="pageBtn" key={pagNumber} >
                        <button  key={pagNumber} onClick={()=> paginado(pagNumber)}>{pagNumber}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}