export class MinHeap<T extends Record<string, any>> {
  private keyname: keyof T;
  private data: T[];

  constructor(keyname: keyof T) {
    this.keyname = keyname;
    this.data = [];
  }

  add(object: T): void {
    this.data.push(object);
    this.heapifyUp(this.data.length - 1);
  }

  size(): number {
    return this.data.length;
  }

  remove(): T | undefined {
    if (this.data.length === 0) return undefined; // Handle edge case where heap is empty
    const response = this.data[0];
    this.swap(0, this.data.length - 1);
    this.data.pop();
    this.heapifyDown(0);
    return response;
  }

  update(searchKey: string, searchValue: any, object: T): void {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i][searchKey] === searchValue) {
        index = i;
        break;
      }
    }

    if (index === -1) return; // Handle case where the object to update is not found.

    const oldValue = this.data[index];
    this.data[index] = object;
    if (oldValue[this.keyname] === object[this.keyname]) return;

    if (object[this.keyname] < oldValue[this.keyname]) {
      this.heapifyUp(index);
    } else {
      this.heapifyDown(index);
    }
  }

  private heapifyUp(index: number): void {
    const parentIndex = this.getParentIndex(index);
    if (parentIndex < 0) return;

    if (this.data[index][this.keyname] < this.data[parentIndex][this.keyname]) {
      this.swap(index, parentIndex);
      this.heapifyUp(parentIndex);
    }
  }

  private heapifyDown(index: number): void {
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

  private swap(index1: number, index2: number): void {
    const tmp = this.data[index1];
    this.data[index1] = this.data[index2];
    this.data[index2] = tmp;
  }

  private getLeftChildIndex(index: number): number {
    return index * 2 + 1;
  }

  private getRightChildIndex(index: number): number {
    return index * 2 + 2;
  }

  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }
}
