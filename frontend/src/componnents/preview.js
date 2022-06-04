import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import style from "../style.module.css";
import svgData from "./svgMock";

const magicConstantScale = 1.6;
const magicConstantOffset = 2.6;

function minMax(holes) {
  if (holes.length === 0) {
    return { xMin: 0, xMax: 1, yMin: 0, yMax: 1 };
  }
  let xMin = holes[0].x;
  let xMax = holes[0].x;
  let yMin = holes[0].y;
  let yMax = holes[0].y;

  holes.forEach((h) => {
    xMin = Math.min(xMin, h.x - h.d);
    xMax = Math.max(xMax, h.x + h.d);
    yMin = Math.min(yMin, h.y - h.d);
    yMax = Math.max(yMax, h.y + h.d);
  });

  return { xMin, xMax, yMin, yMax };
}

function fetchData(route, callback) {
  fetch("http://" + window.location.hostname + ":3000/api/" + route, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => callback(res));
}

export default function Preview(props) {
  const canvas = useRef(null);
  const [data, setData] = useState({ holes: [] });
  const [scale, setScale] = useState(10);
  const [offsets, setOffsets] = useState({ x: 0, y: 0 });

  function autoScale() {
    let newWidth = canvas.current ? canvas.current.clientWidth : 100;
    newWidth = newWidth ? newWidth : 100;
    let newHeight = canvas.current ? canvas.current.clientHeight : 100;
    newHeight = newHeight ? newHeight : 100;

    let minMaxRes = minMax(data.holes);
    setOffsets({ x: minMaxRes.xMin, y: minMaxRes.yMin });
    let sclByX = (newWidth - 20) / (minMaxRes.xMax - minMaxRes.xMin);
    let sclByY = (newHeight - 20) / (minMaxRes.yMax - minMaxRes.yMin);

    setScale(Math.min(sclByX, sclByY));
  }

  useEffect(() => {
    autoScale();
  }, [canvas.current]);

  useEffect(() => {
    fetchData("preview/get", setData);
  }, []);

  useEffect(() => {
    autoScale();
  }, [data]);

  return (
    <div className={style.bordered}>
      <h2>Preview</h2>
      <svg width="100%" height="70vh" className={style.svgCanvas} ref={canvas}>
        <g opacity={0.5} transform={"translate(" + (-offsets.x*scale + 10) + "," + (-offsets.y*scale + 10) + ")"}>
          <g
            transform={"scale(" + scale*0.00254 + "," + scale*0.00254 + ")"}
            strokeWidth={10}
            dangerouslySetInnerHTML={{ __html: svgData }}
          ></g>
        </g>

        {data.holes.map((h, i) => {
          return (
            <circle
              key={i}
              className={style.hole}
              cx={(h.x - offsets.x) * scale + 10}
              cy={(h.y - offsets.y) * scale + 10}
              r={h.d * scale * 0.5}
            />
          );
        })}
      </svg>
    </div>
  );
}
