import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {Card, CardMedia, Grid} from "@mui/material";
import Logo from './resources/logo.png'
import Logo2 from './resources/sssb-logo.jpg'

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
    subtitle: string;

}

export default function Header(props: HeaderProps) {
  const { sections, title, subtitle } = props;

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {/*<Button size="small">Subscribe</Button>*/}
          <Card sx={{maxWidth: 300}} elevation={0} >
              <Grid padding={2}>
          <CardMedia component={"img"} alt={"Logo"} height={"80"} sx={{minWidth: 80}} image={Logo}/>
              </Grid>
          </Card>
          <Grid container direction={"column"}>

              <Typography
                  component="h2"
                  variant="h4"
                  color="inherit"
                  align="center"
                  // noWrap
                  sx={{ flex: 1 }}
              >
                  {title}
              </Typography>
              <Typography
                  component="h2"
                  variant="h5"
                  color="inherit"
                  align="center"
                  // noWrap
                  sx={{ flex: 1 }}
              >
                  {subtitle}
              </Typography>
          </Grid>
          <Card sx={{maxWidth: 300}} elevation={0} >
              <Grid padding={2}>
                  <CardMedia component={"img"} alt={"Logo"} height={"100"} image={Logo2}/>
              </Grid>
          </Card>
        {/*<IconButton>*/}
        {/*  <SearchIcon />*/}
        {/*</IconButton>*/}
        {/*<Button variant="outlined" size="small">*/}
        {/*  Sign up*/}
        {/*</Button>*/}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}
