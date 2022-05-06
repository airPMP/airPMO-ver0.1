import React, { useState, useEffect } from 'react'
import { ProjectObjectData, QuantityTOAchivedData } from "../../SimplerR/auth";
const ManpowerAndMachinery = ({ closeModal, productivitysheetobject, productivitysheetarray }) => {

  const projectobjectdata = ProjectObjectData.use()
  const quantitytoachivedData = QuantityTOAchivedData.use()
  const [GANG_PRODUCTIVIVY, setGANG_PRODUCTIVIVY] = useState(null)
  const [totaltimegangproductivity, setTotalTimeGangProductivity] = useState(null)
  const [totalgangproductivity, setTotalGangProductivity] = useState(null)
  const [data12, setdata12] = useState(null)




  useEffect(() => {
    ArrangedataFun()

  }, [productivitysheetobject])

  const ArrangedataFun = () => {

    productivitysheetobject.totaltime = projectobjectdata?.min_hours //add total time in productive sheeet data
    setGANG_PRODUCTIVIVY(productivitysheetobject[" GANG PRODUCTIVIVY (APRVD. BY PM) "])
    setTotalGangProductivity(productivitysheetobject[" GANG PRODUCTIVIVY (APRVD. BY PM) "])
    QuantityTOAchivedData.set(productivitysheetobject[" GANG PRODUCTIVIVY (APRVD. BY PM) "])
    // console.log(projectobjectdata?.min_hours)

    // setTotalTimeGangProductivity(productivitysheetobject["totaltime"]) 
    setTotalTimeGangProductivity(productivitysheetobject[" GANG PRODUCTIVIVY (APRVD. BY PM) "])


    let data1 = Object.entries(productivitysheetobject).slice(4, -1).map(([key, value], i, items) => {

      return <tr className="rounded  bg-[#ECF1F0] ">
        <th className="py-[10px]" >{i + 1}</th>
        <th className="">{key}</th>
        <th className="">{"i"}</th>
        <th className="">{(value / totalgangproductivity * GANG_PRODUCTIVIVY).toFixed(2)}</th>
        <th className="">{(totaltimegangproductivity * (value / totalgangproductivity * GANG_PRODUCTIVIVY)
        ).toFixed(2)}</th>
      </tr>



    })

    console.log(data1)
  }

  const GangProductData = (e, data) => {
    setGANG_PRODUCTIVIVY(e.target.value)
    QuantityTOAchivedData.set(e.target.value)

  }





  return (
    <div className="max-w-[100%]     overflow-hidden bg-[#FFFFFF] justify-center items-center  my-[10px] mt-[20px]  pb-[20px] rounded-[31.529px]">
      <div className="flex flex-row justify-Start content-center items-center pl-[17.9px] ">

        <div className=" w-[138.92px] font-secondaryFont ml-[18.65px]  mt-[11.51px] text-[#000000]  font-medium not-italic text-[28.09px] tracking-[-0.02em]">
          Manpower&#160;&&#160;Machinery
        </div>
      </div>
      {/* scroll_bar_Manpower */}
      <div className="flex flex-row mt-[30px] ml-[37px] mr-[20px]   scroll_bar_Manpower">
        <table className=" w-[100%]  pt-[24px] ml-[40px] ">
          <thead className="font-secondaryFont text-[#000000] font-normal 
          not-italic text-[12px] leading-[20px] tracking-[-2%] py-[36px]   ">
            <tr className="bg-[#ECF1F0]  h-[40px]   ">
              <th className="  ">SL No.</th>
              <th className=" ">Designation</th>
              <th className=" ">Unit</th>
              <th className=" ">No</th>
              <th className=" ">Total Hours</th>
            </tr>
            <tr className="p-[15px] ">
              <td className="p-[10px]" ></td>
            </tr>
          </thead>
          {productivitysheetarray?.map((item, index) => (
            <>
              {
                Object.entries(productivitysheetobject).slice(4, -2).map(([key, value], i, items) => {


                  return <> {
                    value !== 0 ? <tbody
                      className=" max-w-[100%] font-secondaryFont   text-[#000000] 
                      font-normal not-italic text-[12px]   "

                    >
                      <tr className="rounded  bg-[#ECF1F0]   h-[40px]   ">
                        <th className=" ">{i + 1}</th>
                        <th className="">{key}</th>
                        <th className="">{item[" UNIT "]}</th>
                        {/* <th className="">{(value / totalgangproductivity * GANG_PRODUCTIVIVY).toFixed(2)}</th> */}
                        <th className="">{(value / totalgangproductivity * GANG_PRODUCTIVIVY).toFixed(2)}</th>
                        <th className="">{((totaltimegangproductivity * (value / totalgangproductivity * GANG_PRODUCTIVIVY)
                        )).toFixed(2)}</th>

                      </tr>
                      <tr className="m-0 p-0 h-[20px]"  >
                        <th  ></th>
                      </tr>

                    </tbody>
                      :
                      <>
                      </>}
                  </>

                })
              }

            </>

          ))}
        </table>

      </div>

      <div className="flex flex-row justify-between  px-[50px]  mt-[42px]">
        <div className="mr-[45px]  ml-[30px]">
          <div className="w-[100%]   h-[25px] rounded text-sm font-secondaryFont text-[12px] 
           font-medium not-italic    text-[#000000] ">
            <div className="flex">
              <span className="pb-2"> Quantity to be achieved  :
              </span>
              {/* 15  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nos */}
              <span className=" "> <input type='number' placeholder="Gang Productivity"
                className="border-none  px-2  gang_product_input"
                value={GANG_PRODUCTIVIVY}
                onChange={(e) => GangProductData(e)}
              />
              </span>
            </div>

          </div>
        </div>
        {/* <div className="flex flex-row  mr-[-30px]">
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
        </div> */}
      </div>
    </div>
  );
};

export default ManpowerAndMachinery;
