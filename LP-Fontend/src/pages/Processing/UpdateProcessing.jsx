import React from 'react'

function UpdateProcessing() {
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
                            <label for="exampleDataList" class="form-label">Name</label>
                            <input class="form-control" value={formData.name} name='name' onChange={handleChange} list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
                            <datalist id="datalistOptions">
                                <option value="San Francisco" />
                                <option value="New York" />
                                <option value="Seattle" />
                                <option value="Los Angeles" />
                                <option value="Chicago" />
                            </datalist>
                            <label htmlFor="exampleFormControlSelect1" className="form-label">RAM</label>
                            <input type="text" className="form-control" name='ram'
                                placeholder='Ram' value={formData.ram} onChange={handleChange} />

                            <label htmlFor="exampleFormControlSelect1" className="form-label">Processor</label>
                            <input type="text" className="form-control" placeholder='Processor' name='processor' value={formData.processor} onChange={handleChange} />

                            
                            <label htmlFor="exampleFormControlSelect1" className="form-label">Display</label>
                            <input type="text" name='display' className="form-control" placeholder='Display' value={formData.display} onChange={handleChange} />


                        </div>


                    </div>
                    <div className='col-md-6 pt-5 col-sm-12 bg-light'>

                        <label htmlFor="exampleFormControlSelect1" className="form-label">ROM</label>
                        <input type="text" name='rom' className="form-control" placeholder='Rom' value={formData.rom} onChange={handleChange} />
                        <label htmlFor="exampleFormControlSelect1" className="form-label">GPU</label>
                        <input type="text" className="form-control" placeholder='GPU' name='gpu' value={formData.gpu} onChange={handleChange} />
                        <label htmlFor="exampleFormControlSelect1" className="form-label">Dimension</label>
                        <input type="text" name='dimension' className="form-control" placeholder='Dimension' value={formData.dimension} onChange={handleChange} />
                        <label htmlFor="exampleFormControlSelect1" className="form-label">Color</label>
                        <input type="text" name='color' className="form-control" placeholder='Color' value={formData.color} onChange={handleChange} />



                    </div>
                    <div className="mb-3">
                        <button type='submit' className="btn btn-dark">Submit</button>
                    </div>
                </form>
            </div>

        </div>
  )
}

export default UpdateProcessing