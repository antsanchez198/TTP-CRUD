const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//Upload a listing
app.post("/items", async (req,res) =>{
    try {
        const { item_description, item_photo, item_price } = req.body;
        const newItem = await pool.query("INSERT INTO listings (item_description, item_photo, item_price) VALUES ($1, $2, $3) RETURNING *",
        [item_description, item_photo, item_price]
        );

        res.json(newItem.rows);
    } catch (error) {
        console.error(error.message);
    }
})

//Get all Items
app.get("/", async (req,res) =>{
    try{
        const allItems = await pool.query("SELECT * FROM listings");
        res.json(allItems.rows);
    }catch(err){
        console.error(err);
    }
})

//Get one item
app.get("/item/:id", async (req, res) =>{
    try{
        const { id } = req.params;
        const item = await pool.query("SELECT * FROM listings WHERE item_id = $1", [id]);
        res.json(item.rows[0]);
    }catch(err){
        console.error(err.message);
    }
});

//Update a item
app.put("/item/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const { item_description, item_photo, item_price } = req.body;
        const updateItem = await pool.query("UPDATE listings SET item_description = $1, item_photo = $2, item_price = $3 WHERE item_id = $4",
        [item_description, item_photo, item_price, id]);
        res.json(updateItem.rows[0]);
    } catch (err) {
        console.error(err);
        console.log("hello...")
    }
})

//Delete a item
app.delete("/item/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const deletedItem = await pool.query("DELETE FROM listings WHERE item_id = $1",[id]);
        res.json("Item was deleted!");
    }catch(err){
        console.error(err)
    }
})


app.listen(5000, ()=>{
    console.log("Server has started on port 5000");
})