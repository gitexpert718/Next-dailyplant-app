import { Container, Nav, Image, ListGroup, Card, Button, Dropdown, Navbar, Col, Media, Row, Form, Link } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP, FaLinkedinIn } from 'react-icons/fa';
import css from "../pages/main.global.scss"

export default function Layout({ children }) {
    return <div>
        <Container>
            <Navbar className="justify-content-sm-center" bg="white" variant="light">
                <Navbar.Brand href="#home"><img id="logo" src="/logo.png" alt="Logo" /></Navbar.Brand>
            </Navbar>
        </Container>
        {children}
        <Container fluid id="footer">
          <Row id="newsletter">
            <Col className="my-5">
              <h3 className="text-center">Sign up for our Newsletter!</h3>
              <h4 className="text-center">Enter your email below to get the latest news and updates.</h4>
              <Container>
                <Form>
                  <Form.Group>
                    <Form.Control id="inputEmail" type="email" placeholder="your-email@example.com" />
                    <Form.Text className="text-center">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Button variant="light" type="submit" className="btnSubmit">
                    Submit
                  </Button>
                </Form>
              </Container>
            </Col>
          </Row>
          <Row id="connect">
            <Col className="my-5">
              <h4 className="text-center">Connect with us</h4>
              <Container id="connectIconRow" className="mt-3">
                <FaFacebookF className="connectIcons"/>
                <FaInstagram className="connectIcons"/>
                <FaTwitter className="connectIcons"/>
                <FaPinterestP className="connectIcons"/>
                <FaLinkedinIn className="connectIcons"/>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
}