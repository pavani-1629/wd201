/* eslint-disable no-undef */
const todoList = require("../todo");

describe("TodoList test Suite", () => {
  let today = new Date().toISOString().split("T")[0];

  test("checks creating a new todo", () => {
    const todos = todoList();
    const { all, add } = todos;

    const initialLength = all.length;

    add({
      title: "Test todo",
      dueDate: today,
      completed: false,
    });

    expect(all.length).toBe(initialLength + 1);
  });

  test("checks marking a todo as completed.", () => {
    const todos = todoList();
    const { all, add, markAsComplete } = todos;

    add({
      title: "Incomplete Task",
      dueDate: today,
      completed: false,
    });

    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("checks retrieval of overdue items.", () => {
    const todos = todoList();
    const { add, overdue } = todos;

    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
      .toISOString()
      .split("T")[0];

    add({
      title: "Overdue Task",
      dueDate: yesterday,
      completed: false,
    });

    const result = overdue();
    expect(result.length).toBe(1);
    expect(result[0].dueDate).toBe(yesterday);
  });

  test("checks retrieval of due today items.", () => {
    const todos = todoList();
    const { add, dueToday } = todos;

    add({
      title: "Today Task",
      dueDate: today,
      completed: false,
    });

    const result = dueToday();
    expect(result.length).toBe(1);
    expect(result[0].dueDate).toBe("");
  });

  test("checks retrieval of due later items.", () => {
    const todos = todoList();
    const { add, dueLater } = todos;

    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0];

    add({
      title: "Future Task",
      dueDate: tomorrow,
      completed: false,
    });

    const result = dueLater();
    expect(result.length).toBe(1);
    expect(result[0].dueDate).toBe(tomorrow);
  });
});
