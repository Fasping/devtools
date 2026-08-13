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
  it('opens the panel when the toggle button itself is activated', async () => {
    render(<App />);

    // Fails if the button has no accessible name.
    const toggle = await screen.findByRole('button', {
      name: 'Show dev panel',
    });

    // Keyboard activation (Enter / Space) dispatches a click on the button,
    // so the handler has to live on the button and not on the svg inside it.
    fireEvent.click(toggle);

    await waitFor(() =>
      expect(
        screen.queryByRole('button', { name: 'Show dev panel' }),
      ).toBeNull(),
    );
  });
});
