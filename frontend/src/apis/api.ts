import React, { useState, useEffect } from 'react';
import { atom, selector, useRecoilState } from 'recoil';
import axios from 'axios';
import connection from '../components/db';

interface Lesson {
  id: number;
  lessonImage: string;
  teacher: string;
  teacherImage: string;
  name: string;
  runningTime: string;
  category: string;
  rating: number;
  isBookMarked: boolean;
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
