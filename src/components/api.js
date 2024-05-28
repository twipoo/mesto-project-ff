 //token  '2b1d046a-7a38-44ae-adc1-5d0abf366ad9';
 //group  'wff-cohort-15';

export function getUserInfo (){
    return fetch('https://nomoreparties.co/v1/wff-cohort-15/cards', {
  headers: {
    authorization: '2b1d046a-7a38-44ae-adc1-5d0abf366ad9'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });
}