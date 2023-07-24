"use client";

import { useState } from "react";
import { Alert, Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";

const Page = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Container className="text-center" style={{ padding: "40px 0px" }}>
      <Row>
        <Col>
          <h2>Create a new job</h2>
        </Col>
      </Row>
      <Row style={{ maxWidth: "400px", margin: "auto" }}>
        <Col>
          <Form onSubmit={onSubmit}>
            <FormGroup row>
              <Label className="text-white" for="loginEmail" sm={4}>
                Email
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  value={title}
                  onChange={(event) =>setTitle(event.target.value)}
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
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
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
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Page;
