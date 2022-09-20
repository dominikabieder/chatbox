import { Box, List, ListItem } from '@mui/material';

import Answer from "./Answer";
import Question from "./Question";
import { AnswerType, QuestionType } from "./types";

const styles = {
  list: {
    listStyleType: 'none',
  },
  listItem: {
    padding: 0
  },
  container: {
    width: '100%'
  },
  answer: {
    float: 'right'
  }
}

type AnswersProps = {
  questions: QuestionType[],
  answers: AnswerType[],
}

const Answers = ({ questions, answers }: AnswersProps) => (
  <List aria-label='Chat-Verlauf' sx={styles.list}>
    {answers.map((answer: AnswerType, i) => (
      <ListItem key={i} aria-labelledby={`answers.${i}`} sx={styles.listItem}>
        <Box sx={styles.container}>
          <Box id={`answers.${i}`}><Question question={questions[i].text} /></Box>
          <Box sx={styles.answer}><Answer answer={answer.text} /></Box>
        </Box>
      </ListItem>
    ))}
  </List>
)

export default Answers
