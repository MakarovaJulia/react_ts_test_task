import { action, makeObservable, observable } from 'mobx';
import {MainStore} from "./mainStore";
import {IAnswer} from "../components/ui/Answer/index.interfaces";
import {IMessage, IQuestion} from "../mocks/QuestionsMock";


export default class MessageStore {
  @observable isLoading: boolean = false;
  @observable isError: boolean = false;
  @observable questions: IQuestion[] = [];
  @observable answers: IAnswer[] = [];
  @observable messages: IMessage[] = [];
  @observable counter = '0';

  constructor(public mainStore: MainStore) {
    makeObservable(this);
    this.loadFromLocalStorage();
  }

  @action
  loadFromLocalStorage = () => {
    const storedQuestions = localStorage.getItem('questions');
    const storedAnswers = localStorage.getItem('answers');
    const storedMessages = localStorage.getItem('messages');

    if (storedQuestions) {
      this.questions = JSON.parse(storedQuestions);
    }

    if (storedAnswers) {
      this.answers = JSON.parse(storedAnswers);
    }

    if (storedMessages) {
      this.messages = JSON.parse(storedMessages);
    }
  };

  @action
  loadQuestionFromLocalStorage = (id: string, offset: string) => {
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
      const questions = JSON.parse(storedQuestions);
      const question = questions.find((q: IQuestion) => q.id === id);
      if (question) {
        return question.data
          .map((questionObj: { id: number; text: string }) => ({
            id: `${questionObj.id}`,
            sender: question.sender,
            receiver: question.receiver,
            message: questionObj.text,
            type: 'question',
          }))[offset];
      }
    }
    return null;
  };

  @action
  saveMessagesToLocalStorage = () => {
    localStorage.setItem('messages', JSON.stringify(this.messages));
  };

  @action
  saveAnswersToLocalStorage = () => {
    localStorage.setItem('answers', JSON.stringify(this.answers));
  };

  @action
  addAnswer = (answer: IAnswer) => {
    this.answers.push(answer);
    this.messages.push({
      id: this.counter,
      sender: answer.sender,
      receiver: answer.receiver,
      message: answer.message,
      type: 'answer',
    });
    this.saveAnswersToLocalStorage();
    this.saveMessagesToLocalStorage();
    this.counter = (parseInt(this.counter, 10) + 1).toString();
  };
}
