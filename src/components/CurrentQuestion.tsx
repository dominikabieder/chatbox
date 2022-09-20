import { Button } from '@mui/material';

import Question from "./Question";
import { AnswerType, QuestionType } from "./types";

type CurrentQuestionProps = {
  question: QuestionType,
  onAnswer: (answer: AnswerType) => void
}

const styles = {
  answer: {
    margin: '8px 8px 0 0'
  }
}

const CurrentQuestion = ({ question: { text, valueOptions: answers }, onAnswer }: CurrentQuestionProps) => (
  <>
    <Question question={text} />
    {answers.map((answer: AnswerType, i) => (
      <Button key={i} variant='contained' sx={styles.answer} onClick={() => onAnswer(answer)}>{answer.text}</Button>
    ))}
  </>
)

export default CurrentQuestion
