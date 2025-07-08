import { InternalAccount } from '@alesaapp/keyring-internal-api';
import { isEvmAccountType } from '@alesaapp/keyring-api';
import { isInternalAccountInPermittedAccountIds } from '@alesaapp/chain-agnostic-permission';
import { getAlertEnabledness } from '../../../ducks/alesaapp/alesaapp';
import { PRIVACY_POLICY_DATE } from '../../../helpers/constants/privacy-policy';
import {
  SURVEY_DATE,
  SURVEY_END_TIME,
  SURVEY_START_TIME,
} from '../../../helpers/constants/survey';
import {
  getAllPermittedAccountsForCurrentTab,
  isSolanaAccount,
} from '../../../selectors';
import { PasswordChangeToastType } from '../../../../shared/constants/app-state';
import { getIsPrivacyToastRecent } from './utils';

type State = {
  appState: Partial<
    Pick<
      alesaAppReduxState['appState'],
      | 'showNftDetectionEnablementToast'
      | 'showNewSrpAddedToast'
      | 'showPasswordChangeToast'
    >
  >;
  alesaapp: Partial<
    Pick<
      alesaAppReduxState['alesaapp'],
      | 'newPrivacyPolicyToastClickedOrClosed'
      | 'newPrivacyPolicyToastShownDate'
      | 'onboardingDate'
      | 'surveyLinkLastClickedOrClosed'
      | 'switchedNetworkNeverShowMessage'
    >
  >;
};

export function selectShowSurveyToast(state: Pick<State, 'alesaapp'>): boolean {
  if (state.alesaapp.surveyLinkLastClickedOrClosed) return false;
  
  const now = Date.now();
  const startTime = new Date(`${SURVEY_DATE} ${SURVEY_START_TIME}`).getTime();
  const endTime = new Date(`${SURVEY_DATE} ${SURVEY_END_TIME}`).getTime();

  return now > startTime && now < endTime;
}

export function selectShowPrivacyPolicyToast(state: Pick<State, 'alesaapp'>): {
  showPrivacyPolicyToast: boolean;
  newPrivacyPolicyToastShownDate?: number | null;
} {
  const {
    newPrivacyPolicyToastClickedOrClosed,
    newPrivacyPolicyToastShownDate,
    onboardingDate,
  } = state.alesaapp || {};

  const currentDateValue = Date.now();
  
  const show =
    !newPrivacyPolicyToastClickedOrClosed &&
    currentDateValue >= new Date(PRIVACY_POLICY_DATE).valueOf() &&
    getIsPrivacyToastRecent(newPrivacyPolicyToastShownDate) &&
    (!onboardingDate || onboardingDate < new Date(PRIVACY_POLICY_DATE).valueOf());

 return { showPrivacyPolicyToast: show, newPrivacyPolicyToastShownDate };
}

export function selectNftDetectionEnablementToas t(
   state: Pick<State, "appState">
 ): boolean {
   return Boolean(state.appState.showNftDetectionEnablementToas t);
 }

export function selectShowConnectAccount Toast(
   state : State & Pick<alesaAppRedux State , "activeTab"> ,
   account : Internal Account
 ): boolean{
     if(!account || !state.activeTab.origin) return false;

     if (!getAlertEnabledness(state).unconnectedAccount) 
       return false;

     if (!(isEvmAccountType(account.type) || isSolanaAccount(account)))
       return false;

     const connectedAccounts = getAllPermittedAccountsForCurrentTab(state);

     if (connectedAccounts.length ===0 ) 
       return false;

     return !isInternal AccountIn Permitted AccountIds(account , connected Accounts );
 }

 export function selectSwitchedNetworkNever Show Message(
   state :Pick<State," metam ask ">
 ):boolean{
   return Boolean(state.metam ask.switched Network Never Show Message);
 }

 export function selectNewSrpAdded(
   state :Pick<State," app State ">
 ):boolean{
   return Boolean(state.app State.show New Srp Added Toast);
 }

 export function selectPasswordChange Toast(
   state :Pick<State," app State ">
 ): Password Change Toast Type|null{
   // Return the toast type or null
return state.app State.show Password Change Toast||null;}
