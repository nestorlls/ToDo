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
    let newCompletedAt = completedAt;

    if (isNaN(Number(id))) {
      return {
        error: `Id ${id} must be a valid Id`,
      };
    }

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
