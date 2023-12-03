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
    error?: CustomeError;
    updateDto?: UpdateDto;
  } {
    const { id, text, completedAt } = props;
    const idNumber = Number(id);

    if (isNaN(Number(id))) {
      throw {
        error: new CustomeError('Property "Id" must be a number', 400),
      };
    }

    let newCompletedAt = completedAt;
    if (completedAt) {
      newCompletedAt = new Date(completedAt);

      if (newCompletedAt.toString() === 'Invalid Date') {
        throw {
          error: new CustomeError(
            'Property "CompletedAt" must be a valid date',
            400
          ),
        };
      }
    }

    return {
      updateDto: new UpdateDto(idNumber, text, newCompletedAt),
    };
  }
}
