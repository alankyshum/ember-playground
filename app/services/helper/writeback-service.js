import Service from '@ember/service';
import { TrackedObject } from 'tracked-built-ins';

export default class HelperFooServiceService extends Service {
  cachedActivityIds = new TrackedObject();

  async fetchAndCacheActivityId(id) {
    if (this.cachedActivityIds[id]) return;
    const activityIds = await fakeActivityEndpoint(id);
    Object.entries(activityIds).forEach(([entityId, activityId]) => {
      this.cachedActivityIds[entityId] = activityId;
    });

    console.log(this.cachedActivityIds);
  }
}

async function fakeActivityEndpoint(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        'bundle-id-123': 145,
      });
    }, 500);
  });
}
