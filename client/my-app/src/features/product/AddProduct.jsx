import { useState } from "react";
import { useAddProductQuery } from "./productApiSlice";

const AddProductForm = () => {
  const [addProduct, { isError, isSuccess }] = useAddProductItemMuation()
  const [formData, setFromData] = useState({
    name: '',
    code: '',
    describtion: '',
    price: 0,
    search: []
  });


}