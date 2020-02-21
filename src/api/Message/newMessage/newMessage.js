import { prisma } from '../../../../generated/prisma-client';

export default {
  Subscription: {
    newMessage: {
      subscribe: (parent, args, { request }) => {
        const { chatId } = args;
        return prisma.$subscribe
          .message({
            AND: [
              {
                mutation_in: 'CREATED'
              },
              {
                node: {
                  chat: { id: chatId }
                }
              }
            ]
          })
          .node();
      },
      resolve: payload => payload
    }
  }
};
