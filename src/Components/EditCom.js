import React from "react";
import { useState } from "react";

export default function EditCom({ item }) {

    console.log(item)

    const [description, setDescription] = useState(item.item_description)
    const [imageUrl, setImageUrl] = useState(item.item_photo)
    const [price, setPrice] = useState(item.item_price)

    const updateInfo = async e => {
        e.preventDefault();
        try {
            const body = {item_description: description,item_photo: imageUrl, item_price: price};
            const response = await fetch(`http://localhost:5000/item/${item.item_id}`,
            {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            
            console.log(response);
            window.location = "/";
        } catch (err) {
            console.error(err);
        }
    }

    const setOriginal = async e => {
        e.preventDefault();
        setDescription(item.item_description)
        setPrice(item.item_price)
        setImageUrl(item.item_photo)
    }

    return(
        <div className="buttons">
        <button type="button" class= "btn btn-primary" data-toggle="modal" data-target={`#id${item.item_id}`}>
        Edit
        </button>

        <div class="modal" id={`id${item.item_id}`}>
        <div class="modal-dialog">
            <div class="modal-content">

            <div class="modal-header">
                <h4 class="modal-title">Edit</h4>
                <button 
                type="button" 
                class="close" 
                data-dismiss="modal" 
                onClick={e => setOriginal(e)}>&times;</button>
            </div>

            <div class="modal-body">
                <input placeholder="Description" className="inputbox" onChange={e => (setDescription(e.target.value))} value={description}></input>
                <input placeholder="Link"className="inputbox" onChange={e => (setImageUrl(e.target.value))} value={imageUrl}></input>
                <input placeholder="Price"className="inputbox" onChange={e => (setPrice(e.target.value))} value={price}></input>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={e => updateInfo(e)}>Edit</button>
            </div>

            </div>
        </div>
        </div>
    </div>
    )
}