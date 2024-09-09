import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import config from '../coreFIles/config';

const LoginHeader = () => {

	return (
		<>
			<header>
				<Navbar expand="lg">
					<Container>
						<Navbar.Brand href={`${config.baseUrl}`}>
							Forensic
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="navbarScroll" className='menutoggle p-0' />
						<Navbar.Collapse id="navbarScroll">
							<Nav
								className="mx-auto my-2 my-lg-0"
								style={{ maxHeight: '100px' }}
								navbarScroll
							>
								<Nav.Link href={`${config.baseUrl}`}>Home</Nav.Link>
								<Nav.Link href="#action2">Link</Nav.Link>
								<NavDropdown title="Link" id="navbarScrollingDropdown">
									<NavDropdown.Item href="#action3">Action</NavDropdown.Item>
									<NavDropdown.Item href="#action4">
										Another action
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href="#action5">
										Something else here
									</NavDropdown.Item>
								</NavDropdown>
								<Nav.Link href="#" disabled>
									Link
								</Nav.Link>
							</Nav>
							
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</header>
		</>
	)
}

export default LoginHeader
