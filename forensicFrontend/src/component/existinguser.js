import React, { useEffect, useState } from "react";
import config from "../coreFIles/config";
import { Container, Row, Col } from "react-bootstrap/";
import Header from "../directories/header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { FiEyeOff } from "react-icons/fi";
import Table from "react-bootstrap/Table";
import { getCustomerList } from "../Action/user.action";

const Existinguser = () => {
  const [Customers, setCustomers] = useState([]);
  const [Phone, setPhone] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    CustomerList();
  }, []);

  const CustomerList = async (mobileData, nameData) => {

    try {
      let data = {
        "mobile": mobileData != undefined ? mobileData : Phone,
        "name": nameData != undefined ? nameData : name
      }
      let res = await getCustomerList(data);
      if (res.status) {
        setCustomers(res.Data);

      }
    }
    catch (err) {
      setCustomers([]);
    }
  };

  const getPhone = function (e) {
    setPhone(e.target.value);
    CustomerList(e.target.value, '');
  };

  const getName = function (e) {
    setName(e.target.value);
    CustomerList('', e.target.value);
  };


  return (
    <>
      <Header/>
      {/*-------------------------- Existing User Start --------------------------- */}

      <section className="existinguser pt-5">
        <div className="filterone"></div>
        <div className="filtertwo"></div>
        <div className="circlebox1">
          <img
            src="assets/images/circleshape.png"
            alt="circleshape"
            className=""
          />
        </div>
        <div className="circlebox2">
          <img
            src="assets/images/circleshape.png"
            alt="circleshape"
            className=""
          />
        </div>
        <Container>
          <div className="tophead">
            <h4 className="mb-4 text-center"></h4>
            <a href={`${config.baseUrl}welcome`}> Go Back</a>
          </div>

          <Row className="align-items-center">
            <Col md={7} xs={12} className="mx-auto">
              <div className="exitform mt-5">
                <Form autoComplete="off" className="formblock">
                  <div className="forgethead mb-4">
                    <h4 className="text-center">Existing User</h4>
                  </div>
                  <Row>
                    <Col md={6} xs={12}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Search By Mobile Number</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter mobile number"
                          autoComplete="off"
                          value={Phone}
                          onChange={getPhone}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} xs={12}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Search By Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter name"
                          autoComplete="off"
                          value={name}
                          onChange={getName}
                        />
                      </Form.Group>
                    </Col>
                    {/* <Col md={6} xs={12}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select aria-label="Default select example">
                          <option>Male</option>
                        </Form.Select>
                      </Form.Group>
                    </Col> */}
                  </Row>
                  <Row>
                    <Col>
                      <div className="mt-3" style={{ textAlign: 'end' }}>
                        <Link
                          to={`${config.baseUrl}customer-register`}
                          className="welcomebtn"
                        >
                          Add User
                        </Link>
                      </div>
                      <div className="existable mt-4">
                        <Table responsive hover>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Mobile No.</th>
                              <th>DOB</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Customers.length == 0 ?
                              <tr>
                                <td colSpan="8" className="text-center">No Data Found</td>
                              </tr> :
                              Customers.map((item, i) => (
                                <>
                                  <tr >
                                    <td>{item.user_name}</td>
                                    <td>{item.mobile_number}</td>
                                    <td>{item.dob}</td>
                                    {/* <td>24 Item's Purchase</td> */}
                                    <td>
                                      <Link to={`/forensic/takeyourphoto/${item.id}`}>Try More</Link>
                                    </td>
                                  </tr>
                                </>
                              ))}
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                  </Row>

                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/*-------------------------- Existing User Exit --------------------------- */}
    </>
  );
};

export default Existinguser;
