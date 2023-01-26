import React, { useState, useEffect } from 'react';
import { atom, selector, useRecoilState } from 'recoil';
import axios from 'axios';
import connection from '../components/db';

interface Lesson {
  id: number;
  lessonImage: string;
  instructor: string;
  instructorImage: string;
  name: string;
  takeTime: string;
  rating: number;
}

export const api = {
  getLectures: (callback: (error: Error | null, results: Lesson[]) => void) => {
    const sql = 'SELECT * FROM lessons';
    connection.query(sql, (error: Error | null, results: Lesson[]) => {
      if (error) throw error;
      callback(null, results);
    });
  },
};

export type { Lesson };

// export const bookmark = {
//   getbookmark: (callback: (error: Error | null, results: string) => void) => {
//     const sql = 'SELECT * FROM bookmark';
//     connection.query(sql, (error: Error | null, results: string) => {
//       if (error) throw error;
//       callback(null, results);
//     });
//   },
// };
