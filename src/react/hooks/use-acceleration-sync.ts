import { Motion } from '@capacitor/motion';
import {
  DeepClient,
  SerialOperation,
} from '@deep-foundation/deeplinks/imports/client.js';
import { useEffect } from 'react';
import createDebugMessages from 'debug';
import { getSubscriptionHandler } from '../get-subscription-handler.js';
import { Package } from '../../package.js';
import { MotionDecorator } from '../../create-motion-decorator.js';

/**
 * This hook subscribes to the acceleration event and saves the data to Deep
 *
 * @remarks
 * It is not recommended to use this hook directly. Instead of {@link WithAccelerationSync}
 * 
 * @example
```ts
useAccelerationSync({
    containerLinkId
})
```
 */
export function useAccelerationSync(
  this: MotionDecorator,
  options: UseAccelerationSyncOptions
) {
  const { containerLinkId = this.linkId! } = options;
  const $package = new Package({ deep: this });
  const debug = createDebugMessages(
    `${$package.name}:useAccelerationSync`
  );
  debug({ options });

  useEffect(() => {
    const accelerationHandlerFunction = this.getSubscriptionHandler({
      containerLinkId,
    });
    const accelerationHandler = Motion.addListener(
      'accel',
      accelerationHandlerFunction
    );
    debug({ accelerationHandler });
    return () => {
      accelerationHandler.remove();
    };
  }, [this, containerLinkId]);
}

export interface UseAccelerationSyncOptions {
  /**
   * A container link id
   * 
   * @defaultValue deep.linkId
   */
  containerLinkId?: number;
}
