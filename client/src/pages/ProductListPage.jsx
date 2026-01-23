import React, { useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalpage] = useState(1);

  const fetchProductdata = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId,
          subCategoryId,
          page: page,
          limit: 10,
        },
      });
    } catch (error) {}
  };
  return (
    <section className="sticky top-24 lg:top-20">
      <div className="container sticky top-24 mx-auto grid grid-cols-9 md:grid-cols-7 lg:grid-cols-5">
        {/* sub Category */}
        <div className="col-span-3 md:col-span-2 lg:col-span-1 min-h-[78vh]">
          hello
        </div>

        {/* product */}
        <div className="col-span-6 md:col-span-5 lg:col-span-4">heloo</div>
      </div>
    </section>
  );
};

export default ProductListPage;
