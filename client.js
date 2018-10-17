let axios = require('axios');

main();

async function main() {
  try {
    let token = (await axios.post('http://localhost:3000/login', {
      user: 'john',
      password: '123456'
    })).data.token;

    let res = (await axios.get('http://localhost:3000/cars', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }));
    console.log(res.data);

  } catch (e) {
    console.log(e.response.statusText);
  }
}
