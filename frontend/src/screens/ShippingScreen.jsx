import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingDetails } from '../slices/cartSlice';

const ShippingScreen = () => {
  // catatan yang dihapus
  // ---- Order ----
  // 1. postal kode => kurir note
  // 2. numberPhone => number phone
  // 3. payment method
  // 4. tax price

  const cart = useSelector((state) => state.cart);
  const { shippingDetails } = cart;

  const [address, setAddress] = useState(shippingDetails?.address || '');
  const [recipientName, setRecipientName] = useState(
    shippingDetails?.recipientName || ''
  );
  const [curierNote, setCurierNote] = useState(
    shippingDetails?.curierNote || ''
  );
  const [numberPhone, setNumberPhone] = useState(
    shippingDetails?.numberPhone || ''
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingDetails({ address, recipientName, curierNote, numberPhone })
    );
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='address'>
          <Form.Label>Alamat Lengkap</Form.Label>
          <Form.Control
            type='text'
            placeholder='masukan alamat lengkap'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='recipientName'>
          <Form.Label>Nama Penerima</Form.Label>
          <Form.Control
            type='text'
            placeholder='Masukan nama penerima'
            value={recipientName}
            required
            onChange={(e) => setRecipientName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='curierNote'>
          <Form.Label>Catatan Untuk Kuri (Opsional)</Form.Label>
          <Form.Control
            type='text'
            placeholder='Catatan untuk kurir'
            value={curierNote}
            onChange={(e) => setCurierNote(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='numberPhone'>
          <Form.Label>Nomor Hp</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter numberPhone'
            value={numberPhone}
            required
            onChange={(e) => setNumberPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='success'>
          Lanjutkan
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
