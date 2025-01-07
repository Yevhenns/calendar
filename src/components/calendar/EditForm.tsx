import { css } from '@emotion/css';

import { Button } from '../shared';

interface EditFormProps {
  isEditMode: boolean;
  value: string;
  submitTask: () => void;
  rejectAddNewTask: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EditForm({
  isEditMode,
  value,
  submitTask,
  rejectAddNewTask,
  handleInputChange,
}: EditFormProps) {
  return (
    <>
      {isEditMode && (
        <>
          <input
            value={value}
            name="task"
            className={input}
            onChange={e => handleInputChange(e)}
          />
          <div className={buttonSet}>
            <Button
              disabled={isEditMode && value.trim().length === 0}
              onClick={submitTask}
            >
              Ok
            </Button>
            <Button onClick={rejectAddNewTask}>Cancel</Button>
          </div>
        </>
      )}
    </>
  );
}

const buttonSet = css({
  display: 'flex',
  gap: '8px',
  justifyContent: 'end',
});

const input = css({
  padding: '4px',
  borderRadius: '4px',
});
