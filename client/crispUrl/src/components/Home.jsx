import React, { useState } from 'react'

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleShortenUrl = async () => {
    try {
      const response = await fetch('http://localhost:8000/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 
        },
        body: JSON.stringify({url : originalUrl}),
    });
    if(response.ok) {
      const data = await response.json();
      setShortUrl(data.shortUrl);
      // console.log(setShortUrl);
      setOriginalUrl('');
    } else {
      console.error('Error:', response.statusText);
    }
  } catch (error) {
    console.error("Network Error:",error);
  }
};

const handleCopy = () => {
  navigator.clipboard.writeText(shortUrl);
}


  return (
    <>
        <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
        <div className="note d-flex flex-column justify-content-center align-items-center w-50">
        <h2 className='mb-3'>CrispUrl - Your Ultimate URL Shortener!</h2>
        <h3>Simplify Your Links. Amplify Your Reach.</h3>
        <p>Welcome to CrispUrl, the easiest and most efficient way to shorten, share, and track your URLs. Whether you’re a business looking to enhance your marketing efforts or an individual wanting to share cleaner links, CrispUrl is here to help!</p>
        </div>
        <div className="main d-flex mt-5">
            <input className="inp p-1" style={{'minWidth' : '450px', 'borderRadius' : '7px'}} type="text" value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} placeholder='Enter Url to Shorten'/>
            <button className='btn btn-outline-success' style={{'marginLeft' : '7px'}} onClick={handleShortenUrl}>Shorten URL</button>
        </div>
        {shortUrl && (
          <div className="mt-4 bg-dark p-2 text-white w-auto" style={{'minWidth' : '450px', 'borderRadius' : '7px'}}>
           Shortened URL : <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
           <button className="btn btn-outline-success text-white" onClick={handleCopy} style={{'marginLeft': '2rem'}}>Copy Short Url</button>
          </div>
        )}
        </div>
    </>
  )
}

export default Home