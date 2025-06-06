import React, { Component } from 'react';
import {Grid, Row, Form, FormGroup, Col, Checkbox} from 'react-bootstrap';
import './ListaTuloslistoista.css';
import TulosLista from './TulosLista'

class ListaTuloslistoista extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brTagi: false,
      boldattu: false,
      naytaProsentti: true,
      naytaHylatyt: true,
      naytaPisteet: false

    };
  }

  render() {
    const tulosLista = this.props.tulosLista;

    return (
      <div className="tulokset">
      <Grid>
        <Row>
          <Col smOffset={2} sm={10}>
            <Form inline>
              <FormGroup controlId="formInlineCheckboxes">
                  <span className="inlineCheckbox">
                    <Checkbox checked={this.state.brTagi} onChange={this.nappaaBrTagi}> Lisää {"<br />"}-tagit</Checkbox>
                  </span>
                  <span className="inlineCheckbox">
                    <Checkbox checked={this.state.boldattu} onChange={this.nappaaBoldattu}> Lihavoi sijoittuneet</Checkbox>
                  </span>
                  <span className="inlineCheckbox">
                    <Checkbox checked={this.state.naytaProsentti} onChange={this.nappaaNaytaProsentti}> Näytä prosentit</Checkbox>
                  </span>
                  <span className="inlineCheckbox">
                    <Checkbox checked={this.state.naytaHylatyt} onChange={this.nappaaNaytaHylatyt}> Näytä hylätyt</Checkbox>
                  </span>
                  <span className="inlineCheckbox">
                    <Checkbox checked={this.state.naytaPisteet} onChange={this.nappaaNaytaPisteet}> Näytä pisteet</Checkbox>
                  </span>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            {tulosLista ?  this.naytaTulokset() : "Ei tuloksia"}
          </Col>
        </Row>
      </Grid>
      </div>
    );
  }

  nappaaBrTagi = (event) => {
    this.setState({brTagi: event.target.checked});
  }

  nappaaBoldattu = (event) => {
    this.setState({boldattu: event.target.checked});
  }

  nappaaNaytaProsentti = (event) => {
    this.setState({naytaProsentti: event.target.checked});
  }

  nappaaNaytaPisteet = (event) => {
    this.setState({naytaPisteet: event.target.checked});
  }

  nappaaNaytaHylatyt = (event) => {
    this.setState({naytaHylatyt: event.target.checked});
  }


  naytaTulokset(){
    return this.props.tulosLista.map((tulos, index) =>
      <div key={index}>
        <h2>Tulos {index+1}:</h2>
        <TulosLista 
          tulos={tulos}
          boldattu={this.state.boldattu}
          brTagi={this.state.brTagi}
          naytaProsentti={this.state.naytaProsentti}
          naytaPisteet={this.state.naytaPisteet}
          naytaHylatyt={this.state.naytaHylatyt}
          sijoittuneet={this.props.sijoittuneet} 
        />
      </div>
    );
  }
}



export default ListaTuloslistoista;
