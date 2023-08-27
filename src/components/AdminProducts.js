import React, {useState, useEffect} from 'react'
import { fetchAllProducts, editProduct, isActiveToFalse, isActivateToTrue } from '../axios-services/products';
import Modal from './Modal';


const AdminProducts = () => {

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedProduct, setEditedProduct] = useState({
        title: '',
        author: '',
        price: '',
        category: '',
        format: '',
        overview: '',
        isactive: true,
        qtyavailable: '',
        imageurl: '',
      });
    const handleEdit = (productId) => {
        const productToEdit = products.find(product => product.id === productId);
        setSelectedProduct(productToEdit);
        setEditedProduct(productToEdit);
        setIsEditModalOpen(true);
      };
    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        setSelectedProduct(null);
        setEditedProduct({
            title: '',
            author: '',
            price: '',
            category: '',
            format: '',
            overview: '',
            isactive: true,
            qtyavailable: '',
            imageurl: '',
        });
      };
      const handleEditFormSubmit = async (event) => {
        event.preventDefault();
        try {
          const updatedProduct = await editProduct(selectedProduct.id, editedProduct);
          setIsEditModalOpen(false);
          setProducts(prevProducts =>
            prevProducts.map(product =>
              product.id === selectedProduct.id ? updatedProduct : product
            )
          );
        } catch (error) {
          console.error('Error editing product:', error);
        }
      };

    useEffect(() => {
        getProducts();
      }, []);

    const getProducts = async () => {
        try {
          const productData = await fetchAllProducts();
          setProducts(productData.products)
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      const handleDeactivateProduct = async (productId) => {
        try {
          await isActiveToFalse(productId);
          setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
        } catch (error) {
          console.error('Error removing product:', error);
        }
      };
      const handleReactivateProduct = async (productId) => {
        try {
          await isActivateToTrue(productId);
          setProducts(prevProducts =>
            prevProducts.map(product =>
              product.id === productId ? { ...product, isactive: true } : product
            )
          );
        } catch (error) {
          console.error('Error reactivating product:', error);
        }
      };
    
  return (
     <div>
      <h1>All Products</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Availability</th>

            {/* Add more table headers for other attributes */}
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.author}</td>
              <td>${product.price}</td>
              <td>{product.isactive ? 'Active' : 'Inactive'}</td>
              <td>
        <button onClick={() => handleEdit(product.id)}>Edit</button>

        {product.isactive ? (
        <button onClick={() => handleDeactivateProduct(product.id)}>Deactivate</button>
           ) : (
        <button onClick={() => handleReactivateProduct(product.id)}>Reactivate</button>
          )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditModalOpen && (
        <Modal title="Edit Product" closeModal={handleEditModalClose}>
          <form onSubmit={handleEditFormSubmit}>
           <label> Title: </label>
            <input
              type="text"
              name="title"
              value={editedProduct.title}
              onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })}
            />
            <br/>
            <label>Author:</label>
            <input
              type="text"
              name="author"
              value={editedProduct.author}
              onChange={(e) => setEditedProduct({ ...editedProduct, author: e.target.value })}
            />
            <br/>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={editedProduct.price}
              onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
            />
            <br/>
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={editedProduct.category}
              onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
            />
            <br/>
            <label>Format:</label>
            <input
              type="text"
              name="format"
              value={editedProduct.format}
              onChange={(e) => setEditedProduct({ ...editedProduct, format: e.target.value })}
            />
            <br/>
            <label>Overview:</label>
            <input
              type="text"
              name="overview"
              value={editedProduct.overview}
              onChange={(e) => setEditedProduct({ ...editedProduct, overview: e.target.value })}
            />
            <br/>
            <label>Availability:</label>
            <input
              type="checkbox"
              name="isactive"
              value={editedProduct.isactive}
              onChange={(e) => setEditedProduct({ ...editedProduct, isactive: e.target.value })}
            />
            <br/>
            <label>Quantity:</label>
            <input
              type="number"
              name="qtyavailable"
              value={editedProduct.qtyavailable}
              onChange={(e) => setEditedProduct({ ...editedProduct, qtyavailable: e.target.value })}
            />
            <br/>
            <label>Img Url:</label>
            <input
              type="text"
              name="imageurl"
              value={editedProduct.imageurl}
              onChange={(e) => setEditedProduct({ ...editedProduct, imageurl: e.target.value })}
            />
            <br/>
            

            <button type="submit">Save Changes</button>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default AdminProducts
