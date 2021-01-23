import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import api from '../../services/api';

import { Container, Title, InputDiv, Button } from './styles';

export default function Home() {
  const history = useHistory()
  const [name, setName] = useState('');

  function handleSubmit() {
    api.post('/accounts', {
      name,
    }).then(({ data }) => {
      history.push(`/${data.slug}`);
    }).catch((error) => {
      console.log(error);
    });
  }
  
  return (
    <Container>
      <Title>Create Account</Title>
      <InputDiv>
        <input placeholder="Name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
      </InputDiv>
      <Button type="button" onClick={handleSubmit}>Create</Button>
    </Container>
  )
}
