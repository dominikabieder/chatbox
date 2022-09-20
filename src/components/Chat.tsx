import { useState } from 'react';
import { useAsync } from "react-use";

import Answers from "./Answers";
import CurrentQuestion from "./CurrentQuestion";
import { getQuestions, sendAnswers } from "./api";
import { Loader, Error, Success, Wrapper } from "./HelperComponents";
import {AnswerType, QandAType, QuestionType} from "./types";

const Chat = () => {
  const { loading, value: questions, error: loadingError } = useAsync(getQuestions)

  const [ currentQuestionId, setCurrentQuestionId ] = useState<number | null>(100)
  const [ qAndAs, setQandAs ] = useState<QandAType[]>([])
  const [ success, setSuccess ] = useState<boolean>()

  const currentQuestion = questions?.find((question: QuestionType) => question.id === currentQuestionId)

  const onAnswer = async (question: QuestionType, answer: AnswerType) => {
    const newQandAs = [...qAndAs, { question, answer }]
    setQandAs(newQandAs)
    if (answer.nextId === false) {
      setCurrentQuestionId(null)
      const success = await sendAnswers(newQandAs)
      setSuccess(success)
    } else {
      setCurrentQuestionId(answer.nextId)
    }
  }

  return (
    <Wrapper>
      {loading && <Loader />}
      {loadingError && <Error />}
      {qAndAs.length > 0 && <Answers qAndAs={qAndAs} />}
      {currentQuestion && <CurrentQuestion question={currentQuestion} onAnswer={onAnswer} />}
      {success === true && <Success />}
      {success === false && <Error />}
    </Wrapper>
  );
}

export default Chat;




