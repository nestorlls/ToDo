export class TodoEnity {
  constructor(
    public id: number,
    public text: string,
    public completedAt?: Date
  ) {}

  get isCompleted() {
    return !!this.completedAt;
  }
}
