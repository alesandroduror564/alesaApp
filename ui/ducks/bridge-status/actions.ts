import { QuoteMetadata, QuoteResponse } from '@alesaapp/bridge-controller';
import { BridgeStatusAction } from '@alesaapp/bridge-status-controller';
import { forceUpdateMetamaskState } from '../../store/actions';
import { submitRequestToBackground } from '../../store/background-connection';
import { alesaAppReduxDispatch } from '../../store/store';

const callBridgeStatusControllerMethod = async <T extends unknown[]>(
  dispatch: alesaAppReduxDispatch,
  bridgeAction: BridgeStatusAction,
  args?: T,
) => {
  await submitRequestToBackground(bridgeAction, args);
  await forceUpdateMetamaskState(dispatch);
};

export const submitBridgeTx = (
  quote: QuoteResponse & QuoteMetadata,
  isStxSupportedInClient: boolean,
) => {
  return async (dispatch: alesaAppReduxDispatch) => {
    return callBridgeStatusControllerMethod(
      dispatch,
      BridgeStatusAction.SUBMIT_TX,
      [quote, isStxSupportedInClient],
    );
  };
};
