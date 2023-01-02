export default function editList(index, array, newDiscription) {
  array[index].desc = newDiscription;
  return array;
}