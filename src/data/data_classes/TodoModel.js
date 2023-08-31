class TodoModel {
  constructor({
    category_id,
    reminder_id,
    name,
    completed_at,
    subtodo_list,
    date,
    priority,
    memo,
    order,
  }) {
    (this.category_id = category_id),
      (this.reminder_id = reminder_id),
      (this.name = name),
      (this.completed_at = completed_at),
      (this.subtodo_list = subtodo_list),
      (this.date = date),
      (this.priority = priority),
      (this.memo = memo),
      (this.order = order);
  }
}

export default TodoModel;
