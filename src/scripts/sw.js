/* eslint-disable import/no-extraneous-dependencies */
import 'regenerator-runtime/runtime';
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { cleanupOutdatedCaches } from 'workbox-precaching';
import { skipWaiting, clientsClaim, setCacheNameDetails } from 'workbox-core';
import { registerRoute } from 'workbox-routing/registerRoute';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import CONFIG from './globals/config';

skipWaiting();
clientsClaim();

setCacheNameDetails({
  prefix: CONFIG.CACHE_NAME,
  precache: 'precache',
  runtime: 'runtime',
});

precacheAndRoute(
  [
    // eslint-disable-next-line no-restricted-globals
    ...self.__WB_MANIFEST,
  ],
  {
    ignoreURLParametersMatching: [/.*/],
  },
);

registerRoute(
  /^https:\/\/restaurant-api\.dicoding\.dev\/(?:(list|search|detail))/,
  new StaleWhileRevalidate({
    cacheName: 'dicoding-restaurant-api',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 14 * 24 * 60 * 60, // 14 Days
        maxEntries: 100,
      }),
    ],
  }),
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

cleanupOutdatedCaches();
