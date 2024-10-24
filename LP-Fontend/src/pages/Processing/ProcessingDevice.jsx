import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProcessing, deleteProcessing } from '../../Slicer/ProcessingSlicer'; 

function ProcessingDevice() {
    const dispatch = useDispatch();
    const {processing}= useSelector((state) => state.processing);

    useEffect(() => {
        dispatch(fetchProcessing());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteProcessing(id));
    };

    const columnNames = [
        {id:1,val:"Processing ID"}, {id:2, val: "Ram"}, {id:3, val:"Rom"}, {id:4, val:"Processor"}, {id:5, val:"GPU"}, {id:6, val:"Display"}, {id:7, val:"Dimension"},
        {id:8, vla:"Colors"}, {id:9, val:"Action"}
    ];

  return (
    <div>
    <h3>Processing...</h3>

    <div className="option-box row">
        <div className="mb-3 col-md-12">
            <Link to="/createProcessing">
                <button className='btn btn-primary'>Add Processing</button></Link>
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
            <h5 className="card-header">Responsive Table</h5>
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

                        {processing.map((val) => {
                            return (
                                <tr key={val.id}>
                                    <td className="text-nowrap">{val.id}</td>
                                    <td className="text-nowrap">{val.ram}</td>
                                    <td className="text-nowrap">{val.rom}</td>
                                    <td className="text-nowrap">{val.processor}</td>
                                    <td className="text-nowrap">{val.gpu}</td>
                                    <td className="text-nowrap">{val.display}</td>
                                    <td className="text-nowrap">{val.Dimension}</td>
                                    <td className="text-nowrap">{val.color}</td>
                                    <td className="text-nowrap d-flex align-items-center gap-2">
                                        <button className='btn btn-success btn-sm'><i className='bx bx-edit'></i></button>
                                        <button onClick={()=>{handleDelete(devices.id)}} className='btn btn-danger btn-sm'><i className='bx bxs-trash' ></i></button>
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

export default ProcessingDevice