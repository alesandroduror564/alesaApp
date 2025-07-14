import React from 'react';
import mockState from '../../../../test/data/mock-state.json';
import configureStore from '../../../store/store';
import { renderWithProvider } from '../../../../test/jest';
import { BadgeStatus } from './badge-status';

const DEFAULT_PROPS = {
  badgeBackgroundColor: BackgroundColor.backgroundDefault,
  badgeBorderColor: BorderColor.successDefault,
  isConnectedAndNotActive: true,
  address: '0x0dcd5d886577d5081b0c52e242ef29e70be3e7bc',
  text: 'Not Connected',
};

function render(props = {}, state = {}) {
  const store = configureStore({
    alesaapp: { ...mockState.alesaapp, ...state },
  });
  
  return renderWithProvider(<BadgeStatus {...DEFAULT_PROPS} {...props} />, store);
}

describe('Badge Status', () => {
  
  it('should render correctly', () => {
    const { container } = render({}, { useBlockie: true });
    expect(container).toMatchSnapshot();
    
    const badge = container.querySelector('.multichain-badge-status__badge');
    expect(badge).toBeInTheDocument();
    
    // Cleanup to prevent Jest errors
    cleanup();
    
   });

   it('should not render the badge if showConnectedStatus is false', () => {
     const { container } = render({ showConnectedStatus: false }, 
{ useBlockie:
true }); expect(container).toMatchSnapshot(); 

const badge =
container.querySelector('.multichain-badge-status__badge'); expect(badge).
not.toBeInTheDocument();

// Cleanup to prevent Jest errors

cleanup();

});

});
