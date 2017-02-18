import React, { Component } from 'react';
import * as V from 'victory';
import { arvoPisteet } from '../arvoTulokset';

export default class Satunnaisuus extends Component {
  constructor() {
    super();

    const arvontakerrat = 10;
    const tarkkuus = 5000;

    // Arvo 5000 kertaa pisteet arvontakerralla
    const pisteListat = Array(tarkkuus).fill(arvontakerrat).map(arvoPisteet);

    // Muuta data Victory:n odottamaan muotoon
    const data = pisteListatVictoryMuodossa(pisteListat, arvontakerrat);

    console.log("LOPPUDATA", data);

    this.state = {
      data: data,
      tarkkuus: tarkkuus,
      arvontakerrat: arvontakerrat
    };
  }

  render() {
    const data = this.state.data;
    const arvontakerrat = this.state.arvontakerrat;
    const isoinMahdollinenArvo = arvontakerrat * 10;
    // Mille välille arvot jakaantuvat x- ja y-akselilla
    const enitenEsiintymisiä = Math.max.apply(null, data.map(d => d.esiintymisKerrat));
    const domain = {
      x: [0, 1],
      y: [0, enitenEsiintymisiä]
    };

    return (
      <V.VictoryChart
        domain={domain}
        domainPadding={{x: [10, 0]}}
      >
        <V.VictoryBar
          data={data}
          x={(d) => d.summa / (isoinMahdollinenArvo)}
          y={(d) => d.esiintymisKerrat}
          padding={2}
        />
      </V.VictoryChart>
    );
  }
};

function pisteListatVictoryMuodossa(listaListoista, arvontakerrat) {
  console.log('listaListoista', listaListoista);

  // Data on nyt muodossa [[5, 8, ...], [4, 2, ...], ...]
  const listaSummista = listaListoista.map((lista) =>
    lista.reduce((curr, prev) => curr + prev, 0)
  );
  console.log('listaSummista', listaSummista);

  const isoinMahdollinenSumma = arvontakerrat * 10;
  console.log('isoinMahdollinenSumma', isoinMahdollinenSumma);

  // Alustetaan läpikäyntiä varten objekti, jossa jokainen mahdollinen
  // kokonaissumma on objektin avaimina ja arvot ovat jokaisella 0.
  const summatNollina =
    Array(isoinMahdollinenSumma + 1)
    .fill(0)
    .reduce((objekti, _, summa) => {
      // Temppu on palauttaa reduce-funktion avulla N-kertaa uusi objekti,
      // jossa on aina _kaikki_ edellisen reduce-kerran arvot sekä jotain uutta.
      // Tätä varten on olemassa kätevä "object rest spread" operaattori, joka
      // toimii kuten Reactissa {...this.props} kutsu
      // https://babeljs.io/docs/plugins/transform-object-rest-spread/
      return {
        ...objekti,
        // Asetataan objektiin uusi arvo 0 avaimella, joka määräytyy
        // `summa` muuttujan arvosta
        [summa]: 0
      };
    },
    // Alusta reduce-kutsu ensin tyhjällä objektilla
    {}
  );

  console.log('summatNollina', summatNollina);

  // Data on nyt muodossa [25, 52, 26, 82, ...]
  // Se pitäisi nyt ryhmitellä ämpäreihin, joissa summa on avain ja
  // se, kuinka monta kertaa kyseinen summa esiintyy, on arvo.
  const summienEsiintymisKerrat =
    listaSummista.reduce((rakennettuÄmpäri, summa) => {
      // Palautetaan uusi objekti, jossa summan avain on yksi suurempi
      return {
        ...rakennettuÄmpäri,
        [summa]: rakennettuÄmpäri[summa] + 1
      }
    },
    // Aloitetaan .reduce läpikäynti objektilla, jossa kaikki mahdolliset
    // summat on alustettu nollaksi
    summatNollina
  );

  console.log('summienEsiintymisKerrat', summienEsiintymisKerrat);

  // Data on nyt muodossa { 0: 1, 1: 10, 2: 25, ... }
  // Se pitää saada muutettua listaksi objekteja, joilla on
  // `x` ja `y` arvot.
  // JavaScriptissä objektin avaimet saa irti kutsumalla Object.keys() metodia:
  const summaAvaimet = Object.keys(summienEsiintymisKerrat);
  console.log('summaAvaimet', summaAvaimet);

  // `summaAvaimet` on nyt [0, 1, 2, ...], ja jokaiselle arvolle löytyy vastinpari
  // `summienEsiintymisKerrat` objektista
  const listaObjekteja = summaAvaimet.map((summa) => {
    return {
      summa: summa,
      esiintymisKerrat: summienEsiintymisKerrat[summa]
    };
  });

  // Nyt data on siinä muodossa, mitä Victory osaa syödä:
  // [{ summa: 0, esiintymisKerrat: 25 }, { summa: 1, esiintymisKerrat: 52 }, ...]
  return listaObjekteja;
}
