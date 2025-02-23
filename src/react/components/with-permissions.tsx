import { useEffect, useState } from "react";
import { requestPermissions,PermissionState } from "../../request-permissions.js";
import { usePermissionsRequest } from "../hooks/use-permissions-request.js";
import { MotionDecorator } from "../../create-motion-decorator.js";

/**
 * A component that requires permissions and renders different content based on the permissions state
 */
export function WithPermissions(this: MotionDecorator, options: WithPermissionsOptions) {
  const permissionsState = usePermissionsRequest();
  if(permissionsState === undefined) {
    return options.renderIfLoading();
  } else if(permissionsState === "granted") {
    return options.renderIfGranted();
  } else if(permissionsState === "denied") {
    return options.renderIfDenied();
  } else if(permissionsState === "prompt") {
    return options.renderIfPrompt();
  }
}

export interface WithPermissionsOptions {
  renderIfLoading: () => JSX.Element;
  renderIfGranted: () => JSX.Element;
  renderIfDenied: () => JSX.Element;
  renderIfPrompt: () => JSX.Element;
}