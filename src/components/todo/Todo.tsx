import { Checkbox, Button, Space, Input } from 'dnb-ui-lib';
import { trash as TrashIcon, edit as EditIcon } from 'dnb-ui-lib/icons';
import { useEffect, useRef, useState } from 'react';
import { TodoItem } from '../../types/TodoItem';
import styles from './Todo.module.scss';

type TodoProps = TodoItem & {
  toggleTodoCompleted: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (todo: TodoItem) => void;
};

export const Todo = ({
  name,
  completed,
  id,
  toggleTodoCompleted,
  deleteTodo,
  editTodo
}: TodoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.length > 0) {
      editTodo({ name: newName, completed, id });
      setIsEditing(false);
    }
  };

  const onEditClick = () => {
    setIsEditing(true);
    editInputRef?.current?.focus();
  };

  useEffect(() => {
    if (isEditing) {
      editInputRef?.current?.focus();
    }
  }, [isEditing]);

  const viewTodo = (
    <div className={styles.container}>
      <Checkbox
        label={name}
        checked={completed}
        className={completed ? styles.completed : ''}
        on_change={() => toggleTodoCompleted(id)}
      />
      <Space top="0.5rem">
        <Button
          text="Edit"
          variant="secondary"
          icon={EditIcon}
          right="1rem"
          on_click={onEditClick}
        />
        <Button
          text="Delete"
          variant="secondary"
          icon={TrashIcon}
          on_click={() => deleteTodo(id)}
        />
      </Space>
    </div>
  );

  const editTodoForm = (
    <form onSubmit={handleEditSubmit}>
      <Input
        label={`New name for ${name}`}
        value={newName}
        label_direction="vertical"
        on_change={({ value }: any) => setNewName(value)}
        bottom="0.5rem"
        inner_ref={editInputRef}
      />
      <Button
        text="Cancel"
        icon="close"
        variant="tertiary"
        right="0.5rem"
        on_click={() => setIsEditing(false)}
      />
      <Button text="Save" variant="secondary" type="submit" />
    </form>
  );

  return isEditing ? editTodoForm : viewTodo;
};
