import { AnswerType, QuestionType } from "./types";

export const getQuestions = async () => {
  const response = await fetch('https://raw.githubusercontent.com/mzronek/task/main/flow.json')
  return await response.json()
}

export const sendAnswers = async (questions: QuestionType[], answers: AnswerType[]): Promise<boolean> => {
  try {
    await fetch('https://virtserver.swaggerhub.com/L8475/task/1.0.1/conversation', {
      method: 'PUT',
      body: JSON.stringify(answers.map((answer: AnswerType, i) => ({
        name: questions[i].name,
        value: answer.value,
      })))
    })
    return true
  }
  catch {
    return false
  }
}
