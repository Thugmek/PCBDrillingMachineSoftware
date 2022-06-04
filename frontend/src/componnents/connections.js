import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import style from "../style.module.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function fetchInterfacesList(setInterfacesFunction) {
  fetch("http://" + window.location.hostname + ":3000/api/serial/list", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => setInterfacesFunction(res));
}

function fetchStatus(setInterfacesFunction) {
  fetch("http://" + window.location.hostname + ":3000/api/serial/list", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => setInterfacesFunction(res));
}

export default function Connections(props) {
  const [interfaces, setInterfaces] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    fetchInterfacesList(setInterfaces);
  }, []);

  return (
    <div className={style.bordered}>
      <h2>Connections</h2>
      <Form>
        {status.connected ? (
          <Form.Select disabled>
            <option>{status.interface}</option>
          </Form.Select>
        ) : (
          <Form.Select>
            {interfaces.map((a, i) => {
              return (
                <option key={i} value={a.path}>
                  {a.friendlyName}
                </option>
              );
            })}
          </Form.Select>
        )}
        <ButtonGroup>
          <Button variant="success">Connect</Button>
          <Button variant="danger">Disonnect</Button>
        </ButtonGroup>
      </Form>
    </div>
  );
}
