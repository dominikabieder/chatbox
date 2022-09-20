export type QuestionType = {
  id: number,
  name: string,
  text: string,
  valueOptions: AnswerType[],
}

export type AnswerType = {
  nextId: number | false,
  value: boolean,
  text: string,
}
