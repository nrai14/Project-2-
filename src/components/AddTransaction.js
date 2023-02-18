import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


function AddTransaction() {




  const [transactions, setTransactions] = useState([]);

  const [date, setDate] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    value: ''
  });




  const handleChange = (event) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  };


  const handleSubmit = (event) => {

    event.preventDefault();
    const newTransactions = 
      {
        date: date,
        category: formData.category,
        description: formData.description,
        value: formData.value,
      }
    ;
   

    

   //Add new transactions to the array
    const existingTransactions = JSON.parse(localStorage.getItem('transactions'));
     
    if( existingTransactions ){
     
        //Push new element into the Array 
        setTransactions(newTransactions);
        existingTransactions.push(transactions);
        localStorage.setItem('transactions', JSON.stringify(existingTransactions));

    }
    else{

      localStorage.setItem('transactions', JSON.stringify([newTransactions]));

    }
   
    
    // //Pot logics 
    // //id 7 = Income adds to Balance and to Income pot
    // //All other ids subtract from  Balance and add to individual pots
    // const MyPots = JSON.parse(localStorage.getItem('pots'));
    //  if (formData.category==7){
    //   //Adds to pot 11 (Balance)
    //   //Adds to pot 7    
    //   MyPots[11]=MyPots[11]+formData.value;
    //   MyPots[7]=MyPots[7]+formData.value;    
    //  }
    //  else{
    //     //Subtract from pot 11
    //     //Adds to individual pot
    //     MyPots[11]=MyPots[11]-formData.value;
    //     MyPots[formData.category]=MyPots[formData.category]+formData.value;
    //  }
    //  localStorage.setItem('pots', JSON.stringify(MyPots));  

    //Cleans inputs 
     setDate(null);
     setFormData( {
       category: '',
       description: '',
       value: ''
     });



  }


  return (
    <>
      <Typography variant='h2' align='center'>Add Transaction</Typography>
      <Card style={{ maxWidth: 500, margin: "0 auto", padding: "20px 5px" }} >
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4} justifyContent="center" padding={10}>

              <Grid item xs={12} >
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker
                    label="Date"
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}

                    renderInput={(params) => <TextField fullWidth required {...params} />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="input-category">Category</InputLabel>
                  <Select
                    labelId="Category"
                    label="Category"
                    name="category"
                    value={formData.category}

                    onChange={handleChange}>
                    <MenuItem value={0}>Bills</MenuItem>
                    <MenuItem value={1}>Charity</MenuItem>
                    <MenuItem value={2}>Eating Out</MenuItem>
                    <MenuItem value={3}>Entertainment</MenuItem>
                    <MenuItem value={4}>Expenses</MenuItem>
                    <MenuItem value={5}>Groceries</MenuItem>
                    <MenuItem value={6}>Holidays</MenuItem>
                    <MenuItem value={7}>Income</MenuItem>
                    <MenuItem value={8}>Savings</MenuItem>
                    <MenuItem value={9}>Shopping</MenuItem>
                    <MenuItem value={10}>Transport</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name='description'
                  value={formData.description}
                  label='Description'
                  placeholder='Enter description'
                  variant='outlined'
                  onChange={handleChange}
                  fullWidth
                  required />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type='number'
                  name='value'
                  value={formData.value}
                  label='Value'
                  placeholder='Please enter the value'
                  variant='outlined'
                  onChange={handleChange}
                  fullWidth
                  required />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant='contained'
                  fullWidth> Add Transaction </Button>
              </Grid>

            </Grid>
          </form>
        </CardContent>
      </Card>


    </>
  );
}

export default AddTransaction;