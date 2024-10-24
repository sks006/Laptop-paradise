import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createProcessing } from '../../Slicer/ProcessingSlicer';

function CreateProcessing() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        ram: '',
        processor: '',
        display: '',
        rom: '',
        gpu: '',
        dimension: '',
        color: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProcessing(formData))
            .unwrap()
            .then(() => {
                // Redirect or show success message
                navigate('/processing'); // Redirect to the processing list page
            })
            .catch((error) => {
                console.error('Failed to create processing device:', error);
                // Optionally handle error (e.g., show an alert)
            });
    };

    return (
        <div>
            <h3>Add a new Processing</h3>
            <p>Orders placed across your store</p>
            <div className="mb-3 col-md-12">
                <Link to="/processing">
                    <button className='btn btn-primary'>Back</button></Link>
            </div>

            <div className="">
                <form className='row' onSubmit={handleSubmit}>
                <div className='col-md-6 col-sm-12 bg-light'>

                    
                        <h4 className='text-white'>Product information</h4>
                        <div className="mb-3">
                            <label for="exampleDataList" class="form-label">Datalist example</label>
                            <input class="form-control" value={formData.name} onChange={handleChange} list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
                            <datalist id="datalistOptions">
                                <option value="San Francisco" />
                                <option value="New York" />
                                <option value="Seattle" />
                                <option value="Los Angeles" />
                                <option value="Chicago" />
                            </datalist>
                            <label htmlFor="exampleFormControlSelect1" className="form-label">RAM</label>
                            <input type="text" className="form-control" placeholder='Ram' value={formData.ram} onChange={handleChange}/>
                            <label htmlFor="exampleFormControlSelect1" className="form-label">Processor</label>
                            <input type="text" className="form-control" placeholder='Processor'  value={formData.processor} onChange={handleChange}/>
                            <label htmlFor="exampleFormControlSelect1" className="form-label">Display</label>
                            <input type="text" className="form-control" placeholder='Display' value={formData.display} onChange={handleChange} />


                        </div>

                   
                </div>
                <div className='col-md-6 pt-5 col-sm-12 bg-light'>

                    <label htmlFor="exampleFormControlSelect1" className="form-label">ROM</label>
                    <input type="text" className="form-control" placeholder='Rom' value={formData.rom}  onChange={handleChange}/>
                    <label htmlFor="exampleFormControlSelect1" className="form-label">GPU</label>
                    <input type="text" className="form-control" placeholder='GPU'  value={formData.gpu} onChange={handleChange}/>
                    <label htmlFor="exampleFormControlSelect1" className="form-label">Dimension</label>
                    <input type="text" className="form-control" placeholder='Dimension'  value={formData.dimension} onChange={handleChange}/>
                    <label htmlFor="exampleFormControlSelect1" className="form-label">Color</label>
                    <input type="text" className="form-control" placeholder='Color'  value={formData.color} onChange={handleChange}/>



                </div>
                <div className="mb-3">
                    <button type='submit' className="btn btn-dark">Submit</button>
                </div>
                </form>
            </div>

        </div>
    )
}

export default CreateProcessing