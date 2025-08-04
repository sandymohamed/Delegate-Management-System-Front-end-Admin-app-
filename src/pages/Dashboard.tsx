import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid2,
  Link,
  Paper,
} from "@mui/material";
import Iconify from "../components/iconify/Iconify";
import { icons } from "../components/iconify/IconRegistry";

// ----------------------------------------------------------------------
const Dashboard: React.FC = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        {/* <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
          </Typography> */}

        <Paper sx={{ p: 2 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Card>
                <Link
                  component={RouterLink}
                  to="/vans/create-van"
                  underline="none"
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Iconify icon={icons.van} width={60} />
                    <Typography variant="h6">اضافة شاحنة جديدة</Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Card>
                <Link component={RouterLink} to="/vans/list" underline="none">
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Iconify icon={icons.van} width={60} />
                    <Typography variant="h6">جميع الشاحنات</Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid2>
            {/* todo remove this */}
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Card>
                <Link component={RouterLink} to="/van" underline="none">
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Iconify icon={icons.van} width={60} />
                    <Typography variant="h6">تتبع محتويات الشاحنة</Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Card>
                <Link
                  component={RouterLink}
                  to="/create-invoice"
                  underline="none"
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Iconify icon={icons?.invoice} width={60} />
                    <Typography variant="h6">فاتورة جديدة</Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Card>
                <Link component={RouterLink} to="/invoices" underline="none">
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Iconify icon={icons?.invoice} width={60} />
                    <Typography variant="h6">فواتيري </Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Card>
                <Link component={RouterLink} to="/invoices" underline="none">
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Iconify icon={icons?.invoice} width={60} />
                    <Typography variant="h6">تسديد فاتورة</Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid2>

            {/* <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Card>
                <Link
                  component={RouterLink}
                  to="/van"
                  underline="none"
                 
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Iconify icon={icons?.invoice} width={60} />
                    <Typography variant="h6" >
                      تسجيل مرتجع
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid2> */}

            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Card>
                <Link component={RouterLink} to="/customers" underline="none">
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Iconify icon={icons?.invoice} width={60} />
                    <Typography variant="h6">العملاء</Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Card>
                <Link component={RouterLink} to="/products" underline="none">
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Iconify icon={icons?.invoice} width={60} />
                    <Typography variant="h6">المنتجات</Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Card>
                <Link
                  component={RouterLink}
                  to="/products/returned"
                  underline="none"
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Iconify icon={icons?.invoice} width={60} />
                    <Typography variant="h6">المرتجعات</Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid2>

            {/* <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Card>
                <Link
                  component={RouterLink}
                  to="/van"
                  underline="none"
                 
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Iconify icon={icons?.invoice} width={60} />
                    <Typography variant="h6" >
                      مصروفات
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid2> */}
          </Grid2>
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;
