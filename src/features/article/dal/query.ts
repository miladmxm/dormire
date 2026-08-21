import "server-only";

import type { LimitAndOffset } from "@/services/type";

import {
  dalDbOperation,
  dalRequireAuth,
  dalVerifySuccess,
} from "@/dal/helpers";
import * as articleService from "@/services/article";

export const getArticles = async () => {
  return dalRequireAuth(
    () => dalDbOperation(() => articleService.getPaginationArticles()),
    {
      blog: ["read"],
    },
  );
};

export const getPublicArticles = async (options?: LimitAndOffset) => {
  return dalVerifySuccess(
    await dalDbOperation(() => articleService.getPublishedArticles(options)),
  );
};

export const searchArticles = async (
  query: string,
  config?: LimitAndOffset,
) => {
  return dalVerifySuccess(
    await dalDbOperation(() =>
      articleService.searchPublishedArticles(query, config),
    ),
  );
};

export const getArticle = async (id: string) => {
  return dalRequireAuth(
    () => dalDbOperation(() => articleService.getArticle(id)),
    { blog: ["read"] },
  );
};

export const getCategories = async () => {
  const categories = dalVerifySuccess(
    await dalRequireAuth(
      () => dalDbOperation(articleService.getCategoriesWithThumbnail),
      {
        blog: ["read"],
      },
    ),
  );

  return categories;
};

export const getPublicArticleCategories = async () => {
  const categories = dalVerifySuccess(
    await dalDbOperation(articleService.getPublicCategories),
  );

  return categories;
};
