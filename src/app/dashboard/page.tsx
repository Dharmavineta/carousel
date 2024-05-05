// // "use client";
// // import React, { useEffect, useRef, useState } from "react";
// // import Slider from "react-slick";
// // import "slick-carousel/slick/slick.css";
// // import "slick-carousel/slick/slick-theme.css";

// // export default function SimpleSlider() {
// //   const [input, setInput] = useState<number | null>(null);
// //   let sliderRef = useRef(null);

// //   const settings = {
// //     infinite: true,
// //     slidesToShow: 3,
// //     slidesToScroll: 1,
// //     cssEase: "linear",
// //     vertical: true,
// //     verticalSwiping: true,
// //   };

// //   useEffect(() => {
// //     // @ts-ignore
// //     sliderRef.slickGoTo(input);
// //   }, [input]);
// //   return (
// //     <div className="flex items-center justify-center">
// //       <input
// //         className="border-4"
// //         onChange={(e) => setInput(parseInt(e.target.value))}
// //       />
// //       <Slider
// //         ref={(slider) => {
// //           // @ts-ignore
// //           sliderRef = slider;
// //         }}
// //         {...settings}
// //       >
// //         <div>
// //           <h3>1</h3>
// //         </div>
// //         <div>
// //           <h3>2</h3>
// //         </div>
// //         <div>
// //           <h3>3</h3>
// //         </div>
// //         <div>
// //           <h3>4</h3>
// //         </div>
// //         <div>
// //           <h3>5</h3>
// //         </div>
// //         <div>
// //           <h3>6</h3>
// //         </div>
// //       </Slider>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState } from "react";
// import { Reorder, useScroll } from "framer-motion";
// import { useProductStore } from "../store/store";
// import { Edit2, X } from "lucide-react";
// import Image from "next/image";

// const personArray = [
//   { id: 1, label: "sanju", age: 28 },
//   { id: 2, label: "kris", age: 20 },
//   { id: 3, label: "vijay", age: 22 },
// ];

// const Dash = () => {
//   const [arr, setArr] = useState(personArray);
//   const { product } = useProductStore();

//   return (
//     <div className="flex h-screen items-center justify-center">
//       <Reorder.Group
//         values={arr}
//         onReorder={setArr}
//         axis="x"
//         className="gap-x-10 flex "
//       >
//         {arr.map((img, i) => (
//           <Reorder.Item key={img.id} value={img}>
//             <div className=" shadow-sm  rounded-xl relative w-32 h-32 border border-gray-100">
//               <div className="flex gap-x-1 absolute right-0 z-10">
//                 <div className="right-0 w-3 h-3 cursor-pointer bg-black flex items-center justify-center">
//                   <Edit2 className="text-white w-2 h-2" />
//                 </div>
//                 <div className="right-0 w-3 h-3 cursor-pointer bg-rose-600 flex items-center justify-center">
//                   <X className="text-white w-3 h-3" />
//                 </div>
//               </div>

//               <Image
//                 src={img?.src}
//                 alt="image"
//                 fill
//                 className="rounded-md object-cover w-full h-full"
//               />
//             </div>
//           </Reorder.Item>
//         ))}
//       </Reorder.Group>
//     </div>
//   );
// };

// export default Dash;

import React from "react";

const page = () => {
  return <div>page</div>;
};

export default page;
