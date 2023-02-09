import { Dispatch, SetStateAction } from 'react';

export interface SearchBoxProps {
  dayOfWeek: Array<boolean>;
  setDayOfWeek: Dispatch<SetStateAction<Array<boolean>>>;
  setMinStartTime: Dispatch<SetStateAction<number | undefined>>;
  setMaxStartTime: Dispatch<SetStateAction<number | undefined>>;
  setMinPrice: Dispatch<SetStateAction<number | undefined>>;
  setMaxPrice: Dispatch<SetStateAction<number | undefined>>;
  search: () => void;
}
