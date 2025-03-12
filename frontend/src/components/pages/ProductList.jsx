import { useEffect } from "react";
import { useProductStore } from "../store/productStore";
import toast from "react-hot-toast";
import UpdatePopup from "./UpdatePopup";

const ProductList = () => {
  const { fetchProducts, products, openUpdatePopup, isUpdatePopupOpen } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const {deleteProduct } = useProductStore()

  const handleDelete = async (pid) => {
    const {success, message} = await deleteProduct(pid)
    if(success){
      toast.success(message)
     }else{
      toast.error(message)
     }
  }

  return (
    <>
      <div></div>
      <h1 style={{ textAlign: "center" }}>Product List</h1>
      {products.length === 0 && (
        <h1 style={{ textAlign: "center" }}>No Product Found...</h1>
      )}
      {products.map((item) => {
        return (
          <div className="product_List" key={item._id}>
            <div className="card">
              <img
                src={item.img}
                alt={item.name}
                height="190px"
                width="260px"
                style={{ borderRadius: "20px" }}
              />
              <p>{item.name}</p>
              <p>Rs.{item.price}</p>
              <button onClick={() => handleDelete(item._id)}>delete</button>
              <button onClick={() => openUpdatePopup(item)}>update</button>
            </div>
          </div>
        );
      })}
      {isUpdatePopupOpen && <UpdatePopup />}
    </>
  );
};

export default ProductList;
