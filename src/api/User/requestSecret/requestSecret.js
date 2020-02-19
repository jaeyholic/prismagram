import {
  secretGenerator,
  sendSecretMail
} from '../../../utils/helpers';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const secret = secretGenerator();
      try {
        await sendSecretMail(email, secret);
        await prisma.updateUser({
          data: { loginSecret: secret },
          where: { email }
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  }
};
