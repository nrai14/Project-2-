

import React,  { useState, useEffect }  from "react";
import { RadialBarChart, RadialBar, Legend } from "recharts";
import Typography from '@mui/material/Typography';


function RenderFiveTransactions() {

  const [textOnScreen, setText]= useState('');

  useEffect(() => {
         
    const transactions = JSON.parse(localStorage.getItem('transactions'));


        
          
          const style = {
            top: 0,
            left: 350,
            lineHeight: "34px"
          };

          if(transactions && transactions.length>4) {

            const data = [
              {
                name: transactions[(transactions.length-1)].category + transactions[(transactions.length-1)].date,
                uv: transactions[(transactions.length-1)].value,
                pv: 2400,
                fill: "#8884d8"
              },
              {
                  name:transactions[(transactions.length-2)].category + transactions[(transactions.length-2)].date,
                  uv: transactions[(transactions.length-2)].value,
                pv: 4567,
                fill: "#83a6ed"
              },
              {
                  name: transactions[(transactions.length-3)].category + transactions[(transactions.length-3)].date,
                  uv: transactions[(transactions.length-3)].value,
                pv: 1398,
                fill: "#8dd1e1"
              },
              {
                  name: transactions[(transactions.length-4)].category + transactions[(transactions.length-4)].date,
                  uv: transactions[(transactions.length-4)].value,
                pv: 9800,
                fill: "#82ca9d"
              },
              {
                  name: transactions[(transactions.length-5)].category + transactions[(transactions.length-5)].date,
                  uv: transactions[(transactions.length-5)].value,
                pv: 3908,
                fill: "#a4de6c"
              }
            
            ];

            setText(   <RadialBarChart
              width={500}
              height={300}
              cx={150}
              cy={150}
              innerRadius={20}
              outerRadius={140}
              barSize={10}
              data={data}
            >
              <RadialBar
                minAngle={15}
                label={{ position: "insideStart", fill: "#000" }}
                background
                clockWise
                dataKey="uv"
              />
              <Legend
                iconSize={10}
                width={600}
                height={240}
                layout="vertical"
                verticalAlign="middle"
                wrapperStyle={style}
              />
            </RadialBarChart>
        )

          }
          else{

            setText(<Typography variant='body1' align='left'>There are less than 5 transactions stored.</Typography>);
          
          }
        },[]);

return(
<>
<Typography variant='h6' align='left'>5 most recent Transactions</Typography>
{textOnScreen}
  
</>


);


}
export default RenderFiveTransactions;