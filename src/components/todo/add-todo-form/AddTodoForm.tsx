import { Input, Button } from 'dnb-ui-lib';
import { useState } from 'react';

type AddTodoFormProps = {
  addTodo: (name: string) => void;
};

export const AddTodoForm = ({ addTodo }: AddTodoFormProps) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.length > 0) {
      addTodo(name);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Add new todo:"
        right="1rem"
        value={name}
        on_change={({ value }: any) => setName(value)}
      />
      <Button text="Add" type="submit" />
    </form>
  );
};
