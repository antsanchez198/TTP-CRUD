import { useState } from "react";
import React from "react";

export default function InputCom(){ 

    const [description, setDescription] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [price, setPrice] = useState(0)

    const postInfo = async e => {
        e.preventDefault();
        try{
            const body = {item_description: description,item_photo: imageUrl, item_price: price};
            const response = await fetch("http://localhost:5000/items",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
        }catch(err){
            console.error(err);
            console.log("Something went wrong")
        }
    }
    
    return(
        <form>
            <h1 className="heading">My Items for Sale</h1>
            <input placeholder="Description" size = "50" onChange={e => setDescription(e.target.value)}></input>
            <input placeholder="Link of Image" size = "50" onChange={e => setImageUrl(e.target.value)}></input>
            <input placeholder="Price" onChange={e=> setPrice(e.target.value)}></input>
            <button onClick={postInfo}>List Item</button>
        </form>
    )
}