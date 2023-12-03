import { CustomeError } from '../../errors/custome.error';

export class CreateTodoDto {
  constructor(public readonly text: string) {}

  static create(props: { [key: string]: any }): {
    error?: CustomeError;
    createTodoDto?: CreateTodoDto;
  } {
    const { text } = props;
    if (!text) {
      throw { error: new CustomeError('Property "Text" is required', 400) };
    }

    return { createTodoDto: new CreateTodoDto(text) };
  }
}
