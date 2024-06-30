import {ReactNode} from "react";
import {IMessage} from "../../../mocks/QuestionsMock";

export interface IAnswer {
    id: string;
    message: string;
    sender: string;
    receiver: string;
}

export interface AnswerProps {
    message: IMessage;
}
