import React, { Component } from "react";
import Carousel from "react-elastic-carousel";
import img from "../../Assets/2.webp";
import { Card } from "react-bootstrap";
import { consts } from "react-elastic-carousel";
import "./slider.css";
import { Link } from "react-router-dom";
class Sliders extends Component {
  state = {
    items: [
      { id: 1, title: "Property For Sale", price: "PKR1234556" },
      { id: 2, title: "Appartment For Sale", price: "PKR1234556" },
      { id: 3, title: "Property For Rent", price: "PKR1234556" },
      { id: 4, title: "Appartment for sale", price: "PKR1234556" },
      { id: 5, title: "Plot for Sale", price: "PKR1234556" },
      { id: 6, title: "Plot for Sale", price: "PKR1234556" },
      { id: 7, title: "Plot for Sale", price: "PKR1234556" },
      { id: 8, title: "Plot for Sale", price: "PKR1234556" },
    ],
  };

  render() {
    const { items } = this.state;
    return (
      <>
        <div style={{ margin: "20px 70px" }}>
          <Link to="/apartments">
            <h6 style={{ fontWeight: "bold", fontSize: "20px" }}>
              {" "}
              Appartments
            </h6>
          </Link>
        </div>

        <Carousel
          itemsToShow={4}
          itemPadding={[0, 4]}
          itemPosition={consts.START}
        >
          {/* {items.map(item => <div key={item.id}>{item.title}</div>)} */}

          {items.map((item) => {
            return (
              <>
                <div className="mx-2 ">
                  <div key={item.id}>
                    <Card className="cards">
                      <Card.Img src={img} />
                      <Card.Body className="body">
                        <Card.Title className="title">
                          {" "}
                          <p className="price">{item.price}</p>
                        </Card.Title>
                        <Card.Text>
                          {/* <p style={{fontSize:"15px",fontWeight:"semi-bold"}}>{item.title}</p> */}
                          <p className="mb-0 p-0">{item.title}</p>
                          <div className="icn">
                            <div>
                              <i class="fa-solid fa-bath"></i>&nbsp;4
                            </div>
                            <div className="px-2">
                              <i class="fa-solid fa-bed"></i>&nbsp;5
                            </div>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </>
            );
          })}
        </Carousel>

        <div style={{ margin: "20px 70px" }}>
          <Link to={"/houses"}>
            <h6 style={{ fontWeight: "bold", fontSize: "20px" }}>
              {" "}
              Houses For Rent
            </h6>
          </Link>
        </div>
        <Carousel
          itemsToShow={4}
          itemPadding={[0, 4]}
          itemPosition={consts.START}
        >
          {/* {items.map(item => <div key={item.id}>{item.title}</div>)} */}

          {items.map((item) => {
            return (
              <>
                <div className="mx-2 ">
                  <div key={item.id}>
                    <Card className="cards">
                      <Card.Img src={img} />
                      <Card.Body className="body">
                        <Card.Title className="title">
                          {" "}
                          <p className="price">{item.price}</p>
                        </Card.Title>
                        <Card.Text>
                          {/* <p style={{fontSize:"15px",fontWeight:"semi-bold"}}>{item.title}</p> */}
                          <p className="mb-0 p-0">{item.title}</p>
                          <div className="icn">
                            <div>
                              <i class="fa-solid fa-bath"></i>&nbsp;4
                            </div>
                            <div className="px-2">
                              <i class="fa-solid fa-bed"></i>&nbsp;5
                            </div>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </>
            );
          })}
        </Carousel>
      </>
    );
  }
}

export default Sliders;
