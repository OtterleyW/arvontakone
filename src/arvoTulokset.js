import random from 'lodash/random'
import sortBy from 'lodash/sortBy'

export default function arvoTulokset(osallistujat, arvontakerrat){
  const arvontatulokset = arvoPisteetRatsukoille(osallistujat,arvontakerrat);
  return jarjestaTulokset(arvontatulokset);
}

export function arvoPisteetRatsukoille(osallistujat, arvontakerrat){
  const ratsukot = pilkoRivit(osallistujat);
  return ratsukot.map((ratsukko) => {
    const pisteet = arvoPisteet(arvontakerrat);
    return {
      ratsukko: ratsukko,
      pisteet: pisteet
    }
  });
}

export function pilkoRivit(merkkijono){
  return merkkijono.split('\n').filter((rivi)=> rivi.trim() !== "");
}

export function arvoPisteet(arvontakerrat){
  const i = Math.random();

  if(i < 0.03){
    return Array(arvontakerrat).fill(0).map(() => random(0, 14));
  }
  if(i < 0.8){
    return Array(arvontakerrat).fill(0).map(() => random(6, 20));
  } 
  if(i < 0.9){
    return Array(arvontakerrat).fill(0).map(() => random(8, 20));
  }
  else{
    return Array(arvontakerrat).fill(0).map(() => random(12, 20));
  }
}

export function jarjestaTulokset(arvontatulokset){
  return sortBy(arvontatulokset, [
    (ratsukonTulos) => ratsukonTulos.pisteet.reduce((prev,curr) => prev + curr, 0)
  ]).reverse(); 
}
