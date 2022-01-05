import React from "react";
const ManpowerAndMachinery = ({closeModal}) => {
  return (
    <div className="max-w-[734px] max-h-[422.11px]  overflow-hidden bg-[#FFFFFF] justify-center items-center  my-[10px] mt-[20px]  pb-[20px] rounded-[31.529px]">
      <div className="flex flex-row justify-between content-center items-center px-[50px] ">
        <div className="bg-[#F4F7FE] w-[288.28px] flex items-center h-[68.28px] mt-[31.93px]  rounded-full">
          <div className=" font-secondaryFont ml-[30px]  mt-[11.51px] text-[#000000]  font-medium not-italic text-[28.09px] tracking-[-0.02em]">
            Manpower & Machinery
          </div>
        </div>
      </div>
      <div className="flex flex-row mt-[30px]">
        <table className=" w-[631px]  pt-[24px] ml-[40px]">
          <thead className="font-secondaryFont text-[#000000] font-normal not-italic text-[12px] leading-[20px] tracking-[-2%] py-[36px] ">
            <tr>
              <th className="py-[20px]">Sl No.</th>
              <th className="">Designation</th>
              <th className="">Unit</th>
              <th className="">No</th>
              <th className="">Total Hours</th>
            </tr>
          </thead>
          <tbody
            
            className=" max-w-[631px] font-secondaryFont   text-[#000000] font-normal not-italic text-[12px] leading-[20px] tracking-[-2%]"
          >
            <tr className="rounded  " style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }} >
              <th className="py-[10px]">Sl No.</th>
              <th className="">Designation</th>
              <th className="">Unit</th>
              <th className="">No</th>
              <th className="">Total Hours</th>
            </tr>
            <tr className="rounded" style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }} >
              <th className="py-[10px]">Sl No.</th>
              <th className="">Designation</th>
              <th className="">Unit</th>
              <th className="">No</th>
              <th className="">Total Hours</th>
            </tr>
            <tr className="rounded" style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }} >
              <th className="py-[10px]">Sl No.</th>
              <th className="">Designation</th>
              <th className="">Unit</th>
              <th className="">No</th>
              <th className="">Total Hours</th>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-row justify-between  px-[50px]  mt-[42px]">
        <div className="mr-[45px] border-b solid border-black ">
          <div className="w-[200px]  h-[25px] rounded text-sm font-secondaryFont text-[12px]  font-medium not-italic    text-[#000000] ">
          Quantity to be achieved   :   50
          </div>
        </div>
        <div className="flex flex-row ">
          <div className="mr-[26px] shadow-[buttonshadow] ">
        
            <button onClick={closeModal}  className="w-[66.79px] btnshadow self-center h-[16.7px] rounded text-sm font-secondaryFont text-[9.35px] text-center font-medium not-italic items-center  bg-[#F42424] text-[#000000] ">
              Cancel
            </button>
      
          </div>
          <div>
            <button
              type="submit"
              className="w-[66.79px] h-[16.7px] rounded btnshadow  self-center text-sm font-secondaryFont text-[9.35px] font-medium not-italic  bg-[#0FCC7C] text-[#000000] "
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManpowerAndMachinery;
