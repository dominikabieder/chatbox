import { Box, List, ListItem } from '@mui/material';

import Answer from "./Answer";
import Question from "./Question";
import { QandAType } from "./types";

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
  qAndAs: QandAType[]
}

const Answers = ({ qAndAs }: AnswersProps) => (
  <List aria-label='Chat-Verlauf' sx={styles.list}>
    {qAndAs.map((qAndA: QandAType, i) => (
      <ListItem key={i} aria-labelledby={`answers.${i}`} sx={styles.listItem}>
        <Box sx={styles.container}>
          <Box id={`answers.${i}`}><Question question={qAndA.question.text} /></Box>
          <Box sx={styles.answer}><Answer answer={qAndA.answer.text} /></Box>
        </Box>
      </ListItem>
    ))}
  </List>
)

export default Answers
