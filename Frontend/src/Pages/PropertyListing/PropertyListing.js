import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import axios from "axios";
import { useState, useEffect } from "react";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import img1 from "../../Assets/1.webp";
import img2 from "../../Assets/2.webp";
import img3 from "../../Assets/3.webp";
const PropertyListing = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const url = `http://localhost:8000/properties?page=${page}&limit=20`;

  const fetchDATA = async () => {
    try {
      const res = await axios.get(url);
      const properties = res.data;
      setData(properties);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDATA();
    console.log(data);
  }, [page]);

  return (
    <>
      <div className="header"></div>

      <Container style={{ marginTop: "20px", marginBottom: "50px" }}>
        <Card className=" px-5" style={{ border: "none" }}>
          <div className="">
            {" "}
            <p className="" style={{ fontSize: "20px", fontWeight: "bold" }}>
              Newly Listed Properties
            </p>
          </div>
          <Row className="  mb-5">
            {data.map((item) => {
              return (
                <>
                  <Col className="items" lg="3" key={item._id}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        src={item.img}
                        alt="propertypic"
                        className="img"
                      />
                      <Card.Body>
                        <Card.Title>
                          {" "}
                          <div>
                            {" "}
                            {item.price ? (
                              <p
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "bold",
                                  color: "green",
                                }}
                              >
                                {item.price}
                              </p>
                            ) : (
                              "-"
                            )}
                          </div>
                        </Card.Title>
                        <Card.Text>
                          <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                            {item.title}
                          </p>

                          <div
                            style={{ display: "flex", justifyContent: "start" }}
                          >
                            <div>
                              <i class="fa-solid fa-bath"></i>
                              &nbsp;
                              {item.washrooms}
                            </div>
                            <div className="px-2">
                              <i class="fa-solid fa-bed"></i>
                              &nbsp;
                              {item.bedrooms}
                            </div>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
        </Card>
      </Container>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "50px",
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={10}
            size="large"
            onChange={(e, p) => {
              console.log("eeeeeeeee", p);
              setPage(p);
            }}
          />
        </Stack>
      </div>
    </>
  );
};

export default PropertyListing;
