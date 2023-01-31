import axios from 'axios';

const MyCreatedLessonsApi = () => {
  axios.get(`http://localhost:3000/mycreatedlessons`), {},
  {
    headers: { 'Content-Type': 'application/json' },
  },
};

export default MyCreatedLessonsApi;
