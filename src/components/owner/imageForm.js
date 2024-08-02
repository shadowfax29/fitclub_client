import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startAddImages } from "../../actions/ownerActions";
import useFetch from "./useFetch";
import { useOwner } from "./useOwner";
import Loading2 from "../../loading2";
import { ToastContainer,toast } from "react-toastify";
const ImageForm = () => {
  const {trigger}=useOwner()
  const { data } = useFetch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [clientError, setClientError] = useState({});

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((ele, i) => i !== index));
  };

  const handleImage = (e) => {
    e.preventDefault();
    const resetImage = () => {
      setImages([]);
    };

    if (images.length < 4) {
      setClientError({ images: "Upload at least four images." });
    } else {
      setLoading(true);
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      dispatch(startAddImages(formData, resetImage, setLoading, data,trigger,toast));
      setClientError({});
    }
  };

  if (loading) {
    return <Loading2/>;
  }

  return (
    <form
      onSubmit={handleImage}
      className="p-5 shadow-lg p-3 mb-5 bg-body-tertiary rounded"
    >
      <label className="form-label" htmlFor="images">
        Upload Images
      </label>
      <input
        className="form-control"
        type="file"
        id="images"
        multiple
        onChange={handleImageChange}
      />
      <div className="d-flex flex-wrap">
        {images.map((ele, i) => (
          <div key={i} className="d-flex flex-column align-items-center">
            <img
              src={URL.createObjectURL(ele)}
              alt="preview"
              width="100px"
              className="m-2"
            />
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => removeImage(i)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      {clientError.images && (
        <div className="text-danger">{clientError.images}</div>
      )}
      {!localStorage.getItem("imageEdit")&& (
        <button className="btn btn-dark m-1" type="submit">
          Submit
        </button>
      )}
      <ToastContainer/>
    </form>
  );
};

export default ImageForm;
