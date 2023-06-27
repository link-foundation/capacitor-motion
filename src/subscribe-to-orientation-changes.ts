import { Motion } from '@capacitor/motion';
import { saveMotionInfo } from './save-motion-info.js';
import { DeepClient } from '@deep-foundation/deeplinks/imports/client.js';
import { SubscribeToMotionChangesParam } from './subscribe-to-motion-changes-param.js';

/**
 * Subscribes to orientation changes and saves them to Deep
 * 
 * @remarks
 * Motion permissions should be granted before calling this function by using {@link requestMotionPermissions}
 * Orientation data is saved to Deep by using {@link saveMotionInfo}
 */
export async function subscribeToOrientationChanges({
  deep,
  deviceLinkId,
}: SubscribeToMotionChangesParam) {
  return Motion.addListener('orientation', async (rotationRate) => {
    await saveMotionInfo({
      deep,
      deviceLinkId,
      info: {
        rotationRate,
      },
    });
  });
}
