import React from "react";

const AdminProduct = ({ product }) => {
  return (
    <div>
      <div className="w-70 bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
        <img
          src={
            product.images?.[0] && product.images[0].trim() !== ""
              ? product.images[0]
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5E1FgiVuVpe6aqS7mYbrf1sdq-hnn1QDhnA&s"
          }
        />
        <div className="mt-4">
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-sm text-gray-600 mt-1">
            {product.description.slice(0, 50)}....
          </p>
          <p className="text-md font-bold text blue-700 mt-2">
            Rs.{product.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
