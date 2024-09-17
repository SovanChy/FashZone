import { Container, Row, Col, Image } from "react-bootstrap";

     export default function TopTrending() {
        return(
        <Container fluid>
            <Row className="mt-5">
            <Col
                sm
                md={6}
                className="mt-5 ps-4  d-flex align-items-start justify-content-center"
                style={{ height: "90vh" }}
            >
                <Image
                src="../image/5.jpg"
                alt="image1"
                className="w-100"
                style={{ height: "80vh" }}
                />
            </Col>
            <Col
                sm
                md={6}
                className="mt-5 pe-4 d-flex align-items-start justify-content-center"
                style={{ height: "90vh" }}
            >
                <Image
                src="../../image/4.jpg"
                alt="image2"
                className="w-100"
                style={{ height: "80vh" }}
                />
            </Col>
            </Row>
           
        </Container>
        )
        }
