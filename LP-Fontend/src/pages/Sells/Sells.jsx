import React from 'react'

function Sells() {
    const columnNames = ["Ordinary ID", "Total", "Discount Price", "Action"];

    const BrandList = [
        { id: 1, total: "50000", discount_price: "500" },
        { id: 2, total: "60000 ", discount_price: "500" },
        { id: 3, total: "60000", discount_price: "500" },
        { id: 4, total: "60000", discount_price: "500" },
        { id: 5, total: "60000 ", discount_price: "500" },
       

    ]
    return (
        <div>
            <h3>Sells</h3>

            <div className="option-box row">

                {/* <!-- Modal --> */}
                <div className="mb-3 col-md-12">

                    
                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">Update Sells Table</h5>

                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">

                                    <div className="mb-3">
                                        <label for="exampleFormControlInput1" className="form-label">Total Price</label>
                                        <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="Total Price" />
                                    </div>

                                    <div className="mb-3">
                                        <label for="formFile" className="form-label">Discount Price </label>
                                        <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="Discount Price"/>
                                    </div>



                                </div>
                                <div className="modal-footer">

                                    <button type="button" className="btn btn-primary">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Search --> */}
                <div className="col-md-12 search-div d-flex gap-3 align-items-center">
                    <div className="mb-3 w-50">
                        <input type="text" className="form-control" placeholder="Search" />
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-dark">Search</button>
                    </div>

                </div>
            </div>


            <div className="tables">



                {/* <!-- Responsive Table --> */}
                <div className="card">
                    <h5 className="card-header">Sells List</h5>
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead>
                                <tr className="text-nowrap">

                                    {columnNames.map((value) => {
                                        return (
                                            <th key={value} className="text-nowrap">{value}</th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">

                                {BrandList.map((val) => {
                                    return (
                                        <tr>

                                            <td className="text-nowrap">{val.id}</td>
                                            <td className="text-nowrap">{val.total}</td>
                                            <td className="text-nowrap">{val.discount_price}</td>
                                            <td className="text-nowrap d-flex align-items-center gap-2">
                                                <button className='btn btn-success btn-sm ' data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button" ><i className='bx bx-edit'></i></button>

                                                <button className='btn btn-danger btn-sm'><i className='bx bxs-trash' ></i></button>
                                            </td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            <nav aria-label="Page navigation example ">
                <ul className="pagination justify-content-end m-4 ">
                    <li className="page-item disabled">
                        <a className="page-link" href="#" tabindex="-1">Previous</a>
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
    )
}

export default Sells