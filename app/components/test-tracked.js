import Component from '@glimmer/component';
import { TrackedObject } from 'tracked-built-ins';
import { action } from '@ember/object';

export default class TestTrackedComponent extends Component {
  testObject = new TrackedObject({ propertyA: 'original value' });

  get propertyAProxy() {
    return this.testObject.propertyA;
  }

  @action
  changePropertyA() {
    Object.assign(this.testObject, { propertyA: 'changed!' });
  }
}
