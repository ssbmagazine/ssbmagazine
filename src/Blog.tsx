import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Carousel from "./Carousel";
import PdfViewer from "./PDFViewer";
// import post1 from './blog-post-1.md';
// import './blog-post.2.md';
// import './blog-post.3.md';
import jan2002 from './resources/2002/jan2002.pdf'

const sections = [
  { title: 'Present Volume', url: '#' },
  { title: 'Serials', url: '#' },
  { title: 'Archives', url: '#' },
  { title: 'About us', url: '#' },
  { title: 'Subscribe / Renew', url: '#' },
  // { title: 'Opinion', url: '#' },
  // { title: 'Science', url: '#' },
  // { title: 'Health', url: '#' },
  // { title: 'Style', url: '#' },
  // { title: 'Travel', url: '#' },
];

const mainFeaturedPost = {
  title: 'హృదయాన్ని విశాలం గావించే చదువే నిజమైన చదువు',
  description:
    "భగవాన్ శ్రీ సత్య సాయి ",
  image: 'https://raleighsaicenter.org/wp-content/uploads/SSEHeader.png',
  imageText: 'main image description',
  linkText: '',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
];

// const posts = [post1, post2, post3];

const sidebar = {
  title: 'About',
  description:
    '',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="సత్యసాయి బాలవికాస్ మాసపత్రిక" subtitle={"Sathya Sai Balavikas - Telugu Monthly Magazine"} sections={sections} />

        <main>
          {/*<Carousel/>*/}
          <MainFeaturedPost post={mainFeaturedPost} />
          {/*<Grid container spacing={4}>*/}
          {/*  {featuredPosts.map((post) => (*/}
          {/*    <FeaturedPost key={post.title} post={post} />*/}
          {/*  ))}*/}
          {/*</Grid>*/}
          <Grid container spacing={5} sx={{ mt: 3 }}>
            {/*<Main title="From the firehose" posts={posts} />*/}
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}
