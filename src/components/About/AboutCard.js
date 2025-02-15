import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="OmeniKontext quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Šivenjem se bavim već dugi niz godina u početku samo za sebe i svoje najmilije,iz ljubavi prema raskošnoj tkanini i slobodi ispoljavanja vlastite vizije i kreiranja željenih detalja.
            <span className="purple"></span>
            <br />
            <br />
            <span className="purple"> Vremenom je ta strast prerasla u nešto veće, pa sam počela šiti i za druge .Verujem da odeća treba da odražava ličnost i stil svakog pojedinca, </span>

            zato mi je cilj da kroz svoj rad omogućim svima da dobiju upravo ono što žele pridržavajući se jasnih granica dozvoljenog.

            <br />

            {/* <br />
            <br /> */}
            <br />
            <span className="purple">Vjerujem ako težite istom cilju da cemo naći dosta zajedničkih ideja da ostvarimo i vaše vizije, radujem se suradnji .</span>

          </p>
          {/*   <ul>
            <li className="about-activity">
              <ImPointRight /> Izaberi
            </li>
            <li className="about-activity">
              <ImPointRight /> Nazovi
            </li>
            <li className="about-activity">
              <ImPointRight /> Poruči
            </li>
          </ul> */}

          <p style={{ color: "rgb(155 126 172)" }}>
            {" "}
          </p>
          <footer className="blockquote-footer"></footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
