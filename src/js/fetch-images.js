import axios from 'axios';

export { fetchImagens };

const KEY = '30134814-45a027ae4da4b601a981739e4';
const URL = 'https://pixabay.com/api';

async function fetchImagens(name, page) {
  const response = await axios
    .get(
      `${URL}/?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    )
    .then(resp => resp.data)
    .catch(error => console.log(error));
  return response;
}
