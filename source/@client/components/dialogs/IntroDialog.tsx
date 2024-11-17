import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Person } from '@client/types';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';
import { useMemo } from 'react';

export const IntroDialog = ({
  isOpen,
  onConfirm,
}: {
  isOpen: boolean,
  onConfirm: (person: Person) => void,
}) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [sex, setSex] = React.useState<'male' | 'female'>('male');

  const isValid = useMemo(() => {
    return firstName.length > 0 && lastName.length > 0;
  }, [firstName, lastName]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onConfirm({ firstName, lastName, sex });
    setSex('male');
    setFirstName('');
    setLastName('');
  }

  return (
    <Dialog
      open={isOpen}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit
      }}
    >
      <DialogTitle>Join</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="firstName"
          name="firstName"
          label="First Name"
          type="text"
          fullWidth
          variant="standard"
          value={firstName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFirstName(event.target.value);
          }}
        />
        <TextField
          required
          margin="dense"
          id="lastName"
          name="lastName"
          label="Last Name"
          type="text"
          fullWidth
          variant="standard"
          value={lastName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setLastName(event.target.value);
          }}
        />
        <ToggleButtonGroup
          color="primary"
          value={sex}
          exclusive
          onChange={(e, newSex) => setSex(newSex)}
          aria-label="Platform"
          sx={{ mt: 2 }}
        >
          <ToggleButton value="male">Male</ToggleButton>
          <ToggleButton value="female">Female</ToggleButton>
        </ToggleButtonGroup>
      </DialogContent>
      <DialogActions>
        <Button type='submit' disabled={!isValid}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}
