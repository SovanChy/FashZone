import { Container, Row, Image, Col } from "react-bootstrap";

export default function Trend() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col
            sm={12}
            md={12}
            lg={6}
            className="mt-5 py-4 d-flex align-items-start justify-content-center"
            style={{ height: "90vh", objectFit: "cover" }}
          >
            <div className="bg-dark text-white w-100 vh-90 d-flex align-items-center justify-content-center">
              <h2
                style={{
                  display: "flex",
                  writingMode: "vertical-lr",
                  textOrientation: "mixed",
                  transform: "rotate(270deg)",
                  height: "79.20vh",
                  justifyContent: "center",
                  fontSize: "240px",
                  fontSize: "clamp(100px, 10vw, 240px)"
                }}
              >
                Top
              </h2>
            </div>
          </Col>
          <Col
            sm={12}
            md={12}
            lg={6}
            className="mt-5 py-4 d-flex align-items-start justify-content-center"
            style={{ height: "90vh" }}
          >
            <Image
              src="../../image/4.jpg"
              alt="image2"
              className="w-100"
              style={{ height: "80vh", objectFit: "cover"}}
            />
          </Col>
        </Row>
      </Container>

      {/* Spring trending  */}

      <Container fluid className="d-flex flex-column flex-md-row">
      <Col xs={12} md={9}  className="h-100 p-0">
        <Row className="h-100 g-2 py-0 pe-2">
          <Col xs={6} md={6} className="h-50">
            <Image
              src="../image/5.jpg"
              alt="Street fashion couple"
              className="w-100"
              style={{ height: '50vh', objectFit: "cover" }}
            />
          </Col>
          <Col xs={6} md={6} className="h-50">
            <Image
              src="../image/1.jpg"
              alt="Bohemian style dress"
              className="w-100"
              style={{height: '50vh',  objectFit: "cover" }}
            />
          </Col>
          <Col xs={6} md={6} className="h-50">
            <Image
              src="../image/4.jpg"
              alt="Blonde model in light outfit"
              className="w-100 h-100"
              style={{ height: '50vh',objectFit: "cover" }}
            />
          </Col>
          <Col xs={6} md={6} className="h-50">
            <Image
              src="../image/3.jpg"
              alt="Model in cream suit"
              className="w-100 h-100"
              style={{ height: '50vh', objectFit: "cover" }}
            />
          </Col>
        </Row>
      </Col>
      <Col xs={12} md={3} className="p-0 order-first order-md-last">
        <div className="bg-dark text-white w-100 h-100 d-flex align-items-center justify-content-center">
          <h2
            style={{
              writingMode: "vertical-lr",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              fontSize: "200px",
              fontSize: "clamp(100px, 10vw, 240px)"
            }}
          >
            Trending
          </h2>
        </div>
      </Col>
    </Container>

    {/* bottom trading page */}
    <Container fluid>
        <Row className="mt-5">
          <Col
            md={12}
            lg={6}
            className="mt-5 py-4 d-flex align-items-start justify-content-center"
            style={{ height: "90vh",  objectFit: "cover" }}
          >
            <Image
              src="../image/1.jpg"
              alt="image1"
              className="w-100"
              style={{ height: "80vh",  objectFit: "cover"}}
            />
          </Col>
          <Col
            md={12}
            lg={6}
            className="mt-5 py-4 d-flex align-items-start justify-content-center"
            style={{ height: "90vh" }}
          >
            <Image
              src="../../image/2.jpg"
              alt="image2"
              className="w-100"
              style={{ height: "80vh", objectFit: "cover"}}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
