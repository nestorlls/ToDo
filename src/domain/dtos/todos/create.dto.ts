export class CreateTodoDto {
  constructor(public readonly text: string) {}

  static create(props: { [key: string]: any }): {
    error?: string;
    createTodoDto?: CreateTodoDto;
  } {
    const { text } = props;
    if (!text)
      return { error: 'Property "Text" is required', createTodoDto: undefined };
    return { error: undefined, createTodoDto: new CreateTodoDto(text) };
  }
}
