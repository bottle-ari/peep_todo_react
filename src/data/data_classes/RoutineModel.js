class RoutineModel {
  constructor({
    category_id,
    reminder_id,
    name,
    is_active,
    subtodo,
    priority,
    order,
  }) {
    (this.category_id = category_id),
      (this.reminder_id = reminder_id),
      (this.name = name),
      (this.is_active = is_active),
      (this.subtodo = subtodo),
      (this.priority = priority),
      (this.order = order);
  }
}

export default RoutineModel;
