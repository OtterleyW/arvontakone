import React, { Component, PropTypes } from 'react';
import './RatsukonTulos.css';

export default class RatsukonTulos extends Component{
  static propTypes = {
    ratsukko: PropTypes.string.isRequired,
    pisteet: PropTypes.arrayOf(PropTypes.number).isRequired,
    boldattu: PropTypes.bool.isRequired,
    brTagi: PropTypes.bool.isRequired,
    sijoittunut: PropTypes.bool.isRequired,
    sijoitus: PropTypes.number.isRequired
  }

  render(){
    return (
      <div className={this.props.sijoittunut && 'RatsukonTulos-sijoittunut'}>
        <StrongLisays lisaaStrong={this.props.boldattu && this.props.sijoittunut}>
          {this.props.sijoitus}. {this.props.ratsukko} {laskeJaMuotoileProsentti(this.props.pisteet)}{this.props.brTagi && '<br />'}
        </StrongLisays>
      </div>
    );
  }
}

function StrongLisays(props) {
  if (props.lisaaStrong) {
    return <div>{'<strong>'}{props.children}{'</strong>'}</div>;
  } else {
    return <div>{props.children}</div>;
  }
}

function laskeJaMuotoileProsentti(pisteet){
  if(pisteet && pisteet.length){
    const lkm = pisteet.length;
    const summa = pisteet.reduce((prev,curr) => prev + curr, 0);
    const tulos = ((summa/(lkm*10)));
    return "(" + tulos.toLocaleString('fi-FI', {style:'percent', minimumFractionDigits: 1}) + ")";
  }

  return "(ei pisteitä)";
}