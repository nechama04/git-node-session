
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useGetOrdersByUserQuery } from "./ordersApiSlice";
const History = () => {
    const { data: allOrders, isLoading, isSuccess, isError, error } = useGetOrdersByUserQuery()
    console.log("all orders", allOrders);
    
    /*history = all orders.filter*/
    return (
        <div className="card">
            <DataTable value={allOrders} tableStyle={{ minWidth: '40rem' }}>
                <Column field="orderDate" header="orderDate"></Column>
                <Column field="updatedAt" header="lastUpdated"></Column>
                <Column field="price" header="price"></Column>
            </DataTable>
        </div>
    );

}
export default History