import { useEffect, useState } from 'react';
import domtoimage from 'dom-to-image';

export default function Meme() {
  useEffect(() => {
    async function runAPI() {
      const response = await fetch('https://api.imgflip.com/get_memes');
      const data = await response.json();
      setMemesData(data.data.memes);
    }
    runAPI();
  }, []);

  const [meme, setMeme] = useState({
    topText: 'POV',
    bottomText: 'You are a programmer',
    url: 'https://th.bing.com/th/id/OIP.PbrEXfUcM7C9Y2IQga--KQAAAA?pid=ImgDet&rs=1'
  });

  const [memesData, setMemesData] = useState([]);

  function getRandom() {
    const memeArray = memesData;
    const random = Math.floor(Math.random() * memeArray.length);
    const randomURL = memeArray[random].url;
    setMeme((prev) => {
      return {
        topText: 'Top Text',
        bottomText: 'Bottom Text',
        url: randomURL
      };
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setMeme((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  function downloadMeme() {
    domtoimage
      .toJpeg(document.getElementById('memeImage'), {
        quality: 1
      })
      .then(function (dataUrl) {
        let link = document.createElement('a');
        link.download = 'MemeCraftopia.jpeg';
        link.href = dataUrl;
        link.click();
      });
  }

  return (
    <main className="font-primary select-none">
      <div className="px-5 md:px-10 lg:px-52 grid grid-cols-2 gap-4 md:gap-6 py-10">
        <input
          type="text"
          className="border-2 border-[#D5D4D8] rounded outline-none px-4 py-2 focus:border-sky-400"
          placeholder="Top text"
          name="topText"
          onChange={handleChange}
          value={meme.topText}
        />
        <input
          type="text"
          className="border-2 border-[#D5D4D8] rounded outline-none px-4 py-2 focus:border-sky-400"
          placeholder="Bottom text"
          name="bottomText"
          onChange={handleChange}
          value={meme.bottomText}
        />
        <div className="flex items-center justify-between col-span-2 gap-4 md:gap-6">
          <button
            className="bg-gradient-to-r from-[#09C6F9] to-[#045DE9]  text-white px-3 py-2 w-full  rounded cursor-pointer active:scale-95 duration-300 font-bold"
            onClick={downloadMeme}
          >
            Download
          </button>
          <button
            className="bg-gradient-to-r from-[#09C6F9] to-[#045DE9] text-white px-3 py-2 w-full  rounded cursor-pointer active:scale-95 duration-300 font-bold"
            onClick={getRandom}
          >
            Get a new meme
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center px-5 md:px-10">
        <div className="relative  inline-block max-w-fit" id="memeImage">
          <img
            src={meme.url}
            className="max-h-[28rem]"
            alt="Geek Programmer Meme Template"
          />
          <h2 className="top absolute top-3 text-xl md:text-2xl lg:text-3xl left-[50%] translate-x-[-50%] font-black uppercase text-white whitespace-nowrap">
            {meme.topText}
          </h2>
          <h2 className="bottom absolute bottom-3 text-xl md:text-2xl lg:text-3xl left-[50%] translate-x-[-50%] font-black uppercase text-white whitespace-nowrap">
            {meme.bottomText}
          </h2>
        </div>
      </div>
    </main>
  );
}
