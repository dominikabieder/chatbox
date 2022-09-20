import { Button } from '@mui/material';

import Question from "./Question";
import { AnswerType, QuestionType } from "./types";

const styles = {
  answer: {
    margin: '8px 8px 0 0'
  }
}

type CurrentQuestionProps = {
  question: QuestionType,
  onAnswer: (question: QuestionType, answer: AnswerType) => void
}

const CurrentQuestion = ({ question, question: { text, valueOptions: answers }, onAnswer }: CurrentQuestionProps) => (
  <>
    <Question question={text} />
    {answers.map((answer: AnswerType, i) => (
      <Button key={i} variant='contained' sx={styles.answer} onClick={() => onAnswer(question, answer)}>
        {answer.text}
      </Button>
    ))}
  </>
)

export default CurrentQuestion
