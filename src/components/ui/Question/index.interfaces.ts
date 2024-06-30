import {ReactNode} from "react";
import {IMessage, IQuestionData} from "../../../mocks/QuestionsMock";

export interface QuestionProps {
    questionData: IMessage;
    questionNum: number;
}
