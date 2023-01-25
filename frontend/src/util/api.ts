import connection from '../components/db';

interface Lecture {
  id: number;
  lectureImage: string;
  instructor: string;
  instructorImage: string;
  name: string;
  takeTime: string;
  rating: number;
}

const api = {
  getLectures: (callback: (error: Error | null, results: Lecture[]) => void) => {
    const sql = 'SELECT * FROM lectures';
    connection.query(sql, (error: Error | null, results: Lecture[]) => {
      if (error) throw error;
      callback(null, results);
    });
  },
};

export type { Lecture };
export default api;
