import { useState } from 'react';
import shortid from 'shortid';

interface Todo {
  id: string;
  title: string;
  contents: string;
  isDone: boolean;
}

const App = () => {
  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');

  const [todoList, setTodoList] = useState<Todo[]>([
    {
      id: shortid.generate(),
      title: 'title1',
      contents: 'contents1',
      isDone: false
    },
    {
      id: shortid.generate(),
      title: 'title2',
      contents: 'contents2',
      isDone: true
    },
    {
      id: shortid.generate(),
      title: 'title3',
      contents: 'contents3',
      isDone: false
    }
  ]);

  return (
    <div>
      <form
        onSubmit={(e) => {
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
        }}
      >
        <input
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <input
          value={contents}
          onChange={(event) => {
            setContents(event.target.value);
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
                  <p>{todo.id}</p>
                  <p>{todo.title}</p>
                  <p>{todo.contents}</p>
                  <p>{todo.isDone.toString()}</p>
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
                  <p>{todo.id}</p>
                  <p>{todo.title}</p>
                  <p>{todo.contents}</p>
                  <p>{todo.isDone.toString()}</p>
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
