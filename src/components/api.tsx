import { QandAType } from "./types";

export const getQuestions = async () => {
  const response = await fetch('https://raw.githubusercontent.com/mzronek/task/main/flow.json')
  return await response.json()
}

export const sendAnswers = async (qAndAs: QandAType[]): Promise<boolean> => {
  try {
    await fetch('https://virtserver.swaggerhub.com/L8475/task/1.0.1/conversation', {
      method: 'PUT',
      body: JSON.stringify(qAndAs.map((qAndA: QandAType) => ({
        name: qAndA.question.name,
        value: qAndA.answer.value,
      })))
    })
    return true
  }
  catch {
    return false
  }
}
