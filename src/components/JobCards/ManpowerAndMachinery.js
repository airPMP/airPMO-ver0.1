import React from "react";
const ManpowerAndMachinery = ({ closeModal }) => {


  const ManpowerAndMachinery = [
    { "designation": "Electrician", "unit": "No", "no": "1", "totalhours": "10" },
    { "designation": "Electrician", "unit": "No", "no": "1", "totalhours": "10" },
    { "designation": "Electrician", "unit": "No", "no": "1", "totalhours": "10" },
    { "designation": "Electrician", "unit": "No", "no": "1", "totalhours": "10" },
    { "designation": "Electrician", "unit": "No", "no": "1", "totalhours": "10" },
    
    
  ]


  return (
    <div className="max-w-[734px]  scroll_bar_Manpower  overflow-hidden bg-[#FFFFFF] justify-center items-center  my-[10px] mt-[20px]  pb-[20px] rounded-[31.529px]">
      <div className="flex flex-row justify-Start content-center items-center pl-[17.9px] ">

        <div className=" w-[138.92px] font-secondaryFont ml-[18.65px]  mt-[11.51px] text-[#000000]  font-medium not-italic text-[28.09px] tracking-[-0.02em]">
          Manpower&#160;&&#160;Machinery
        </div>
      </div>
      <div className="flex flex-row mt-[30px] ml-[37px] mr-[20px]">
        <table className=" w-[631px]  pt-[24px] ml-[40px]">
          <thead className="font-secondaryFont text-[#000000] font-normal not-italic text-[12px] leading-[20px] tracking-[-2%] py-[36px] ">
            <tr className="bg-[#ECF1F0]">
              <th className="py-[20px]">SL No.</th>
              <th className="">Designation</th>
              <th className="">Unit</th>
              <th className="">No</th>
              <th className="">Total Hours</th>
            </tr>
            <tr className="p-[15px] ">
                <td className="p-[10px]" ></td>
              </tr>
          </thead>

          {ManpowerAndMachinery?.map((item, i) => {
            return <tbody

              className=" max-w-[631px] font-secondaryFont   text-[#000000] font-normal not-italic text-[12px] leading-[20px] tracking-[-2%]"
            >
              <tr className="rounded  bg-[#ECF1F0] "   >
                <th className="py-[10px]">{i + 1}</th>
                <th className="">{item.designation}</th>
                <th className="">{item.unit}</th>
                <th className="">{item.no}</th>
                <th className="">{item.totalhours}</th>
              </tr>
              <tr className="p-[15px] ">
                <td className="p-[10px]" ></td>
              </tr>

            </tbody>
          })}
        </table>
      </div>

      <div className="flex flex-row justify-between  px-[50px]  mt-[42px]">
        <div className="mr-[45px] border-b solid border-black ml-[30px]">
          <div className="w-[200px]  h-[25px] rounded text-sm font-secondaryFont text-[12px]  font-medium not-italic    text-[#000000] ">
            Quantity to be achieved   :   15  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nos
             
          </div>
        </div>
        <div className="flex flex-row  mr-[-30px]">
          <div className="mr-[26px] shadow-[buttonshadow] ">

            <button onClick={closeModal} className="w-[66.79px] btnshadow self-center h-[16.7px] rounded text-sm font-secondaryFont text-[9.35px] text-center font-medium not-italic items-center  bg-[#F42424] text-[#000000] ">
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
