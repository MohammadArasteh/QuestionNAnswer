import axios from "axios";
import { Dto, Entity } from ".";
import {
  createFakeAnswers,
  createFakeQuestion,
  createFakeUser,
} from "@/lib/faker";
import { selectRandom, sleep } from "@/lib/utility-functions";
import { AnswerReactionType } from "./entity";

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
    const { data: questions } = await this.FETCH_QUESTIONS({});
    const { data: users } = await this.FETCH_USERS();
    const { data: answers } = await this.FETCH_ALL_ANSWERS();
    return users.length < 10 || questions.length < 20 || answers.length < 60;
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

  static async UPDATE_QUESTION(payload: Entity.Question) {
    await axios.put(`/questions/${payload.id}`, payload);
  }

  static async REACT_ANSWER(
    payload: Dto.Answer.AnswerReactionRequest
  ): Promise<Dto.Answer.AnswerReactionResponse> {
    const result = await axios.get<Entity.Answer>(
      `/answers/${payload.answerId}`
    );
    const answer = result.data;
    answer.likedIds = answer.likedIds.filter((id) => id !== payload.userId);
    answer.dislikedIds = answer.dislikedIds.filter(
      (id) => id !== payload.userId
    );
    if (payload.reaction === AnswerReactionType.LIKED)
      answer.likedIds.push(payload.userId);
    else if (payload.reaction === AnswerReactionType.DISLIKED)
      answer.dislikedIds.push(payload.userId);
    await axios.put(`/answers/${payload.answerId}`, answer);
    return {
      data: this.MAP_SERVERSIDE_ANSWER_TO_CLIENTSIDE_ANSWER(
        answer,
        payload.userId
      ),
    };
  }

  static async FETCH_ANSWERS(
    payload: Dto.Answer.GetAnswersRequest
  ): Promise<Dto.Answer.GetAnswersResponse> {
    const result = await axios.get<Array<Entity.Answer>>(
      `/answers?questionId=${payload.questionId}`
    );
    const totalRows = result.data.length;
    if (payload.pageSize !== undefined && payload.pageNumber != undefined) {
      const startIndex = payload.pageNumber * payload.pageSize;
      const endIndex = startIndex + payload.pageSize;
      result.data = result.data.slice(startIndex, endIndex);
    }
    return {
      data: result.data.map((answer) =>
        this.MAP_SERVERSIDE_ANSWER_TO_CLIENTSIDE_ANSWER(
          answer,
          payload.currentUserId
        )
      ),
      totalCount: totalRows,
    };
  }

  static async FETCH_ALL_ANSWERS(): Promise<Dto.Answer.GetAnswersResponse> {
    const result = await axios.get<Array<Entity.Answer>>("/answers");
    return {
      data: result.data.map(this.MAP_SERVERSIDE_ANSWER_TO_CLIENTSIDE_ANSWER),
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
      likedIds: [],
      dislikedIds: [],
      dateTime: new Date().toISOString(),
    });
    const questionResult = await axios.get<Entity.Question>(
      `/questions/${payload.questionId}`
    );
    await this.UPDATE_QUESTION({
      ...questionResult.data,
      id: payload.questionId,
      answersCount: questionResult.data.answersCount + 1,
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
    for (const user of users) await this.DELETE("users", user.id);

    const { data: questions } = await this.FETCH_QUESTIONS({});
    for (const question of questions)
      await this.DELETE("questions", question.id);

    const { data: answers } = await this.FETCH_ALL_ANSWERS();
    for (const answer of answers) await this.DELETE("answers", answer.id);
  }

  private static async FILL_DATABASE(currentUser?: Dto.User.CreateUserRequest) {
    // create users
    const users: Entity.User[] = [];
    for (let i = 0; i < 10; i++) {
      await sleep(this.DELAY_TIME);
      const result = await this.CREATE_USER(createFakeUser());
      users.push(result.data);
    }
    if (currentUser) await this.CREATE_USER(currentUser);
    // create questions with created users
    const questions: Array<Entity.Question> = [];
    for (let i = 0; i < 20; i++) {
      const user = selectRandom(users);
      const result = await this.CREATE_QUESTION(createFakeQuestion(user.id));
      questions.push(result.data);
    }
    // create answers for created questions
    for (let i = 0; i < 60; i++) {
      const user = selectRandom(users);
      const question = selectRandom(questions);
      await this.CREATE_ANSWER(createFakeAnswers(user.id, question.id));
    }
  }

  private static MAP_SERVERSIDE_ANSWER_TO_CLIENTSIDE_ANSWER(
    answer: Entity.Answer,
    userId: number
  ): Dto.Answer.Answer {
    return {
      id: answer.id,
      userId: answer.userId,
      questionId: answer.questionId,
      body: answer.body,
      userReaction: answer.likedIds.includes(userId)
        ? AnswerReactionType.LIKED
        : answer.dislikedIds.includes(userId)
        ? AnswerReactionType.DISLIKED
        : AnswerReactionType.NONE,
      likesCount: answer.likedIds.length,
      dislikesCount: answer.dislikedIds.length,
      dateTime: answer.dateTime,
    };
  }
}
