import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.punkapi.com/v2/'
});

const getBeerList = page => {
  return api.get(`beers?page=${page}&per_page=20`)
    .then(res => {
      if (res.data) {
        let beers = [];
        res.data.forEach(
          beer =>
            (beers[beer.id] = {
              name: beer.name,
              id: beer.id,
              tagline: beer.tagline,
              description: beer.description,
              image_url: beer.image_url
            })
        );
        return beers;
      } else {
        return false;
      }
    })
}

const getBeerDetail = id => {
  return api.get(`beers/${id}`)
    .then(res => {
      if (res.data) {
        let beer = {
          name: res.data[0].name,
          id: res.data[0].id,
          tagline: res.data[0].tagline,
          description: res.data[0].description,
          image_url: res.data[0].image_url
        }
        return beer;
      } else {
        return false;
      }
    })
}

export default api;
export { getBeerList, getBeerDetail };