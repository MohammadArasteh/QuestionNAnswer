import axios from "axios";
import { Dto, Entity } from ".";

export class Database {
  static INIT() {
    axios.defaults.baseURL = `http://localhost:3000`;
  }

  static async FETCH_QUESTIONS(): Promise<Dto.Question.GetQuestionsResponse> {
    const result = await axios.get<Array<Entity.Question>>("/questions");
    return {
      data: result.data,
    };
  }

  static async FETCH_QUESTION(
    payload: Dto.Question.GetQuestionRequest
  ): Promise<Dto.Question.GetQuestionResponse> {
    const result = await axios.get<Entity.Question>(
      `/questions/${payload.questionId}`
    );
    return {
      data: result.data,
    };
  }

  static async CREATE_QUESTION(
    payload: Dto.Question.CreateQuestionRequest
  ): Promise<Dto.Question.CreateQuestionResponse> {
    const result = await axios.post<Entity.Question>("/questions", {
      title: payload.title,
      body: payload.body,
      userId: payload.userId,
      answersCount: 0,
      dateTime: new Date().toISOString(),
    });
    return {
      data: result.data,
      message: result.statusText,
    };
  }

  static async FETCH_ANSWERS(
    payload: Dto.Answer.GetAnswersRequest
  ): Promise<Dto.Answer.GetAnswersResponse> {
    const result = await axios.get<Array<Entity.Answer>>(
      `/answers?
      _page=${payload.pageNumber}&
      _limit=${payload.pageSize}&
      questionId=${payload.questionId}`
    );
    return {
      data: result.data,
    };
  }

  static async CREATE_ANSWER(
    payload: Dto.Answer.CreateAnswerRequest
  ): Promise<Dto.Answer.CreateAnswerResponse> {
    const result = await axios.post<Entity.Answer>("/answers", {
      userId: payload.userId,
      questionId: payload.questionId,
      body: payload.body,
      likesCount: 0,
      dislikesCount: 0,
      dateTime: new Date().toISOString(),
    });
    return {
      data: result.data,
      message: result.statusText,
    };
  }

  static async CREATE_USER(
    payload: Dto.User.CreateUserRequest
  ): Promise<Dto.User.CreateUserResponse> {
    const result = await axios.post<Entity.User>("/users", {
      userName: payload.userName,
      imageUrl: payload.imageUrl,
    });
    return {
      data: result.data,
    };
  }

  static async GET_USER(
    payload: Dto.User.GetUserRequest
  ): Promise<Dto.User.GetUserResponse> {
    const result = await axios.get<Entity.User>(`/users/${payload.id}`);
    return {
      data: result.data,
    };
  }
}
