"use server";

import { prisma } from "@/db/prisma";
import { toJavaScriptObject } from "@/lib/utils";
import { LATEST_COMICS_LIMIT, PAGE_SIZE } from "../constants";

// Get latest comics
export async function getLatestComics() {
  const latestComics = await prisma.comic.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: LATEST_COMICS_LIMIT,
  });
  return toJavaScriptObject(latestComics);
}

// Get comic by slug
export async function getComicBySlug(slug: string) {
  const comic = await prisma.comic.findUnique({
    where: {
      slug,
    },
  });
  return toJavaScriptObject(comic);
}

// get all comics
export async function getAllComics({
  query,
  limit = PAGE_SIZE,
  page,
  category,
}: {
  query?: string;
  limit?: number;
  page: number;
  category?: string;
}) {
  const data = await prisma.comic.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });

  const dataCount = await prisma.comic.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  }
}
