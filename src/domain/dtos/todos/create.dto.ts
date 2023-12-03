export class CreateTodoDto {
  constructor(public readonly text: string) {}

  static create(props: { [key: string]: any }): {
    error?: string;
    createTodoDto?: CreateTodoDto;
  } {
    const { text } = props;
    if (!text) {
      return {
        error: 'Property "Text" is required',
      };
    }

    return { createTodoDto: new CreateTodoDto(text) };
  }
}
