import React, { useState } from "react";
import CardLoading from "../components/CardLoading";

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingArrayCard = new Array(10).fill(null);
  return (
    <section className="bg-white">
      <div className="container mx-auto p-4">
        <p className="font-semibold">Search Results: {data.length}</p>

        <div>
          {/* loading data */}
          {loading &&
            loadingArrayCard.map((_, index) => {
              return <CardLoading key={"loadingsearchpage" + index} />;
            })}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
