"use client";

import React, { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { IListingData } from "@/types";

type Props = {
  setFormData: Dispatch<SetStateAction<IListingData>>;
};

const baseStyle = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  minHeight: "200px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "rgb(156 163 175)",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const UploadImages = ({ setFormData }: Props) => {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isFocused: isfocused,
    isDragAccept: isdragaccept,
    isDragReject: isdragreject,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
      "image/webp": [],
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isfocused ? focusedStyle : {}),
      ...(isdragaccept ? acceptStyle : {}),
      ...(isdragreject ? rejectStyle : {}),
    }),
    [isfocused, isdragaccept, isdragreject]
  );

  const files = acceptedFiles.map(file => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      images: acceptedFiles,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedFiles]);

  return (
    <div>
      <label className="text-xl font-semibold">Upload more images</label>
      <div {...getRootProps({ style })} className="flex-col my-4">
        <input {...getInputProps()} />
        <p>Drag and drop your images here, or click to select them</p>
        <em>
          (Accepted formats: &quot;jpg&quot;, &quot;jpeg&quot;, &quot;png&quot;,
          &quot;webp&quot;)
        </em>
      </div>
      <aside>
        {files.length > 0 && (
          <>
            <h4 className="text-lg font-semibold text-green-500">
              Accepted files
            </h4>
            <ul>{files}</ul>
          </>
        )}
        {fileRejectionItems.length > 0 && (
          <>
            <h4>Rejected files</h4>
            <ul>{fileRejectionItems}</ul>
          </>
        )}
      </aside>
    </div>
  );
};

export default UploadImages;
