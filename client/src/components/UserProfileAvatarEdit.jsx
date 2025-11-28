import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

const UserProfileAvatarEdit = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleUploadAvatarImage = async (e) => {
    //this is for to get first selected file
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("avatar", file);

    const response = await Axios({
      ...SummaryApi.uploadAvatar,
      data: formData,
    });

    console.log(response, "ygbjnk");
  };
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900/60   p-4 flex items-center justify-center">
      <div className="bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-red-700 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full" />
          ) : (
            <FaRegUserCircle size={65} />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="uploadProfile">
            <div className="border border-primary-200 hover:bg-primary-200 px-4 py-1 rounded text-xs my-3">
              {loading ? "Loading..." : "Upload"}
            </div>
            <input
              onChange={handleUploadAvatarImage}
              type="file"
              id="uploadProfile"
              className="hidden"
            />
          </label>
        </form>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
