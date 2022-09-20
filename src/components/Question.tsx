import { Box, Typography as T } from '@mui/material';
import { BottySays } from "./HelperComponents";

const styles = {
  box: {
    marginBottom: 1
  }
}

const Question = ({ question }: { question: string }) => (
  <Box sx={styles.box}>
    <BottySays />
    <T>{question}</T>
  </Box>
)

export default Question
