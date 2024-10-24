import { color } from 'chart.js/helpers';
import React from 'react'

function Admin() {
  const columnNames = [
    {id:'1', val: "Admin Id"}, {id: '2', val: "Admin Name"},
    {id:'3', val: "Email"}, {id: '4', val: "User Name"},
    {id:'5', val: "Password"}, {id: '6', val: "Address"},
    {id:'7', val: "Phone Number"}, {id: '8', val: "Admin Image"},
    {id:'1', val: "Action"}
  ];

  const AdminList = [
    { id: 1, specification: "lorem some ", color: "black" },
    { id: 2, specification: "lorem some", color: "black" },
    { id: 3, specification: "lorem some", color: "black" },
    { id: 4, specification: "lorem some", color: "black" },
    { id: 5, specification: "lorem some", color: "black" },
    { id: 6, specification: "lorem some", color: "black" },

  ]

  return (
    <div>
      <h3>Ordinary</h3>

      <div className="option-box row">

        {/* <!-- Modal --> */}
        <div className="mb-3 col-md-12">

          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Add Ordinary
          </button>
          <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">Add a new Ordinary</h5>

                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">

                  <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Specification</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Name" />
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Email" />
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="User Name" />
                    <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Password" />
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Address" />
                    <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="Phone Number" />
                    <input type="file" className="form-control" id="exampleFormControlInput1" placeholder="Image" />
                  </div>

                 



                </div>
                <div className="modal-footer">

                  <button type="button" className="btn btn-primary">Add</button>
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
          <h5 className="card-header">Admin List</h5>
          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr className="text-nowrap">

                  {columnNames.map((value) => {
                    return (
                      <th key={value.id} className="text-nowrap">{value.val}</th>
                    )
                  })}
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">

                {AdminList.map((val) => {
                  return (
                    <tr key={val.id}>

                      {/* <td className="text-nowrap">{val.id}</td>
                      <td className="text-nowrap">{val}</td>
                      <td className="text-nowrap">{val.color}</td> */}
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

export default Admin