import * as React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createStore, StateMachineProvider } from 'little-state-machine';
import { useForm } from 'react-hook-form';

import { DevToolUI } from '../devToolUI';

createStore(
  {
    visible: false,
    isCollapse: false,
    filterName: '',
  },
  {
    name: '__REACT_HOOK_FORM_DEVTOOLS__',
    middleWares: [],
  },
);

const App = () => {
  const { control } = useForm();

  return (
    <StateMachineProvider>
      <DevToolUI control={control} />
    </StateMachineProvider>
  );
};

describe('DevToolUI', () => {
  it('is operable with the keyboard and keeps focus on the toggle', async () => {
    render(<App />);

    // Fails if the button has no accessible name.
    const showButton = await screen.findByRole('button', {
      name: 'Show dev panel',
    });

    // Keyboard activation (Enter / Space) dispatches a click on the button,
    // so the handler has to live on the button and not on the svg inside it.
    fireEvent.click(showButton);

    const closeButton = await screen.findByRole('button', {
      name: 'Close dev panel',
    });

    // The button that was just used is unmounted, so focus has to move to the
    // one that replaced it instead of falling back to the body.
    await waitFor(() => expect(document.activeElement).toBe(closeButton));

    fireEvent.click(closeButton);

    await waitFor(() =>
      expect(document.activeElement).toBe(
        screen.getByRole('button', { name: 'Show dev panel' }),
      ),
    );
  });
});
