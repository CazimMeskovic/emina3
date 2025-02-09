import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
          Šivenjem se bavim već dugi niz godina – u početku samo za sebe, iz ljubavi prema kreativnosti i ručnom radu. Vremenom je ta strast prerasla u nešto veće, pa sam počela šiti i za druge – za sve one koji žele unikatne komade, skrojene baš po njihovoj meri i želji.<span className="purple">Soumyajit Behera </span>
             <span className="purple"> Bilo da vam je potreban poseban odevni komad, prepravka ili restauracija stare odeće, svaki rad pristupam s pažnjom, preciznošću i posvećenošću detaljima.</span>
            <br />
            Verujem da odeća treba da odražava ličnost i stil svakog pojedinca, zato mi je cilj da kroz svoj rad omogućim svima da dobiju upravo ono što žele – kvalitetno izrađeno, udobno i jedinstveno. 
            <br />
            
            {/* <br />
            <br /> */}
             <span className="purple">Ako imate ideju koju želite da oživite, tu sam da je zajedno pretvorimo u stvarnost!</span>
            
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Izaberi
            </li>
            <li className="about-activity">
              <ImPointRight /> Nazovi
            </li>
            <li className="about-activity">
              <ImPointRight /> Poruči
            </li>
          </ul>

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
