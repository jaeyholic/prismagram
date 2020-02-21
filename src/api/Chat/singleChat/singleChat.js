import { prisma } from '../../../../generated/prisma-client';
import { CHAT_FRAGMENT } from '../../../fragments';

export default {
  Query: {
    singleChat: async (
      _,
      args,
      { request, isAuthenticated }
    ) => {
      isAuthenticated(request);
      const { user } = request;
      const { id } = args;
      const getChat = await prisma.$exists.chat({
        participants_some: {
          id: user.id
        }
      });
      if (getChat) {
        return prisma.chat({ id }).$fragment(CHAT_FRAGMENT);
      } else {
        throw Error('Error Occurred!');
      }
    }
  }
};
