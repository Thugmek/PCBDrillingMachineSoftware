import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import style from "../style.module.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function JobStatus(props) {
  const drlFileRef = useRef();
  const svgFileRef = useRef();

  function uploadFiles() {
    drlFileRef.current.files[0].text().then((e) => {
      if (svgFileRef.current.files[0]) {
        svgFileRef.current.files[0].text().then((e2) => {
          fetch("http://" + window.location.hostname + ":3000/api/job/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ drl: e, svg: e2 }),
          });
        });
      } else {
        fetch("http://" + window.location.hostname + ":3000/api/job/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ drl: e }),
        });
      }
    });
  }

  return (
    <div className={style.bordered}>
      <h2>Job Status</h2>
      <Form>
        <Form.Label>Drill data file</Form.Label>
        <Form.Control type="file" ref={drlFileRef} />
        <Form.Label>Copper layers file (optional)</Form.Label>
        <Form.Control type="file" ref={svgFileRef} />
        <Button onClick={uploadFiles}>Upload</Button>
      </Form>
      <hr />
    </div>
  );
}
