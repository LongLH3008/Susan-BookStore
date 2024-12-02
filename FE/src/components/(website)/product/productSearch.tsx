import { IProduct } from "@/common/interfaces/product";
import { ConvertVNDString } from "@/common/shared/round-number";
import React from "react";
import { Link } from "react-router-dom";

const ProductSearch = ({ data }: { data: IProduct }) => {
  return (
    <div className="grid grid-cols-5 gap-4 mb-10 ">
      <div className="col-span-1">
        <Link to={`cua-hang/${data.slug}`}>
          <img
            src={data.coverImage}
            alt={data.title}
            className="h-[150px] object-cover"
          />
        </Link>
      </div>
      <div className="col-span-4">
        <h2>{data.title}</h2>
        {data?.price > 0 && (
          <span className="text-[16px] text-[#00BFC5] font-semibold">
            {ConvertVNDString(
              data?.price - (data?.price * data?.discount) / 100
            )}
            đ
          </span>
        )}
        {data?.discount > 0 && (
          <span className="line-through ms-3 text-zinc-500">
            {ConvertVNDString(data?.price)}đ
          </span>
        )}
        <p className="text-[#707070] text-[14px] mt-3 overflow-hidden text-ellipsis  line-clamp-3">
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default ProductSearch;
