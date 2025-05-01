import axios from 'axios';

let categorys = [];

async function fetchData() {
    try {
        const response = await axios.get('http://localhost:4000/api/categories');
        categorys = response.data;
        //console.log(categorys);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

await fetchData(); 

export { categorys };

