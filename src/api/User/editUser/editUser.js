import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    editUser: (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const {
        firstName,
        email,
        lastName,
        username,
        bio
      } = args;
      const { user } = request;
      return prisma.updateUser({
        where: { id: user.id },
        data: { firstName, email, lastName, username, bio }
      });
    }
  }
};
