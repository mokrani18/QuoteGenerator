import "./styles.css";
import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FacebookShareButton, FacebookIcon } from "react-share";

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState([]);

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data);
        setQuote(data[0]);
      });
  }, []);
  function getRandomQuote() {
    const random = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[random]);
  }
  return (
    <div className="App">
      <Card style={{ width: 550, opacity: 0.75 }}>
        <Card.Title
          style={{
            marginTop: 15,
            fontSize: 30,
            fontWeight: "bold",
            borderBottom: "1px solid black"
          }}
        >
          Quote Generator
        </Card.Title>
        <Card.Body style={{ display: "flex", flexDirection: "column" }}>
          <Card.Text style={{ fontWeight: "bold" }}>
            <span>
              <FontAwesomeIcon icon="faQuoteRight" />
            </span>
            {quote?.text}
          </Card.Text>
          <Card.Text style={{ fontStyle: "italic", fontSize: 13 }}>
            -{quote?.author ? quote?.author : "Unknown"}
          </Card.Text>
          <Button variant="secondary" className="mt-3" onClick={getRandomQuote}>
            Generate Quote
          </Button>
          <Button variant="primary" className="mt-3">
            <FacebookShareButton url={"Facebook.com"} quote={"quote?.text"}>
              {" "}
              {/* dosn't work */}
               <FacebookIcon size={32} round />
            </FacebookShareButton>
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
