import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { updateGymImage } from '../../actions/ownerActions';

const ImageEditModal = ({ isOpen, toggle, gymId, imgId, trigger }) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpdate = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('images', selectedFile);
      dispatch(updateGymImage(gymId, imgId, formData, trigger));
      toggle();
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Image</ModalHeader>
      <ModalBody>
        <input type="file" onChange={handleFileChange} />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleUpdate}>Update</Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ImageEditModal;
