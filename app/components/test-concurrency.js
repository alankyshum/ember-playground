import Component from '@glimmer/component';
import { dropTask, all } from 'ember-concurrency';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

export default class TestConcurrencyComponent extends Component {
  @tracked
  state = 'No task was run; ';

  @dropTask
  *taskA() {
    yield new Promise((resolve) => setTimeout(resolve, 1000));
    this.state += 'taskA was run; ';
  }

  @dropTask
  *taskB() {
    yield new Promise((resolve) => setTimeout(resolve, 500));
    this.state += 'taskB was run; ';
  }

  @dropTask
  *dependentTask() {
    // if taskA or taskB is running, wait until they have finished
    yield all([this.taskA.last, this.taskB.last]);
    this.state += 'dependentTask was run; ';
  }

  @action
  triggerTasks(taskName) {
    if (typeof taskName === 'string') {
      this[taskName].perform();
    } else {
      this.taskA.perform();
      this.taskB.perform();
    }

    this.dependentTask.perform();
  }
}
