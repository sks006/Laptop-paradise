import React from 'react'

const AddStock = () => {
  return (
    <div className=''>
      <h3>Add a new Stocks</h3>
      <div className="card">

          <div className='col-md-12 col-sm-12  rounded'>

            <form typeof='submit'>

              <div className='row px-4 mt-4'>
                <div className="mb-3 col-md-6">
                  <label htmlFor="exampleFormControlSelect1" className="form-label">Product</label>
                  <select className="form-select" id="exampleFormControlSelect1" defaultValue="" aria-label="Default select example">
                    <option selected>Choose Product</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="exampleFormControlSelect1" className="form-label">Supplier</label>
                  <select className="form-select" id="exampleFormControlSelect1" defaultValue="" aria-label="Default select example">
                    <option selected>Choose Supplier</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                <div className="mb-3 col-md-6">
                  <label for="exampleFormControlInput1" className="form-label">Buying Price</label>
                  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="1400 tk" />
                </div>

                <div className="mb-3 col-md-6">
                  <label for="exampleFormControlInput1" className="form-label">Selling Price</label>
                  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="1400 tk" />
                </div>
                <div className="mb-3 col-md-6">
                  <label for="exampleFormControlInput1" className="form-label">Discount</label>
                  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="0.00%" />
                </div>
                <div className="mb-3 col-md-6">
                  <label for="exampleFormControlInput1" className="form-label">Quantity</label>
                  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="1400 tk" />
                </div>


              </div>
              <div className="mb-3 ps-4 col-md-6">
                <label for="formFile" className="form-label">Voucher Image </label>
                <input className="form-control " type="file" id="formFile" />
              </div>

              <div className="p-4">
                <button className="btn btn-dark">Submit</button>
              </div>

            </form>
        </div>
      </div>

    </div>
  )
}

export default AddStock



