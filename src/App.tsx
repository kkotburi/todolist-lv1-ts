import { useState, useRef } from 'react';
import shortid from 'shortid';
import Input from './components/Input';

interface Todo {
  id: string;
  title: string;
  contents: string;
  isDone: boolean;
}

const App = () => {
  const [todoList, setTodoList] = useState<Todo[]>([
    {
      id: shortid.generate(),
      title: '제주도',
      contents: '일주일 살기',
      isDone: false
    },
    {
      id: shortid.generate(),
      title: '서울',
      contents: '모각지',
      isDone: true
    }
  ]);
  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');

  const todoRef = useRef<HTMLInputElement>(null);

  const submitTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo = {
      id: shortid.generate(),
      title,
      contents,
      isDone: false
    };

    setTodoList([...todoList, newTodo]);

    setTitle('');
    setContents('');
  };

  return (
    <div>
      <form onSubmit={submitTodo}>
        <Input
          ref={todoRef}
          type="text"
          name="title"
          title="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          autoFocus
        />
        <Input
          type="text"
          name="contents"
          title="contents"
          value={contents}
          onChange={(e) => {
            setContents(e.target.value);
          }}
        />
        <button type="submit">add</button>
      </form>
      <div>
        <div>
          <p>할일 목록</p>
          {todoList
            .filter((todo) => !todo.isDone)
            .map((todo) => {
              return (
                <div key={todo.id}>
                  <p>{todo.title}</p>
                  <p>{todo.contents}</p>
                  <button
                    onClick={() => {
                      const updateTodo = todoList.map((item) => {
                        if (item.id === todo.id) {
                          return {
                            ...item,
                            isDone: !item.isDone
                          };
                        } else {
                          return item;
                        }
                      });
                      setTodoList(updateTodo);
                    }}
                  >
                    완료
                  </button>
                  <button
                    onClick={() => {
                      const deletedTodo = todoList.filter((item) => {
                        return item.id !== todo.id;
                      });
                      setTodoList(deletedTodo);
                    }}
                  >
                    삭제
                  </button>
                </div>
              );
            })}
          <p>완료 목록</p>
          {todoList
            .filter((todo) => todo.isDone)
            .map((todo) => {
              return (
                <div key={todo.id}>
                  <p>{todo.title}</p>
                  <p>{todo.contents}</p>
                  <button
                    onClick={() => {
                      const updateTodo = todoList.map((item) => {
                        if (item.id === todo.id) {
                          return {
                            ...item,
                            isDone: !item.isDone
                          };
                        } else {
                          return item;
                        }
                      });
                      setTodoList(updateTodo);
                    }}
                  >
                    취소
                  </button>
                  <button
                    onClick={() => {
                      const deletedTodo = todoList.filter((item) => {
                        return item.id !== todo.id;
                      });
                      setTodoList(deletedTodo);
                    }}
                  >
                    삭제
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default App;
