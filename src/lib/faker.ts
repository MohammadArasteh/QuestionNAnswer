import { Server } from "@/models";
import { faker } from "@faker-js/faker/locale/fa";

export function createFakeUser(): Server.Dto.User.CreateUserRequest {
  return {
    userName: faker.person.fullName(),
    imageUrl: faker.image.avatar(),
  };
}
export function createFakeQuestion(
  userId: string
): Server.Dto.Question.CreateQuestionRequest {
  return {
    userId: userId,
    title: faker.lorem.word(3),
    body: faker.lorem.paragraph(),
  };
}
export function createFakeAnswers(
  userId: string,
  questionId: string
): Server.Dto.Answer.CreateAnswerRequest {
  return {
    userId: userId,
    questionId: questionId,
    body: faker.lorem.paragraph(),
  };
}
