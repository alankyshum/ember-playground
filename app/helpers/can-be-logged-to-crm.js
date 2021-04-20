import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class extends Helper {
  @service('helper/writeback-service') writebackService;

  compute([id]) {
    this.writebackService.fetchAndCacheActivityId(id);
    return this.writebackService.cachedActivityIds[id];
  }
}
