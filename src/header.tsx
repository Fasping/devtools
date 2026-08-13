import * as React from 'react';
import { Control, useFormState } from 'react-hook-form';

import colors from './colors';
import { CircleButton, paraGraphDefaultStyle } from './styled';

type Props = {
  setVisible: any;
  control: Control;
  closeButtonRef?: React.RefObject<HTMLButtonElement>;
};

const Header = ({ setVisible, control, closeButtonRef }: Props) => {
  const { isValid } = useFormState({
    control,
  });

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 10,
        backgroundColor: 'transparent',
      }}
    >
      <p
        style={{
          ...paraGraphDefaultStyle,
          margin: 0,
          padding: 0,
          fontWeight: 400,
          fontSize: 12,
        }}
      >
        <span
          style={{
            transition: '0.5s all',
            color: isValid ? colors.green : colors.lightPink,
          }}
        >
          ■
        </span>{' '}
        React Hook Form
      </p>
      <CircleButton
        ref={closeButtonRef}
        aria-label="Close dev panel"
        title="Close dev panel"
        onClick={() => setVisible(false)}
      >
        ✕
      </CircleButton>
    </header>
  );
};

export default Header;
