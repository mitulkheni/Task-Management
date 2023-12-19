import * as bcrypt from 'bcrypt';

export const verifyPassword = (
  plainPassword: string,
  userPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, userPassword);
};
