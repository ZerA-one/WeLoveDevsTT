"use client";
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setError(null);

    signIn(email, password)
      .then((authUser) => {
        router.push("/");
      })
      .catch((error) => {
        setError(error.message);
      });
    event.preventDefault();
  };

  return (
    <Container className="text-center" style={{ padding: "40px 0px" }}>
      <Row>
        <Col>
          <h2>Login</h2>
        </Col>
      </Row>
      <Row style={{ maxWidth: "400px", margin: "auto" }}>
        <Col>
          <Form onSubmit={onSubmit}>
            {error && <Alert color="danger">{error}</Alert>}
            <FormGroup row>
              <Label className="text-white" for="loginEmail" sm={4}>
                Email
              </Label>
              <Col sm={8}>
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  id="loginEmail"
                  placeholder="Email"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label className="text-white" for="loginPassword" sm={4}>
                Password
              </Label>
              <Col sm={8}>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  id="loginPassword"
                  placeholder="Password"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Button className="text-white">Login</Button>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col className="text-white">
                No account? <Link className="text-white" href="/signup">Create one</Link>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
