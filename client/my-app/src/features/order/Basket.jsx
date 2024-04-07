import React, { useState, useEffect, useRef } from 'react';
import { OrderList } from 'primereact/orderlist';
import { useGetBasketQuery,useGetOrdersQuery,useUpdatePaidMutation } from './ordersApiSlice'
import axios from 'axios'
import { Button } from "primereact/button";
import { useRemoveProductMutation } from './ordersApiSlice'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';



const Basket = () => {

    const { data: basket, isLoading, isSuccess, isError, error } = useGetBasketQuery()
    const { data: order, isLoading2,isSuccess: isSuccess2} = useGetOrdersQuery()
    
    const [removeProduct] = useRemoveProductMutation()
    const[updatePaid]=useUpdatePaidMutation()

    const toast = useRef(null);

    const accept = () => {
        let o;
        order.forEach(element => {
            if(element.paid==0)
                o=element
        });
        console.log("ooooooo");
        console.log(o);
        updatePaid(o._id)
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Your order is finish', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const confirm2 = () => {
        confirmDialog({
            message: `Do you want to confirn the order?it is cost ${basket.price} ₪`,
            header: 'Order Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };




    const [prodList, setProdList] = useState([]);
    console.log("begin of basket page:", basket);
    console.log("prodList ",prodList);
    const createList = async () => {
        console.log(basket);
        
        let p = []
        if(basket.productsList){
        for (let index = 0; index < basket.productsList.length; index++) {
            const data = await axios.get('http://localhost:1000/api/product/' + basket.productsList[index]);
            p.push(data.data)
        }
        setProdList(p)
    }}

    useEffect(() => {

        if (isSuccess) {
            createList()
        }
    if(isSuccess2){
        // createList()
        setProdList([])
    }
        
    },[isSuccess,basket,isSuccess2]);

    const handleDelete = async (item) => {
       if (isSuccess){
            await removeProduct(item._id)
            await createList();
       }       
        
    }
    const itemTemplate = (item) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={item.image} alt={item.name} />
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{item.name}</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                    </div>
                </div>
                <Button icon="pi pi-heart" rounded severity="help" aria-label="Favorite" />
                <Button icon="pi pi-times" rounded severity="danger" aria-label="Cancel" onClick={() => handleDelete(item)} />
                <span className="font-bold text-900">${item.price}</span>

            </div>
        );
    };

    return (
        <>
        <div className="card xl:flex xl:justify-content-center">
            <OrderList dataKey="id" value={prodList}
                // onChange={prodList=e.value} 
                itemTemplate={itemTemplate} header="MyBasket"></OrderList>
            {console.log("basket.price in end of func", basket)}
           {isSuccess?<Button label={`Overall: ${basket.price} ₪`} severity="help" /> :
           <Button label="0" severity="help" />} 
           
        </div>
        <Toast ref={toast} />
            <ConfirmDialog />
            <div className="card flex flex-wrap gap-2 justify-content-center">
                <Button onClick={confirm2} icon="pi pi-check" label="Finish order" className="mr-2"></Button>
                
            </div>
        
        </>
    )
}


export default Basket



