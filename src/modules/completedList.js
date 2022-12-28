export default function completedList(index, array) {
  array[index].completed = !array[index].completed;
  return array;
}