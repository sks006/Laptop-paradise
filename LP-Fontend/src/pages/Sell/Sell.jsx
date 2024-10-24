import React from "react";
import SellTable from "./sellTable";


const Sell = () => {
  return (
    <div className="rounded-4 bg-white rounded-lg h-100 p-3">
      <div className="row">
        
        <div className="mt-5">
          <SellTable />
        </div>
      </div>
    </div>
  );
};

export default Sell;
