import React, { useState } from "react";
import Input from "../Input/Input";
import { Button } from "../Button/Button";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
`;

const Content = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 2px 2px 4px 3px #ddd;
  background-color: white;
  max-width: 350px;
  padding: 40px;
  border-radius: 5px;
`;

const Label = styled.h2`
  font-size: 2.5rem;
  color: #263243;
  margin-bottom: 0.5em;
`;

const LabelSignin = styled.label`
  font-size: 16px;
  color: #676767;
`;

const LabelError = styled.label`
  font-size: 14px;
  color: red;
`;

const Strong = styled.strong`
  cursor: pointer;

  a {
    text-decoration: none;
    color: #676767;
  }
`;

const Signup = () => {
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signup } = useAuth();

  const handleSignup = () => {
    if (!email | !emailConf | !senha) {
      setError("Preencha todos os campos");
      return;
    } else if (email !== emailConf) {
      setError("Os e-mails não são iguais");
      return;
    }

    const res = signup(email, senha);

    if (res) {
      setError(res);
      return;
    }

    alert("Usuário cadatrado com sucesso!");
    navigate("/");
  };

  return (
    <Container>
      <Label>CADASTRO</Label>
      <Content>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="email"
          placeholder="Confirme seu E-mail"
          value={emailConf}
          onChange={(e) => [setEmailConf(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <LabelError>{error}</LabelError>
        <Button onClick={handleSignup} >Registrar</Button>
        <LabelSignin>
          Já tem uma conta?
          <Strong>
            <Link to="/sign-in">&nbsp;Entre</Link>
          </Strong>
        </LabelSignin>
      </Content>
    </Container>
  );
};

export default Signup;