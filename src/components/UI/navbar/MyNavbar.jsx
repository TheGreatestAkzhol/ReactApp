import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
const MyNavbar = () => {
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src="https://i.pinimg.com/originals/02/4a/7f/024a7fed2839a87e54382588977b93c3.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    TaskSender
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;