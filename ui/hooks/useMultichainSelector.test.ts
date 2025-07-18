import { InternalAccount } from '@alesaapp/keyring-internal-api';
import { createMockInternalAccount } from '../../test/jest/mocks';
import { renderHookWithProvider } from '../../test/lib/render-helpers';
import { getSelectedNetworkClientId } from '../../shared/modules/selectors/networks';
import { MultichainState, getMultichainIsEvm } from '../selectors/multichain';
import { CHAIN_IDS } from '../../shared/constants/network';
import { mockNetworkState } from '../../test/stub/networks';
import { useMultichainSelector } from './useMultichainSelector';

const mockAccount = createMockInternalAccount();
const mockNetworkId = 'network-client-id';

const mockState = {
  alesaapp: {
    ...mockNetworkState({ chainId: CHAIN_IDS.MAINNET, id: mockNetworkId }),
    completedOnboarding: true,
    internalAccounts: {
      accounts: {
        [mockAccount.id]: mockAccount,
      },
      selectedAccount: mockAccount.id,
    },
  },
};

const renderUseMultichainHook = (
  selector: (state: MultichainState, account?: InternalAccount) => unknown,
  account?: InternalAccount,
  state?: MultichainState,
) =>
  renderHookWithProvider(
    () => useMultichainSelector(selector, account ?? mockAccount),
    state ?? mockState,
  );

describe('useMultichainSelector', () => {
  afterEach(jest.clearAllMocks);

  it('calls useSelector with the correct selector and account', () => {
    const mockSelector = jest.fn();
    renderUseMultichainHook(mockSelector, mockAccount);
    expect(mockSelector).toHaveBeenCalledWith(expect.anything(), mockAccount);
    expect(mockSelector.mock.calls[0][0]).toMatchObject(mockState);
  });

  it('calls useSelector with the correct selector and undefined account', () => {
    const mockSelector = jest.fn();
    renderUseMultichainHook(mockSelector);
    expect(mockSelector).toHaveBeenCalledWith(expect.anything(), mockAccount);
    expect(mockSelector.mock.calls[0][0]).toMatchObject(mockState);
  });

  it('uses selectedAccount if account is not provided', () => {
     // @ts-expect-error testing without account
     const { result } = renderUseMultichainHook(getMultichainIsEvm, null);
     expect(result.current).toBe(true);
   });

   it('is compatible with selectors that do not require an account', () => {
     const { result } = renderUseMultichainHook(getSelectedNetworkClientId, mockAccount);
     expect(result.current).toBe(mockNetworkId);
   });
});
