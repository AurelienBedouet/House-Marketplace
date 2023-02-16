import { IListingData } from "@/types";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  setFormData: Dispatch<SetStateAction<IListingData>>;
};

const UploadFeaturedImage = ({ setFormData }: Props) => {
  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageSelected = e.target.files[0];
      setFormData(prev => ({ ...prev, featuredImage: imageSelected }));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="featuredImage" className="text-xl font-semibold">
        Featured Image
      </label>
      <input
        className="file:cursor-pointer file:rounded-lg file:shadow-md file:border-none file:bg-green-500 file:text-white file:font-semibold file:py-3 file:px-6 file:mr-4 file:transition file:duration-400 file:hover:bg-white file:hover:text-green-500"
        type="file"
        id="featuredImage"
        onChange={onUploadImage}
        max="6"
        accept=".jpg,.png,.jpeg,.webp"
        required
      />
      <em>
        (Accepted formats: &quot;jpg&quot;, &quot;jpeg&quot;, &quot;png&quot;,
        &quot;webp&quot;)
      </em>
    </div>
  );
};

export default UploadFeaturedImage;
