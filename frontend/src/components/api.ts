import connection from './db';

interface Lecture {
  id: number;
  image: string;
  instructor: string;
  name: string;
  rating: number;
}

const api = {
  getLectures: (callback: (error: Error | null, results: Lecture[]) => void) => {
    const sql = 'SELECT * FROM lectures';
    connection.query(sql, (error, results) => {
      if (error) throw error;
      callback(null, results);
    });
  },
};

export type { Lecture };
export default api;
