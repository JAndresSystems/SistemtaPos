const itemModel = require('../models/itemModel');

// get items
const getItemController = async (req,res) =>{

    try {
        const items = await itemModel.find();
        res.status(200).send(items);
    } catch (error) {
        console.log(error);
    }

}

//add items 
 const addItemController = async (req,res) =>{
    try {
        const newItem = new itemModel(req.body);
        await  newItem.save();
        res.status(201).send("Item created Successfully!");
    } catch (error) {
        res.status(400).send("error",error);
        console.log(error);

    }
 }


 //Updte item
 const editItemController = async (req, res) => {
    try {
      const { itemId, name, price, image, category } = req.body;
  
      const updatedItem = await itemModel.updateOne(
        { _id: itemId }, // Filtro: busca por el _id del ítem
        { $set: { name, price, image, category } } // Valores a actualizar
      );
  
      if (updatedItem.nModified === 0) {
        return res.status(404).send('Item no encontrado o no hubo cambios');
      }
  
      res.status(200).send('Item actualizado correctamente');
    } catch (error) {
      console.error(error);
      res.status(400).send('Error al actualizar el ítem');
    }
  };
  
  //Delete item
// Controlador para eliminar un ítem
const deleteItemController = async (req, res) => {
  try {
    const { itemId } = req.body;  // O usa req.params si prefieres obtenerlo desde la URL
    const result = await itemModel.findOneAndDelete({ _id: itemId });

    if (!result) {
      return res.status(404).json({ message: "Item no encontrado" });
    }

    res.status(200).json({ message: "Item eliminado correctamente" });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

  


module.exports = {getItemController,addItemController,editItemController,deleteItemController}


