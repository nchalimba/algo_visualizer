export class MinHeap {
  constructor(keyname) {
    this.keyname = keyname;
    this.data = [];
    //this.indexMap = {};
  }

  add(object) {
    this.data.push(object);
    this.heapifyUp(this.data.length - 1);
  }

  size() {
    return this.data.length;
  }

  remove() {
    const response = this.data[0];
    this.swap(0, this.data.length - 1);
    this.data.pop();
    this.heapifyDown(0);
    return response;
  }

  update(searchKey, searchValue, object) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i][searchKey] === searchValue) {
        index = i;
        break;
      }
    }

    const oldValue = this.data[index];
    this.data[index] = object;
    if (oldValue[this.keyname] === object[this.keyname]) return;

    if (object[this.keyname] < oldValue[this.keyname]) {
      //if new priority smaller than before: heapify up
      this.heapifyUp(index);
    } else {
      //if new priority bigger than before: heapify down
      this.heapifyDown(index);
    }
  }

  heapifyUp(index) {
    const parentIndex = this.getParentIndex(index);
    if (parentIndex < 0) return;

    if (this.data[index][this.keyname] < this.data[parentIndex][this.keyname]) {
      this.swap(index, parentIndex);
      this.heapifyUp(parentIndex);
    }
  }

  heapifyDown(index) {
    const leftIndex = this.getLeftChildIndex(index);
    const rightIndex = this.getRightChildIndex(index);

    if (leftIndex > this.data.length - 1) return;
    let smallestIndex = leftIndex;
    if (
      rightIndex < this.data.length &&
      this.data[rightIndex][this.keyname] < this.data[leftIndex][this.keyname]
    ) {
      smallestIndex = rightIndex;
    }

    if (
      this.data[smallestIndex][this.keyname] < this.data[index][this.keyname]
    ) {
      this.swap(smallestIndex, index);
      this.heapifyDown(smallestIndex);
    }
  }

  swap(index1, index2) {
    const tmp = this.data[index1];
    this.data[index1] = this.data[index2];
    this.data[index2] = tmp;
  }

  getLeftChildIndex(index) {
    return index * 2 + 1;
  }

  getRightChildIndex(index) {
    return index * 2 + 2;
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
}
