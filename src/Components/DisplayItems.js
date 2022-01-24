import React from "react";
import { useEffect, useState } from "react";
import EditCom from "./EditCom";

export default function DisplayItems() {

    const [myItems, setMyItems] = useState([])

    const deleteItem = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/item/${id}`,{
                method: "DELETE"
            });
            setMyItems(myItems.filter(listings => listings.item_id !== id));
        } catch (err) {
            console.error(err)
        }
    }

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:5000/");
            const jsonData = await response.json();
            setMyItems(jsonData);
            console.log(myItems)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    return(
        <div className="center">
            {myItems.map(index => {
                return(
                <div>
                <div className="items">
                <div class="card">
                <img src={index.item_photo} alt="Avatar" className="image"/>
                    <div className="container">
                        <h4><b>{index.item_description}</b></h4>
                        <p>$ {index.item_price}</p>
                    </div>
                </div>
                </div>
                <EditCom item = {index}/>
                <button onClick={() => deleteItem(index.item_id)} className = "btn btn-danger">Delete</button>
                </div>
            )})}
        </div>
    );
}