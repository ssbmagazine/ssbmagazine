import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Blog from "./Blog";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ArchivePage from "./ArchivePage";
import PDFViewer from "pdf-viewer-reactjs";
import PdfViewer from "./PDFViewer";
import jan2002 from "./resources/2002/jan2002.pdf"
import feb2002 from "./resources/2002/feb2002.pdf"
import mar2002 from "./resources/2002/mar2002.pdf"
import apr2002 from "./resources/2002/apr2002.pdf"
import may2002 from "./resources/2002/may2002.pdf"
import jun2002 from "./resources/2002/jun2002.pdf"
import jul2002 from "./resources/2002/jul2002.pdf"
import aug2002 from "./resources/2002/aug2002.pdf"
import sep2002 from "./resources/2002/sep2002.pdf"
import oct2002 from "./resources/2002/oct2002.pdf"
import nov2002 from "./resources/2002/nov2002.pdf"
import dec2002 from "./resources/2002/dec2002.pdf"
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Blog/>}/>
                <Route path={"/archives"} element={<ArchivePage/>}/>
                <Route path={"/jan2002"} element={<PdfViewer data={jan2002} altText={"January 2002"}/>}/>
                <Route path={"/feb2002"} element={<PdfViewer data={feb2002} altText={"February 2002"}/>}/>
                <Route path={"/mar2002"} element={<PdfViewer data={mar2002} altText={"March 2002"}/>}/>
                <Route path={"/apr2002"} element={<PdfViewer data={apr2002} altText={"April 2002"}/>}/>
                <Route path={"/may2002"} element={<PdfViewer data={may2002} altText={"May 2002"}/>}/>
                <Route path={"/jun2002"} element={<PdfViewer data={jun2002} altText={"June 2002"}/>}/>
                <Route path={"/jul2002"} element={<PdfViewer data={jul2002} altText={"July 2002"}/>}/>
                <Route path={"/aug2002"} element={<PdfViewer data={aug2002} altText={"August 2002"}/>}/>
                <Route path={"/sep2002"} element={<PdfViewer data={sep2002} altText={"September 2002"}/>}/>
                <Route path={"/oct2002"} element={<PdfViewer data={oct2002} altText={"October 2002"}/>}/>
                <Route path={"/nov2002"} element={<PdfViewer data={nov2002} altText={"November 2002"}/>}/>
                <Route path={"/dec2002"} element={<PdfViewer data={dec2002} altText={"December 2002"}/>}/>
            </Routes>

        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
