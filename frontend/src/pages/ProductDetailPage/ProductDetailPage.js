import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetailPage.css";
import useAuth from "../../hooks/useAuth";
import Product_Reviews from "../../components/Products/ProductReviews/Product_Review";

const ProductDetailPage = () => {
    const {productId} = useParams();
    const [product, setProduct] = useState({});
    const [product_review, setPD_Reviews] = useState({});
    const [user, token] = useAuth();
    console.log(product);

        useEffect(() => {
        
            fetchProduct();
        }, [productId]);

        const fetchProduct = async () => {
          try {
            let response = await axios.get(`http://127.0.0.1:8000/api/product/${productId}/`,{
                headers: {
                    Authorization: "Bearer " + token,
          }});
            setProduct(response.data)
                } catch (error) {
                    console.log(error.response.data)
                }
    };


    return (
        <div className="my-flex-container">
            <div className='product-table-container'>
                <table className='table table-bordered table-stripped'>
                    <thead>
                        <tr>
                            <th>Product Brand</th>
                            <th>Product Name</th>
                            <th>Product Type</th>
                            <th>Product Price</th>
                        </tr>
                    </thead>
                    <tbody>           
                        <tr>
                            <td>{product[0]?.product_brand}</td>
                            <td>{product[0]?.product_name}</td>
                            <td>{product[0]?.product_type}</td>
                            <td>{product[0]?.product_price}</td>    
                        </tr>      
                    </tbody>
                </table>
            </div> 

            <div className="my-flex-container">
                <Product_Reviews setPD_Reviews={setPD_Reviews} />
            </div>
        </div>
    );
};

export default ProductDetailPage;

