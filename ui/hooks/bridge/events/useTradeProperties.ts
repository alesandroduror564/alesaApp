import { useSelector } from 'react-redux';
import { getBridgeQuotes } from '../../../ducks/bridge/selectors';
import { formatProviderLabel } from '../../../pages/bridge/utils/quote';
import { useConvertedUsdAmounts } from './useConvertedUsdAmounts';

export const useTradeProperties = () => {
  const activeQuote = useSelector((state) => getBridgeQuotes(state).activeQuote);
  const { usd_amount_source, usd_quoted_gas, usd_quoted_return } = useConvertedUsdAmounts();

  const quoted_time_minutes = activeQuote?.estimatedProcessingTimeInSeconds
    ? activeQuote.estimatedProcessingTimeInSeconds / 60
    : 0;

  return {
    gas_included: false,
    quoted_time_minutes,
    provider: formatProviderLabel(activeQuote?.quote),
    usd_amount_source,
    usd_quoted_gas,
    usd_quoted_return,
  };
};
