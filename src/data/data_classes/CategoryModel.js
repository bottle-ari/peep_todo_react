class CategoryModel {
  constructor({ id, name, color, emoji, order, selected }) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.emoji = emoji;
    this.order = order;
    this.selected = selected;
  }
}

export default CategoryModel;
