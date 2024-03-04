import axios from "axios";
import { Dto, Entity } from ".";
import {
  createFakeAnswers,
  createFakeQuestion,
  createFakeUser,
} from "@/lib/faker";
import { selectRandom, sleep } from "@/lib/utility-functions";

const currentUser: Dto.User.CreateUserRequest = {
  userName: "محمد",
  imageUrl:
    "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg",
} as const;

export class Database {
  private static DELAY_TIME = 50;
  static async INIT() {
    axios.defaults.baseURL = `http://localhost:3000`;
    const resetDatabase = await this.RESET_CHECK();
    if (resetDatabase) await this.RESET_DATABASE();
    this.DELAY_TIME = 2000;
  }

  private static async RESET_DATABASE() {
    await this.CLEAR_DATABASE();
    await this.FILL_DATABASE(currentUser);
  }

  private static async RESET_CHECK(): Promise<boolean> {
    const { data: users } = await this.FETCH_USERS();
    const { data: questions } = await this.FETCH_QUESTIONS({});
    const { data: answers } = await this.FETCH_ALL_ANSWERS();
    return users.length < 5 || questions.length < 10 || answers.length < 20;
  }

  static async FETCH_QUESTIONS(
    payload: Dto.Question.GetQuestionsRequest
  ): Promise<Dto.Question.GetQuestionsResponse> {
    const result = await axios.get<Array<Entity.Question>>(`/questions`);
    const totalRows = result.data.length;
    if (payload.pageSize !== undefined && payload.pageNumber !== undefined) {
      const startIndex = payload.pageNumber * payload.pageSize;
      const endIndex = startIndex + payload.pageSize;
      result.data = result.data.slice(startIndex, endIndex);
    }
    return {
      data: result.data,
      totalCount: totalRows,
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
    await sleep(this.DELAY_TIME);
    return {
      data: result.data,
      message: result.statusText,
    };
  }

  static async FETCH_ANSWERS(
    payload: Dto.Answer.GetAnswersRequest
  ): Promise<Dto.Answer.GetAnswersResponse> {
    const result = await axios.get<Array<Entity.Answer>>(`/answers`);
    const totalRows = result.data.length;
    if (payload.pageSize !== undefined && payload.pageNumber != undefined) {
      const startIndex = payload.pageNumber * payload.pageSize;
      const endIndex = startIndex + payload.pageSize;
      result.data = result.data.slice(startIndex, endIndex);
    }
    return {
      data: result.data,
      totalCount: totalRows,
    };
  }

  static async FETCH_ALL_ANSWERS(): Promise<Dto.Answer.GetAnswersResponse> {
    const result = await axios.get<Array<Entity.Answer>>("/answers");
    return {
      data: result.data,
      totalCount: result.data.length,
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
    await sleep(this.DELAY_TIME);
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

  static async FETCH_USER(
    payload: Dto.User.GetUserRequest
  ): Promise<Dto.User.GetUserResponse> {
    const result = await axios.get<Entity.User>(`/users/${payload.id}`);
    return {
      data: result.data,
    };
  }

  private static async FETCH_USERS(): Promise<Dto.User.GetUsersResponse> {
    const result = await axios.get<Array<Entity.User>>("/users");
    return {
      data: result.data,
    };
  }

  private static async DELETE(
    endpoint: "users" | "questions" | "answers",
    id: number
  ) {
    await axios.delete(`/${endpoint}/${id}`);
  }

  private static async CLEAR_DATABASE() {
    const { data: users } = await this.FETCH_USERS();
    for (const user of users) {
      await this.DELETE("users", user.id);
    }

    const { data: questions } = await this.FETCH_QUESTIONS({});
    for (const question of questions) {
      const { data: answers } = await this.FETCH_ANSWERS({
        questionId: question.id,
      });
      for (const answer of answers) {
        await this.DELETE("answers", answer.id);
      }
      await this.DELETE("questions", question.id);
    }
  }

  private static async FILL_DATABASE(currentUser?: Dto.User.CreateUserRequest) {
    // create users
    const users: Entity.User[] = [];
    for (let i = 0; i < 5; i++) {
      await sleep(this.DELAY_TIME);
      const result = await this.CREATE_USER(createFakeUser());
      users.push(result.data);
    }
    if (currentUser) await this.CREATE_USER(currentUser);
    // create questions with created users
    const questions: Array<Entity.Question> = [];
    for (let i = 0; i < 10; i++) {
      const user = selectRandom(users);
      const result = await this.CREATE_QUESTION(createFakeQuestion(user.id));
      questions.push(result.data);
    }
    // create answers for created questions
    for (let i = 0; i < 20; i++) {
      const user = selectRandom(users);
      const question = selectRandom(questions);
      await this.CREATE_ANSWER(createFakeAnswers(user.id, question.id));
    }
  }
}
