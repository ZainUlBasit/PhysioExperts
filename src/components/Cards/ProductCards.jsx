import React from "react";

const productData = [
  { title: "Neck Massager", img: "/NeckMassager.jpg" },
  { title: "Lower Back Massager", img: "/NeckMassager.jpg" },
  { title: "Cervical Traction Device", img: "/NeckMassager.jpg" },
  { title: "Neck Protector", img: "/NeckMassager.jpg" },
];

const ProductCards = () => {
  return productData.map((dt) => {
    return (
      <div className="flex flex-col justify-start items-center overflow-hidden gap-y-5">
        <div className="rounded-[50px] overflow-hidden shadow-[rgba(0,0,0,0.24)_0px_3px_8px]">
          <img
            src={dt.img}
            alt="nothing"
            className="object-cover w-[210px] h-[300px]"
          />
        </div>
        <div className="font-bold font-montserrat text-2xl text-center w-[250px]">
          {dt.title}
        </div>
      </div>
    );
  });
};

export default ProductCards;
