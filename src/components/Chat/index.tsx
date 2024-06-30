import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";

import styles from "./index.module.sass";
import classNames from "classnames/bind";
import {useFormik} from "formik";
import {messageValidationSchema} from "../../utils/messageValidationSchema";
import {Button} from "../ui/Button";
import {useStores} from "../../utils/use-stores-hook";
import {IMessage, IQuestion, IQuestionData, questionsMock} from "../../mocks/QuestionsMock";
import {Question} from "../ui/Question";
import {Answer} from "../ui/Answer";

export const Chat = observer(() => {
  const [sender, setSender] = useState('me');
  const [receiver, setReceiver] = useState('Victoria');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const questions = questionsMock.filter(elem => elem.id === '4')

  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
    localStorage.setItem('answers', JSON.stringify([]));
    localStorage.setItem('messages', JSON.stringify(questions));
  }, []);

  const {
    messageStore: {
      loadQuestionFromLocalStorage,
      addAnswer, isError },
  } = useStores();

  useEffect(() => {
    const firstQuestion = loadQuestionFromLocalStorage('4', '0');
    if (firstQuestion) {
      setMessages([firstQuestion]);
      setCurrentQuestion(firstQuestion);
    }
  }, []);

  const cx = classNames.bind(styles);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: messageValidationSchema,
    onSubmit: (values) => {
        const newMessage: IMessage = {
          id: `${Date.now()}`,
          sender,
          receiver,
          message: values.message,
          type: 'answer',
        };
        console.log('newMessage', newMessage);
        setMessages([...messages, newMessage]);
        addAnswer(newMessage);
        formik.resetForm();
    },
  });

  useEffect(() => {
    if (currentQuestion)
      handleNextQuestion(currentQuestion)
  }, [localStorage.getItem('answers')]);

  const handleNextQuestion = (currentQuestion:IQuestion) => {
    setTimeout(()=>{
        const nextQuestionId = (parseInt(currentQuestion.id, 10) + 1).toString();
        const nextQuestion = loadQuestionFromLocalStorage('4', nextQuestionId);
        if (nextQuestion) {
          setCurrentQuestion(nextQuestion);
          setMessages([...messages, nextQuestion]);
          console.log('handle nextQuestion', messages);
        }
      }
      ,1000)
  };

  console.log('messages', messages)

  return (
    <div className={styles.wrapper}>
      <div className={styles.messages_wrapper}>
        {messages ? messages.map((message, index) => (
          <div key={index} className={cx({[message.type]: true })}>
            {message.type === 'question' ? (
              <Question questionData={{
                id: message.id,
                sender: message.sender,
                receiver: message.receiver,
                type:message.type,
                message:message.message
              }} questionNum={0} />
            ) : (
              <Answer message={message} />
            )}
          </div>
        )) :
        null}
      </div>
      <textarea
        className={cx({
          [styles.input]: true,
          [styles.inputError]: formik.touched.message && formik.errors.message,
        })}
        id="message"
        placeholder="Start messaging"
        {...formik.getFieldProps('message')}
      />
      {formik.touched.message && formik.errors.message ? (
        <div className={styles.errorMessage}>{formik.errors.message}</div>
      ) : null}
      <Button
        title="Send"
        type="submit"
        mode="secondary"
        disabled={!(formik.isValid && formik.dirty)}
        active={false}
        onClick={formik.handleSubmit}
      >
        Send
      </Button>
    </div>
  );
});
