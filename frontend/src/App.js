import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";
import Connections from "./componnents/connections";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Preview from "./componnents/preview";
import JobStatus from "./componnents/job-status";
import MachineStatus from "./componnents/machine-status";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Container fluid>
                <Row>
                  <Col>
                    <h1>PCB Drill Console</h1>
                  </Col>
                </Row>
                <hr></hr>
                <Row>
                  <Col xs={12} lg={4}>
                    <Connections />
                    <JobStatus />
                    <MachineStatus />
                  </Col>
                  <Col xs={12} lg={8}>
                    <Preview />
                  </Col>
                </Row>
              </Container>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
