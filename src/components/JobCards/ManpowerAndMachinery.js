import React, { useState, useEffect } from 'react'
import { MyJobcardActivityCoard, ProjectObjectData, QuantityTOAchivedData } from "../../SimplerR/auth";
const ManpowerAndMachinery = ({ closeModal, productivitysheetobject, productivitysheetarray,
  allCalcultedMachineryData, patchResponeData,updateData }) => {
  
  const projectobjectdata = ProjectObjectData.use()
  const quantitytoachivedData = QuantityTOAchivedData.use()
  const [GANG_PRODUCTIVIVY, setGANG_PRODUCTIVIVY] = useState(updateData?.quantity_to_be_achieved)
  const [totaltimegangproductivity, setTotalTimeGangProductivity] = useState(null)
  const [ProductivityData, setProductivityData] = useState(null)
  const [data12, setdata12] = useState(true)
  const myJobcardActivityCoard = MyJobcardActivityCoard.use()
  
  //   useEffect(() => {
  // console.log(patchResponeData)

  //     if (allCalcultedMachineryData !== undefined && allCalcultedMachineryData.length !== 0 && allCalcultedMachineryData[0] !== null
  //     ) {

  //       // if (myJobcardActivityCoard) {
  //       //   setGANG_PRODUCTIVIVY(allCalcultedMachineryData.quantity_to_be_achived)
  //       // }
  //       // else{
  //         setGANG_PRODUCTIVIVY(allCalcultedMachineryData.gang_productivity)
  //       // }  
  //     }
  //     // quantity_to_be_achived 


  //   }, [allCalcultedMachineryData])

  useEffect(() => {
    console.log('patch',patchResponeData)
    if (patchResponeData !== undefined
      &&
      // patchResponeData?.length !== 0 &&
      patchResponeData !== null
    ) {

      // if (myJobcardActivityCoard) {
      //   setGANG_PRODUCTIVIVY(patchResponeData.quantity_to_be_achived)
      // }
      // else{
      setGANG_PRODUCTIVIVY(patchResponeData.gang_productivity)
      QuantityTOAchivedData.set(patchResponeData.gang_productivity)
      let arryData = []
      Object.values(patchResponeData?.productivity[0]).map((item, id) => {
        if (item[1] !== "0.00" && !item[0].startsWith(" Part NO")) {
          arryData.push(item)
        }
      })
      setProductivityData(arryData)
    }else{
      
          if(updateData && updateData.manpower_and_machinary && updateData.manpower_and_machinary.length > 0){
            let arryData = []
            setGANG_PRODUCTIVIVY(updateData.quantity_to_be_achieved)
            QuantityTOAchivedData.set(updateData.quantity_to_be_achieved)
            Object.values(updateData?.manpower_and_machinary[0]).map((item, id) => {
              if (item[1] !== "0.00" && !item[0].startsWith(" Part NO")) {
                arryData.push(item)
              }
            })
            setProductivityData(arryData)
          }

    }
    // quantity_to_be_achived 


  }, [patchResponeData, allCalcultedMachineryData])



  const GangProductData = (e, data) => {
    QuantityTOAchivedData.set(e.target.value)
    console.log('demo',e.target.value)
    // MyJobcardActivityCoard.set(false)
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





          <>
            {
              ProductivityData?.map((items, i) => {
                return <> {
                  items[1] !== "0.00" && !items[0].startsWith(" Part NO") ?
                    <tbody
                      className=" max-w-[100%] font-secondaryFont   text-[#000000] 
                                   font-normal not-italic text-[12px]   "
                    >
                      <tr className="rounded  bg-[#ECF1F0]   h-[40px]   ">
                        <th className=" ">{i + 1}</th>
                        <th className="">{items[0]}</th>
                        <th className="">{items[3] !== "absents" ? items[3] : "-"}</th>
                        <th className="">{items[1]}</th>
                        <th className="">{items[2]}</th>


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

          {/* {patchResponeData?.productivity?.map((item, index) => (


            <>
              { 
                Object.entries(patchResponeData?.productivity[0]).map(([key, value], i, items) => {
               console.log(item)
                  return <> {
                    value[1] !== "0.00" && !key.startsWith(" Part NO") ? <tbody
                      className=" max-w-[100%] font-secondaryFont   text-[#000000] 
                      font-normal not-italic text-[12px]   "

                    >
                      <tr className="rounded  bg-[#ECF1F0]   h-[40px]   ">
                        <th className=" ">{i + 1}</th>
                        <th className="">{key}</th>
                        <th className="">{value[3] !== "absents" ? value[3] : "-"}</th>
                       
                        <th className="">{value[1]}</th>
                        <th className="">{value[2]}</th>


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

          ))} */}
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
              <span className="relative"> <input type='number' placeholder="Gang Productivity"
                className="border-none  px-2  gang_product_input"
                value={GANG_PRODUCTIVIVY}
                onChange={(e) => { setGANG_PRODUCTIVIVY(e.target.value); GangProductData(e) }}
              />
              <div className='absolute left-75 right-0 top-0' >
                 [ {updateData?updateData.unit: productivitysheetobject && productivitysheetobject[" UNIT "]} ]
              </div>
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





// return (
//   <div className="max-w-[100%]     overflow-hidden bg-[#FFFFFF] justify-center items-center  my-[10px] mt-[20px]  pb-[20px] rounded-[31.529px]">
//     <div className="flex flex-row justify-Start content-center items-center pl-[17.9px] ">

//       <div className=" w-[138.92px] font-secondaryFont ml-[18.65px]  mt-[11.51px] text-[#000000]  font-medium not-italic text-[28.09px] tracking-[-0.02em]">
//         Manpower&#160;&&#160;Machinery
//       </div>
//     </div>
//     {/* scroll_bar_Manpower */}
//     <div className="flex flex-row mt-[30px] ml-[37px] mr-[20px]   scroll_bar_Manpower">
//       <table className=" w-[100%]  pt-[24px] ml-[40px] ">
//         <thead className="font-secondaryFont text-[#000000] font-normal 
//         not-italic text-[12px] leading-[20px] tracking-[-2%] py-[36px]   ">
//           <tr className="bg-[#ECF1F0]  h-[40px]   ">
//             <th className="  ">SL No.</th>
//             <th className=" ">Designation</th>
//             <th className=" ">Unit</th>
//             <th className=" ">No</th>
//             <th className=" ">Total Hours</th>
//           </tr>
//           <tr className="p-[15px] ">
//             <td className="p-[10px]" ></td>
//           </tr>
//         </thead>
//         {allCalcultedMachineryData?.productivity?.map((item, index) => (


//           <>
//             {
//               Object.entries(allCalcultedMachineryData?.productivity[0]).map(([key, value], i, items) => {




//                 return <> {
//                   value[1] !== 0 && !key.startsWith(" Part NO") ? <tbody
//                     className=" max-w-[100%] font-secondaryFont   text-[#000000] 
//                     font-normal not-italic text-[12px]   "

//                   >
//                     <tr className="rounded  bg-[#ECF1F0]   h-[40px]   ">
//                       <th className=" ">{i + 1}</th>
//                       <th className="">{key}</th>
//                       <th className="">{value[3] !== "absents" ? value[3] : "-"}</th>
//                       {/* <th className="">{(value / totalgangproductivity * GANG_PRODUCTIVIVY).toFixed(2)}</th> */}
//                       <th className="">{value[1]}</th>
//                       <th className="">{value[2]}</th>


//                     </tr>
//                     <tr className="m-0 p-0 h-[20px]"  >
//                       <th  ></th>
//                     </tr>

//                   </tbody>
//                     :
//                     <>
//                     </>}
//                 </>

//               })
//             }

//           </>

//         ))}
//       </table>

//     </div>

//     <div className="flex flex-row justify-between  px-[50px]  mt-[42px]">
//       <div className="mr-[45px]  ml-[30px]">
//         <div className="w-[100%]   h-[25px] rounded text-sm font-secondaryFont text-[12px] 
//          font-medium not-italic    text-[#000000] ">
//           <div className="flex">
//             <span className="pb-2"> Quantity to be achieved  :
//             </span>
//             {/* 15  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nos */}
//             <span className=" "> <input type='number' placeholder="Gang Productivity"
//               className="border-none  px-2  gang_product_input"
//               value={GANG_PRODUCTIVIVY}
//               onChange={(e) => { setGANG_PRODUCTIVIVY(e.target.value); GangProductData(e) }}
//             />
//             </span>
//           </div>

//         </div>
//       </div>
//       {/* <div className="flex flex-row  mr-[-30px]">
//         <div className="mr-[26px] shadow-[buttonshadow] ">

//           <button onClick={closeModal} className="w-[66.79px] btnshadow self-center h-[16.7px] rounded text-sm font-secondaryFont text-[9.35px] text-center font-medium not-italic items-center  bg-[#F42424] text-[#000000] ">
//             Cancel
//           </button>

//         </div>
//         <div>
//           <button
//             type="submit"
//             className="w-[66.79px] h-[16.7px] rounded btnshadow  self-center text-sm font-secondaryFont text-[9.35px] font-medium not-italic  bg-[#0FCC7C] text-[#000000] "
//           >
//             Save
//           </button>
//         </div>
//       </div> */}
//     </div>
//   </div>
// );
// };

// export default ManpowerAndMachinery;
