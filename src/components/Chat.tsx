import { useState } from 'react';
import { useAsync } from "react-use";

import Answers from "./Answers";
import CurrentQuestion from "./CurrentQuestion";
import { getQuestions, sendAnswers } from "./api";
import { Loader, Error, Success, Wrapper } from "./HelperComponents";
import { AnswerType, QuestionType } from "./types";

const Chat = () => {
  const { loading, value: questions, error: loadingError } = useAsync(getQuestions)

  const [ currentQuestionId, setCurrentQuestionId ] = useState<number | null>(100)
  const [ answers, setAnswers ] = useState<AnswerType[]>([])
  const [ success, setSuccess ] = useState<boolean>()

  const currentQuestion = questions?.find((question: QuestionType) => question.id === currentQuestionId)

  const onAnswer = async (answer: AnswerType) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)
    if (answer.nextId === false) {
      setCurrentQuestionId(null)
      const success = await sendAnswers(questions, newAnswers)
      setSuccess(success)
    } else {
      setCurrentQuestionId(answer.nextId)
    }
  }

  return (
    <Wrapper>
      {loading && <Loader />}
      {loadingError && <Error />}
      {answers.length > 0 && <Answers questions={questions} answers={answers} />}
      {currentQuestion && <CurrentQuestion question={currentQuestion} onAnswer={onAnswer} />}
      {success === true && <Success />}
      {success === false && <Error />}
    </Wrapper>
  );
}

export default Chat;




