import { createClient, createPreviewSubscriptionHook } from "next-sanity";
import { config } from "./config";
import createImageUrlBuilder from "@sanity/image-url";
import {
  SanityImageSource,
  SanityProjectDetails,
} from "@sanity/image-url/lib/types/types";

export const usePreview = createPreviewSubscriptionHook(
  config as SanityProjectDetails
);
export const sanityClient = createClient(config);
export const urlFor = (source: SanityImageSource) =>
  createImageUrlBuilder(config as SanityProjectDetails).image(source);
