/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBills, deleteBill, setUpdateById } from '../../Slicer/BillSlicer';
import { useNavigate } from "react-router-dom";

const Bills = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [sortedBills, setSortedBills] = useState([]);
    const [sortDirection, setSortDirection] = useState("asc");
    const [sortCriteria, setSortCriteria] = useState("");
    const billList = useSelector((state) => state.bill.bills);

    useEffect(() => {
        dispatch(fetchBills());
    }, [dispatch]);

    useEffect(() => {
        setSortedBills(billList);
    }, [billList]);

   
    const handelUpdate=(id)=>{
        console.log(id);
        dispatch(setUpdateById(id))
         navigate(`/updateBills/${id}`
         )}


    const sortBills = (criteria) => {
        const sortedArray = [...billList]; // Copy the bill list so we don't mutate the original state

        sortedArray.sort((a, b) => {
            if (criteria === "paidAmount") {
                // Compare paidAmount values (numerically)
                return sortDirection === "asc" ? a.paidAmount - b.paidAmount : b.paidAmount - a.paidAmount;
            } else if (criteria === "date") {
                // Compare dates (chronologically)
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
            }
            return 0; // Default return if no criteria is matched
        });

        setSortedBills(sortedArray);  // Update the state with the sorted array
    };

    // Toggle sort direction between ascending and descending
    const toggleSortDirection = (criteria) => {
        setSortCriteria(criteria);  // Set the field we're sorting by
        setSortDirection(prevDirection => prevDirection === "asc" ? "desc" : "asc");  // Toggle between "asc" and "desc"
        sortBills(criteria);  // Call the sort function with the chosen criteria
    };

    // Filter the bills based on the search term
    const filteredBills = sortedBills.filter(bill =>
        bill.customer_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.payment_status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.delivery_address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h3>Bills</h3>

            <div className="option-box row">
                {/* Search */}
                <div className="col-lg-10 search-div d-flex gap-3 align-items-center">
                    <div className="mb-3 w-50">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by customer, payment type, or address"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                        />
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-dark" onClick={() => sortBills("criteria")}>Sort</button>
                    </div>
                </div>

                {/* Sort Dropdown */}
                <div className="dropdown col-lg-2">
                    <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className='bx bx-sort-up'></i> Sort
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><button className="dropdown-item" onClick={() => toggleSortDirection("paidAmount")}>Sort by Paid Amount</button></li>
                        <li><button className="dropdown-item" onClick={() => toggleSortDirection("date")}>Sort by Date</button></li>
                    </ul>
                </div>
            </div>

            {/* Bill List */}
            <div className="tables">
                <div className="card">
                    <h5 className="card-header">Bill List</h5>
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead>
                                <tr className="text-nowrap">
                                    {["Bill ID", "Customer ID", "Card ID", "Total Amount", "Payment Status", "Delivery Address", "Delivery charge", "status", "actions"].map((value) => (
                                        <th key={value} className="text-nowrap">{value}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                                {filteredBills.length > 0 ? (
                                    filteredBills.map((val) => (
                                        <tr key={val.id}>
                                            <td className="text-nowrap">{val.id}</td>
                                            <td className="text-nowrap">{val.customer_id}</td>
                                            <td className="text-nowrap">{val.cart_id}</td>
                                            <td className="text-nowrap">{val.total_amount}</td>
                                            <td className="text-nowrap">{val.payment_status}</td>
                                            <td className="text-nowrap">{val.delivery_address}</td>
                                            <td className="text-nowrap">{val.delivery_charge}</td>
                                            <td className="text-nowrap">{val.status}</td>
                                            <td className="text-nowrap d-flex align-items-center gap-2">

                                                <button className='btn btn-success btn-sm ' onClick={()=>handelUpdate(val.id)} ><i className='bx bx-edit'></i></button>

                                                <button
                                                    className='btn btn-danger btn-sm'
                                                    onClick={() => dispatch(deleteBill(val.id))} // Handle delete
                                                >
                                                    <i className='bx bxs-trash'></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center">No bills found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Pagination (if needed) */}
            <nav aria-label="Page navigation example ">
                <ul className="pagination justify-content-end m-4">
                    <li className="page-item disabled">
                        <a className="page-link" href="#" tabIndex="-1">Previous</a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Bills;
