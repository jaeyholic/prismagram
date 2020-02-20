import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    feeds: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const following = await prisma
        .user({ id: user.id })
        .following();
      return prisma.posts({
        where: {
          user: {
            id_in: [
              ...following.map(user => user.id),
              user.id
            ]
          }
        },
        orderBy: 'id_DESC'
      });
    }
  }
};
