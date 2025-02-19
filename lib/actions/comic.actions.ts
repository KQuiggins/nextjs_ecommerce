'use server';

import { prisma } from "@/db/prisma";
import { toJavaScriptObject } from "@/lib/utils";
import { LATEST_COMICS_LIMIT } from "../constants";

// Get latest comics
export async function getLatestComics() {
  
  const latestComics = await prisma.comic.findMany({
    orderBy: {
      createdAt: 'desc',
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