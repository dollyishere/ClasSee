import React, { useEffect, useState } from 'react';
import api, { Lecture } from '../util/api';
import logo from '../assets/logo.png';

// interface Props {}

// dummy data
const LectureCard = () => {
  const dummyData = [
    { id: 1, image: 'image1.jpg', instructor: 'John Doe', name: 'Introduction to React', rating: 4.5 },
    { id: 2, image: 'image2.jpg', instructor: 'Jane Smith', name: 'Advanced JavaScript', rating: 4.0 },
    { id: 3, image: 'image3.jpg', instructor: 'Bob Johnson', name: 'Node.js for Beginners', rating: 3.5 },
  ];

  const [lectures, setLectures] = useState<Lecture[]>(dummyData);
  return (
    <div className="lecture">
      {lectures.map((lecture) => (
        <div className="lecture-card" key={lecture.id}>
          <img src={logo} alt={lecture.name} />
          <p className="instructor">Instructor: {lecture.instructor}</p>
          <p className="name">Lecture Name: {lecture.name}</p>
          <p className="rating">Rating: {lecture.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default LectureCard;

// DB API로 data 받아올때 코드
// import React, { useEffect, useState } from 'react';
// import api from './api';

// interface Props {}

// const LecturePage: React.FC<Props> = () => {
//   const [lectures, setLectures] = useState<Lecture[]>([]);

//   useEffect(() => {
//     api.getLectures((error, results) => {
//       if (error) throw error;
//       setLectures(results);
//     });
//   }, []);

//   return (
//     <div>
//       {lectures.map((lecture) => (
//         <div key={lecture.id}>
//           <img src={lecture.image} alt={lecture.name} />
//           <p>Instructor: {lecture.instructor}</p>
//           <p>Lecture Name: {lecture.name}</p>
//           <p>Rating: {lecture.rating}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default LecturePage;
