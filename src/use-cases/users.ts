import { MAX_UPLOAD_IMAGE_SIZE, applicationName } from "@/app-config";
import {
  createUser,
  deleteUser,
  getUser,
  getUserByEmail,
  updateUser,
  verifyPassword,
} from "@/data-access/users";
import { UserId, UserSession } from "@/use-cases/types";
import { createUUID } from "@/util/uuid";
import { getFileUrl, uploadFileToBucket } from "@/lib/files";
import {
  createAccount,
  createAccountViaGithub,
  createAccountViaGoogle,
  updatePassword,
} from "@/data-access/accounts";
import {
  uniqueNamesGenerator,
  Config,
  colors,
  animals,
} from "unique-names-generator";
import { GoogleUser } from "@/app/api/login/google/callback/route";
import { GitHubUser } from "@/app/api/login/github/callback/route";
import { sendEmail } from "@/lib/send-email";
import {
  createPasswordResetToken,
  deletePasswordResetToken,
  getPasswordResetToken,
} from "@/data-access/reset-tokens";
import { ResetPasswordEmail } from "@/emails/reset-password";
import {
  createVerifyEmailToken,
  deleteVerifyEmailToken,
  getVerifyEmailToken,
} from "@/data-access/verify-email";
import { redirect } from "next/navigation";

import {
  getNotificationsForUser,
  getTop3UnreadNotificationsForUser,
} from "@/data-access/notifications";
import { createTransaction } from "@/data-access/utils";
import { LoginError } from "./errors";
import { deleteSessionForUser } from "@/data-access/sessions";
import { VerifyEmail } from "@/emails/verify-email";
import React from "react";
import { getCurrentUser } from "@/app/session";

export async function deleteUserUseCase(
  authenticatedUser: UserSession,
  userToDeleteId: UserId
): Promise<void> {
  if (authenticatedUser.id !== userToDeleteId) {
    throw new Error("You can only delete your own account");
  }

  await deleteUser(userToDeleteId);
}

export async function registerUserUseCase(
  email: string,
  name: string,
  password: string
) {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("An user with that email already exists.");
  }
  const user = await createUser(email, name);
  await createAccount(user.id, password);

  const token = await createVerifyEmailToken(user.id);

  const verifyEmailElement = React.createElement(VerifyEmail, { token });

  await sendEmail(
    email,
    `Verify your email for ${applicationName}`,
    verifyEmailElement
  );

  return { id: user.id };
}

export async function signInUseCase(email: string, password: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new LoginError();
  }

  const isPasswordCorrect = await verifyPassword(email, password);

  if (!isPasswordCorrect) {
    throw new LoginError();
  }

  return { id: user.id };
}

export function getProfileImageKey(userId: UserId, imageId: string) {
  return `users/${userId}/images/${imageId}`;
}

export async function updateProfileImageUseCase(file: File, userId: UserId) {
  if (!file.type.startsWith("image/")) {
    throw new Error("File should be an image.");
  }

  if (file.size > MAX_UPLOAD_IMAGE_SIZE) {
    throw new Error("File size should be less than 5MB.");
  }

  const imageId = createUUID();

  await uploadFileToBucket(file, getProfileImageKey(userId, imageId));
  await updateUser(userId, { image: imageId });
}

export function getProfileImageUrl(userId: UserId, imageId: string) {
  return `${process.env.HOST_NAME}/api/users/${userId}/images/${
    imageId ?? "default"
  }`;
}

export function getDefaultImage(userId: UserId) {
  return `${process.env.HOST_NAME}/api/users/${userId}/images/default`;
}

export async function getProfileImageUrlUseCase({
  userId,
  imageId,
}: {
  userId: UserId;
  imageId: string;
}) {
  const url = await getFileUrl({
    key: getProfileImageKey(userId, imageId),
  });

  return url;
}

export async function updateProfileBioUseCase(userId: UserId, bio: string) {
  await updateUser(userId, { bio: bio });
}

export async function updateProfileNameUseCase(
  userId: UserId,
  displayName: string
) {
  await updateUser(userId, { name: displayName });
}

export async function createGithubUserUseCase(githubUser: GitHubUser) {
  let existingUser = await getUserByEmail(githubUser.email);

  if (!existingUser) {
    existingUser = await createUser(
      githubUser.email,
      githubUser.login,
      githubUser.avatar_url
    );
  }

  await createAccountViaGithub(existingUser.id, githubUser.id);

  return existingUser.id;
}

export async function createGoogleUserUseCase(googleUser: GoogleUser) {
  let existingUser = await getUserByEmail(googleUser.email);

  if (!existingUser) {
    existingUser = await createUser(
      googleUser.email,
      googleUser.name,
      googleUser.picture
    );
  }

  await createAccountViaGoogle(existingUser.id, googleUser.sub);

  return existingUser.id;
}

export async function resetPasswordUseCase(email: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    return null;
  }

  const token = await createPasswordResetToken(user.id);

  const resetPasswordElement = React.createElement(ResetPasswordEmail, {
    token,
  });

  await sendEmail(
    email,
    `Your password reset link for ${applicationName}`,
    resetPasswordElement
  );
}

export async function changePasswordUseCase(token: string, password: string) {
  const tokenEntry = await getPasswordResetToken(token);

  if (!tokenEntry) {
    throw new Error("Invalid token");
  }

  const userId = tokenEntry.userId;

  await createTransaction(async (trx) => {
    await deletePasswordResetToken(token, trx);
    await updatePassword(userId, password, trx);
    await deleteSessionForUser(userId, trx);
  });
}

export async function verifyEmailUseCase(token: string) {
  const tokenEntry = await getVerifyEmailToken(token);

  if (!tokenEntry) {
    throw new Error("Invalid token");
  }

  const userId = tokenEntry.userId;

  await updateUser(userId, { emailVerified: new Date() });
  await deleteVerifyEmailToken(token);
  return userId;
}

export async function getUnreadNotificationsForUserUseCase(userId: UserId) {
  return await getTop3UnreadNotificationsForUser(userId);
}

export async function getNotificationsForUserUseCase(userId: UserId) {
  const notifications = await getNotificationsForUser(userId);
  notifications.sort((a, b) => b.createdOn.getTime() - a.createdOn.getTime());
  return notifications;
}

export async function getUserBySessionUseCase() {
  const userId = await getCurrentUser();

  if (userId) {
    const user = await getUser(userId.id);

    return user;
  } else {
    return null;
  }
}
