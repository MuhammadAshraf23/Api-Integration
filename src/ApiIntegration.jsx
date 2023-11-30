import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

const ApiIntegration = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
      //  console.log(response)
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <h1 className="fw-bold">Error: {error.message}</h1>;
  }

  return (
    <div>
      <h1 className="fw-bold text-center mt-5 mb-3">Data from API:</h1>
      <div className="d-flex flex-wrap justify-content-between mr-3 ml-3">
        {data.map((item) => (
          <Card
            key={item.id}
            style={{ width: "18rem", height: "600px" }}
            className="shadow p-3 mb-5 bg-white rounded"
          >
            <div
              className="card-img-top"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "100%",
              }}
            />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text style={{ height: "160px", overflowY: "scroll" }}>
                {item.description}
              </Card.Text>
              <Button variant="primary">Add to Cart</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApiIntegration;
