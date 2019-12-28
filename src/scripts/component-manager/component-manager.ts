import { MyConsoleButton, MyDebugBoard } from '../../components';
import { Constructor } from '../../types';

type ManagedComponents = MyConsoleButton | MyDebugBoard;
type ComponentConstructor = Constructor<ManagedComponents>;

/**
 * Manage custom elements
 *
 * - register components to browser
 * - manage instance as singleton
 */
export class ComponentManager {
  private readonly components = new Map<ComponentConstructor, ManagedComponents>();
  private setupCompleted = false;

  getInstance<T extends ManagedComponents>(key: Constructor<T>): T {
    return this.components.get(key) as T;
  }

  /**
   * Call after document.ready
   */
  setupComponents() {
    if (this.setupCompleted) {
      return;
    }

    // instantiate components and hold its reference
    const consoleButton = new MyConsoleButton();
    this.components.set(MyConsoleButton, consoleButton);
    const debugBoard = new MyDebugBoard();
    this.components.set(MyDebugBoard, debugBoard);

    // append to dom
    for (let c of this.components.values()) {
      document.body.appendChild(c);
    }

    this.setupCompleted = true;
  }
}

export const componentManager = new ComponentManager();
