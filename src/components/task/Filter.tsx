import { TiDelete } from 'react-icons/ti';

import { css } from '@emotion/css';

import { IconButton } from '../shared/IconButton';

interface FilterProps {
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Filter({ handleFilter }: FilterProps) {
  return (
    <div className={filterWrapper}>
      <p>Filter</p>
      <input name="filter" onChange={e => handleFilter(e)} className={input} />
      <IconButton>
        <TiDelete size={24} color="#000" />
      </IconButton>
    </div>
  );
}

const filterWrapper = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
  padding: '4px',
  backgroundColor: '#DCDCDC',
});

const input = css({
  padding: '4px',
  borderRadius: '4px',
});
