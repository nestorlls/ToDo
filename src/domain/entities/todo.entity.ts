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
    if (!id) throw new CustomeError('Id is required', 400);
    if (!text) throw new CustomeError('Text is required', 400);
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
