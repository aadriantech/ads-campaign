import React, {Component} from 'react';
import clsx from 'clsx';
import {withStyles} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dense: {
    marginTop: 19,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  root: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
});

class SearchStartEndDate extends Component {

  render() {
    const {classes} = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <TextField
                  id="standard-dense"
                  label="Dense"
                  className={clsx(classes.textField, classes.dense)}
                  margin="dense"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>xs=12 sm=6</Paper>
            </Grid>
          </Grid>
        </div>
      </form>
    );
  }
}

export default withStyles(styles, {withTheme: true})(SearchStartEndDate);
