import { useState } from "react";
import { useProductStore } from "../store/productStore";
import toast from "react-hot-toast";


const CreateProduct = () => {

  const [newProduct, setNewProduct] = useState({
    name : "",
    price : "",
    img : ""
  })



  const {createProduct} = useProductStore()

  const handleProduct = async () => {
     const {success, message} = await createProduct(newProduct)
     if(success){
      toast.success(message)
     }else{
      toast.error(message)
     }
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Create New Product</h1>
      <div className="create-container">
        <input type="text" name="name" id="name" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name : e.target.value})} />
        <input type="number" name="price" id="price" placeholder="Enter Price" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price : e.target.value})}/>
        <input type="text" name="img" id="img" placeholder="Enter Image Url" value={newProduct.img} onChange={(e) => setNewProduct({...newProduct, img: e.target.value})} />
        <button type="submit" onClick={handleProduct}>Create Product</button>
      </div>
    </>
  );
};

export default CreateProduct;
