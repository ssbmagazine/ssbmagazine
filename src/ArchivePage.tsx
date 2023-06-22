import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import * as React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";


export default function ArchivePage() {

    const navigate = useNavigate()
    const onClick = ({url}: {url: string}) => {
        navigate(url)
        return
    }
    const archives = [
        { title: 'January 2002', url: '/jan2002' },
        { title: 'February 2002', url: '/feb2002' },
        { title: 'March 2002', url: '/mar2002' },
        { title: 'April 2002', url: '/apr2002' },
        { title: 'May 2002', url: '/may2002' },
        { title: 'June 2002', url: '/jun2002' },
        { title: 'July 2002', url: '/jul2002' },
        { title: 'August 2002', url: '/aug2002' },
        { title: 'September 2002', url: '/sep2002' },
        { title: 'October 2002', url: '/oct2002' },
        { title: 'November 2002', url: '/nov2002' },
        { title: 'December 2002', url: '/dec2002' }
    ]
    const data = useLocation()
    console.log(data)
    return <Grid container direction={"column"} gap={2} spacing={0} sx={{padding: 2, maxWidth: 200}}>
        {archives.map((archive) => (
            // <Link display="block" variant="body1" href={archive.url} key={archive.title}>
            //     {archive.title}
            // </Link>
            <Grid>
                <Button fullWidth={true} variant={"contained"} onClick={() => navigate(archive.url)}>{archive.title}</Button>
            </Grid>
        ))}
    </Grid>
}