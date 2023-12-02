export class TodoEnity {
  constructor(
    public id: number,
    public text: string,
    public completedAt?: Date
  ) {}

  get isCompleted() {
    return !!this.completedAt;
  }

  public static fromObject(obj: { [key: string]: any }): TodoEnity {
    const { id, text, completedAt } = obj;
    if (!id) throw 'Id is required';
    if (!text) throw 'Text is required';
    let newCompletedAt;
    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (isNaN(newCompletedAt.getTime())) {
        throw 'Property "CompletedAt" must be a valid date';
      }
    }

    return new TodoEnity(id, text, newCompletedAt);
  }
}
