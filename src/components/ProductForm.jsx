import React, { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/api";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const fetchData = async () => {
    const res = await getProducts();
    setProducts(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateProduct(currentId, { name });
      setEditing(false);
      setCurrentId(null);
    } else {
      await createProduct({ name });
    }
    setName("");
    fetchData();
  };

  const handleEdit = (product) => {
    setEditing(true);
    setCurrentId(product.id);
    setName(product.name);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchData();
  };

  return (
    <div className="container">
      <h2>CRUD - Productos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ingresa nombre del producto"
          required
        />
        <button type="submit">{editing ? "Actualizar" : "Agregar"}</button>
      </form>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span className="product-name">{product.name}</span>
            <div className="actions">
              <button className="edit" onClick={() => handleEdit(product)}>Editar</button>
              <button className="delete" onClick={() => handleDelete(product.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default ProductForm;