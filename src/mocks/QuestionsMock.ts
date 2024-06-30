import {IAnswer} from "../components/ui/Answer/index.interfaces";

export interface IMessage {
  id: string;
  sender: string;
  receiver: string;
  message: string;
  type: 'question' | 'answer';
}

export interface IQuestion {
  id: string;
  text: string;
}


export interface IQuestionData {
  id: string;
  sender: string;
  receiver: string;
  data: IQuestion[];
}


export const questionsMock: IQuestionData[] = [
  {
    id: '3',
    sender: 'Gigi',
    receiver:'me',
    data: [
      { id: '0', text: 'Hey! What up?'},
      { id: '1', text: 'UWU, tell me more about it!'},
      { id: '2', text: 'I even dont know what to say...'},
    ],
  },
  {
    id: '4',
    sender: 'Victoria',
    receiver:'me',
    data: [
      { id: '0', text: 'Hello. Why did you approached me? Is something strange going on?'},
      { id: '1', text: 'What else do you know about it?'},
      { id: '2', text: 'Do you have any guesses yourself?'},
      { id: '3', text: 'Let me think about it. I will tell you what I came up with later.'},
    ],
  },
]
