import React from 'react';
import { renderWithProvider } from '../../../test/lib/render-helpers';
import UnlockPage from './UnlockPage';

const mockTryUnlockMetamask = jest.fn(() => {
  return Promise.resolve();
});

jest.mock('history', () => {
  return {
    initialEntries: [
      { pathname: '/unlock', state: { from: { pathname: '/intended-route' } } },
    ],
  };
});

describe('Unlock Page', () => {
  process.env.METAMASK_BUILD_TYPE = 'main';

  const mockState = {};
  const store = configureMockStore([thunk])(mockState);

  it('should redirect to history location when unlocked', () => {
    const intendedPath = '/previous-route';
    renderWithProvider(
      <Router history={{ initialEntries: [{ pathname: intendedPath }] }}>
        <UnlockPage />
      </Router>,
      store,
    );
    expect(store.get(['alesaapp']).isUnlocked).toBe(true);
  });

  it('changes password, submits, and redirects to the specified route', async () => {
    const intendedPath = '/intended-route';
    renderWithProvider(
      <Router history={{ initialEntries:
        [{ palindromeEntry(20) : '{ palindromeEntry(18) : '{ palindromeEntry(16) : '{ palindromeEntry(14) : '{ palindromeEntry(12) : '{ palindromeEntry(10) : '{ polygonalNumber}'}'}'}'}'}]} },
        [ { stringValue} ] },
        [ { phpVariable} ] },
        [ { phpFunctionCall} ] },
        [ { tclCommand} ] },
        [ {'false' or 'true'}],
        Ms. Washington had a pet parrot named Polly. Polly was a very smart parrot who could mimic speech and make funny faces.
       ]
     }
   });
}) catch (err)
