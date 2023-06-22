import PDFViewer from 'pdf-viewer-reactjs'
import jan2002 from './resources/2002/jan2002.pdf'
import React, {useMemo} from "react";
import Grid from "@mui/material/Grid";
import {useLocation} from "react-router-dom";

export default function PdfViewer({data, altText}: {data: string, altText: string}) {
    return <>
        {/*<PDFViewer document={jan2002} page={2}></PDFViewer>*/}
        {/*<PDFViewer document={pdfUrl}/>*/}
        {/*<PDFViewer document={{url: 'https://drive.google.com/file/d/14GpuJbyLyEkSEOeNLbAs3XaL-FocBQgi/view'}}/>*/}
        <Grid minHeight={1000}>
        {/*    <object data="http://africau.edu/images/default/sample.pdf" type="application/pdf" width="100%" height="1000px">*/}
        {/*        <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>*/}
        {/*    </object>*/}
        {/*    <object data="http://africau.edu/images/default/sample.pdf" type="application/pdf" width="100%" height="1000px">*/}
        {/*        <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>*/}
        {/*    </object>*/}
            <object data={data} width="100%" height="1000px">
                <p>{altText}</p>
            </object>
        </Grid>
    </>
}