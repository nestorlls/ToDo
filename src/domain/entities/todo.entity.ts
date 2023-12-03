import { CustomeError } from '../errors/custome.error';

export class TodoEnity {
  constructor(
    public id: number,
    public text: string,
    public completedAt?: Date | null
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
        throw new CustomeError(
          'Property "CompletedAt" must be a valid date',
          400
        );
      }
    }

    return new TodoEnity(id, text, completedAt);
  }
}
