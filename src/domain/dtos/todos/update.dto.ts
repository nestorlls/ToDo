import { CustomeError } from '../../errors/custome.error';

export class UpdateDto {
  constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: Date
  ) {}

  get values() {
    const currentValues: { [key: string]: any } = {};

    if (this.text) currentValues.text = this.text;
    if (this.completedAt) currentValues.completedAt = this.completedAt;

    return currentValues;
  }

  static create(props: { [key: string]: any }): {
    error?: string;
    updateDto?: UpdateDto;
  } {
    const { id, text, completedAt } = props;
    const idNumber = Number(id);

    if (isNaN(Number(id))) {
      return {
        error: 'Property "Id" must be a number',
      };
    }

    let newCompletedAt = completedAt;
    if (completedAt) {
      newCompletedAt = new Date(completedAt);

      if (newCompletedAt.toString() === 'Invalid Date') {
        return {
          error: 'Property "CompletedAt" must be a valid date',
        };
      }
    }

    return {
      updateDto: new UpdateDto(idNumber, text, newCompletedAt),
    };
  }
}
