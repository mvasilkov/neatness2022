export type ComparatorFn<T> = (a: T, b: T) => number

type Optional<T> = T | null

export class PriorityQueue<T> {
  comparatorFn: ComparatorFn<T>
  length: number
  values: T[]

  constructor(comparatorFn: ComparatorFn<T>, initialValues?: T[]) {
    this.comparatorFn = comparatorFn
    this.length = 0
    this.values = []

    if (initialValues) {
      for (const value of initialValues) {
        this.insert(value)
      }
    }
  }

  insert(value: T) {
    if (this.values.length <= this.length) {
      this.values.length = Math.max(1, this.values.length * 2)
    }
    this.values[this.length++] = value
    this.bubbleUp()
  }

  remove(): Optional<T> {
    if (this.length === 0) return null

    const node = this.values[0]

    if (this.length === 1) {
      this.length = 0
      this.values[0] = null
      return node
    }

    this.values[0] = this.values[this.length - 1]
    this.values[this.length - 1] = null
    this.length--

    this.bubbleDown()

    return node
  }

  heapsort() {
    return Array.from({ length: this.length }, () => this.remove())
  }

  private parent(nodeIndex: number) {
    if (nodeIndex === 0) return null
    return (nodeIndex - 1) >>> 1
  }

  private leftChild(nodeIndex: number) {
    const child = (nodeIndex * 2) + 1
    if (child >= this.length) return null
    return child
  }

  private rightChild(nodeIndex: number) {
    const child = (nodeIndex * 2) + 2
    if (child >= this.length) return null
    return child
  }

  private bubbleUp() {
    let index = this.length - 1

    while (true) {
      const parent = this.parent(index)

      if (parent !== null && this.comparatorFn(this.values[index], this.values[parent]) < 0) {
        const t = this.values[index]
        this.values[index] = this.values[parent]
        this.values[parent] = t
        index = parent
        continue
      }

      return
    }
  }

  private bubbleDown() {
    let index = 0

    while (true) {
      const left = this.leftChild(index)
      const right = this.rightChild(index)

      let swapCandidate = index

      if (left !== null && this.comparatorFn(this.values[swapCandidate], this.values[left]) > 0) {
        swapCandidate = left
      }

      if (right !== null && this.comparatorFn(this.values[swapCandidate], this.values[right]) > 0) {
        swapCandidate = right
      }

      if (swapCandidate !== index) {
        const t = this.values[index]
        this.values[index] = this.values[swapCandidate]
        this.values[swapCandidate] = t
        index = swapCandidate
        continue
      }

      return
    }
  }
}
