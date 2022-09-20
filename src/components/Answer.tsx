import { Box, Button } from '@mui/material';
import { HumanSays } from "./HelperComponents";

const styles = {
  box: {
    padding: 0,
  },
}

const Answer = ({ answer }: { answer: string }) => (
  <Box sx={styles.box}>
    <HumanSays />
    <Box sx={styles.box}>
      <Button disabled variant='contained'>{answer}</Button>
    </Box>
  </Box>
)

export default Answer
