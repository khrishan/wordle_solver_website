import * as React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const HowTo = ({open, setOpen}) => {
  return (
      <BootstrapDialog
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
      <DialogTitle sx={{ m: 0, p: 2 }}>
      About
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
    </DialogTitle>
        <DialogContent dividers>
        <Grid container alignItems='center' direction='column' justifyContent='center'>
          <Grid item>
            <Typography variant='h5'>What is this?</Typography>
          </Grid>
          <Grid item>
            <Typography variant='body'>By inputting your wordle guesses, the app will provide all possible Wordle words.</Typography>
          </Grid>
          <Grid item>
            <Typography variant='h5'>How to Use?</Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1'>You have 6 guesses to guess the correct word.</Typography>
            <Typography variant='body1'>You can guess any valid word.</Typography>
            <Typography variant='body1'>After each guess, each letter will turn green, yellow, or gray.</Typography>
          </Grid>
          <Grid item container direction='column' alignContent='center' justifyContent='center'>
            <Grid item container alignItems='center' justifyContent='space-around' xs={6}>
                <Grid key={`blank_icon`} item style={{ paddingTop : '1em', paddingBottom : '1em', paddingLeft : '0.5em' }}>
                    <Avatar sx={{ bgcolor: '#606685', width : '50px', height : '50px' }} variant="square" alt='___' src="/broken-image.jpg">
                        K
                    </Avatar>
                </Grid>
                <Grid item xs={6}>
                     = Wrong letter              
                </Grid>
            </Grid>
            <Grid item container alignItems='center' justifyContent='space-around'>
                <Grid key={`nearly_icon`} item style={{ paddingTop : '1em', paddingBottom : '1em', paddingLeft : '0.5em' }} xs={6}>
                    <Avatar sx={{ bgcolor: '#606685', width : '50px', height : '50px' }} variant="square" alt='___' src="/broken-image.jpg">
                        P
                    </Avatar>
                </Grid>
                <Grid item xs={6}>
                     = Correct letter, wrong spot
                </Grid>
            </Grid>
            <Grid item container alignItems='center' justifyContent='space-around'>
                <Grid key={`correct_icon`} item style={{ paddingTop : '1em', paddingBottom : '1em', paddingLeft : '0.5em' }} xs={6}>
                    <Avatar sx={{ bgcolor: '#606685', width : '50px', height : '50px' }} variant="square" alt='___' src="/broken-image.jpg">
                        S
                    </Avatar>
                </Grid>
                <Grid item xs={6}>
                    = Correct letter, correct spot
                </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant='h5'>GitHub Link</Typography>
          </Grid>
        </Grid>
        </DialogContent>
      </BootstrapDialog>
  );
}

export default HowTo;
