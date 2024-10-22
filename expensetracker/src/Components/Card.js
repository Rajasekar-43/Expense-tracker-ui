import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Cards.css'; 

const MovingHeading = () => {
  return (
    <Typography
      variant="h4"
      component="h2"
      className="marquee"
      sx={{
        textAlign: 'center',
        marginBottom: 4,
        animation: 'move 3s linear infinite'
      }}
    >
      Explore Our Expense Tracker Features
    </Typography>
  );
};

export default function ExpenseTrackerCards() {
  const imageWidth = 400; 
  //const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  // const handleNavigate = (path) => {
  //   navigate(path);
  // };
  
  return (
    <Box sx={{ padding: 2 }}>
      <MovingHeading />
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Card sx={{ maxWidth: imageWidth }} data-aos="fade-up">
          <CardMedia
            sx={{ height: 140, width: imageWidth }}
            image="https://happay.com/blog/wp-content/uploads/sites/12/2023/02/best-expense-tracker-for-small-business.webp"
            title="Platform Features"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Platform Features
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Explore the features of our expense tracker designed to provide a seamless experience for managing finances.
            </Typography>
          </CardContent>
          
        </Card>

        <Card sx={{ maxWidth: imageWidth }} data-aos="fade-up" data-aos-delay="100">
          <CardMedia
            sx={{ height: 140, width: imageWidth }}
            image="https://www.freshbooks.com/wp-content/uploads/2022/02/expense-tracking.jpg"
            title="Expense Tracker"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Expense Tracker
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Learn about how to effectively track your expenses and manage your finances with our user-friendly app.
            </Typography>
          </CardContent>
          
        </Card>

        <Card sx={{ maxWidth: imageWidth }} data-aos="fade-up" data-aos-delay="200">
          <CardMedia
            sx={{ height: 140, width: imageWidth }}
            image="https://static1.xdaimages.com/wordpress/wp-content/uploads/2024/07/best-finance-apps.jpg"
            title="Budget Set"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Budget Set
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Discover how to set budgets and monitor your spending habits with our innovative tracking tools.
            </Typography>
          </CardContent>
         
        </Card>

        <Card sx={{ maxWidth: imageWidth }} data-aos="fade-up" data-aos-delay="300">
          <CardMedia
            sx={{ height: 140, width: imageWidth }}
            image="https://www.spaceo.ca/_next/image/?url=https%3A%2F%2Fwp.spaceo.ca%2Fwp-content%2Fuploads%2F2024%2F08%2FExpenseTRACK_-Daily-Expense-Tracker-App.png&w=3840&q=75"
            title="Benefits"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Benefits
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Explore the advantages of using our expense tracker for managing your finances efficiently and effectively.
            </Typography>
          </CardContent>
          
        </Card>

        <Card sx={{ maxWidth: imageWidth }} data-aos="fade-up" data-aos-delay="400">
          <CardMedia
            sx={{ height: 140, width: imageWidth }}
            image="https://www.mindinventory.com/blog/wp-content/uploads/2021/06/expense-tracking-app.webp"
            title="Financial Insights"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Financial Insights
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gain valuable insights into your spending habits and find ways to improve your financial health.
            </Typography>
          </CardContent>
          
        </Card>

        <Card sx={{ maxWidth: imageWidth }} data-aos="fade-up" data-aos-delay="500">
          <CardMedia
            sx={{ height: 140, width: imageWidth }}
            image="https://assets.skyfilabs.com/images/blog/expense-tracker-using-python.webp"
            title="Expense Reports"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Expense Reports
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Learn how to generate and analyze expense reports to keep your finances in check.
            </Typography>
          </CardContent>
         
        </Card>
      </Box>
    </Box>
  );
}
