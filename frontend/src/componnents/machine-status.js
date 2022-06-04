import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import style from "../style.module.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function MachineStatus(props) {
  return (
    <div className={style.bordered}>
      <h2>Machine Status</h2>
      <table className={style.borderedTable}>
        <thead>
          <tr>
            <th>X</th>
            <th>Y</th>
            <th>Z</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>000.00</td>
            <td>000.00</td>
            <td>000.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
