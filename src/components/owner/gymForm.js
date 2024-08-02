import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { deleteGymImage, startAddGym, updateGym, updateGymImage } from '../../actions/ownerActions';
import Loading from '../../loading';
import useFetch from './useFetch';
import ImageForm from './imageForm';
import { useOwner } from './useOwner';
import { UilImageEdit } from '@iconscout/react-unicons';
import ImageEditModal from './imageEditModal';
import Navbar1 from './navbar1';

const GymForm = () => {
  const { detail, trigger } = useOwner();
  const gymId = detail?.gym?._id;
  const count = JSON.parse(localStorage.getItem("count"))
  const result = useSelector((state) => state.owner.images);
  const { data } = useFetch();
  const serverErrors = useSelector((state) => state.owner.serverErrors);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [gymName, setGymName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [mobile, setMobile] = useState('');
  const [geoLocation, setGeoLocation] = useState(null);

  const [clientError, setClientError] = useState({});
  const errors = {}
  const [modal, setModal] = useState(false);
  const [selectedImgId, setSelectedImgId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    if (data) {
      setGymName(data?.gymName || '');
      setAddress(data?.address || '');
      setPincode(data?.pincode || '');
      setMobile(data?.mobile || '');

    }
  }, [data]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const resetForm = () => {
      setGymName('');
      setAddress('');
      setPincode('');
      setMobile('');

    };

    validate();

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=d7f5f9f126c84bc0afe57590c6b971d8`
        );
        const result = res.data.results.find((ele) => ele.components._type === 'road' || "neighbourhood");
        if (result) {
          setGeoLocation(result.geometry);
        }
        const formData = {
          gymName,
          address,
          pincode,
          mobile,
          geoLocation: result.geometry,
        };

        if (editMode) {
          dispatch(updateGym(gymId, formData, setLoading));
        } else {
          dispatch(startAddGym(formData, setLoading, navigate, resetForm));
        }
      } catch (err) {
        console.log(err);
      }

      setClientError({});
    }
  };

  const validate = () => {

    if (gymName.trim().length === 0) {
      errors.gymName = 'Gym Name is required';
    }
    if (address.trim().length === 0) {
      errors.address = 'Address is required';
    }
    if (pincode.length === 0) {
      errors.pincode = 'Pincode is required';
    }
    if (mobile.length === 0) {
      errors.mobile = 'Mobile Number is required';
    }

    setClientError(errors);
  };

  if (loading) {
    return <Loading />;
  }

  const handleRemove = () => {
    dispatch(deleteGymImage(gymId, trigger));
  };

  const openEditModal = (imgId) => {
    setSelectedImgId(imgId);
    setModal(true);
  };

  const closeEditModal = () => {
    setModal(false);
    setSelectedImgId(null);
  };
  const toggleEditMode = () => {
    setEditMode(!editMode);

  };

  return (
    <div className='gymadd'>
      <Navbar1 />
      <div className='p-2'>

        <Link to={'/ownerDashBoard'}>
          <button className="btn btn-secondary m-2">Back</button>
        </Link>
        <h1 className='text-light'>Add Your Gym</h1>
        <p>Enter the details of your gym</p>
        <div className="d-flex flex-wrap justify-content-around">
          <div className="col-md-5">
            <form
              className="form-group p-5 shadow-lg p-3 mb-5 bg-body-tertiary rounded"
              onSubmit={handleSubmit}
            >
              <label className="form-label" htmlFor="gymName">
                Gym Name
              </label>
             
              {clientError.gymName && <div className="text-danger">{clientError.gymName}</div>}
              <input
                type="text"
                id="gymName"
                disabled={count === 1 ? (!editMode) : false}
                className="form-control"
                value={gymName}
                onChange={(e) => setGymName(e.target.value)}
              />

              <label className="form-label" htmlFor="address">
                Address
              </label>
              {clientError.address && <div className="text-danger">{clientError.address}</div>}
              <input
                type="text"
                id="address"
                disabled={count === 1 ? (!editMode) : false}
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <label className="form-label" htmlFor="pincode">
                Pincode
              </label>
              {clientError.pincode && <div className="text-danger">{clientError.pincode}</div>}
              <input
                type="text"
                id="pincode"
                disabled={count === 1 ? (!editMode) : false}
                className="form-control"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />

              <label className="form-label" htmlFor="mobile">
                Mobile Number
              </label>
              {clientError.mobile && <div className="text-danger">{clientError.mobile}</div>}
              <input
                type="tel"
                id="mobile"
                disabled={count === 1 ? (!editMode) : false}
                className="form-control"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />

              <button
                type="button"
                className="m-2 btn btn-warning text-dark"
                onClick={toggleEditMode}
              >
                {editMode ? 'cancel' : 'Switch to Edit Mode'}
              </button>

              {editMode && <input
                style={{ backgroundColor: "#5C88C4" }}
                type="submit"
                className="btn fw-bold"
                value="Update"
              />}

              {count === null && <input
                type="submit"
                className="btn"
              />}
            </form>
          </div>
          <div className="col-md-5">
            <ImageForm />
            {localStorage.getItem("imageEdit") ? (
              <button className="btn btn-danger" onClick={handleRemove}>
                Remove all
              </button>
            ) : null}
            <div className="d-flex flex-wrap">
              {result && result.length > 0 ? (
                result.map((ele, i) => (
                  <div key={i} className="card" style={{ width: '200px' }}>
                    <img src={ele.img} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <button className="btn" onClick={() => openEditModal(ele._id)}>
                        <UilImageEdit />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                detail.gym?.images?.map((ele, i) => (
                  <div key={i} className="card" style={{ width: '200px' }}>
                    <img src={ele.img} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <button className="btn" onClick={() => openEditModal(ele._id)}>
                        <UilImageEdit />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <ul className="list-group">
          {serverErrors?.errors?.length ? (
            serverErrors.errors.map((ele, i) => (
              <li className="list-group-item text-danger" key={i}>
                {ele.msg}
              </li>
            ))
          ) : serverErrors?.error ? (
            <li className="list-group-item text-danger">{serverErrors.error}</li>
          ) : null}
        </ul>
        <ImageEditModal isOpen={modal} toggle={closeEditModal} gymId={gymId} imgId={selectedImgId} trigger={trigger} />
      </div>
    </div>
  );
};

export default GymForm;
