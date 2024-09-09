import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import config from '../coreFIles/config';
import { MdLogout } from 'react-icons/md';
import Cookies from 'js-cookie'

const Header = () => {

	const loginData = (!Cookies.get('loginSuccessVirtualTrial')) ? [] : JSON.parse(Cookies.get('loginSuccessVirtualTrial'));
	
	if (!loginData || loginData == '') {
    window.location.href = `${config.baseUrl}`;
  }

	const logout = async () => {
		Cookies.remove('loginSuccessVirtualTrial');
		window.location.href = config.baseUrl;
	}


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
							<Form className="d-flex">
								<div className='headicons'>
									<ul>
										{/* <li><a href=''><span><CiSearch /></span></a></li> */}
										{/* <li><a href=''><span><CiHeart /></span></a></li> */}
										{/* <li><Link to={`${config.baseUrl}login`}><span><CiUser /></span></Link></li> */}
									</ul>
								</div>
								{/* <Button variant="" onClick={logout}><AiOutlineBars className='baricon' /></Button> */}
								{loginData != "" ?
									<abbr title="Logout">
										<Button variant="" onClick={logout} className="logout"><MdLogout className='baricon' /></Button>
									</abbr>
									:
									''
								}
							</Form>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</header>
		</>
	)
}

export default Header
