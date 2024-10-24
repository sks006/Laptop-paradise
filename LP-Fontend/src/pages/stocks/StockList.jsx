import React from 'react'
import { Link } from 'react-router-dom'

const StockList = () => {

  const columnNames = [
    "Stock ID", "Product ID", "Supplier Id", "Quantity", "Buying Price", "Selling Price","Discount", "Voucher Img", "Sku", "Action"];

  const StockList = [
    { id: 1, productId: "69", supplierId: "Ahmed Sabbir", quantity: 10, buyingPrice: "7878", sellingPrice: "8787", discount: "8787", voucherImg: 's.png', sku: 's5787875' },
    { id: 2, productId: "69", supplierId: "Ahmed Sabbir", quantity: 10, buyingPrice: "7878", sellingPrice: "8787", discount: "8787", voucherImg: 's.png', sku: 's5787875' },
    { id: 3, productId: "69", supplierId: "Ahmed Sabbir", quantity: 10, buyingPrice: "7878", sellingPrice: "8787", discount: "8787", voucherImg: 's.png', sku: 's5787875' },
    { id: 4, productId: "69", supplierId: "Ahmed Sabbir", quantity: 10, buyingPrice: "7878", sellingPrice: "8787", discount: "8787", voucherImg: 's.png', sku: 's5787875' },
    { id: 5, productId: "69", supplierId: "Ahmed Sabbir", quantity: 10, buyingPrice: "7878", sellingPrice: "8787", discount: "8787", voucherImg: 's.png', sku: 's5787875' },
    { id: 6, productId: "69", supplierId: "Ahmed Sabbir", quantity: 10, buyingPrice: "7878", sellingPrice: "8787", discount: "8787", voucherImg: 's.png', sku: 's5787875' },
    { id: 7, productId: "69", supplierId: "Ahmed Sabbir", quantity: 10, buyingPrice: "7878", sellingPrice: "8787", discount: "8787", voucherImg: 's.png', sku: 's5787875' },
    { id: 8, productId: "69", supplierId: "Ahmed Sabbir", quantity: 10, buyingPrice: "7878", sellingPrice: "8787", discount: "8787", voucherImg: 's.png', sku: 's5787875' },
    { id: 9, productId: "69", supplierId: "Ahmed Sabbir", quantity: 10, buyingPrice: "7878", sellingPrice: "8787", discount: "8787", voucherImg: 's.png', sku: 's5787875' },


  ]
  return (
    <div>
      <h3>Stocks</h3>

      <div className="option-box row">
        <div className="mb-3 col-md-12">
          <Link to="/addStocks">
            <button className='btn btn-primary'>Add Stock</button>
          </Link>
        </div>

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
          <h5 className="card-header">Stock List</h5>
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

                {StockList.map((val) => {
                  return (
                    <tr key={val.id}>
                      <td className="text-nowrap">{val.id}</td>
                      <td className="text-nowrap">{val.productId}</td>
                      <td className="text-nowrap">{val.supplierId}</td>
                      <td className="text-nowrap">{val.quantity}</td>
                      <td className="text-nowrap">{val.buyingPrice}</td>
                      <td className="text-nowrap">{val.sellingPrice}</td> 
                      <td className="text-nowrap">{val.discount}</td> 
                      <td className="text-nowrap">{val.voucherImg}</td>
                      <td className="text-nowrap">{val.sku}</td>
                      <td className="text-nowrap d-flex align-items-center gap-2">
                        <button className='btn btn-success btn-sm'><i className='bx bx-edit'></i></button>
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

export default StockList



