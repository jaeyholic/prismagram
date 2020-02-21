import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    sendMessage: async (
      _,
      args,
      { request, isAuthenticated }
    ) => {
      isAuthenticated(request);
      const { user } = request;
      const { chatId, message, newChatId } = args;
      let chat;
      if (chatId === undefined) {
        if (user.id !== newChatId) {
          chat = await prisma.createChat({
            participants: {
              connect: [{ id: newChatId }, { id: user.id }]
            }
          });
        }
      } else {
        chat = await prisma.chat({ id: chatId });
      }
      if (!chat) {
        throw Error('Chat not found!');
      }
      const participants = await prisma
        .chat({ id: chat.id })
        .participants();
      const newChat = participants.filter(
        participant => participant.id !== user.id
      )[0];
      return prisma.createMessage({
        text: message,
        from: {
          connect: {
            id: user.id
          }
        },
        to: {
          connect: {
            id: chatId ? newChat.id : newChatId
          }
        },
        chat: {
          connect: {
            id: chat.id
          }
        }
      });
    }
  }
};
